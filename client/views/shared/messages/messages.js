/*****************************************************************************/
/* Messages: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Messages.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.Messages.helpers({
    notifications: function () {
        return Notifications.find();
    }
});

Template.Message.helpers({   
    gravity: function() {
        if (this.gravity == 'OK') {
            return "alert-success"
        } else if (this.gravity == 'INFO') {
            return "alert-info"
        } else if (this.gravity == 'WARN') {
             return "alert-warning";
        } else if (this.gravity == 'ERROR') {
            return "alert-danger";
        }
    }
});

/*****************************************************************************/
/* Messages: Lifecycle Hooks */
/*****************************************************************************/
Template.Messages.created = function () {
};

Template.Messages.rendered = function () {
};

Template.Messages.destroyed = function () {
};