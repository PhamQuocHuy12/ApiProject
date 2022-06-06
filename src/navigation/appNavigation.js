import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import NotiScreen from '../screens/NotiScreen';
import NavigationService from './NavigatorService';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const navigationRef = useRef();
  useEffect(() => {
    console.log('setRef');
    NavigationService.setRef(navigationRef);
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Noti" component={NotiScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
