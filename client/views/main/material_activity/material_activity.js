/*****************************************************************************/
/* MaterialActivity: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MaterialActivity.events({
    'click #new-state-btn': function (e, tmpl) {    
        document.querySelector("#new-state-dialog").toggle();
    }
    
});

Template.MaterialActivity.helpers({
    states: function () {
        return this.states;
    },
    tasks: function () {
        return this.tasks;
    }
});

/*****************************************************************************/
/* MaterialActivity: Lifecycle Hooks */
/*****************************************************************************/
Template.MaterialActivity.created = function () {
};

Template.MaterialActivity.rendered = function () {
    
    
    document.querySelector('#add-state-btn').addEventListener('click', function (e) {
        
        var stateLabel = this.parentElement.querySelector("#newStateLabel").value;        
        var activityId = this.getAttribute("data-target-activity-id");
        
        Meteor.call('addState', stateLabel, activityId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to create the state.", error);
            } else {
                emitNotification("State created.");
            }
        });
        
        this.parentElement.querySelector("#newStateLabel").value = "";
    });
    
};

Template.MaterialActivity.destroyed = function () {
};