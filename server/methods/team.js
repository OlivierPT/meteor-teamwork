/*****************************************************************************/
/* Team Methods */
/*****************************************************************************/

Meteor.methods({

  'createTeam': function (name, description) {
      console.log("MethodCall : createTeam - name = "+name);
      Team.insert({name: name, description: description, creator: Meteor.userId(), members: [Meteor.userId()]});
      console.log("Team created");
    },

    'addMember': function (teamId, userId) {
      console.log("MethodCall : addMember - userId = "+userId);
      Team.update({_id: teamId},{$push: {members: userId}});
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
