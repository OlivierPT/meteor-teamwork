/*****************************************************************************/
/* Profile: Event Handlers and Helpers */
/*****************************************************************************/
Template.Profile.events({
  'click #saveProfileBtn': function(event) {
        var nickName = $("#nickName").val();
        var firstName = $("#firstName").val();
        var name = $("#name"). val();
        var id = $("#idProfile").val();
        
        var profile = UserProfile.findOne({_id: id});
        profile.nickName = nickName;
        profile.firstName = firstName;
        profile.name = name;
                
        Meteor.call('updateProfile', profile);
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
