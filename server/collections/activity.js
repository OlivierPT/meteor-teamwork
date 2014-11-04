/**
 * This files define all the access to the
 * Activity collection : Publish methodes and access rights
 *
 */


/**
 * Return all the activities that the users can access
 * @param {id} userId : the userId of the current user
 */
//Meteor.reactivePublish('userActivities', function() {
Meteor.publish('activities', function (userTeamIds) {
    console.log("Out PublishCollection : activities for teams = " + userTeamIds);
    return Activity.find({team: {$in: userTeamIds}});

});


Activity.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});
Activity.deny({
    insert: function (userId, doc) {
        return false;
    },
    update: function (userId, doc, fieldNames, modifier) {
        return false;
    },
    remove: function (userId, doc) {
        return false;
    }
});
