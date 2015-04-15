/**
 * This files define all the access to the
 * Lists collection : Publish methodes and access rights
 *
 */


/**
 * Return lists belonging to an activity
 * @param {activityId} : the id of the activity
 */
Meteor.publish('tasks', function (activityId) {
    console.log("Out PublishCollection : tasks of the current activity = " + activityId);
    return Tasks.find({activityId: activityId, archived: false});
});


Tasks.allow({
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

Tasks.deny({
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


// SERVER HOOKS
Tasks.after.insert(function(userId, doc) {
  Logs.insert({
    type: 'task',
    logType: "createTask",
    activityId: doc.activityId,
    listId: doc.listId,
    taskId: doc._id,
    userId: userId
  });
});

// New activity for card (un)archivage
Tasks.after.update(function(userId, doc, fieldNames, modifier) {
  if (_.contains(fieldNames, 'archived')) {
    if (doc.archived) {
      Logs.insert({
        type: 'task',
        logType: "archivedTask",
        activityId: doc.activityId,
        listId: doc.listId,
        taskId: doc._id,
        userId: userId
      });
    } else {
      Logs.insert({
        type: 'task',
        logType: "restoredTask",
        activityId: doc.activityId,
        listId: doc.listId,
        taskId: doc._id,
        userId: userId
      });
    }
  }
});

// New activity for card moves
Tasks.after.update(function(userId, doc, fieldNames, modifier) {
  var oldListId = this.previous.listId;
  if (_.contains(fieldNames, "listId") && doc.listId !== oldListId) {
    Logs.insert({
      type: 'task',
      logType: "moveTask",
      listId: doc.listId,
      oldListId: oldListId,
      activityId: doc.activityId,
      taskId: doc._id,
      userId: userId
    });
  }
});

// Add a new activity if we add or remove a member to the card
Tasks.before.update(function(userId, doc, fieldNames, modifier) {
  if (! _.contains(fieldNames, 'members'))
  return;

  // Say hello to the new member
  if (modifier.$addToSet && modifier.$addToSet.members) {
    var memberId = modifier.$addToSet.members;
    if (!_.contains(doc.members, memberId)) {
      Logs.insert({
        type: 'task',
        logType: "joinMember",
        activityId: doc.activityId,
        taskId: doc._id,
        userId: userId,
        memberId: memberId
      });
    }
  }

  // Say goodbye to the former member
  if (modifier.$pull && modifier.$pull.members) {
    var memberId = modifier.$pull.members;
    Logs.insert({
      type: 'task',
      logType: "unjoinMember",
      activityId: doc.activityId,
      taskId: doc._id,
      userId: userId,
      memberId: memberId
    });
  }
});

// Remove all activities associated with a card if we remove the card
Tasks.after.remove(function(userId, doc) {
  Logs.remove({
    taskId: doc._id
  });
});

TaskComments.after.insert(function(userId, doc) {
  Logs.insert({
    type: 'comment',
    logType: "addComment",
    activityId: doc.activityId,
    taskId: doc.taskId,
    commentId: doc._id,
    userId: userId
  });
});

TaskComments.after.remove(function(userId, doc) {
  var log = Logs.findOne({ commentId: doc._id });
  if (log) {
    Logs.remove(log._id);
  }
});
