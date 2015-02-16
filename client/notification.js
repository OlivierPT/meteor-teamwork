/* 
 * Local collection for Messages
 */
Notification = {
    
    emitConfirmation: function (message) {
        var detail = {};
        detail.text = message;
        detail.gravity = 'SUCCESS';
        
        var event = new CustomEvent('tw-notification', { 'detail': detail });
        console.log("Notification - Firing event tw-notification : SUCCESS");
        document.querySelector('tw-notification').dispatchEvent(event);
    },
    
    emitNotification: function (message) {
        var detail = {};
        detail.text = message;
        detail.gravity = 'INFO';
        
        var event = new CustomEvent('tw-notification', { 'detail': detail });
        console.log("Notification - Firing event tw-notification : INFO");
        document.querySelector('tw-notification').dispatchEvent(event);
    },
    
    emitError: function (message, error) {
        var detail = {};
        detail.text = message;
        detail.code = error.code;
        detail.origin = error.reason;
        detail.gravity = 'ERROR';
        
        var event = new CustomEvent('tw-notification', { 'detail': detail });
        console.log("Notification - Firing event tw-notification : ERROR");
        document.querySelector('tw-notification').dispatchEvent(event);
        
    },
};
