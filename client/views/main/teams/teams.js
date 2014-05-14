/*****************************************************************************/
/* Team: Event Handlers and Helpers */
/*****************************************************************************/
Template.Teams.events({
    'click #createTeamBtn': function(e) {
        var name = $("#name").val();
        var description = $("#description").val();

        Meteor.call('createTeam', name, description);
    },
    
    'click a[name="deleteTeamBtn"]': function(event) {
        var teamId = $(event.currentTarget).attr("data-team-id");
        
        Meteor.call('deleteTeam', teamId);
    }

});

Template.Teams.helpers({
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
