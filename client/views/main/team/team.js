/*****************************************************************************/
/* Team: Event Handlers and Helpers */
/*****************************************************************************/
Template.Team.events({
    'click input[name="isMemberCheck"]': function(event) {
        var val = event.currentTarget.value;
        var memberId = event.currentTarget.getAttribute("data-member-id");
        var team = Session.get("team");
        if (val === "true") {
            Meteor.call('addMember', team._id, memberId);
        } else {
            Meteor.call('removeMember', team._id, memberId);
        }

    },
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
        return Meteor.users.find();
    },
    firstEmail: function() {
        return this.emails[0].address;
    },
    teamId: function() {
        Session.set("teamId", this._id)
    },
    isMember: function(currentUser) {
        var team = Session.get("team");
        if (team) {
            return _.contains(team.members, currentUser) ? 'checked' : '';
        } else {
            return "";
        }
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
