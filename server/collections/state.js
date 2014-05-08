/**
 * This files define all the access to the
 * Step collection : Publish methodes and access rights
 *
 */

/**
 * Return all the steps for an Activity
 * @param {id} activityId
 *
 */
Meteor.publish('stateByActivity', function (activityId) {
  return State.find({activity : activityId});
});


State.allow({
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

State.deny({
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
