/*****************************************************************************/
// Activity utils methods
//
// This file contains the server methods to interact with Activity Domain.
/*****************************************************************************/


/**
 * Create a new Task instance
 * 
 * @param {type} datas
 * @returns {undefined}
 */
createTask = function(datas) {
  var newTask = {id: new Mongo.ObjectID().toHexString(), label: datas.label, comments: []};
  return newTask;
}

/**
 * 
 * @param {type} param
 */
createState = function(datas) {
    var newState =  {id: new Mongo.ObjectID().toHexString(), label: datas.label, tasks: []};
    return newState;
}

/*****************************************************************************/
// Activity Metor Methods
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
        check(name, NonEmptyString);
        check(teamValue, NonEmptyString);

        // First creating a Team for the new Activity
        var teamId = teamValue;
        if (teamId === "new") {
            teamId = Meteor.call('createTeam', name + " Team", name + " activity's Team");
        }
        
        var newActivity = {};
        newActivity.name = name;
        newActivity.description = description;
        newActivity.owner = Meteor.userId();
        newActivity.team = teamId;
        newActivity.states = [];
        
        var stateDatas = {};
        stateDatas.label = "ToDo";
        newActivity.states.push(createState(stateDatas));
        stateDatas.label = "Doing";
        newActivity.states.push(createState(stateDatas));
        stateDatas.label = "Done";
        newActivity.states.push(createState(stateDatas));

        //var actvityId = Activity.insert({name: name, owner: Meteor.userId(), team: teamId, description: description});
        var actvityId = Activity.insert(newActivity);
        console.log("New activity created!");
        return actvityId;
    },
    
    'deleteActivity': function (activityId) {
        console.log("MethodCall : deleteActivity - activityId = " + activityId);
        // Controles
        check(activityId, NonEmptyString);

        if (Meteor.userId()) {
            // L'utilisateur doit etre le owner de l'activity
            var activity = Activity.findOne({_id: activityId});
            if (activity.owner === Meteor.userId()) {                
                // Si l'equipe n'existe que pour cette activite, elle est 
                // aussi supprimé
                var nbActivityForTeam = Activity.find({team: activity.team}).count();
                if (nbActivityForTeam <= 1) {
                    Team.remove({_id: activity.team});
                }
                Activity.remove({_id: activityId});
                // Si l'equipe n'existe que pour cette activite, elle est 
                // aussi supprimé
            } else {
                throw new Meteor.Error("access-denied", "The user must be the owner of the activity.");
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
        var stateDatas = {};
        stateDatas.label = stateLabel;
        var newState = createState(stateDatas);   
        Activity.update({_id: activityId},
                   {$push: {states: newState}});        
    },
    /**
     * Remove a state and all the tasks included
     *
     * @param {type} stateId
     * @returns {undefined}
     */
    'removeState': function (stateId, activityId) {
        console.log("MethodCall : removeState - id = " + stateId);        
        Activity.update({_id: activityId},
                   {$pull: {states: {id: stateId}}}); 
        console.log("State and associated Tasks deleted");
    },
    /**
     * Move a state and all the tasks included
     *
     * @param {type} stateId
     * @returns {undefined}
     */
    'moveState': function (activityId, stateId, newPosition) {
        console.log("MethodCall : moveState - stateId = " + stateId + " - nextStateId= " + nextStateId);
        

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
        console.log("MethodCall : addTask - label = " + label + " - activityId = "+activityId+" - stateId = "+stateId);
        
        var taskDatas = {};
        taskDatas.label = label;
        var newTask = createTask(taskDatas); 
        
        Activity.update({_id: activityId, "states.id": stateId},
            {$push: {"states.$.tasks": newTask}}); 
    },
    /**
     * 
     * @param {type} taskId
     * @returns {undefined}
     */
    'removeTask': function (activityId, stateId, taskId) {
        console.log("MethodCall : removeTask - activityId = "+activityId+" - stateId = "+stateId+" - taskId = "+taskId);
        Activity.update({_id: activityId, "states.id": stateId},
            {$pull: {"states.$.tasks": {id: taskId}}});
        console.log("Tasks deleted");
    },
    /**
     * 
     * @param {type} task
     * @returns {undefined}
     */
    'storeTask': function (activityId, stateId, task) {
        console.log("MethodCall : storeTask - id = " + task._id + " position : " + task.position);
        // update the task
        var activity = Activity.findOne({_id: activityId});        
        var state = getStateById(activity, stateId);        
        //var task = getTaskById(state, taskId);
        
        Activity.update({_id: activityId}, activity);
        console.log("Task stored");
    },
    /**
     * 
     * @param {type} task
     * @returns {undefined}
     */
    'moveTask': function (activityId, taskId, newState, taskPosition) {
        console.log("MethodCall : moveTask - id = " + taskId + " newState : " + newState);

        

        console.log("Task stored : newState=" + newState + " - position: " + newPosition);
    },
    /**
     * 
     * @param {type} task
     * @param {type} comment
     * @returns {undefined}
     */
    'addCommentToTask': function (activityId, stateId, taskId, comment) {
        console.log("MethodCall : addCommentToTask - activityId = " + activityId + " - stateId = " + stateId + " - taskId = "+taskId+" , comment = " + comment);
        
        var newComment = {};
        newComment.content = comment;
        newComment.author = Meteor.userId();
        newComment.dateCreate = new Date();
        
        var activity = Activity.findOne({_id: activityId});        
        var state = getStateById(activity, stateId);        
        var task = getTaskById(state, taskId);
        
        task.comments.push(newComment); 
        
        Activity.update({_id: activityId}, activity);
        console.log("Tasks store");
    }


});
