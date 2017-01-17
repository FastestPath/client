import * as PushNotification from 'react-native-push-notification';

PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log( 'TOKEN:', token );
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification );
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  requestPermissions: true
});

export default PushNotification;