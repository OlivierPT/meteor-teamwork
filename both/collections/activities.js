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
        type: String,
        optional: true
    },
    archived: {
        type: Boolean,
        autoValue: function() {
          if (this.isInsert) {
            return false;
          }
        }
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
    modifiedAt: {
        type: Date,
        denyInsert: true,
        optional: true,
        autoValue: function() {
            if (this.isUpdate) {
              return new Date();
            }
          }
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
    linkUrl: function() {
        return Router.pathFor("activity", { _id: this._id });
    },
    team: function() {
      return Teams.findOne({ _id: this.teamId});
    }
});

// HOOKS GLOBAUX
Activities.before.insert(function(userId, doc) {
    console.log("Activities.before.insert : " + doc.label);
    doc.createdAt = Date.now();
    doc.archived = false;
    doc.permission = 'public';
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
    modifier.$set.modifiedAt = Date.now();
});
