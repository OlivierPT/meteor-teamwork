

/*****************************************************************************/
// Activity Metor Methods
/*****************************************************************************/
Meteor.methods({
    /**
     * Create a new Activity
     *
     * @param {type} name
     * @param {type} userId
     * @returns {undefined}
     */
    'createActivity': function (label, description, teamId) {
        console.log("MethodCall : createActivity - name = " + name);
        console.log("MethodCall : createActivity - teamId = " + teamId);
        console.log("MethodCall : createActivity - currentUser = " + Meteor.userId());

        // Controles
        check(label, NonEmptyString);
        check(teamId, NonEmptyString);

        var newActivity = {};
        newActivity.label = label;
        newActivity.description = description;
        newActivity.team = teamId;

        // var stateDatas = {};
        // stateDatas.label = "ToDo";
        // newActivity.states.push(createState(stateDatas));
        // stateDatas.label = "Doing";
        // newActivity.states.push(createState(stateDatas));
        // stateDatas.label = "Done";
        // newActivity.states.push(createState(stateDatas));

        //var actvityId = Activity.insert({name: name, owner: Meteor.userId(), team: teamId, description: description});
        var actvityId = Activities.insert(newActivity);
        console.log("New activity created!");
        return actvityId;
    },
    'editActivity': function (activityId, name, description) {
        Activities.update({_id: activityId}, {$set: {label: label, description: description}});
    },
    'deleteActivity': function (activityId) {
        console.log("MethodCall : deleteActivity - activityId = " + activityId);
        // Controles
        check(activityId, NonEmptyString);

        // if (Meteor.userId()) {
        //     // L'utilisateur doit etre le owner de l'activity
        //     var activity = Activities.findOne({_id: activityId});
        //     if (activity.owner === Meteor.userId()) {
        //         // Si l'equipe n'existe que pour cette activite, elle est
        //         // aussi supprimé
        //         var nbActivityForTeam = Activity.find({team: activity.team}).count();
        //         if (nbActivityForTeam <= 1) {
        //             Team.remove({_id: activity.team});
        //         }
        //         Activity.remove({_id: activityId});
        //         // Si l'equipe n'existe que pour cette activite, elle est
        //         // aussi supprimé
        //     } else {
        //         throw new Meteor.Error("access-denied", "The user must be the owner of the activity.");
        //     }
        // }

        Activities.remove({_id: activityId});

        console.log("Activity deleted");
    },
    /**
     *
     * @param {type} activityId
     * @param {type} teamId
     * @returns {undefined}
     */
    'changeTeamActivity': function (activityId, teamId) {
        console.log("MethodCall : changeTeamActivity - activity = " + activityId + " team = " + teamId);
        Activities.update({_id: activityId}, {$set: {team: teamId}});
        console.log("Activity team changed");
    }
});
