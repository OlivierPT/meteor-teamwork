/*
 * Add query methods like this:
 *  Team.findPublic = function () {
 *    return Team.find({is_public: true});
 *  }
 */
/**
 * Return all the teams that the user is involved to
 * @param {id} userId : the userId of the current user
 */
Meteor.publish('teams', function () {
    if (!this.userId) {
        this.ready();
        return;
    }
    console.log("PublishCollection : teams - userId = " + this.userId);
    return Teams.find({members: this.userId});
});


Teams.allow({
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

Teams.deny({
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
