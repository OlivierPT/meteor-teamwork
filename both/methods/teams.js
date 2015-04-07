/*****************************************************************************/
/* Team Methods */
/*****************************************************************************/

Meteor.methods({

  'createTeam': function (name, description) {
      console.log("MethodCall : createTeam - name = "+name);
      var teamId = Teams.insert({name: name, description: description, owner: Meteor.userId(), members: [Meteor.userId()]});
      console.log("Team created : "+teamId);
      return teamId;
    },

    'updateTeam': function (teamId, name, description) {
      console.log("MethodCall : updateTeamInfos - id = "+teamId);
      Teams.update({_id: teamId}, {$set: {name: name, description: description, teamUpdate: new Date()}});
      console.log("Team updated");
    },

    'addMemberWithUsername': function (teamId, username) {
      console.log("MethodCall : addMember - username = '"+username+"'");
      // First finding the Id from the UserProfile collection
      var user = Meteor.users.findOne({username: username});
      console.log("User found - userId = "+user._id);
      // Using the userId for the link in the team
      Teams.update({_id: teamId},{$push: {members: user._id}});
      Activities.update({team: teamId}, {$set: {teamUpdate: new Date()}});
      console.log("Team memeber added");
    },

    'removeMember': function (teamId, userId) {
      console.log("MethodCall : removeMember - userId = "+userId);
      Teams.update({_id: teamId},{$pull: {members: userId}});
      console.log("Team member removed");
    },

    'deleteTeam': function (teamId) {
      console.log("MethodCall : removeMember - teamId = "+teamId);
      Teams.remove({_id: teamId});
      console.log("Team deleted");
    }



});
