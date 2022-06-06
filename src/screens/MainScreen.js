/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

const MainScreen = () => {
  const pushNotiNow = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      vibrate: false,
      id: 0,
      title: 'clicked',
      message: 'huy 123',
    });
  };

  const pushDelay = () => {
    console.log(3);
    PushNotification.localNotificationSchedule({
      title: 'Have your dreams come true ?',
      date: new Date(new Date().getTime() + 4 * 1000),
      message: 'hehehehehe',
      allowWhileIdle: false,
      channelId: 'default-channel-id',
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
