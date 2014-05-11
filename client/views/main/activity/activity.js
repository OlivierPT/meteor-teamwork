/*****************************************************************************/
/* Activity: Event Handlers and Helpers */
/*****************************************************************************/
Template.Activity.events({
    'click #addStateBtn': function() {
        var activityId = $('#addStateForm #addStateBtn').attr("data-activity-id");
        var label = $('#addStateForm input#stateLabel').val();
        Meteor.call('addState', label, activityId);

        $('#addStateForm input#stateLabel').val("");
    },

    'click #addTaskBtn': function(event) {
        var stateId = event.target.getAttribute("data-state-id");
        var activityId = event.target.getAttribute("data-activity-id");
        var label = $('#addTaskForm input#taskName' + stateId).val();

        Meteor.call('addTask', label, activityId, stateId);

        $('#addTaskForm input#taskName' + stateId).val("");
    },

    'click a[name="deleteState"]': function(event) {
        var stateId = event.currentTarget.getAttribute("data-state-id");

        Meteor.call('removeState', stateId);
    },

    'click a[name="taskSummary"]': function(event) {
        var taskId = $( event.currentTarget ).attr("data-task-id");

        Session.set("selectedTask",taskId);
    }
});

Template.Activity.helpers({
    states: function() {
        return State.find();
    },
    tasks: function() {
        return Task.find({state: this._id});
    }
});

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
/* Activity: Lifecycle Hooks */
/*****************************************************************************/
Template.Activity.created = function() {
};

Template.Activity.rendered = function() {
};

Template.Activity.destroyed = function() {
};
