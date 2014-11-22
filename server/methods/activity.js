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
    'createActivity': function (name, teamValue, description) {
        console.log("MethodCall : createActivity - name = " + name);
        console.log("MethodCall : createActivity - teamValue = " + teamValue);
        console.log("MethodCall : createActivity - currentUser = " + Meteor.userId());

        // Controles
        check(name, String);
        check(teamValue, String);
        check(description, Match.Optional(String));

        // First creating a Team for the new Activity
        var teamId = teamValue;
        if (teamId === "new") {
            teamId = Meteor.call('createTeam', name + " Team", name + " activity's Team");
            console.log("Created new Team : " + teamId);
        }

        var actvityId = Activity.insert({name: name, owner: Meteor.userId(), team: teamId, description: description});

        State.insert({activity: actvityId, label: "ToDo", position: 1});
        State.insert({activity: actvityId, label: "Doing", position: 2});
        State.insert({activity: actvityId, label: "Done", position: 3});
        console.log("Activity created");
    },
    'deleteActivity': function (activityId) {
        console.log("MethodCall : deleteActivity - activityId = " + activityId);
        // Controles
        check(activityId, String);

        if (Meteor.userId()) {
            // L'utilisateur doit etre le owner de l'activity
            var activity = Activity.findOne({_id: activityId});
            if (activity.owner === Meteor.userId()) {
                // Supression de l'activite et toutes se dépendances
                Task.remove({activity: activityId});
                State.remove({activity: activityId});
                // Si l'equipe n'existe que pour cette activite, elle est 
                // aussi supprimé
                var nbActivityForTeam = Activity.find({team: activity.team}).count();
                if (nbActivityForTeam <= 1) {
                    Team.remove({_id: activity.team});
                }
                Activity.remove({_id: activityId});
                // Si l'equipe n'existe que pour cette activite, elle est 
                // aussi supprimé
            }
        }

        console.log("Activity deleted");
    },
    /**
     * 
     * @param {type} activityId
     * @param {type} teamId
     * @returns {undefined}
     */
    'changeTeamActivity': function (activityId, teamId) {
        console.log("MethodCall : changeTeamActivity - activity = " + activityId + " team = " + teamId);
        Activity.update({_id: activityId}, {$set: {team: teamId}});
        console.log("Activity team changed");
    },
    /**
     * Add a State to an activity. The state is added as the last state
     *
     * @param {type} stateLabel
     * @param {type} activityId
     * @returns {undefined}
     */
    'addState': function (stateLabel, activityId) {
        var nbStates = State.find().count({activity: activityId})
        State.insert({activity: activityId, label: stateLabel, position: nbStates + 1});
    },
    /**
     * Remove a state and all the tasks included
     *
     * @param {type} stateId
     * @returns {undefined}
     */
    'removeState': function (stateId) {
        console.log("MethodCall : removeState - id = " + stateId);
        // First, remove the tasks
        Task.remove({state: stateId});
        // Then, remove the state
        State.remove({_id: stateId});
        
        // Check the order
        var order = 0;
        State.find({activity: stateToMove.activity}, {sort: {position: 1}}).forEach(function (currentState) {
            order += 1;            
            State.update({_id: currentState._id}, {$set: {position: order}});         
        });
        
        console.log("State and associated Tasks deleted");
    },
    /**
     * Move a state and all the tasks included
     *
     * @param {type} stateId
     * @returns {undefined}
     */
    'moveState': function (stateId, nextStateId) {
        console.log("MethodCall : moveState - stateId = " + stateId + " - nextStateId= " + nextStateId);
        var stateToMove = State.findOne({_id: stateId});

        var order = 0;
        var newPosition = -1;
        State.find({activity: stateToMove.activity}, {sort: {position: 1}}).forEach(function (currentState) {
            order += 1;
            if (currentState._id === nextStateId) {
                newPosition = order;
                console.log("MethodCall : moveState - found position = " + newPosition);
                order += 1;
            }
            if (currentState._id !== stateToMove._id) {
                State.update({_id: currentState._id}, {$set: {position: order}});
            }            
        });

        if (newPosition === -1) {
            newPosition = order;
        }

        // update the task
        State.update({_id: stateToMove._id}, {$set: {position: newPosition}});

        console.log("State stored : position: " + newPosition);
    },
    /**
     * Add a task for an Activity and a State
     *
     * @param {type} label
     * @param {type} activityId
     * @param {type} stateId
     * @returns {undefined}
     */
    'addTask': function (label, activityId, stateId) {
        var nbTasks = Task.find().count({state: stateId})
        Task.insert({activity: activityId, state: stateId, label: label, position: nbTasks + 1});
    },
    /**
     * 
     * @param {type} taskId
     * @returns {undefined}
     */
    'removeTask': function (taskId) {
        console.log("MethodCall : removeTask - id = " + taskId);
        Task.remove({_id: taskId});
        console.log("Tasks deleted");
    },
    /**
     * 
     * @param {type} task
     * @returns {undefined}
     */
    'storeTask': function (task) {
        console.log("MethodCall : storeTask - id = " + task._id + " position : " + task.position);
        // update the task
        Task.update({_id: task._id},
        {$set: {description: task.description, state: task.state, complexity: task.complexity, category: task.category}});
        console.log("Task stored");
    },
    /**
     * 
     * @param {type} task
     * @returns {undefined}
     */
    'moveTask': function (taskId, newState, nextTaskId) {
        console.log("MethodCall : moveTask - id = " + taskId + " newState : " + newState);

        var taskToMove = Task.findOne({_id: taskId});
        // reordering current state
        var order = 0;
        var newPosition = -1;
        console.log("MethodCall : moveTask - Reordoring current state.");
        Task.find({state: taskToMove.state}, {sort: {position: 1}}).forEach(function (currentTask) {
            
            order += 1;
            if (currentTask._id === nextTaskId) {
                newPosition = order;
                console.log("MethodCall : moveTask - found position = " + newPosition);
                order += 1;
            }
            if (currentTask._id !== taskToMove._id) {
                Task.update({_id: currentTask._id}, {$set: {position: order}});
            }
            
        });


        if (taskToMove.state !== newState) {
            console.log("MethodCall : moveTask - Reordoring new state.");
            // reordering the new state
            order = 0;
            newPosition = -1;
            Task.find({state: newState}, {sort: {position: 1}}).forEach(function (currentTask) {
                order += 1;
                if (currentTask._id === nextTaskId) {
                    newPosition = order;
                    console.log("MethodCall : moveTask - found position = " + newPosition);
                    order += 1;
                }
                if (currentTask._id !== taskToMove._id) {
                    Task.update({_id: currentTask._id}, {$set: {position: order}});
                }
                
            });
            if (newPosition === -1) {
                newPosition = order;
            }
        }

        // update the task
        Task.update({_id: taskToMove._id}, {$set: {state: newState, position: newPosition}});

        console.log("Task stored : newState=" + newState + " - position: " + newPosition);
    },
    /**
     * 
     * @param {type} task
     * @param {type} comment
     * @returns {undefined}
     */
    'addCommentToTask': function (task, comment) {
        console.log("MethodCall : addCommentToTask - id = " + task._id + ", comment = " + comment);
        Task.update({_id: task._id}, {$push: {comments: {content: comment, author: Meteor.userId(), dateCreate: new Date()}}});
        console.log("Tasks store");
    }


});
