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
    name: 'home'
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
    name: 'sign-out',
    action: function() {
        Meteor.logout();
        this.redirect('/sign-in');
    }
});

Router.route('/activity/:_id', {
    controller: UserController,
    template: 'MaterialActivity',
    name: 'activity',
    data: function () {
        console.log("Data - Activity.findOne : " + this.params._id);
        return Activities.findOne({_id: this.params._id});
    }
});

Router.route('/profile', {
    controller: UserController,
    template: 'MaterialProfile',
    name: 'profile',
    data: function () {
        console.log("Data - Activity.findOne : " + this.params._id);
        return Meteor.users.findOne();
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
        //return Teams.findOne({_id: this.params._id});
        return this.params._id;
    }
});


Router.route('/rest/team/:_id', {where: 'server'})
        .get(function () {
            Teams.findOne({_id: this.params._id})
            // NodeJS  response object
            var response = this.response;
            var team = Teams.findOne({_id: this.params._id})
            this.response.end(EJSON.stringify(team));
        })
