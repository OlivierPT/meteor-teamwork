/*****************************************************************************/
/* UserProfile Methods */
/*****************************************************************************/

Meteor.methods({
    'updateUserProfile': function(userId, email, firstname, lastname) {
        console.log("MethodCall : updateUserProfile - id = " + userId);
        if (Meteor.userId() != userId) {
            throw new Meteor.Error("not-authorized", "The user must the owner of the profile.");
        }
        
        //UserProfile.update({_id: userProfile._id}, userProfile);
        Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.firstname': firstname, 'profile.lastname': lastname }} );
        console.log("User.profile updated");
    }
});
