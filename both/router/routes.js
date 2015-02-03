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
    controller: BaseController
});

Router.route('/sign-in', {
    template: 'SignIn',
    name: 'sign-in',
    controller: BaseController
});

Router.route('/sign-up', {
    template: 'SignUp',
    name: 'sign-up',
    controller: BaseController
});

Router.route('/about', {
    template: 'About',
    name: 'about',
    controller: BaseController
});

Router.route('/sign-out', {
    controller: BaseController
});

Router.route('/activity/:_id', {
    controller: UserController,
    template: 'MaterialActivity',
    name: 'activity',
    data: function () {
        return Activity.findOne({_id: this.params._id});
    }
});

Router.route('/activity', {
    controller: UserController,
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
Router.route('/team/:_id', {
    controller: UserController,
    template: 'MaterialTeam',
    name: 'team',
    data: function () {
        return Team.findOne({_id: this.params._id});
    }
});


Router.route('/rest/team/:_id', { where: 'server' })
  .get(function () {
      Team.findOne({_id: this.params._id})
    // NodeJS  response object
    var response = this.response;
    var team = Team.findOne({_id: this.params._id})
    this.response.end(EJSON.stringify(team));
  })
  

//
//
//Router.route('/profile', {
//    template: 'Profile',
//    name: 'profile',
//    data: function () {
//        return Meteor.user();
//    }
//});

