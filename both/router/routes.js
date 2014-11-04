/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound',
    templateNameConverter: 'upperCamelCase',
    routeControllerNameConverter: 'upperCamelCase'
});




Router.route('/', {
    template: 'App',
    waitOn: function () {
        return Meteor.subscribe('teams');
    }
});

Router.route('/home', {
    template: 'App',
    waitOn: function () {
        return Meteor.subscribe('teams');
    }
});

Router.route('/activity/:_id', {
    template: 'Activity',
    name: 'activity',
    waitOn: function () {
        return  [
            Meteor.subscribe('stateByActivity', this.params._id),
            Meteor.subscribe('tasksByActivity', this.params._id),
            Meteor.subscribe('teams')
        ];
    },
    data: function () {
        return Activity.findOne({_id: this.params._id});
        ;
    }
});

Router.route('/teams', {
    template: 'Teams',
    name: 'teams',
    waitOn: function () {
        return Meteor.subscribe('teams');
    },
    data: function () {
        return Team.find();
    }
});

Router.route('/team/:_id', {
    template: 'Team',
    name: 'team',
    waitOn: function () {
        return Meteor.subscribe('teams');
    },
    data: function () {
        return Team.findOne({_id: this.params._id});
    },
    onAfterAction: function () {
        Session.set("team", Team.findOne({_id: this.params._id}));
    }
});

Router.route('/profile', {
    template: 'Profile',
    name: 'profile',
    data: function () {
        return Meteor.user();
    }
});

