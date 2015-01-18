/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
    layoutTemplate: 'PolymerLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound',
    templateNameConverter: 'upperCamelCase',
    routeControllerNameConverter: 'upperCamelCase'
});

Router.route('/', {
    template: 'Home'
});
Router.route('/home', {
    template: 'Home'   
});

Router.route('/sign-in', {
    template: 'SignIn',
    name: 'sign-in'
});

Router.route('/sign-up', {
    template: 'SignUp',
    name: 'sign-up'
});

Router.route('/about', {
    template: 'Home',
    name: 'about'
});

Router.route('/sign-out', {
    action: function () {
        Meteor.logout();
        Router.go("/home");
    }
});

Router.route('/activity/:_id', {
    template: 'MaterialActivity',
    name: 'activity'
});

Router.route('/activity', {
    template: 'MaterialNewActivity',
    name: 'newActivity'
});

//Router.route('/teams', {
//    template: 'Teams',
//    name: 'teams',
//    data: function () {
//        return Team.find();
//    }
//});
//
//Router.route('/team/:_id', {
//    template: 'Team',
//    name: 'team',
//    data: function () {
//        return Team.findOne({_id: this.params._id});
//    },
//    onAfterAction: function () {
//        Session.set("team", Team.findOne({_id: this.params._id}));
//    }
//});
//
//Router.route('/profile', {
//    template: 'Profile',
//    name: 'profile',
//    data: function () {
//        return Meteor.user();
//    }
//});

