/*****************************************************************************/
/* MaterialActivity: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MaterialActivity.events({
    'click #new-state-btn': function (e, tmpl) {
        $("#new-state-dialog").toggle();
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
};

Template.MaterialActivity.destroyed = function () {
};