
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
Template.Team.settings = function() {
    return {
        position: "bottom",
        limit: 5,
        rules: [
            {
                collection: UserProfile,
                field: "email",
                matchAll: true,
                template: Template.UserPill
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

Template.UserPill.helpers({
    labelClass: function() {
        if (this._id === Meteor.userId()) {
            return "label-warning";
        } else if (this.profile.online === true) {
            return "label-success";
        } else {
            return "";
        }
    }
});
/*****************************************************************************/
/* Team: Lifecycle Hooks */
/*****************************************************************************/
Template.Team.created = function() {
    console.log("Team memeber added");
};
Template.Team.rendered = function() {
    var checkBoxes = this.findAll("input[name='isMemberCheck']");
    console.log("Team memeber added");
};
Template.Team.destroyed = function() {
    console.log("Team memeber added");
};
