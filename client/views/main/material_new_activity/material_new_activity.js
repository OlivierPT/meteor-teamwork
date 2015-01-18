/*****************************************************************************/
/* MaterialNewActivity: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MaterialNewActivity.events({
    'click #create-btn': function (e, tmpl) {
//        var formValid = true;
//
//        $("paper-input-decorator").each(function (index) {
//            var input = $(this).next("input");
//            if (input) {
//                $(this).isInvalid = !input.validity.valid;
//            }
//        });
//
//        if (formValid) {
//            $("#create-activity-form").submit();
//        }
        $("#create-activity-form").submit();
    },
    'submit [data-action="create-activity"]': function (e, tmpl) {
        var label = $("#label").val();
        var description = $("#description").val();
        var team = $("#teamValue").val();

        Meteor.call('createActivity', label, team, description, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to create the activity.", error);
            } else {
                emitNotification("Activity created.");
            }
        })
    }
});

Template.MaterialNewActivity.helpers({
    teams: function () {
        return Team.find();
    }
});

/*****************************************************************************/
/* MaterialNewActivity: Lifecycle Hooks */
/*****************************************************************************/
Template.MaterialNewActivity.created = function () {
};

Template.MaterialNewActivity.rendered = function () {

    var radioGroup = document.querySelector('#team');
    var inputVal = $("#teamValue");
    radioGroup.addEventListener('core-select', function (e) {
        if (radioGroup.selectedItem) {
             $("#teamValue").val(radioGroup.selectedItem.getAttribute('name'));
        }
    });
    
};

Template.MaterialNewActivity.destroyed = function () {
};