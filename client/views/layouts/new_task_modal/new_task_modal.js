/*****************************************************************************/
/* NewTaskModal: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.NewTaskModal.events({
  'click button#createTaskBtn': function (event) {
        
        var label = $('input#newTaskLabel').val();
        var desc = $('#description').val();
        var stateId = $('#taskState').val();
        var complexity = $('#complexity').val();
        var category = $('#category').val();

        Meteor.call('addTask', label, this.activity, stateId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to add the task.", error);
            } else {
                emitNotification("Task added.");
                $('input#taskName' + stateId).val("");
            }
        });
    }
});

Template.NewTaskModal.helpers({
  newTask: function () {  
        var newTask = {};
        newTask._id = -1;
        newTask.state = Session.get("selectedStateId");
        newTask.activity = this._id;
        
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