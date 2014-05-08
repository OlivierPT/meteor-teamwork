/*****************************************************************************/
// Activity Methods
//
// This file contains the server methods to interact with Activity Domain.
/*****************************************************************************/

Meteor.methods({

    'createActivity': function(name, userId) {
        console.log("MethodCall : createActivity : name = "+name);
        var actvityId = Activity.insert({name: name, user: userId});

        State.insert({activity: actvityId, label: "ToDo", position: 1});
        State.insert({activity: actvityId, label: "Doing", position: 2});
        State.insert({activity: actvityId, label: "Done", position: 3});
        console.log("Activity created");
    },

    'addState': function(stateLabel, activityId) {
        var nbStates = State.find().count({activity: activityId})
        State.insert({activity: activityId, label: stateLabel, position: nbStates+1});
    },

    'addTask': function(label, activityId, stateId) {
        var nbTasks = Task.find().count({state: stateId})
        Task.insert({activity: activityId, state: stateId, label: label, position: nbTasks+1});
    }



});
