Meteor.publish("allUsers", function () {
  if (this.userId) {
    return Meteor.users.find();
  } else {
    this.ready();
  }
});


