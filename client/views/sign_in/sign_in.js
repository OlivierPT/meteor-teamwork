/*****************************************************************************/
/* SignIn: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.SignIn.events({
    
    'click #sign-in-btn': function (e, tmpl) {
        var email = $("#username").val();
        var password = $("#password").val();

        Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                Notification.emitError("Impossible login.", error);
            } else {   
                Router.go("/home");
            }
        });
    }
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
    })
};

Template.SignIn.destroyed = function () {
};