/*****************************************************************************/
/* SignUp: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.SignUp.events({
    'click #sign-up-btn': function (e, tmpl) {
        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var password2 = $("#password2").val();
        
        check(username, NonEmptyString);
        check(email, NonEmptyString);
        check(password, NonEmptyString);
        check(password2, NonEmptyString);
        if (password != password2) {
            throw new Meteor.Error("sign-up", "The password is not verified.");
        }
        

        Accounts.createUser(username, email, password, function (error) {
            if (error) {
                Notification.emitError("Impossible to create user.", error);
            } else {
                Router.go("/home");
            }
        });
    }
});

Template.SignUp.helpers({
    /*
     * Example:
     *  items: function () {
     *    return Items.find();
     *  }
     */
});

/*****************************************************************************/
/* SignUp: Lifecycle Hooks */
/*****************************************************************************/
Template.SignUp.created = function () {
};

Template.SignUp.rendered = function () {
    $("input").each(function (index) {
        $(this).keypress(function (e) {
            if (e.which == 13) {
                $("#sign-up-btn").click();
            }
        })
    })
};
Template.SignUp.destroyed = function () {
};