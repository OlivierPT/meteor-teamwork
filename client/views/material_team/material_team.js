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
    members: function () {
        return Meteor.users.find({_id: {$in: this.members}});
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