import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = ({initialRouteName}) => (
  <Stack.Navigator initialRouteName={initialRouteName}>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default StackNavigator;
