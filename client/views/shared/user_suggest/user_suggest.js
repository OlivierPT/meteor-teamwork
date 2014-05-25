/*****************************************************************************/
/* UserSuggest: Event Handlers and Helpers */
/*****************************************************************************/
Template.UserSuggest.events({
    /*
     * Example: 
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.UserSuggest.helpers({
    
    labelClass: function() {
        if (this.userId === Meteor.userId()) {
            return "label-warning";
        } else {
            return "label-default";
        }
    }
});

/*****************************************************************************/
/* UserSuggest: Lifecycle Hooks */
/*****************************************************************************/
Template.UserSuggest.created = function() {
};

Template.UserSuggest.rendered = function() {
};

Template.UserSuggest.destroyed = function() {
};
