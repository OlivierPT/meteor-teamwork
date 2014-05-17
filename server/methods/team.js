/*****************************************************************************/
/* Team Methods */
/*****************************************************************************/

Meteor.methods({

  'createTeam': function (name, description) {
      console.log("MethodCall : createTeam - name = "+name);
      Team.insert({name: name, description: description, owner: Meteor.userId(), members: [Meteor.userId()]});
      console.log("Team created");
    },
    
    'updateTeam': function (team) {
      console.log("MethodCall : updateTeamInfos - id = "+team._id);
      Team.update({_id: team._id}, team);
      console.log("Team updated");
    },
    
    'addMemberWithId': function (teamId, userId) {
      console.log("MethodCall : addMember - userId = "+userId);
      // Using the userId for the link in the team
      Team.update({_id: teamId},{$push: {members: userId}});
      console.log("Team memeber added");
    },

    'addMemberWithEmail': function (teamId, userEmail) {
      console.log("MethodCall : addMember - userEmail = "+userEmail);
      // First finding the Id from the UserProfile collection
      var userProfile = UserProfile.findOne({email: userEmail});
      console.log("User found - userId = "+userProfile.userId);
      // Using the userId for the link in the team
      Team.update({_id: teamId},{$push: {members: userProfile.userId}});
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
