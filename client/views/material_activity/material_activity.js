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
    taskHasDetail: function() {
        return (this.detail && this.detail.length > 1);
    },
    taskHasComments: function() {
        return (this.comments && this.comments.length > 1);
    },
    taskHasDueDate: function() {
        return (this.dueDate && this.dueDate.length > 1);
    },
    taskIsAssigned: function() {
        return (this.assignedTo && this.assignedTo.length > 1);
    },
    taskHasCategory: function() {
        return false;
    }
});

/*****************************************************************************/
/* MaterialActivity: Lifecycle Hooks */
/*****************************************************************************/
Template.MaterialActivity.created = function () {
};

Template.MaterialActivity.rendered = function () {
    // Selector for updating an activty
    document.querySelector('tw-activity').addEventListener('save-activity', function (e) {
        console.log(e.type, e.detail.objectId); 
        
        var name = "";
        var description = "";
        for (i = 0; i < e.detail.datas.length; i++) {
            if (e.detail.datas[i].name === "name") {
                name = e.detail.datas[i].value;
            }
            if (e.detail.datas[i].name === "description") {
                description = e.detail.datas[i].value;
            }
        }
        
        Meteor.call('editActivity', e.detail.objectId, name, description, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible to update the activity.", error);
            } else {
                Notification.emitNotification("Activity updated.");
            }
        });
    });
    
    // Selector for updating a task
    document.querySelector('tw-activity').addEventListener('save-task', function (e) {
        console.log(e.type, e.detail.objectId); 
        
        var name = "";
        var description = "";
        for (i = 0; i < e.detail.datas.length; i++) {
            if (e.detail.datas[i].name === "name") {
                name = e.detail.datas[i].value;
            }
            if (e.detail.datas[i].name === "description") {
                description = e.detail.datas[i].value;
            }
        }
        
        Meteor.call('storeTask', e.detail.objectId, name, description, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible to update the activity.", error);
            } else {
                Notification.emitNotification("Activity updated.");
            }
        });
    });
    
    // Selector pour l'evenement de suppression d'une activity
    document.querySelector('tw-activity').addEventListener('delete-activity', function (e) {
        console.log(e.type, e.detail.activityId); 
        
        Meteor.call('deleteActivity', e.detail.activityId, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible to delete the activity.", error);
            } else {
                Notification.emitNotification("Activity deleted.");
            }
        });
    });
    
    // Selector pour l'evenement de suppression d'un etat
    document.querySelector('tw-activity').addEventListener('delete-list', function (e) {
        console.log(e.type, e.detail.listId); 
      
        Meteor.call('removeState', e.detail.listId,  e.detail.activityId, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible to delete the state.", error);
            } else {
                Notification.emitNotification("State deleted.");
            }
        });
    });
    
    // Selector pour l'evenement de suppression d'un etat
    document.querySelector('tw-activity').addEventListener('add-list', function (e) {
        console.log(e.type, e.detail.activityId); 
        
        Meteor.call('addState', e.detail.listLabel, e.detail.activityId, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible to add a list.", error);
            } else {
                Notification.emitNotification("List added.");
            }
        });
    });
    
    // Selector pour l'evenement de suppression d'un etat
    document.querySelector('tw-activity').addEventListener('add-task', function (e) {
        console.log(e.type, e.detail.listId); 
        
        Meteor.call('addTask', e.detail.taskLabel, e.detail.activityId, e.detail.listId, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible to add a task.", error);
            } else {
                Notification.emitNotification("Task added.");
            }
        });
    });

};

Template.MaterialActivity.destroyed = function () {
};