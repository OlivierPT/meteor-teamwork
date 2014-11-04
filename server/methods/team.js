/*****************************************************************************/
/* Team Methods */
/*****************************************************************************/

Meteor.methods({

  'createTeam': function (name, description) {
      console.log("MethodCall : createTeam - name = "+name);
      var teamId = Team.insert({name: name, description: description, owner: Meteor.userId(), members: [Meteor.userId()]});
      console.log("Team created : "+teamId);
      return teamId;
    },
    
    'updateTeam': function (team) {
      console.log("MethodCall : updateTeamInfos - id = "+team._id);
      Team.update({_id: team._id}, team);
      console.log("Team updated");
    },

    'addMemberWithUsername': function (teamId, username) {
      console.log("MethodCall : addMember - username = '"+username+"'");
      // First finding the Id from the UserProfile collection
      var user = Meteor.users.findOne({username: username});
      console.log("User found - userId = "+user._id);
      // Using the userId for the link in the team
      Team.update({_id: teamId},{$push: {members: user._id}});
      Activity.update({team: teamId}, {$set: {teamUpdate: new Date()}});
      console.log("Team memeber added");
    },

    'removeMember': function (teamId, userId) {
      console.log("MethodCall : removeMember - userId = "+userId);
      Team.update({_id: teamId},{$pull: {members: userId}});
      console.log("Team member removed");
    },

    'deleteTeam': function (teamId) {
      console.log("MethodCall : removeMember - teamId = "+teamId);
      Team.remove({_id: teamId});
      console.log("Team deleted");
    }



});
