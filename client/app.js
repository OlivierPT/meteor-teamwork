/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/

Tracker.autorun(function () {
    if (Meteor.userId()) {
        Meteor.subscribe('allUsers');
        Meteor.subscribe('teams');

        // If number of team changes
        var userTeamsId = Team.find().map(function (doc) {
            return doc._id
        });
        if (userTeamsId.length > 0) {
            Meteor.subscribe('activities', userTeamsId);
        }
    }

});



