/*****************************************************************************/
/* Home: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Home.events({
    'click #new-actity-btn': function (e, tmpl) {
        document.querySelector("#addActivityDialog").toggle();
    },
    'click #new-team-btn': function (e, tmpl) {
        document.querySelector("#addTeamDialog").toggle();
    }
});

Template.Home.helpers({
    activities: function () {
        return Activities.find();
    },
    activitiesLast3: function () {
        return Activities.find({}, {sort: [["teamUpdate", "des"]], limit: 3});
    },
    teams: function () {
        return Teams.find();
    },
    teamsLast3: function () {
        return Teams.find({}, {sort: [["name", "asc"]], limit: 3});
    }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {

    var dialogs = document.querySelectorAll("paper-action-dialog");
    [].forEach.call(dialogs, function (dialog, i) {
        dialog.addEventListener("epb-click", function (e) {
            console.log("Home dialog catching event");
            var form = dialog.querySelector("event-form");
            if (form) {
                console.log("Fire event 'event-form-submit'");
                form.fire('event-form-submit', e.detail);
            }
        });
    });

    // Selector for updating an activty
    document.querySelector('#addActivityDialog').addEventListener('create-activity', function (e) {
        console.log(e.type, e.detail.objectId);

        Meteor.call('createActivity', e.detail.datas.name, e.detail.datas.description,
            e.detail.datas.teamId, function (error, result) {
            // Identify the error
            if (error) {
                Notification.emitError("Impossible to create the activity.", error);
            } else {
                Notification.emitNotification("Activity created successfully.");
            }
        });
    });


    // Selector for updating an activty
    document.querySelector('#addTeamDialog').addEventListener('create-team', function (e) {
        console.log(e.type, e.detail.objectId);

        Meteor.call('createTeam', e.detail.datas.name, e.detail.datas.description, function (error, result) {
            // Identify the error
            if (error) {
                Notification.emitError("Impossible to create the team.", error);
            } else {
                Notification.emitNotification("Team created successfully.");
            }
        });
    });

    // Selector for updating an activty
    document.querySelector('.content').addEventListener('delete-team', function (e) {
        console.log(e.type, e.detail.objectId);

        Meteor.call('deleteTeam', e.detail.objectId, function (error, result) {
            // Identify the error
            if (error) {
                Notification.emitError("Impossible to delete the team.", error);
            } else {
                Notification.emitNotification("Team deleted successfully.");
            }
        });
    });

    // Selector for updating an activty
    document.querySelector('.content').addEventListener('delete-activity', function (e) {
        console.log(e.type, e.detail.objectId);

        Meteor.call('deleteActivity', e.detail.objectId, function (error, result) {
            // Identify the error
            if (error) {
                Notification.emitError("Impossible to delete the activity.", error);
            } else {
                Notification.emitNotification("Activity deleted successfully.");
            }
        });
    });
};

Template.Home.destroyed = function () {
};
