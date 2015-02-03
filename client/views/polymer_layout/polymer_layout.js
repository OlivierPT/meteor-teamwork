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
    },
    viewLabel: function () {
        var controller = Iron.controller();

        // reactively return the value of postId
        return controller.state.get('viewLabel');

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