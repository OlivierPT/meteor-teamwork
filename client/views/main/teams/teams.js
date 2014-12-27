/*****************************************************************************/
/* Team: Event Handlers and Helpers */
/*****************************************************************************/
Template.Teams.events({
    'click #createTeamBtn': function(e) {
        var name = $("#name").val();
        var description = $("#description").val();

        Meteor.call('createTeam', name, description, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to create the team.", error);
            } else {
                emitNotification("Team created.");                
            }
        });
        
        $("#name").val("");
        $("#description").val("");
        //$(event.currentTarget).
    },
    
    'click a[name="deleteTeamBtn"]': function(event) {
        var teamId = $(event.currentTarget).attr("data-team-id");
        
        Meteor.call('deleteTeam', teamId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to delete the team.", error);
            } else {
                emitNotification("Team deleted.");                
            }
        });
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
