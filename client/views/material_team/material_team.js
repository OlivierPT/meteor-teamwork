/*****************************************************************************/
/* MaterialTeam: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MaterialTeam.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.MaterialTeam.helpers({
    members: function () {
        return Meteor.users.find({_id: {$in: this.members}});
        //return Meteor.users.find();
    }
});

/*****************************************************************************/
/* MaterialTeam: Lifecycle Hooks */
/*****************************************************************************/
Template.MaterialTeam.created = function () {
};

Template.MaterialTeam.rendered = function () {
    // Selector for ADD-MEMBER
    document.querySelector('tw-team').addEventListener('add-member', function (e) {
        console.log(e.type, e.detail.teamId); 
                
        Meteor.call('addMemberWithUsername', e.detail.teamId, e.detail.username, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible to add the member.", error);
            } else {
                Notification.emitNotification("Member added.");
            }
        });
    });
    
    // Selector for DELETE-TEAM
    document.querySelector('tw-team').addEventListener('delete-team', function (e) {
        console.log(e.type, e.detail.teamId); 
                
        Meteor.call('deleteTeam', e.detail.teamId, e.detail.username, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible to add the member.", error);
            } else {
                Notification.emitNotification("Member added.");
            }
        });
    });
    
    // Selector for DELETE-TEAM
    document.querySelector('tw-team').addEventListener('save-team', function (e) {
        console.log(e.type, e.detail.objectId); 
        
        Meteor.call('updateTeam', e.detail.objectId, e.detail.datas.name, e.detail.datas.description, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible update team.", error);
            } else {
                Notification.emitNotification("Team updated successfully.");
            }
        });
    });
};

Template.MaterialTeam.destroyed = function () {
};