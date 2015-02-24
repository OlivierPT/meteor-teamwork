/*****************************************************************************/
/* MaterialProfile: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MaterialProfile.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.MaterialProfile.helpers({
    email: function () {
        if (this.emails && this.emails.length > 0) {
            return this.emails[0].address;
        }
        return "";
    }

});

/*****************************************************************************/
/* MaterialProfile: Lifecycle Hooks */
/*****************************************************************************/
Template.MaterialProfile.created = function () {
};

Template.MaterialProfile.rendered = function () {
    // Selector for updating an activty
    document.querySelector('.content').addEventListener('save-user', function (e) {
        console.log(e.type, e.detail.objectId);

        Meteor.call('updateUserProfile', e.detail.objectId, e.detail.datas.email, e.detail.datas.firstname, e.detail.datas.lastname, function (error, result) {
            // identify the error           
            if (error) {
                Notification.emitError("Impossible to update the user profile.", error);
            } else {
                Notification.emitNotification("User profil updated succesfully.");
            }
        });
    });
};

Template.MaterialProfile.destroyed = function () {
};