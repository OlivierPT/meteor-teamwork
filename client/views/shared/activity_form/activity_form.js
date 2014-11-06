/*****************************************************************************/
/* ActivityForm: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.ActivityForm.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.ActivityForm.helpers({
    teams: function () {
        return Team.find();
    },
    selectedTeam: function () {
        var activity = Session.get("activity");
        if (activity) {
            var teamActivity = activity.team;
            if (teamActivity == this._id) {
                return "selected";
            }
        } else {
            return "";
        }
        ;
    },
    selectedTeamMembers: function (teamId) {
        var activity = Session.get("activity");
        if (activity) {
            var team = Team.findOne({_id: activity.team})
            return Meteor.users.find({_id: {$in: team.members}});
        } else {
            return [];
        }
    }
});

/*****************************************************************************/
/* ActivityForm: Lifecycle Hooks */
/*****************************************************************************/
Template.ActivityForm.created = function () {
};

Template.ActivityForm.rendered = function () {
};

Template.ActivityForm.destroyed = function () {
};