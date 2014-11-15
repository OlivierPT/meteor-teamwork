/*****************************************************************************/
/* Activity: Event Handlers and Helpers */
/*****************************************************************************/
Template.Activity.events({
    'click a[name="deleteState"]': function (event) {
        var stateId = event.currentTarget.getAttribute("data-state-id");

        Meteor.call('removeState', stateId);
    },
    'click a[name="deleteActivity"]': function (event) {
        var activityId = event.currentTarget.getAttribute("data-activity-id");

        Meteor.call('deleteActivity', activityId);
    },
    'click a[name="taskDetail"]': function (event) {
        var taskId = $(event.currentTarget).attr("data-task-id");

        Session.set("selectedTaskId", taskId);
    },
    'click #addMember': function (event) {
        var memberEmail = $("#newMember").val();
        Meteor.call('addMemberWithEmail', this.team, memberEmail);
    },
    'click a[name="openNewTaskModal"]': function (event) {
        var stateId = $(event.currentTarget).attr("data-state-id");
        Session.set("selectedTaskId", -1);
        Session.set("selectedStateId", stateId);
    }
});

Template.Activity.helpers({
    initSession: function (id) {
        Session.set("activity", Activity.findOne({_id: id}));
        return id;
    },
    states: function () {
        return State.find();
    },
    tasks: function () {
        return Task.find({state: this._id});
    }
});

/*****************************************************************************/
/* Activity: Lifecycle Hooks */
/*****************************************************************************/
Template.Activity.created = function () {
};

Template.Activity.rendered = function () {

    // Activiating popover on stateInfo
    $("span[name='stateInfo'][data-toggle='popover']").each(function (index) {
        $(this).popover({
            html: true,
            title: 'State options',
            placement: 'bottom',
            content: function () {
                return $("div[name='stateInfo-content-"+this.getAttribute("data-state-id")+"'").html();
            }
        });
    });

    // Activiating popover on stateInfo
    $("#activitySettings").popover({
        html: true,
        title: 'Activity Settings',
        placement: 'bottom',
        trigger: 'click focus',
        content: function () {
            return $("#activitySettings-content").html();
        }
    });

    $(".task-column").sortable({
        connectWith: ".task-column",
        handle: ".task-portlet-header",
        cancel: ".task-portlet-toggle",
        placeholder: "list-group-item placeholder",
        stop: function (event, ui) {
            var newPostion = 1;
            var taskId = ui.item.context.getAttribute("data-task-id");
            if (ui.item.context.nextElementSibling) {
                var nextTaskId = ui.item.context.nextElementSibling.getAttribute("data-task-id");
                var nextTask = Task.findOne({_id: nextTaskId});
                newPostion = nextTask.position;
            }
            var stateId = ui.item.context.parentElement.getAttribute("data-state-id");
            var task = Task.findOne({_id: taskId});

            task.state = stateId;
            task.position = newPostion;

            Meteor.call('storeTask', task);
        }
    });

};

Template.Activity.destroyed = function () {
};
