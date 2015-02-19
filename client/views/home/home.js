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
};

Template.Home.destroyed = function () {
};