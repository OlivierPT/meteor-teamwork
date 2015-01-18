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

BaseController = RouteController.extend({
    action: function () {
        // set the reactive state variable "postId" with a value
        // of the id from our url
        this.state.set('viewLabel', "View Label");
        this.render();
    }
});

UserController = BaseController.extend({
    onBeforeAction: function () {
        if (!Meteor.userId()) {
            console.log("UserController : No user. Redirect to home.");
            this.redirect('/home');
        } else {
            this.next();
        }
    }
});

Router.route('/', function () {
    this.redirect('/home');
});

Router.route('/home', {
    template: 'Home',
    name: 'home',
    controller: BaseController,
    action: function () {
        // set the reactive state variable "postId" with a value
        // of the id from our url
        this.state.set('viewLabel', "Home");
        this.render();
    }
});

Router.route('/sign-in', {
    template: 'SignIn',
    name: 'sign-in',
    controller: BaseController,
    action: function () {
        // set the reactive state variable "postId" with a value
        // of the id from our url
        this.state.set('viewLabel', "Sign-In!");
        this.render();
    }
});

Router.route('/sign-up', {
    template: 'SignUp',
    name: 'sign-up',
    controller: BaseController,
    action: function () {
        // set the reactive state variable "postId" with a value
        // of the id from our url
        this.state.set('viewLabel', "Sign-Up!");
        this.render();
    }
});

Router.route('/about', {
    template: 'About',
    name: 'about',
    controller: BaseController,
    action: function () {
        // set the reactive state variable "postId" with a value
        // of the id from our url
        this.state.set('viewLabel', "About TeamWork");
        this.render();
    }
});

Router.route('/sign-out', {
    controller: BaseController,
    action: function () {
        Meteor.logout();
        Router.go("/home");
    }
});

Router.route('/activity/:_id', {
    controller: UserController,
    template: 'MaterialActivity',
    name: 'activity',
    data: function () {
        return Activity.findOne({_id: this.params._id});
    },
    action: function () {
        // set the reactive state variable "postId" with a value
        // of the id from our url
        var activity = Activity.findOne({_id: this.params._id});
        this.state.set('viewLabel', activity.name);
        this.render();
    }
});

Router.route('/activity', {
    controller: UserController,
    template: 'MaterialNewActivity',
    name: 'newActivity',
    action: function () {
        // set the reactive state variable "postId" with a value
        // of the id from our url
        this.state.set('viewLabel', "New Activity");
        this.render();
    }
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

