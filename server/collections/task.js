/**
 * This files define all the access to the
 * Task collection : Publish methodes and access rights
 *
 */

/**
 * Return all the tasks for an Activity
 * @param {id} activityId
 *
 */
Meteor.publish('tasksByActivity', function (activityId) {
  return Task.find({activity : activityId}, {sort: {position: 1}});
});


Task.allow({
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

Task.deny({
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
