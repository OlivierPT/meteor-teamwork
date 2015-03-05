/*****************************************************************************/
/* SignIn: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.SignIn.events({
});

Template.SignIn.helpers({
    /*
     * Example:
     *  items: function () {
     *    return Items.find();
     *  }
     */
});

/*****************************************************************************/
/* SignIn: Lifecycle Hooks */
/*****************************************************************************/
Template.SignIn.created = function () {
};

Template.SignIn.rendered = function () {
    $("input").each(function (index) {
        $(this).keypress(function (e) {
            if (e.which == 13) {
                $("#sign-in-btn").click();
            }
        })
    });
    
    
    // Selector for updating an activty
    document.querySelector('.content').addEventListener('sign-in', function (e) {
        console.log(e.type, e.detail.objectId); 
    
        Meteor.loginWithPassword(e.detail.datas.username, e.detail.datas.password, function (error) {
            if (error) {
                Notification.emitError("Impossible login.", error);
            } else {   
                Router.go("/home");
            }
        });
    });
};

Template.SignIn.destroyed = function () {
};