/* 
 * Local collection for Messages
 */
Notifications = new Mongo.Collection(null);

emitConfirmation = function(message) {
  Notifications.insert({code:200, text: message, gravity:'OK', seen:false});
}

emitNotification = function(message) {
  Notifications.insert({code:200, text: message, gravity:'INFO', seen:false});
}

emitError = function(message, error) {
  Notifications.insert({code: error.code, text: message, origin: error.reason, gravity:'ERROR', seen:false});
}