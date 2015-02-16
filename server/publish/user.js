Meteor.publish("userMembers", function (teamId) {
  if (!this.userId) {
        this.ready();
        return;
    }
    
    var team = Team.findOne({_id: teamId});
    
    console.log("Out PublishCollection : userMembers - teamId = " + teamId + " - teamMEmbers = "+ team.members);
    return Meteor.users.find({_id: {$in: team.members}});

});


Meteor.publish("allUsers", function () {
  if (this.userId) {
    return Meteor.users.find();
  } else {
    this.ready();
  }
});

