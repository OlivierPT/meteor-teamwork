/*****************************************************************************/
/* TaskForm: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.TaskForm.events({
  'click button#addCommentBtn': function (event) {
        var comment = $('#comment').val();
        var currentTask = Task.findOne({_id: Session.get("selectedTaskId")});

        Meteor.call('addCommentToTask', currentTask, comment, function (error, result) {
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
        return State.find();
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
    isStateSelected: function () {
        var task = Template.parentData(1);
        
        return task.state === this._id;
    },
    stateSelected: function () {
        var task = Template.parentData(1);
        
        var selectedHtml = "";
        if (task.state && task.state === this._id) {
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