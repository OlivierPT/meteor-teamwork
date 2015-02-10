/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/


var subs = new SubsManager({
  // will be cached only 20 recently used subscriptions
  cacheLimit: 20,
  // any subscription will be expired after 5 minutes of inactivity
  expireIn: 5
});


Tracker.autorun(function () {
    console.log("Start running Tracker");
    if (Meteor.userId()) {
        console.log("Subscribing for user : "+Meteor.userId());
        subs.subscribe('teams');
        subs.subscribe('activities');
    }
    console.log("End running Tracker");
})


