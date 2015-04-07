Cards.after.insert(function(userId, doc) {
      Logs.insert({
          type: 'card',
          logType: "createCard",
          activityId: doc.activityId,
          listId: doc.listId,
          cardId: doc._id,
          userId: userId
      });
  });

  // New activity for card (un)archivage
  Cards.after.update(function(userId, doc, fieldNames, modifier) {
      if (_.contains(fieldNames, 'archived')) {
          if (doc.archived) {
            Logs.insert({
                  type: 'card',
                  logType: "archivedCard",
                  activityId: doc.activityId,
                  listId: doc.listId,
                  cardId: doc._id,
                  userId: userId
              });
          } else {
            Logs.insert({
                  type: 'card',
                  logType: "restoredCard",
                  activityId: doc.activityId,
                  listId: doc.listId,
                  cardId: doc._id,
                  userId: userId
              });
          }
      }
  });

  // New activity for card moves
  Cards.after.update(function(userId, doc, fieldNames, modifier) {
      var oldListId = this.previous.listId;
      if (_.contains(fieldNames, "listId") && doc.listId !== oldListId) {
        Logs.insert({
              type: 'card',
              logType: "moveCard",
              listId: doc.listId,
              oldListId: oldListId,
              activityId: doc.activityId,
              cardId: doc._id,
              userId: userId
          });
      }
  });

  // Add a new activity if we add or remove a member to the card
  Cards.before.update(function(userId, doc, fieldNames, modifier) {
      if (! _.contains(fieldNames, 'members'))
          return;

      // Say hello to the new member
      if (modifier.$addToSet && modifier.$addToSet.members) {
          var memberId = modifier.$addToSet.members;
          if (!_.contains(doc.members, memberId)) {
              Logs.insert({
                  type: 'card',
                  logType: "joinMember",
                  activityId: doc.activityId,
                  cardId: doc._id,
                  userId: userId,
                  memberId: memberId
              });
          }
      }

      // Say goodbye to the former member
      if (modifier.$pull && modifier.$pull.members) {
          var memberId = modifier.$pull.members;
          Logs.insert({
              type: 'card',
              logType: "unjoinMember",
              activityId: doc.activityId,
              cardId: doc._id,
              userId: userId,
              memberId: memberId
          });
      }
  });

  // Remove all activities associated with a card if we remove the card
  Cards.after.remove(function(userId, doc) {
      Logs.remove({
          cardId: doc._id
      });
  });

  CardComments.after.insert(function(userId, doc) {
      Logs.insert({
          type: 'comment',
          logType: "addComment",
          activityId: doc.activityId,
          cardId: doc.cardId,
          commentId: doc._id,
          userId: userId
      });
  });

  CardComments.after.remove(function(userId, doc) {
      var log = Logs.findOne({ commentId: doc._id });
      if (log) {
          Logs.remove(log._id);
      }
  });
