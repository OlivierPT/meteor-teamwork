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
Meteor.publish('userActivities', function() {
    if (this.userId) {
        var userTeams = Team.find({members: this.userId}, {reactive: true});
        var teamIds = userTeams.map(function(p) {
            return p._id
        });
        console.log("PublishCollection : userActivities - userId = " + this.userId+" teams authorized = "+teamIds);
        return Activity.find({team: {$in: teamIds}});
    }
});

Activity.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    }
});
Activity.deny({
    insert: function(userId, doc) {
        return false;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return false;
    },
    remove: function(userId, doc) {
        return false;
    }
});
