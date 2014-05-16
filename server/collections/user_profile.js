/*
 * Add query methods like this:
 *  UserProfile.findPublic = function () {
 *    return UserProfile.find({is_public: true});
 *  }
 */

/**
 * Return all the teams that the user is involved to
 * @param {id} userId : the userId of the current user
 */
Meteor.publish('userProfiles', function () {
  return UserProfile.find();
});

UserProfile.allow({
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

UserProfile.deny({
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
