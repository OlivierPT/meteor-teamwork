/*****************************************************************************/
/* TaskForm: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.TaskForm.events({
    'click button#addCommentBtn': function (event) {
        var comment = $('#comment').val();
        var currentTaskId = Session.get("selectedTaskId");
        var stateId = Session.get("selectedStateId");
        var activityId = Session.get("activity")._id;

        Meteor.call('addCommentToTask', activityId, stateId, currentTaskId, comment, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to add a comment.", error);
            } else {
                emitNotification("Commend added.");
            }
        });

        $('#comment').val("");
    }
});

Template.TaskForm.helpers({
    states: function () {
        var activity = Session.get("activity");
        if (activity) {
            return activity.states;
        } else {
            return [];
        }
    },
    members: function () {
        var activity = Session.get("activity");
        if (activity) {
            var team = Team.findOne({_id: activity.team})
            return Meteor.users.find({_id: {$in: team.members}});
        } else {
            return [];
        }
    },
    
    stateSelected: function () {
        var stateId = Session.get("selectedStateId");

        var selectedHtml = "";
        if (stateId && stateId === this._id) {
            selectedHtml = "selected";
        }
        return selectedHtml;
    }

});

/*****************************************************************************/
/* TaskForm: Lifecycle Hooks */
/*****************************************************************************/
Template.TaskForm.created = function () {
};

Template.TaskForm.rendered = function () {
};

Template.TaskForm.destroyed = function () {
};