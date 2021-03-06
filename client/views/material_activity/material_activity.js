/*****************************************************************************/
/* MaterialActivity: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MaterialActivity.events({
    'click #new-state-btn': function (e, tmpl) {
        document.querySelector("#new-state-dialog").toggle();
    }

});

Template.MaterialActivity.helpers({
    paramId: function() {
      console.log("Get the id from params");
      return this;
    }
    // lists: function () {
    //     return this.states;
    // },
    // tasks: function () {
    //     return this.tasks;
    // },
    // comments: function () {
    //     return this.comments;
    // },
    // taskHasDetail: function() {
    //     return (this.detail && this.detail.length > 1);
    // },
    // taskHasComments: function() {
    //     return (this.comments && this.comments.length > 0);
    // },
    // taskHasDueDate: function() {
    //     return (this.dueDate && this.dueDate.length > 1);
    // },
    // taskIsAssigned: function() {
    //     return (this.assignedTo && this.assignedTo.length > 1);
    // },
    // taskHasCategory: function() {
    //     return false;
    // },
    // members: function() {
    //     return Teams.findOne({_id: this.team}).members;
    // }
});

/*****************************************************************************/
/* MaterialActivity: Lifecycle Hooks */
/*****************************************************************************/
Template.MaterialActivity.created = function () {
};

Template.MaterialActivity.rendered = function () {
    // Selector for updating an activty
    // document.querySelector('tw-activity').addEventListener('save-activity', function (e) {
    //     console.log(e.type, e.detail.objectId);
    //
    //     Meteor.call('editActivity', e.detail.objectId, e.detail.datas.name, e.detail.datas.description, function (error, result) {
    //         // identify the error
    //         if (error) {
    //             Notification.emitError("Impossible to update the activity.", error);
    //         } else {
    //             Notification.emitNotification("Activity updated.");
    //         }
    //     });
    // });
    //
    // // Selector for updating a task
    // document.querySelector('tw-activity').addEventListener('save-task', function (e) {
    //     console.log(e.type, e.detail.objectId);
    //
    //     Meteor.call('storeTask', e.detail.datas.activityId, e.detail.datas.listId,
    //         e.detail.objectId, e.detail.datas.label, e.detail.datas.detail,
    //         e.detail.datas.complexity, e.detail.datas.value, function (error, result) {
    //         // identify the error
    //         if (error) {
    //             Notification.emitError("Impossible to update the activity.", error);
    //         } else {
    //             Notification.emitNotification("Activity updated.");
    //         }
    //     });
    // });
    //
    // // Selector for updating a task
    // document.querySelector('tw-activity').addEventListener('add-comment', function (e) {
    //     console.log(e.type, e.detail.objectId);
    //
    //     Meteor.call('addCommentToTask', e.detail.datas.activityId, e.detail.datas.listId,
    //         e.detail.objectId, e.detail.datas.comment, function (error, result) {
    //         // identify the error
    //         if (error) {
    //             Notification.emitError("Impossible to update the activity.", error);
    //         } else {
    //             Notification.emitNotification("Comment stored.");
    //         }
    //     });
    // });
    //
    // // Selector pour l'evenement de suppression d'une activity
    // document.querySelector('tw-activity').addEventListener('delete-activity', function (e) {
    //     console.log(e.type, e.detail.activityId);
    //
    //     Meteor.call('deleteActivity', e.detail.activityId, function (error, result) {
    //         // identify the error
    //         if (error) {
    //             Notification.emitError("Impossible to delete the activity.", error);
    //         } else {
    //             Notification.emitNotification("Activity deleted.");
    //         }
    //     });
    // });
    //
    // // Selector pour l'evenement de suppression d'un etat
    // document.querySelector('tw-activity').addEventListener('delete-list', function (e) {
    //     console.log(e.type, e.detail.listId);
    //
    //     Meteor.call('removeState', e.detail.listId,  e.detail.activityId, function (error, result) {
    //         // identify the error
    //         if (error) {
    //             Notification.emitError("Impossible to delete the state.", error);
    //         } else {
    //             Notification.emitNotification("State deleted.");
    //         }
    //     });
    // });
    //
    // // Selector pour l'evenement de suppression d'un etat
    // document.querySelector('tw-activity').addEventListener('add-list', function (e) {
    //     console.log(e.type, e.detail.activityId);
    //
    //     Meteor.call('addState', e.detail.listLabel, e.detail.activityId, function (error, result) {
    //         // identify the error
    //         if (error) {
    //             Notification.emitError("Impossible to add a list.", error);
    //         } else {
    //             Notification.emitNotification("List added.");
    //         }
    //     });
    // });
    //
    // // Selector pour l'evenement de suppression d'un etat
    // document.querySelector('tw-activity').addEventListener('add-task', function (e) {
    //     console.log(e.type, e.detail.listId);
    //
    //     Meteor.call('addTask', e.detail.taskLabel, e.detail.activityId, e.detail.listId, function (error, result) {
    //         // identify the error
    //         if (error) {
    //             Notification.emitError("Impossible to add a task.", error);
    //         } else {
    //             Notification.emitNotification("Task added.");
    //         }
    //     });
    // });

};

Template.MaterialActivity.destroyed = function () {
};
