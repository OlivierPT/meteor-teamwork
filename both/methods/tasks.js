/*****************************************************************************/
// Cards Metor Methods
/*****************************************************************************/
Meteor.methods({

  /**
   * Add a task for an Activity and a State
   *
   * @param {type} label
   * @param {type} activityId
   * @param {type} stateId
   * @returns {undefined}
   */
  'addTask': function (label, listId, activityId) {
      console.log("MethodCall : addTask - label = " + label + " - listId = " + listId);
      // Controles
      check(label, NonEmptyString);
      check(listId, NonEmptyString);
      check(activityId, NonEmptyString);

      Tasks.insert({label: label, listId: listId, activityId: activityId});
  },
  /**
   *
   * @param {type} cardId
   * @returns {undefined}
   */
  'removeTask': function (taskId) {
      console.log("MethodCall : removeTask - cardId = " + taskId);
      Tasks.update({_id: taskId}, {$set: {archived: true}});
      console.log("Card deleted");
  },
  /**
   *
   * @param {type} task
   * @returns {undefined}
   */
  'updateTask': function (taskId, label, detail, complexity, value) {
      console.log("MethodCall : updateCard - id = " + taskId);
      // update the task

      Tasks.update({_id: taskId}, {$set: {label: label, detail: detail, complexity: complexity, value: value}});
      console.log("Card stored");
  },
  /**
   *
   * @param {type} task
   * @returns {undefined}
   */
  'moveTasks': function (taskId, newListId, nextCardId) {
      console.log("MethodCall : moveTask - cardId = " +cardId+ " - newListId : " + newListId+ " - nextCardId = "+nextCardId);

  //     var activity = Activity.findOne({_id: activityId});
  //     var currentState = findStateForTask(activity, taskId);
  //     console.log("Current state found :  ID = " + currentState.id);
  //
  //     // Removing the task from the state
  //     var i = 0;
  //     var task;
  //     while (i < currentState.tasks.length && !task) {
  //         if (currentState.tasks[i].id === taskId) {
  //             console.log("Task found :  ID = " + currentState.tasks[i].id + " - label = " + currentState.tasks[i].label);
  //             task = currentState.tasks[i];
  //             currentState.tasks.splice(i, 1);
  //         }
  //         i++;
  //     }
  //
  //     // Finding new task and adding the task
  //     var newState = getStateById(activity, newStateId);
  //     if (nextTaskId === -1) {
  //         newState.tasks.push(task);
  //         newPosition = 0;
  //     } else {
  //         var done = false;
  //         var newPosition;
  //         var j = 0;
  //         while (j < newState.tasks.length && !done) {
  //             if (newState.tasks[j].id === nextTaskId) {
  //                 console.log("Next Task found :  ID = " + currentState.tasks[j].id + " - label = " + currentState.tasks[j].label);
  //                 newState.tasks.splice(j, 0, task);
  //                 newPosition = j;
  //                 done = true;
  //             }
  //             j++;
  //         }
  //     }
  //
  //     Activity.update({_id: activityId}, activity);
  //
  //     console.log("Activity stored : newState=" + newState.label + " - position: " + newPosition);
  },
  /**
   *
   * @param {String} taskId
   * @param {String} comment
   * @returns {undefined}
   */
  'addCommentToTask': function (taskId, comment) {
      console.log("MethodCall : addCommentToTask - cardId = " + taskId + " , comment = " + comment);
      TaskComments.insert({content: comment});
      console.log("TaskComment inserted");
  }



});
