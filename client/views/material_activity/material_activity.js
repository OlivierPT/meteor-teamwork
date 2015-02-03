/*****************************************************************************/
/* MaterialActivity: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MaterialActivity.events({
    'click #new-state-btn': function (e, tmpl) {
        document.querySelector("#new-state-dialog").toggle();
    }

});

Template.MaterialActivity.helpers({
    lists: function () {
        return this.states;
    },
    tasks: function () {
        return this.tasks;
    },
    model: function() {
        var model = {};
        model.id = this._id;
        model.description = this.description;
        model.teamId = this.team;
        
        return EJSON.stringify(model);
    }
});

/*****************************************************************************/
/* MaterialActivity: Lifecycle Hooks */
/*****************************************************************************/
Template.MaterialActivity.created = function () {
};

Template.MaterialActivity.rendered = function () {
    // Selector pour l'evenement de suppression d'un etat
    document.querySelector('tw-activity').addEventListener('delete-activity', function (e) {
        console.log(e.type, e.detail.activityId); 
        
        Meteor.call('deleteActivity', e.detail.activityId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to delete the activity.", error);
            } else {
                emitNotification("Activity deleted.");
            }
        });
    });
    
    // Selector pour l'evenement de suppression d'un etat
    document.querySelector('tw-activity').addEventListener('delete-list', function (e) {
        console.log(e.type, e.detail.listId); 
      
        Meteor.call('removeState', e.detail.listId,  e.detail.activityId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to delete the state.", error);
            } else {
                emitNotification("State deleted.");
            }
        });
    });
    
    // Selector pour l'evenement de suppression d'un etat
    document.querySelector('tw-activity').addEventListener('add-list', function (e) {
        console.log(e.type, e.detail.activityId); 
        
        Meteor.call('addState', e.detail.listLabel, e.detail.activityId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to add a list.", error);
            } else {
                emitNotification("List added.");
            }
        });
    });
    
    // Selector pour l'evenement de suppression d'un etat
    document.querySelector('tw-activity').addEventListener('add-task', function (e) {
        console.log(e.type, e.detail.listId); 
        
        Meteor.call('addTask', e.detail.taskLabel, e.detail.activityId, e.detail.listId, function (error, result) {
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