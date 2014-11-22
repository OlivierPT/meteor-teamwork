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
    
    // Drag and drop for task
    $(".task-list").sortable({
        connectWith: ".task-list",
        placeholder: "list-group-item task-placeholder",
        dropOnEmpty: true,
        update: function (event, ui) {
            var nextTaskId = -1;
            var taskId = ui.item.context.getAttribute("data-task-id");            
            var stateId = ui.item.context.parentElement.getAttribute("data-state-id");
            if (ui.item.context.nextElementSibling) {
                var nextTaskId = ui.item.context.nextElementSibling.getAttribute("data-task-id");                
            }

            Meteor.call('moveTask', taskId, stateId, nextTaskId);
        }
    });
    
    // Drag and drop for state
    $(".list-states").sortable({
        connectWith: ".list-states",
        placeholder: "list-group-item state state-placeholder",
        update: function (event, ui) {
            var nextStateId = -1;
            var stateId = ui.item.context.getAttribute("data-state-id");            
            if (ui.item.context.nextElementSibling) {
                var nextStateId = ui.item.context.nextElementSibling.getAttribute("data-state-id");                
            }

            Meteor.call('moveState', stateId, nextStateId);
        }
    });
    

};

Template.Activity.destroyed = function () {
};
