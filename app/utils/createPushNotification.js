import * as PushNotification from 'react-native-push-notification';

const DEFAULTS = {
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: (token) => {
    if (__DEV__) {
      console.log('Push Notification. Token:', token);
    }
  },
  onNotification: (notification) => {
    if (__DEV__) {
      console.log('Push Notification. Notification:', notification);
    }
  },
  popInitialNotification: true,
  requestPermissions: true
};

const createPushNotification = (config) => {
  PushNotification.configure({
    ...DEFAULTS,
    ...config
  });
  return PushNotification;
};

export default createPushNotification;
