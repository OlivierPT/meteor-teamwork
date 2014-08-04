/*****************************************************************************/
/* Activity: Event Handlers and Helpers */
/*****************************************************************************/
Template.Activity.events({
    'click #addStateBtn': function() {
        var activityId = $('#addStateBtn').attr("data-activity-id");
        var label = $('input#stateLabel').val();
        Meteor.call('addState', label, activityId);

        $('input#stateLabel').val("");
    },
    'click button[name="addTaskBtn"]': function(event) {
        var stateId = event.target.getAttribute("data-state-id");
        var activityId = event.target.getAttribute("data-activity-id");
        var label = $('input#taskName' + stateId).val();

        Meteor.call('addTask', label, activityId, stateId);

        $('input#taskName' + stateId).val("");
    },
    'click a[name="deleteState"]': function(event) {
        var stateId = event.currentTarget.getAttribute("data-state-id");

        Meteor.call('removeState', stateId);
    },
    'click a[name="taskSummary"]': function(event) {
        var taskId = $(event.currentTarget).attr("data-task-id");

        Session.set("selectedTask", taskId);
    },
    'click #addMember': function(event) {
        var memberEmail = $("#newMember").val();
        Meteor.call('addMemberWithEmail', this.team, memberEmail);
    },
    'change #teamSelect': function(event) {
        var teamSelected = $(event.currentTarget).val();
        var activity = Session.get("activity");

        Meteor.call('changeTeamActivity', activity._id, teamSelected);
    }
});

Template.Activity.helpers({
    initSession: function(id) {         
        Session.set("activity", Activity.findOne({_id: id}));
        return id;
    },
    states: function() {
        return State.find();
    },
    tasks: function() {
        return Task.find({state: this._id});
    },
    teams: function() {
        return Team.find();
    },
    selectedTeam: function() {
        var activity = Session.get("activity");    
        if (activity) {
            var teamActivity = activity.team;
            if (teamActivity == this._id) {
                return "selected";
            } 
        } else {
            return "";
        };
    },
    members: function() {
        var activity = Session.get("activity"); 
        if (activity) {
            var team = Team.findOne({_id: activity.team})
            return Meteor.users.find({userId: {$in: team.members}});
        } else {
            return [];
        }
    }
});

/**
 * Setting for member autocomplete
 * 
 * @returns {Template.Activity.memberSuggest.Anonym$3}
 */
Template.Activity.userSuggestSetting = function() {
    return {
        position: "bottom",
        limit: 5,
        rules: [
            {
                collection: Meteor.users,
                field: "username",
                matchAll: true,
                template: Template.ActivityUserSuggest
            }
        ]
    }
};

/*****************************************************************************/
/* TaskDetail: Event Handlers and Helpers */
/*****************************************************************************/
Template.TaskDetail.events({
    'click button#saveTaskBtn': function(event) {
        var desc = $('#description').val();
        var state = $('#taskState').val();

        var currentTask = Task.findOne({_id: Session.get("selectedTask")});
        currentTask.description = desc;
        currentTask.state = state;

        Meteor.call('storeTask', currentTask);
        $('#taskModal').modal('hide');
    },
    'click button#deleteTaskBtn': function(event) {
        Meteor.call('removeTask', Session.get("selectedTask"));
        $('#taskModal').modal('hide');
    },
    'click button#addCommentBtn': function(event) {
        var comment = $('#comment').val();
        var currentTask = Task.findOne({_id: Session.get("selectedTask")});

        Meteor.call('addCommentToTask', currentTask, comment);

        $('#comment').val("");
    }


});

Template.TaskDetail.helpers({
    states: function() {
        return State.find();
    },
    task: function() {
        return Task.findOne({_id: Session.get("selectedTask")});
    },
    isStateSelected: function() {
        var task = Task.findOne({_id: Session.get("selectedTask")});
        return task.state === this._id;
    }
});

/*****************************************************************************/
/* UserSuggest: Event Handlers and Helpers */
/*****************************************************************************/
Template.ActivityUserSuggest.events({
    /*
     * Example: 
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.ActivityUserSuggest.helpers({
    labelClass: function() {
        if (this.userId === Meteor.userId()) {
            return "label-warning";
        } else {
            return "label-default";
        }
    }
});

/*****************************************************************************/
/* Activity: Lifecycle Hooks */
/*****************************************************************************/
Template.Activity.created = function() {
};

Template.Activity.rendered = function() {
    // Activating popover on temaDetail button 
    $("#teamDetailBtn").popover({
        html: true,
        title: 'Team detail',
        content: function() {
            return $("#teamDetail-content").html();
        }
    });

    // Activiating popover on stateInfo
    $("span[name='stateInfo'][data-toggle='popover']").each(function(index) {
        $(this).popover({
            html: true,
            title: 'State options',
            placement: 'top',
            content: function() {
                return $(this).next("div[name='stateInfo-content']").html();
            }
        });
    });
};

Template.Activity.destroyed = function() {
};
