/*****************************************************************************/
/* SignUp: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.SignUp.events({
    
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
    });
    
    // Selector for updating an activty
    document.querySelector('.content').addEventListener('sign-up', function (e) {
        console.log(e.type, e.detail.objectId); 
    
        var options = {};
        options.username = e.detail.datas.username;
        options.email = e.detail.datas.email;
        var password = e.detail.datas.password;
        var password2 = e.detail.datas.password2;
        
        check(options.username, NonEmptyString);
        check(options.email, NonEmptyString);
        check(password, NonEmptyString);
        check(password2, NonEmptyString);
        if (password != password2) {
            throw new Meteor.Error("sign-up", "The password is not verified.");
        }
        options.password = password;
        
        Accounts.createUser(options, function (error) {
            if (error) {
                Notification.emitError("Impossible to create user.", error);
            } else {
                Router.go("/home");
            }
        });
    });
    
    
};
Template.SignUp.destroyed = function () {
};