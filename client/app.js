/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
};

_.each(App.helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
});

Tracker.autorun(function () {
    if (Meteor.userId()) {
        console.log("User id changed : " + Meteor.userId());
        Meteor.subscribe('teams');
        var userTeamsId = Team.find().map(function (doc) {
            return doc._id
        });
        Meteor.subscribe('activities', userTeamsId);
    }
    
});

Meteor.subscribe('allUsers');

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});