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

// HOOKS
Activities.before.insert(function(userId, doc) {

    doc.createdAt = new Date();
    doc.archived = false;
    // doc.members = [{
    //     userId: userId,
    //     isAdmin: true
    // }];

    // Handle labels
    // var defaultLabels = ['green', 'yellow', 'orange', 'red', 'purple', 'blue'];
    // doc.labels = [];
    // _.each(defaultLabels, function(val) {
    //     doc.labels.push({
    //         _id: Random.id(6),
    //         name: '',
    //         color: val
    //     });
    // });

    // We randomly chose one of the default background colors for the board
    // if (Meteor.isClient) {
    //     doc.background = {
    //         type: "color",
    //         color: Random.choice(DefaultBoardBackgroundColors)
    //     };
    // }
});

Activities.before.update(function(userId, doc, fieldNames, modifier) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = new Date();
});
