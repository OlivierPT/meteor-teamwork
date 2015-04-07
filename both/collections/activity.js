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
    /**
     * Find and return a State in an Activity from its ID
     *
     * @param {type} activity
     * @param {type} stateID
     * @returns {unresolved}
     */
    getStateById = function (activity, stateId) {
        var i = 0;
        console.log("Lookin for State :  id = " + stateId);
        while (i < activity.states.length) {
            console.log("Check current State :  id = '" + activity.states[i].id + "' - label = " + activity.states[i].label);
            if (activity.states[i].id === stateId) {
                console.log("State found :  Id = '" + activity.states[i].id + "' - label = " + activity.states[i].label);
                return activity.states[i];
            }
            i++;
        }
        console.log("Throw Meteor.Error : data-error");
        throw new Meteor.Error("data-error", "State not found in Activity");
    },
    /**
     * Find and return a State in an Activity from its ID
     *
     * @param {type} activity
     * @param {type} stateID
     * @returns {unresolved}
     */
    getTaskById = function (state, taskID) {
        var i = 0;
        while (i < state.tasks.length) {
            if (state.tasks[i].id === taskID) {
                console.log("Task found :  ID = " + state.tasks[i].id + " - label = " + state.tasks[i].label);
                return state.tasks[i];
            }
            i++;
        }
        throw new Meteor.Error("data-error", "Task not found in State");
    },
    findStateForTask = function (activity, taskId) {
        var i = 0;
        while (i < activity.states.length) {
            var state = activity.states[i];
            var j = 0;
            while (j < state.tasks.length) {
                if (state.tasks[j].id === taskId) {
                    console.log("State found in activity :  ID = " + state.id + " - label = " + state.label);
                    return state;
                }
                j++;
            }
            i++;
        }
        throw new Meteor.Error("data-error", "State not found.");

    }
});
