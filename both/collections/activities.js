/**
 * Activity collection
 * @type Mongo.Collection
 */
Activities = new Mongo.Collection('activities');

Activities.attachSchema(new SimpleSchema({
    label: {
        type: String
    },
    description: {
        type: String
    },
    archived: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        denyUpdate: true
    },
    // XXX Inconsistent field naming
    modifiedAt: {
        type: Date,
        denyInsert: true,
        optional: true
    },
    permission: {
        type: String,
        allowedValues: ['public', 'private']
    },
    teamId: {
        type: String
    }
}));

/*****************************************************************************/
// Activity helpers methods
//
// This file contains the server methods to interact with Activity Domain.
/*****************************************************************************/
Activities.helpers({
    isPublic: function() {
        return this.permission === 'public';
    },
    lists: function() {
        return Lists.find({ activityId: this._id, archived: false }, { sort: { sort: 1 }});
    },
    logs: function() {
        return Logs.find({ activityId: this._id }, { sort: { createdAt: -1 }});
    },
    absoluteUrl: function() {
        return Router.path("activity", { activityId: this._id });
    },
    team: function() {
      return Teams.findOne({ _id: this.teamId});
    }
});

Activities.before.insert(function(userId, doc) {
    doc.createdAt = new Date();
});
