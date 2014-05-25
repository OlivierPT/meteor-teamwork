
/*****************************************************************************/
/* Team: Event Handlers and Helpers */
/*****************************************************************************/
Template.Team.events({
    'click a[name="removeMember"]': function(event) {
        var val = event.currentTarget.value;
        var userId = event.currentTarget.getAttribute("data-user-id");
        var team = Session.get("team");

        Meteor.call('removeMember', team._id, userId);
        
        if (userId === Meteor.userId()) {
            console.log("Removing myself from the current team");
            Router.go('Teams');
        }
    },
    'click #addMember': function(event) {
        var memberEmail = $("#newMember").val();
        var team = Session.get("team");
        Meteor.call('addMemberWithEmail', team._id, memberEmail);
    },
    
    'click #saveTeamInfoBtn': function(event) {
        var teamName = $("#teamName").val();
        var teamDesc = $("#teamDescription").val();
        var team = Session.get("team");
        team.name = teamName;
        team.description = teamDesc;

        Meteor.call('updateTeam', team);
    }
});

Template.Team.userSuggestSetting = function() {
    return {
        position: "bottom",
        limit: 5,
        rules: [
            {
                collection: UserProfile,
                field: "email",
                matchAll: true,
                template: Template.TeamMemberSuggest
            }
        ]
    }
};

Template.Team.helpers({
    users: function() {
        var team = Session.get("team");
        return UserProfile.find({userId: {$in: team.members}});
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
