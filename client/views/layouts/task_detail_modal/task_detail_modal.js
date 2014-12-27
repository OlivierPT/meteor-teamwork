/*****************************************************************************/
/* TaskDetailModal: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.TaskDetailModal.events({
    'click button#saveTaskBtn': function (event) {
        var desc = $('#description').val();
        var state = $('#taskState').val();
        var complexity = $('#complexity').val();
        var category = $('#category').val();

        var currentTask = Task.findOne({_id: Session.get("selectedTaskId")});
        currentTask.description = desc;
        currentTask.state = state;
        currentTask.complexity = complexity;
        currentTask.category = category;

        Meteor.call('storeTask', currentTask, function (error, result) {
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
        Meteor.call('removeTask', Session.get("selectedTaskId"), function (error, result) {
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
        return Task.findOne({_id: Session.get("selectedTaskId")});
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