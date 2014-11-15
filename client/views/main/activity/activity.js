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
/* TaskDetailModal: Event Handlers and Helpers */
/*****************************************************************************/
Template.TaskDetailModal.events({
    'click button#saveTaskBtn': function (event) {
        var desc = $('#description').val();
        var state = $('#taskState').val();
        var complexity = $('#complexity').val();
        var category = $('#category').val();

        var currentTask = Task.findOne({_id: Session.get("selectedTaskId")});
        currentTask.description = desc;
        currentTask.state = state;
        currentTask.complexity = complexity;
        currentTask.category = category;

        Meteor.call('storeTask', currentTask);
        $('#taskDetailModal').modal('hide');
    },
    'click button#deleteTaskBtn': function (event) {
        Meteor.call('removeTask', Session.get("selectedTaskId"));
        $('#taskDetailModal').modal('hide');
    }


});

Template.TaskDetailModal.helpers({
    currentTask: function () {
        return Task.findOne({_id: Session.get("selectedTaskId")});
    }
});

/*****************************************************************************/
/* NewTaskModal: Event Handlers and Helpers */
/*****************************************************************************/
Template.NewTaskModal.events({
    'click button#createTaskBtn': function (event) {
        
        var label = $('input#newTaskLabel').val();
        var desc = $('#description').val();
        var stateId = $('#taskState').val();
        var complexity = $('#complexity').val();
        var category = $('#category').val();

        Meteor.call('addTask', label, this.activity, stateId);

        $('input#taskName' + stateId).val("");
    }
});

Template.NewTaskModal.helpers({
    newTask: function () {  
        var newTask = {};
        newTask._id = -1;
        newTask.state = Session.get("selectedStateId");
        newTask.activity = this._id;
        
        return newTask;
    }
});


/*********************************************************************/
/* Activity Settings Template */
/*********************************************************************/
Template.ActivitySettingsModal.helpers({
    currentActivity: function () {
        return Session.get("activity");
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
