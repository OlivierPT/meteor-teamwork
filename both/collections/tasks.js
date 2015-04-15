Tasks = new Mongo.Collection('tasks');
TaskComments = new Mongo.Collection('task_comments');

// XXX To improve pub/sub performances a card document should included a
// de-normalized number of comments so we don't have to publish the whole list
// of comments just to display the number of them in the board view.
Tasks.attachSchema(new SimpleSchema({
    label: {
        type: String
    },
    archived: {
        type: Boolean,
        autoValue: function() {
          if (this.isInsert) {
            return false;
          }
        }
    },
    listId: {
        type: String
    },
    // The system could work without this `boardId` information (we could deduce
    // the board identifier from the card), but it would make the system more
    // difficult to manage and less efficient.
    activityId: {
        type: String,
        optional: true
    },
    coverId: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
        autoValue: function() {
          if (this.isInsert) {
            return new Date();
          }
        }
    },
    dateLastLog: {
        type: Date,
        optional: true,
        autoValue: function() {
          if (this.isUpdate || this.isInsert) {
            return new Date();
          }
        }
    },
    detail: {
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
    complexity: {
      type: Number,
      decimal: true,
      optional: true
    },
    value: {
      type: Number,
      decimal: true,
      optional: true
    },
    authorId: {
        type: String,
        autoValue: function() {
          if (this.isInsert) {
            return this.userId;
          }
        }
    },
    sort: {
        type: Number,
        decimal: true,
        optional: true
    }
}));

TaskComments.attachSchema(new SimpleSchema({
    activityId: {
        type: String
    },
    taskId: {
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
Tasks.helpers({
    list: function() {
        return Lists.findOne(this.listId);
    },
    activity: function() {
        return Activities.findOne(this.activityId);
    },
    // labels: function() {
    //     var self = this;
    //     var boardLabels = self.activity().labels;
    //     var cardLabels = _.filter(boardLabels, function(label) {
    //         return _.contains(self.labelIds, label._id);
    //     });
    //     return cardLabels;
    // },
    author: function() {
        return Users.findOne(this.authorId);
    },
    logs: function() {
        return Logs.find({ type: 'task', cardId: this._id }, { sort: { createdAt: -1 }});
    },
    comments: function() {
        return TaskComments.find({ cardId: this._id }, { sort: { createdAt: -1 }});
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

TaskComments.helpers({
    user: function() {
        return Users.findOne(this.userId);
    }
});

TaskComments.hookOptions.after.update = { fetchPrevious: false };
Tasks.before.insert(function(userId, doc) {
    doc.createdAt = new Date();
    doc.dateLastLog = new Date();

    // defaults
    doc.archived = false;

    // userId native set.
    if (!doc.userId) doc.userId = userId;
});


TaskComments.before.insert(function(userId, doc) {
    doc.createdAt = new Date();
    doc.userId = userId;
});
