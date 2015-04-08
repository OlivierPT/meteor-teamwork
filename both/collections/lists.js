Lists = new Mongo.Collection('lists');

Lists.attachSchema(new SimpleSchema({
    label: {
        type: String
    },
    archived: {
        type: Boolean
    },
    activityId: {
        type: String
    },
    createdAt: {
        type: Date,
        denyUpdate: true
    },
    sort: {
        type: Number,
        decimal: true,
        // XXX We should probably provide a default
        optional: true
    },
    updatedAt: {
        type: Date,
        denyInsert: true,
        optional: true
    }
}));

// Lists.allow({
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


Lists.helpers({
    tasks: function() {
        return Tasks.find(_.extend(Filter.getMongoSelector(), {
            listId: this._id,
            archived: false
        }), { sort: ['sort'] });
    },
    activity: function() {
        return Activities.findOne(this.activityId);
    }
});

// HOOKS
Lists.hookOptions.after.update = { fetchPrevious: false };

Lists.before.insert(function(userId, doc) {
    doc.createdAt = new Date();
    doc.archived = false;
    if (!doc.userId) doc.userId = userId;
});

Lists.before.update(function(userId, doc, fieldNames, modifier) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = new Date();
});
