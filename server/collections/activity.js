/**
 * This files define all the access to the
 * Activity collection : Publish methodes and access rights
 *
 */

/**
 * Return all the activities
 *
 */
Meteor.publish('allActivities', function () {
  return Activity.find();
});

/**
 * Return all the activities that the users can access
 * @param {id} userId : the userId of the current user
 */
Meteor.publish('userActivities', function (userId) {
  return Activity.find({user : userId});
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
