
/*****************************************************************************/
/* Team: Event Handlers and Helpers */
/*****************************************************************************/
Template.Team.events({
    'click a[name="removeMember"]': function(event) {
        var val = event.currentTarget.value;
        var userId = event.currentTarget.getAttribute("data-user-id");
        var team = Session.get("team");

        Meteor.call('removeMember', team._id, userId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to remove the member.", error);
            } else {
                emitNotification("Member removed from team.");                
            }
        });
        
        if (userId === Meteor.userId()) {
            emitNotification("You are not anymore a part of the current team.");
            console.log("Removing myself from the current team");
            Router.go('Teams');
        }
    },
    'click #addMember': function(event) {
        var username = $("#newMember").val();
        var team = Session.get("team");
        Meteor.call('addMemberWithUsername', team._id, username, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to add the member.", error);
            } else {
                emitNotification("Member added to the team.");                
            }
        });
    },
    
    'click #saveTeamInfoBtn': function(event) {
        var teamName = $("#teamName").val();
        var teamDesc = $("#teamDescription").val();
        var team = Session.get("team");
        team.name = teamName;
        team.description = teamDesc;

        Meteor.call('updateTeam', team, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to update the team.", error);
            } else {
                emitNotification("Team updated.");                
            }
        });
    }
});

Template.Team.userSuggestSetting = function() {
    return {
        position: "bottom",
        limit: 5,
        rules: [
            {
                collection: Meteor.users,
                field: "username",
                matchAll: true,
                template: Template.TeamMemberSuggest
            }
        ]
    }
};

Template.Team.helpers({
    users: function() {
        var team = Session.get("team");
        return Meteor.users.find({_id: {$in: team.members}});
    }
});

Template.TeamMemberSuggest.helpers({
    labelClass: function() {
        if (this.userId === Meteor.userId()) {
            return "label-warning";
        } else {
            return "label-default";
        }
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
