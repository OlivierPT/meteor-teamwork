var subs = new SubsManager({
    // will be cached only 20 recently used subscriptions
    cacheLimit: 20,
    // any subscription will be expired after 5 minutes of inactivity
    expireIn: 5
});

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


UserController = RouteController.extend({
    onBeforeAction: function () {
        console.log("onBeforeAction : UserController");
        if (!Meteor.userId()) {
            console.log("UserController : No user. Redirect to home.");
            this.redirect('/sign-in');
        } else {
            console.log("UserController : User ok. next();");
            this.next();
        }
    }
});

Router.route('/', function () {
    this.redirect('/home');
});

Router.route('/home', {
    controller: UserController,
    template: 'Home',
    name: 'home',
    waitOn: function () {
        console.log("Subscribing for user : " + Meteor.userId());
        return [subs.subscribe('teams'), subs.subscribe('activities')];
    }
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
    template: 'About',
    name: 'about'
});

Router.route('/sign-out', {
    template: 'SignIn',
    name: 'sign-out'
});

Router.route('/activity/:_id', {
    controller: UserController,
    template: 'MaterialActivity',
    name: 'activity',
    waitOn: function () {
        console.log("Subscribing for user : " + Meteor.userId());
        return [subs.subscribe('teams'), subs.subscribe('activities')];
    },
    data: function () {
        console.log("Data - Activity.findOne : " + this.params._id);
        return Activity.findOne({_id: this.params._id});
    }
});

Router.route('/activity', {
    template: 'MaterialNewActivity',
    name: 'newActivity'
});

Router.route('/team', {
    template: 'MaterialNewActivity',
    name: 'newTeam'
});

Router.route('/team/:_id', {
    controller: UserController,
    template: 'MaterialTeam',
    name: 'team',
    data: function () {
        return Team.findOne({_id: this.params._id});
    }
});


Router.route('/rest/team/:_id', {where: 'server'})
        .get(function () {
            Team.findOne({_id: this.params._id})
            // NodeJS  response object
            var response = this.response;
            var team = Team.findOne({_id: this.params._id})
            this.response.end(EJSON.stringify(team));
        })


