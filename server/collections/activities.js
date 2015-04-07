/**
 * This files define all the access to the
 * Activity collection : Publish methodes and access rights
 *
 */


/**
 * Return all the activities that the users can access
 * @param {id} userId : the userId of the current user
 */
Meteor.publish('activities', function (nbTeams) {
    if (!this.userId) {
        this.ready();
        return;
    }
    var userTeamsId = Teams.find({members: this.userId}).map(function (doc) {
        return doc._id
    });
    console.log("Out PublishCollection : activities for teams = " + userTeamsId);
    return Activities.find({team: {$in: userTeamsId}});
});


Activities.allow({
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

Activities.deny({
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
