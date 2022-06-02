/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

const MainScreen = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const pushNotiNow = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      message: 'My Notification Message',
    });
  };

  const pushDelay = () => {
    console.log(3);
    PushNotification.localNotificationSchedule({
      title: 'hehehe',
      channelId: 'default-channel-id',
      message: 'After 3s',
      date: new Date(Date.now() + 3 * 1000),
      allowWhileIdle: false,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.backgroundStyle}>
      <View style={styles.controller}>
        <TouchableOpacity
          style={styles.getButton}
          onPress={() => pushNotiNow()}>
          <Text>PUSH NOTI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.getButton} onPress={() => pushDelay()}>
          <Text>PUSH AFTER 3s</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  controller: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '100%',
    flexWrap: 'wrap',
    maxHeight: 200,
    backgroundColor: 'gray',
    borderRadius: 15,
  },
  getButton: {
    backgroundColor: 'lightblue',
    width: '40%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  text: {
    color: 'black',
  },
});

export default MainScreen;
