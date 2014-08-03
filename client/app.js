/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
};

_.each(App.helpers, function(helper, key) {
    Handlebars.registerHelper(key, helper);
});

Deps.autorun(function(){
  if(Meteor.userId()){
    Meteor.subscribe('userActivities');
  }
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});