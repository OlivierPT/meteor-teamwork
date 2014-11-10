/*****************************************************************************/
/* MemberSuggest: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MemberSuggest.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.MemberSuggest.helpers({
  labelClass: function () {
        if (this.userId === Meteor.userId()) {
            return "label-warning";
        } else {
            return "label-default";
        }
    }
});

/*****************************************************************************/
/* MemberSuggest: Lifecycle Hooks */
/*****************************************************************************/
Template.MemberSuggest.created = function () {
};

Template.MemberSuggest.rendered = function () {
};

Template.MemberSuggest.destroyed = function () {
};