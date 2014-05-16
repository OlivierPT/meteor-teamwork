/*****************************************************************************/
/* User Publish Functions
/*****************************************************************************/

Meteor.publish('users', function () {
    return Meteor.users.find();
});

Meteor.publish('usersEmail', function () {
    var users = Meteor.users.find();
    // then extract those posts' userIds
    var usersEmails = users.map(function(p) { return {_id: p._id, email: p.emails.address} });
    console.log("usersEmails : "+ usersEmails);
    return usersEmails;
});
