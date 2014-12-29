/*****************************************************************************/
/* TaskDetailModal: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.TaskDetailModal.events({
    'click button#saveTaskBtn': function (event) {
        var desc = $('#taskDetailModal #description').val();
        var state = $('#taskDetailModal #taskState').val();
        var complexity = $('#taskDetailModal #complexity').val();
        var category = $('#taskDetailModal #category').val();
        var currentTaskId = Session.get("selectedTaskId");

        var modifiedTask = {};
        modifiedTask.id = currentTaskId;
        modifiedTask.description = desc;
        modifiedTask.state = state;
        modifiedTask.complexity = complexity;
        modifiedTask.category = category;

        Meteor.call('storeTask', modifiedTask, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to store task modification.", error);
            } else {
                emitNotification("Task saved.");
            }
        });
        $('#taskDetailModal').modal('hide');
    },
    'click button#deleteTaskBtn': function (event) {
        var activityId = Session.get("activity")._id;
        var taskId = Session.get("selectedTaskId");
        var stateId = Session.get("selectedStateId");

        Meteor.call('removeTask', activityId, stateId, taskId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to remove task.", error);
            } else {
                emitNotification("Task deleted.");
            }
        });
        $('#taskDetailModal').modal('hide');
    }
});

Template.TaskDetailModal.helpers({
    currentTask: function () {
        var task = {};
        var activity = Session.get("activity");
        if (activity) {
            var taskId = Session.get("selectedTaskId");
            var stateId = Session.get("selectedStateId");
            
            var state = getStateById(activity, stateId);
            task = getTaskById(state, taskId);
        }
        return task;
    }
});

/*****************************************************************************/
/* TaskDetailModal: Lifecycle Hooks */
/*****************************************************************************/
Template.TaskDetailModal.created = function () {
};

Template.TaskDetailModal.rendered = function () {
};

Template.TaskDetailModal.destroyed = function () {
};