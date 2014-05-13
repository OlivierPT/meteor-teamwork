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

Router.map(function () {
  this.route('App', {
    path: '/'
  });

  this.route('App', {
    path: '/home'
  });

  this.route('Activity', {
    path: '/activity/:_id',
    waitOn: function() {
            Meteor.subscribe('stateByActivity', this.params._id);
            Meteor.subscribe('tasksByActivity', this.params._id);
    },

    data: function() {
        return Activity.findOne({_id: this.params._id});
    }

  });

  this.route('Team', {
    path: '/team',
    waitOn: function() {
            Meteor.subscribe('teams');
    },
    data: function() {
        return Team.findOne();
    }
  });

});
