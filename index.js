/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

if (!DeviceInfo.isEmulator() || Platform.OS === 'android') {
  PushNotification.getChannels(function (channel_ids) {
    console.log('CHANNEL ID = ', channel_ids);
  });

  PushNotification.createChannel(
    {
      channelId: 'default-channel-id',
      channelName: 'Default channel',
      channelDescription: 'A default channel',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    created =>
      console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
}

PushNotification.configure({
  onRegister: async function (token) {
    console.log('TOKEN:', token.token);
  },
  onNotification: function (notification) {
    console.log('Notification: ', notification);
    if (!notification) {
      return;
    }
    if (notification.badge) {
      const badgeNumber = notification.badge;
      PushNotificationIOS.setApplicationIconBadgeNumber(badgeNumber);
      if (
        Platform.OS === 'ios' &&
        notification &&
        notification.finish &&
        typeof notification.finish === 'function'
      ) {
        if (
          notification &&
          PushNotificationIOS &&
          PushNotificationIOS.FetchResult &&
          PushNotificationIOS.FetchResult.NoData
        ) {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      }
    }
    // if (notification?.userInteraction) {
    //   handleTapNotification(notification).then(res => {
    //     console.log(res);
    //   });
    // }
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION ON ACTION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  PushNotification.localNotification({
    channelId: 'default-channel-id',
    // message: `Message handled in the background!, ${remoteMessage}`,
    message: 'ToNoti',
  });
});

messaging().onMessage(async remoteMessage => {
  // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  console.log(remoteMessage);
  PushNotification.localNotification({
    channelId: 'default-channel-id',
    message: `Foreground, ${remoteMessage}`,
    // message: 'A new FCM message arrived!',
  });
});

AppRegistry.registerComponent(appName, () => App);
