/*****************************************************************************/
/* NewTaskModal: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.NewTaskModal.events({
  'click button#createTaskBtn': function (event) {
        
        var label = $('#newTaskModal #label').val();
        var desc = $('#newTaskModal #description').val();
        var stateId = $('#newTaskModal #taskState').val();
        var complexity = $('#newTaskModal #complexity').val();
        var category = $('#newTaskModal #category').val();
        var activityId = Session.get("activity")._id;

        Meteor.call('addTask', label, activityId, stateId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to add the task.", error);
            } else {
                emitNotification("Task added.");
                $('#newTaskModal #label').val("");
            }
        });
         $('#newTaskModal').modal('hide');
    }
});

Template.NewTaskModal.helpers({
  newTask: function () {  
        var newTask = {};        
        return newTask;
    }
});

/*****************************************************************************/
/* NewTaskModal: Lifecycle Hooks */
/*****************************************************************************/
Template.NewTaskModal.created = function () {
};

Template.NewTaskModal.rendered = function () {
};

Template.NewTaskModal.destroyed = function () {
};