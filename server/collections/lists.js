/**
 * This files define all the access to the
 * Lists collection : Publish methodes and access rights
 *
 */


/**
 * Return lists belonging to an activity
 * @param {activityId} : the id of the activity
 */
Meteor.publish('lists', function (activityId) {
    console.log("Out PublishCollection : lists of the current activity = " + activityId);
    return Lists.find({activityId: activityId, archived: false});
});


Lists.allow({
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

Lists.deny({
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


// Let MongoDB ensure that a member is not included twice in the same board
    // Meteor.startup(function() {
    //   Activities._collection._ensureIndex({
    //         '_id': 1,
    //         'members.userId': 1
    //     }, { unique: true });
    // });

// SERVER HOOKS
Lists.after.insert(function(userId, doc) {
    console.log("Activities.after.insert : " + doc.label);
    Logs.insert({
        type: 'list',
        logTypeId: doc._id,
        logType: "createList",
        listId: doc._id,
        userId: userId
    });
});
