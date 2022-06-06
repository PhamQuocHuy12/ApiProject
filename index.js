/**
 * @format
 */

import {AppRegistry, Platform, Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import NavigationService from './src/navigation/NavigatorService';

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
    if (notification?.userInteraction) {
      handleTapNotification(notification).then(res => {
        console.log('res', res);
      });
    }
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

const handleTapNotification = async notification => {
  console.log(2, notification);
  await handlePushNotification(notification);
};

const handlePushNotification = notification => {
  console.log('HANDLE PUSH NOTIFICATION = ', notification);
  handleNavigateScreen(notification.message);
};

const handleNavigateScreen = message => {
  console.log(message);
  if (message.includes('huy')) {
    setTimeout(() => {
      console.log(NavigationService.getRef());
      NavigationService.getRef().current.navigate('Noti');
    }, 300);
  }
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (Platform.OS === 'android') {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      vibrate: false,
      id: 0,
      title: remoteMessage?.notification?.title,
      message: remoteMessage?.notification?.body ?? '',
    });
  }
});

messaging().onNotificationOpenedApp(remoteMessaging => {
  console.log('Notification Click Open App = ', remoteMessaging);
  handleNavigateScreen(remoteMessaging?.notification?.body ?? '');
});

AppRegistry.registerComponent(appName, () => App);
