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
  'addCard': function (label, listId) {
      console.log("MethodCall : addTask - label = " + label + " - listId = " + listId);
      // Controles
      check(label, NonEmptyString);

      Cards.insert({label: label, listId: listId});
  },
  /**
   *
   * @param {type} cardId
   * @returns {undefined}
   */
  'removeCard': function (cardId) {
      console.log("MethodCall : removeTask - cardId = " + cardId);
      Cards.update({_id: cardId}, {$set: {archived: true}});
      console.log("Card deleted");
  },
  /**
   *
   * @param {type} task
   * @returns {undefined}
   */
  'updateCard': function (cardId, label, detail, complexity, value) {
      console.log("MethodCall : updateCard - id = " + cardId);
      // update the task

      Cards.update({_id: cardId}, {$set: {label: label, detail: detail, complexity: complexity, value: value}});
      console.log("Card stored");
  },
  /**
   *
   * @param {type} task
   * @returns {undefined}
   */
  'moveCard': function (cardId, newListId, nextCardId) {
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
   * @param {type} task
   * @param {type} comment
   * @returns {undefined}
   */
  'addCommentToCard': function (cardId, comment) {
      console.log("MethodCall : addCommentToTask - cardId = " + cardId + " , comment = " + comment);
      CardComments.insert({content: comment});
      console.log("CardComment inserted");
  }



});
