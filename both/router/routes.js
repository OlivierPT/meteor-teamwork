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

Router.map(function() {
    this.route('App', {
        path: '/',
        waitOn: function() {
            return Meteor.subscribe('teams');
        }
    });

    this.route('App', {
        path: '/home',
        waitOn: function() {
            return Meteor.subscribe('teams');
        }
    });

    this.route('Activity', {
        path: '/activity/:_id',
        waitOn: function() {
            return  [
                Meteor.subscribe('stateByActivity', this.params._id),
                Meteor.subscribe('tasksByActivity', this.params._id),
                Meteor.subscribe('teams')
            ];
        },
        data: function() {
            return Activity.findOne({_id: this.params._id});;
        }
    });

    this.route('Teams', {
        path: '/teams',
        waitOn: function() {
            return Meteor.subscribe('teams');
        },
        data: function() {
            return Team.find();
        }
    });

    this.route('Team', {
        path: '/team/:_id',
        waitOn: function() {
            return Meteor.subscribe('teams');
        },
        data: function() {
            return Team.findOne({_id: this.params._id});
        },
        onAfterAction: function() {
            Session.set("team", Team.findOne({_id: this.params._id}));
        }
    });

    this.route('Profile', {
        path: '/profile',
        data: function() {
            return Meteor.user();
        }
    });


});
