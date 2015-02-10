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
        return Activity.find();
    },
    teams: function () {
        return Team.find();
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