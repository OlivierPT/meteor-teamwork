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
    return Activities.find({teamId: {$in: userTeamsId}});
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


// Let MongoDB ensure that a member is not included twice in the same board
    // Meteor.startup(function() {
    //   Activities._collection._ensureIndex({
    //         '_id': 1,
    //         'members.userId': 1
    //     }, { unique: true });
    // });

// SERVER HOOKS

    // Genesis: the first activity of the newly created board
    Activities.after.insert(function(userId, doc) {
        Logs.insert({
            type: 'board',
            logTypeId: doc._id,
            logType: "createBoard",
            activityId: doc._id,
            userId: userId
        });
    });

    // If the user remove one label from a board, we cant to remove reference of
    // this label in any card of this board.
    // Activities.after.update(function(userId, doc, fieldNames, modifier) {
    //     if (! _.contains(fieldNames, 'labels') ||
    //         ! modifier.$pull ||
    //         ! modifier.$pull.labels ||
    //         ! modifier.$pull.labels._id)
    //         return;
    //
    //     var removedLabelId = modifier.$pull.labels._id;
    //     Cards.update(
    //         { boardId: doc._id },
    //         {
    //             $pull: {
    //                 labels: removedLabelId
    //             }
    //         },
    //         { multi: true }
    //     );
    // });
    //
    // // Add a new activity if we add or remove a member to the board
    // Activities.after.update(function(userId, doc, fieldNames, modifier) {
    //     if (! _.contains(fieldNames, 'members'))
    //         return;
    //
    //     // Say hello to the new member
    //     if (modifier.$push && modifier.$push.members) {
    //         var memberId = modifier.$push.members.userId;
    //         Activities.insert({
    //             type: 'member',
    //             activityType: "addBoardMember",
    //             boardId: doc._id,
    //             userId: userId,
    //             memberId: memberId
    //         });
    //     }
    //
    //     // Say goodbye to the former member
    //     if (modifier.$pull && modifier.$pull.members) {
    //         var memberId = modifier.$pull.members.userId;
    //         Activities.insert({
    //             type: 'member',
    //             activityType: "removeBoardMember",
    //             boardId: doc._id,
    //             userId: userId,
    //             memberId: memberId
    //         });
    //     }
    // });
