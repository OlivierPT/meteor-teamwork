Cards = new Mongo.Collection('cards');
CardComments = new Mongo.Collection('card_comments');

// XXX To improve pub/sub performances a card document should included a
// de-normalized number of comments so we don't have to publish the whole list
// of comments just to display the number of them in the board view.
Cards.attachSchema(new SimpleSchema({
    labal: {
        type: String
    },
    archived: {
        type: Boolean
    },
    listId: {
        type: String
    },
    // The system could work without this `boardId` information (we could deduce
    // the board identifier from the card), but it would make the system more
    // difficult to manage and less efficient.
    activityId: {
        type: String
    },
    coverId: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        denyUpdate: true
    },
    dateLastActivity: {
        type: Date
    },
    description: {
        type: String,
        optional: true
    },
    categorysIds: {
        type: [String],
        optional: true
    },
    members: {
        type: [String],
        optional: true
    },
    // XXX Should probably be called `authorId`. Is it even needed since we have
    // the `members` field?
    userId: {
        type: String
    },
    sort: {
        type: Number,
        decimal: true
    }
}));

CardComments.attachSchema(new SimpleSchema({
    activityId: {
        type: String
    },
    cardId: {
        type: String
    },
    // XXX Rename in `content`? `text` is a bit vague...
    text: {
        type: String
    },
    // XXX We probably don't need this information here, since we already have
    // it in the associated comment creation activity
    createdAt: {
        type: Date,
        denyUpdate: false
    },
    // XXX Should probably be called `authorId`
    authorId: {
        type: String
    }
}));

// ALLOWS
// Card.allow({
//     insert: function(userId, doc) {
//         return allowIsBoardMember(userId, Boards.findOne(doc.boardId));
//     },
//     update: function(userId, doc) {
//         return allowIsBoardMember(userId, Boards.findOne(doc.boardId));
//     },
//     remove: function(userId, doc) {
//         return allowIsBoardMember(userId, Boards.findOne(doc.boardId));
//     },
//     fetch: ['boardId']
// });
//
// CardComments.allow({
//     insert: function(userId, doc) {
//         return allowIsBoardMember(userId, Boards.findOne(doc.boardId));
//     },
//     update: function(userId, doc) {
//         return userId === doc.userId;
//     },
//     remove: function(userId, doc) {
//         return userId === doc.userId;
//     },
//     fetch: ['userId', 'boardId']
// });


// HELPERS
Cards.helpers({
    list: function() {
        return Lists.findOne(this.listId);
    },
    activity: function() {
        return Activity.findOne(this.boardId);
    },
    labels: function() {
        var self = this;
        var boardLabels = self.board().labels;
        var cardLabels = _.filter(boardLabels, function(label) {
            return _.contains(self.labelIds, label._id);
        });
        return cardLabels;
    },
    author: function() {
        return Users.findOne(this.authorId);
    },
    logs: function() {
        return Logs.find({ type: 'card', cardId: this._id }, { sort: { createdAt: -1 }});
    },
    comments: function() {
        return CardComments.find({ cardId: this._id }, { sort: { createdAt: -1 }});
    }
    //,
    // attachments: function() {
    //     return Attachments.find({ cardId: this._id }, { sort: { uploadedAt: -1 }});
    // },
    // cover: function() {
    //     return Attachments.findOne(this.coverId);
    // },
    // absoluteUrl: function() {
    //     var board = this.board();
    //     return Router.path("card", { boardId: board._id, slug: board.slug, cardId: this._id });
    // },
    // rootUrl: function() {
    //     return Meteor.absoluteUrl(this.absoluteUrl().replace('/', ''));
    // }
});

CardComments.helpers({
    user: function() {
        return Users.findOne(this.userId);
    }
});

CardComments.hookOptions.after.update = { fetchPrevious: false };
Cards.before.insert(function(userId, doc) {
    doc.createdAt = new Date();
    doc.dateLastActivity = new Date();

    // defaults
    doc.archived = false;

    // userId native set.
    if (!doc.userId) doc.userId = userId;
});


CardComments.before.insert(function(userId, doc) {
    doc.createdAt = new Date();
    doc.userId = userId;
});

isServer(function() {
  Cards.after.insert(function(userId, doc) {
        Logs.insert({
            type: 'card',
            logType: "createCard",
            activityId: doc.activityId,
            listId: doc.listId,
            cardId: doc._id,
            userId: userId
        });
    });

    // New activity for card (un)archivage
    Cards.after.update(function(userId, doc, fieldNames, modifier) {
        if (_.contains(fieldNames, 'archived')) {
            if (doc.archived) {
              Logs.insert({
                    type: 'card',
                    logType: "archivedCard",
                    activityId: doc.activityId,
                    listId: doc.listId,
                    cardId: doc._id,
                    userId: userId
                });
            } else {
              Logs.insert({
                    type: 'card',
                    logType: "restoredCard",
                    activityId: doc.activityId,
                    listId: doc.listId,
                    cardId: doc._id,
                    userId: userId
                });
            }
        }
    });

    // New activity for card moves
    Cards.after.update(function(userId, doc, fieldNames, modifier) {
        var oldListId = this.previous.listId;
        if (_.contains(fieldNames, "listId") && doc.listId !== oldListId) {
          Logs.insert({
                type: 'card',
                logType: "moveCard",
                listId: doc.listId,
                oldListId: oldListId,
                activityId: doc.activityId,
                cardId: doc._id,
                userId: userId
            });
        }
    });

    // Add a new activity if we add or remove a member to the card
    Cards.before.update(function(userId, doc, fieldNames, modifier) {
        if (! _.contains(fieldNames, 'members'))
            return;

        // Say hello to the new member
        if (modifier.$addToSet && modifier.$addToSet.members) {
            var memberId = modifier.$addToSet.members;
            if (!_.contains(doc.members, memberId)) {
                Logs.insert({
                    type: 'card',
                    logType: "joinMember",
                    activityId: doc.activityId,
                    cardId: doc._id,
                    userId: userId,
                    memberId: memberId
                });
            }
        }

        // Say goodbye to the former member
        if (modifier.$pull && modifier.$pull.members) {
            var memberId = modifier.$pull.members;
            Logs.insert({
                type: 'card',
                logType: "unjoinMember",
                activityId: doc.activityId,
                cardId: doc._id,
                userId: userId,
                memberId: memberId
            });
        }
    });

    // Remove all activities associated with a card if we remove the card
    Cards.after.remove(function(userId, doc) {
        Logs.remove({
            cardId: doc._id
        });
    });

    CardComments.after.insert(function(userId, doc) {
        Logs.insert({
            type: 'comment',
            logType: "addComment",
            activityId: doc.activityId,
            cardId: doc.cardId,
            commentId: doc._id,
            userId: userId
        });
    });

    CardComments.after.remove(function(userId, doc) {
        var log = Logs.findOne({ commentId: doc._id });
        if (log) {
            Logs.remove(log._id);
        }
    });
});
