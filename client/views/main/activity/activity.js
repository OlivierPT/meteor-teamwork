/*****************************************************************************/
/* Activity: Event Handlers and Helpers */
/*****************************************************************************/
Template.Activity.events({
    'click #addStateBtn': function() {
        var activityId = $('#addStateForm #addStateBtn').attr("data-activity-id");
        var label = $('#addStateForm input#stateLabel').val();
        Meteor.call('addState', label, activityId);
    },
    'click #addTaskBtn': function(event) {
        var stateId = event.target.getAttribute("data-state-id");
        var activityId = event.target.getAttribute("data-activity-id");
        var label = $('#addTaskForm input#taskName' + stateId).val();

        Meteor.call('addTask', label, activityId, stateId);
    }
});

Template.Activity.helpers({
    states: function() {
        return State.find();
    },
    tasksState: function() {
        return Task.find({state: this._id});
    }
});


/*****************************************************************************/
/* Activity: Lifecycle Hooks */
/*****************************************************************************/
Template.Activity.created = function() {
};

Template.Activity.rendered = function() {
};

Template.Activity.destroyed = function() {
};
