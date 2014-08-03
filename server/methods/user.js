/*****************************************************************************/
/* UserProfile Methods */
/*****************************************************************************/

Meteor.methods({
    'updateUserProfile': function(profile) {
        console.log("MethodCall : updateUserProfile - id = " + Meteor.userId());
        //UserProfile.update({_id: userProfile._id}, userProfile);
        Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.firstname': profile.firstname, 'profile.lastname': profile.lastname }} );
        console.log("User.profile updated");
    }
});
