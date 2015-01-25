/*****************************************************************************/
/* MaterialActivity: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MaterialActivity.events({
    'click #new-state-btn': function (e, tmpl) {
        document.querySelector("#new-state-dialog").toggle();
    }

});

Template.MaterialActivity.helpers({
    states: function () {
        return this.states;
    },
    tasks: function () {
        return this.tasks;
    }
});

/*****************************************************************************/
/* MaterialActivity: Lifecycle Hooks */
/*****************************************************************************/
Template.MaterialActivity.created = function () {
};

Template.MaterialActivity.rendered = function () {

    // Selector pour l'evenement de suppression d'un etat
    document.querySelector('tw-activity').addEventListener('delete-list', function (e) {
        console.log(e.type, e.detail.id); 
        var stateId = e.detail.id;
        var activityId = e.detail.activity;
        Meteor.call('removeState', stateId, activityId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to delete the state.", error);
            } else {
                emitNotification("State deleted.");
            }
        });
    });
    
    // Selector pour l'evenement de suppression d'un etat
    document.querySelector('tw-activity').addEventListener('add-task', function (e) {
        console.log(e.type, e.detail.id); 
        var stateId = e.detail.id;
        var activityId = e.detail.activity;
        var taskLabel = e.detail.taskLabel;
        
        Meteor.call('addTask', taskLabel, activityId, stateId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to add a task.", error);
            } else {
                emitNotification("Task added.");
            }
        });
    });

};

Template.MaterialActivity.destroyed = function () {
};