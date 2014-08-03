/*****************************************************************************/
/* Profile: Event Handlers and Helpers */
/*****************************************************************************/
Template.Profile.events({
  'click #saveProfileBtn': function(event) {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname"). val();      
        
        var profile = new Object();
        profile.firstname = firstname;
        profile.lastname = lastname;
        
        Meteor.call('updateUserProfile', profile);
    }
});

Template.Profile.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Profile: Lifecycle Hooks */
/*****************************************************************************/
Template.Profile.created = function () {
};

Template.Profile.rendered = function () {
};

Template.Profile.destroyed = function () {
};
