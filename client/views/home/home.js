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
        return Activity.find();
    },
    teams: function () {
        return Team.find();
    }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {    
    
    // Selector for updating an activty
    document.querySelector('#addActivityDialog').addEventListener('create-activity', function (e) {
        console.log(e.type, e.detail.objectId); 
        
        var name = "";
        var description = "";
        var teamId = "";
        for (i = 0; i < e.detail.datas.length; i++) {
            if (e.detail.datas[i].name === "name") {
                name = e.detail.datas[i].value;
            }
            if (e.detail.datas[i].name === "description") {
                description = e.detail.datas[i].value;
            }
            if (e.detail.datas[i].name === "teamId") {
                teamId = e.detail.datas[i].value;
            }
        }
        
        Meteor.call('createActivity', name, description, teamId, function (error, result) {
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
        
        var name = "";
        var description = "";
        for (i = 0; i < e.detail.datas.length; i++) {
            if (e.detail.datas[i].name === "name") {
                name = e.detail.datas[i].value;
            }
            if (e.detail.datas[i].name === "description") {
                description = e.detail.datas[i].value;
            }
        }
        
        Meteor.call('createTeam', name, description, function (error, result) {
            // Identify the error           
            if (error) {
                Notification.emitError("Impossible to create the team.", error);
            } else {
                Notification.emitNotification("Team created successfully.");
            }
        });
    });
};

Template.Home.destroyed = function () {
};