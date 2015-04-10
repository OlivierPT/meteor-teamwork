/*****************************************************************************/
/* MaterialTeam: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MaterialTeam.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.MaterialTeam.helpers({
    paramId: function() {
      console.log("Get the id from params");
      return this;
    }
});

/*****************************************************************************/
/* MaterialTeam: Lifecycle Hooks */
/*****************************************************************************/
Template.MaterialTeam.created = function () {
};

Template.MaterialTeam.rendered = function () {
};

Template.MaterialTeam.destroyed = function () {
};
