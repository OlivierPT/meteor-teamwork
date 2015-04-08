/*****************************************************************************/
/* PolymerLayout: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.PolymerLayout.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.PolymerLayout.helpers({
    activities: function () {
        return Activities.find();
    },
    teams: function () {
        return Teams.find();
    },
    nbTeam: function() {
        return Session.get("nbTeam");
    }
});

/*****************************************************************************/
/* PolymerLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.PolymerLayout.created = function () {
};

Template.PolymerLayout.rendered = function () {
};

Template.PolymerLayout.destroyed = function () {
};
