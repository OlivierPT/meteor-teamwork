/*****************************************************************************/
/* ActivitySettings: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.ActivitySettings.events({
  'click #addStateBtn': function () {
        var activityId = $('#addStateBtn').attr("data-activity-id");
        var label = $('input#newStateLabel').val();
        Meteor.call('addState', label, activityId, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to add state.", error);
            } else {
                emitNotification("New state added.");                
            }
        });

        $('input#newStateLabel').val("");
    },
    'click #addMember': function (event) {
        var memberEmail = $("#newMember").val();
        Meteor.call('addMemberWithEmail', this.team, memberEmail, function (error, result) {
            // identify the error           
            if (error) {
                emitError("Impossible to add a member.", error);
            } else {
                emitNotification("New member added.");                
            }
        });
    },
    
});

Template.ActivitySettings.helpers({
  
    activityTeam: function () {
       return Team.findOne({_id: this.team});
    },
    
    members: function() {
        var team = Team.findOne({_id: this.team});
        return Meteor.users.find({_id: {$in: team.members}});
    }
   
});



/**
 * Setting for member autocomplete
 * 
 * @returns {Template.Activity.memberSuggest.Anonym$3}
 */
Template.ActivitySettings.memberSuggestSetting = function () {
    return {
        position: "bottom",
        limit: 5,
        rules: [
            {
                collection: Meteor.users,
                field: "username",
                matchAll: true,
                template: Template.MemberSuggest
            }
        ]
    }
};

/*****************************************************************************/
/* ActivitySettings: Lifecycle Hooks */
/*****************************************************************************/
Template.ActivitySettings.created = function () {
};

Template.ActivitySettings.rendered = function () {
};

Template.ActivitySettings.destroyed = function () {
};