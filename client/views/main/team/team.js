/*****************************************************************************/
/* Team: Event Handlers and Helpers */
/*****************************************************************************/
Template.Team.events({
    
       'click #createTeamBtn': function (e) {
           var name = $("#name").val();
           var description = $("#description").val();
           
           Meteor.call('createTeam', name, description);
       }
     
});

Template.Team.helpers({
    teams: function() {
        return Team.find();
    }

});

/*****************************************************************************/
/* Team: Lifecycle Hooks */
/*****************************************************************************/
Template.Team.created = function() {
};

Template.Team.rendered = function() {
};

Template.Team.destroyed = function() {
};
