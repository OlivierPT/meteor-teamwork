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

        Meteor.call('addTask', label, this.activity, stateId);

        $('input#taskName' + stateId).val("");
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