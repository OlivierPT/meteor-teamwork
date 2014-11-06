/*****************************************************************************/
/* Menu: Event Handlers and Helpers */
/*****************************************************************************/
Template.Menu.events({
});


Template.Menu.helpers({
    activities: function () {
        return Activity.find();
    },
});

Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function (event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        Router.go('profile');
    }
});

Template.CreateActivity.events({
    'click #createActivityBtn': function () {
        var name = $('input#activityName').val();
        var description = $('input#activityDescription').val();
        var teamValue = $('#activityTeamSelect').val();

        // Controles
        check(name, NonEmptyString);
        if (!description) {
            description = "";
        }

        Meteor.call('createActivity', name, teamValue, description);

        // Reset the input
        $('input#activityName').val(undefined);
        $('input#activityDescription').val(undefined);
        $('#activityTeamSelect').val("new");

        // Fermeture de la fenetre modal
        $('#createActivityModal').modal('hide');
    }
});

Template.CreateActivity.helpers({
    newActivity: function () {
        var activity = new Object();
        return activity;
    }
});

/*****************************************************************************/
/* Menu: Lifecycle Hooks */
/*****************************************************************************/
Template.Menu.created = function () {
};

Template.Menu.rendered = function () {
};

Template.Menu.destroyed = function () {
};
