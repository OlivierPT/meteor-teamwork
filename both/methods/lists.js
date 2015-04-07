/*****************************************************************************/
// Lists Metor Methods
/*****************************************************************************/
Meteor.methods({

  /**
   * Add a State to an activity. The state is added as the last state
   *
   * @param {type} stateLabel
   * @param {type} activityId
   * @returns {undefined}
   */
  'addList': function (label, activityId) {
      // Controles
      check(label, NonEmptyString);

      Lists.insert({label: label, activityId: activityId});
  },
  /**
   * Remove a state and all the tasks included
   *
   * @param {type} stateId
   * @returns {undefined}
   */
  'removeList': function (listId) {
      console.log("MethodCall : removeList - id = " + listId);

      Lists.update({_id: listId}, {$set: {archived: true}});
      console.log("List archived");
  },
  /**
   * Sort a list and all the tasks included
   *
   * @param {type} stateId
   * @returns {undefined}
   */
  'sortList': function (listId, nextListId) {
      console.log("MethodCall : sortList - listId = " + listId + " - nextListId= " + nextListId);

      // var activity = Activity.findOne({_id: activityId});
      //
      // // Fisrt the state is put out
      // var i = 0;
      // var state;
      // while (i < activity.states.length && !state) {
      //     if (activity.states[i].id === stateId) {
      //         console.log("State found :  ID = " + activity.states[i].id + " - label = " + activity.states[i].label);
      //         state = activity.states[i];
      //         activity.states.splice(i, 1);
      //     }
      //     i++;
      // }
      // var newPosition = -1;
      // // Then, the state is added to the new position
      // if (nextStateId === -1) {
      //     activity.states.push(state);
      //     newPosition = activity.states.length;
      // } else {
      //     i = 0;
      //     var done = false;
      //     while (i < activity.states.length && !done) {
      //         if (activity.states[i].id === nextStateId) {
      //             console.log("State found :  ID = " + activity.states[i].id + " - label = " + activity.states[i].label);
      //             activity.states.splice(i, 0, state);
      //             newPosition = i;
      //             done = true;
      //         }
      //         i++;
      //     }
      // }
      // Activity.update({_id: activityId}, activity);
      // console.log("Activity stored. State moved : position: " + newPosition);
  }

});
