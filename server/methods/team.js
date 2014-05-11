/*****************************************************************************/
/* Team Methods */
/*****************************************************************************/

Meteor.methods({

  'createTeam': function (name) {
      console.log("MethodCall : createTeam - name = "+name);
      Team.insert({name: name, creator: Meteor.userId(), {$push: {members: Meteor.userId()});
      console.log("Team created");
    },

    'addMember': function (teamId, userId) {
      Team.update({_id: teamId},{$push: {members: userId});
    },

    'removeMember': function (teamId, userId) {
      Team.update({_id: teamId},{$pull: {members: userId});
    },

    'deleteTeam': function (teamId) {
      Team.remove({_id: teamId});
    }



});
