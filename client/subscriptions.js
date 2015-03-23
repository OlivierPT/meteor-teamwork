var subs = new SubsManager({
    // will be cached only 20 recently used subscriptions
    cacheLimit: 20,
    // any subscription will be expired after 5 minutes of inactivity
    expireIn: 5
});

subs.subscribe('teams');

Tracker.autorun(function () {

    console.log("Start running Tracker");
    var nbTeams = Team.find().count();
    subs.subscribe('activities', nbTeams);

    console.log("End running Tracker");
});
