/*****************************************************************************/
/* UserProfile Methods */
/*****************************************************************************/

Meteor.methods({
    'updateProfile': function(userProfile) {
        console.log("MethodCall : updateProfile - id = " + userProfile._id);
        UserProfile.update({_id: userProfile._id}, userProfile);
        console.log("UserProfile updated");
    }
});
