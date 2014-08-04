/*****************************************************************************/
// Activity Methods
//
// This file contains the server methods to interact with Activity Domain.
/*****************************************************************************/

Meteor.methods({

    /**
     * Create a new Activity
     *
     * @param {type} name
     * @param {type} userId
     * @returns {undefined}
     */
    'createActivity': function(name, teamValue) {
        console.log("MethodCall : createActivity - name = "+name);
        console.log("MethodCall : createActivity - teamValue = "+teamValue);
        console.log("MethodCall : createActivity - currentUser = "+Meteor.userId());
        
        // First creating a Team for the new Activity
        var teamId = teamValue;
        if (teamId === "new") {            
            teamId =  Meteor.call('createTeam', name+" Team", name+ "activity's Team");
            console.log("Created new Team : "+teamId);
        }
        
        var actvityId = Activity.insert({name: name, owner: Meteor.userId(), team: teamId});

        State.insert({activity: actvityId, label: "ToDo", position: 1});
        State.insert({activity: actvityId, label: "Doing", position: 2});
        State.insert({activity: actvityId, label: "Done", position: 3});
        console.log("Activity created");
    },
    
    'changeTeamActivity': function(activityId, teamId) {
        console.log("MethodCall : changeTeamActivity - activity = "+activityId+" team = "+teamId);
        Activity.update({_id:activityId}, {$set: {team: teamId}});
        console.log("Activity team changed");
    },

    /**
     * Add a State to an activity. The state is added as the last state
     *
     * @param {type} stateLabel
     * @param {type} activityId
     * @returns {undefined}
     */
    'addState': function(stateLabel, activityId) {
        var nbStates = State.find().count({activity: activityId})
        State.insert({activity: activityId, label: stateLabel, position: nbStates+1});
    },

    /**
     * Remove a state and all the tasks included
     *
     * @param {type} stateId
     * @returns {undefined}
     */
    'removeState': function(stateId) {
        console.log("MethodCall : removeState - id = "+stateId);
        // First, remove the state
        State.remove({_id:stateId});

        // Then, remove the tasks
        Task.remove({state:stateId});
        console.log("State and associated Tasks deleted");
    },

    /**
     * Add a task for an Activity and a State
     *
     * @param {type} label
     * @param {type} activityId
     * @param {type} stateId
     * @returns {undefined}
     */
    'addTask': function(label, activityId, stateId) {
        var nbTasks = Task.find().count({state: stateId})
        Task.insert({activity: activityId, state: stateId, label: label, position: nbTasks+1});
    },


    'removeTask': function(taskId) {
        console.log("MethodCall : removeTask - id = "+taskId);
        Task.remove({_id: taskId});
        console.log("Tasks deleted");
    },

    'storeTask': function(task) {
        console.log("MethodCall : storeTask - id = "+task._id);
        Task.update({_id: task._id}, {$set: {description: task.description, state: task.state}});
        console.log("Tasks store");
    },

    'addCommentToTask': function(task, comment) {
      console.log("MethodCall : addCommentToTask - id = "+task._id+", comment = "+comment);
      Task.update({_id: task._id}, {$push: {comments: {content: comment, author: Meteor.userId(), dateCreate: new Date()}}});
      console.log("Tasks store");
    }


});
