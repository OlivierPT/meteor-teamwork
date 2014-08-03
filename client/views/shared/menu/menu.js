/*****************************************************************************/
/* Menu: Event Handlers and Helpers */
/*****************************************************************************/
Template.Menu.events({
    'click #createActivityBtn': function() {
        var name = $('#createActivityForm input#activityName').val();
        Meteor.call('createActivity', name);
        // Reset the input
        $('#createActivityForm input#activityName').val("");
    }
});

Template.Menu.helpers({
    activities: function() {
        return Activity.find();
    }
});

Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        //Router.go('profileEdit');
        Router.go('Profile');
    }
});

/*****************************************************************************/
/* Menu: Lifecycle Hooks */
/*****************************************************************************/
Template.Menu.created = function() {
};

Template.Menu.rendered = function() {
};

Template.Menu.destroyed = function() {
};
