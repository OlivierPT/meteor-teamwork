/*****************************************************************************/
/* ActivitySettingsModal: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.ActivitySettingsModal.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.ActivitySettingsModal.helpers({
  currentActivity: function () {
        return Session.get("activity");
    }
});


/*****************************************************************************/
/* ActivitySettingsModal: Lifecycle Hooks */
/*****************************************************************************/
Template.ActivitySettingsModal.created = function () {
};

Template.ActivitySettingsModal.rendered = function () {
};

Template.ActivitySettingsModal.destroyed = function () {
};