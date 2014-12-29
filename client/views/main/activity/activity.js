/*****************************************************************************/
/* Activity: Event Handlers and Helpers */
/*****************************************************************************/
Template.Activity.events({
    'click a[name="deleteState"]': function (event) {
        var stateId = $(event.currentTarget).closest(".state").attr("data-state-id");
        var activityId = Template.parentData(1)._id;
        Meteor.call('removeState', stateId, activityId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to delete the state.", error);
            } else {
                emitNotification("State deleted.");
            }
        })
    },
    'click a[name="deleteActivity"]': function (event) {
        var activityId = Template.currentData()._id;

        Meteor.call('deleteActivity', activityId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to delete the Activity.", error);
            } else {
                emitNotification("Activity deleted.");
            }
        });
    },
    'click a[name="taskDetail"]': function (event) {
        var taskId = $(event.currentTarget).closest(".task").attr("data-task-id");
        var stateId = $(event.currentTarget).closest(".state").attr("data-state-id");
        Session.set("selectedTaskId", taskId);
        Session.set("selectedStateId", stateId);
    },
    
    'click #addMember': function (event) {
        var memberEmail = $("#newMember").val();
        Meteor.call('addMemberWithEmail', this.team, memberEmail, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to add the member.", error);
            } else {
                emitNotification("Memeber added.");
            }
        });
    },
    'click a[name="openNewTaskModal"]': function (event) {
        var stateId = $(event.currentTarget).closest(".state").attr("data-state-id");        
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
        return this.states;
    },
    tasks: function () {
        return this.tasks;
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
                return $("div[name='stateInfo-content-" + this.getAttribute("data-state-id") + "'").html();
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

            Meteor.call('moveTask', taskId, stateId, nextTaskId, function (error, result) {
                // identify the error           
                if (error) {
                    emitError("Error when moving task.", error);
                }
            });
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

            Meteor.call('moveState', stateId, nextStateId, function (error, result) {
                // identify the error           
                if (error) {
                    emitError("Error when moving state.", error);
                } 
            });
        }
    });


};

Template.Activity.destroyed = function () {
};
