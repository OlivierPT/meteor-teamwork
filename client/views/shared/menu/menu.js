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

/*****************************************************************************/
/* Menu: Lifecycle Hooks */
/*****************************************************************************/
Template.Menu.created = function () {
};

Template.Menu.rendered = function () {
};

Template.Menu.destroyed = function () {
};
