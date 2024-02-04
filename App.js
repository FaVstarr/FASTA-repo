import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import DeliveriesScreen from './screens/DeliveriesScreen';
import ForgotPassword from './screens/ForgotPassword';
import OtpVerification from './screens/OtpVerification';
import NewPassword from './screens/NewPassword';




const Stack = createNativeStackNavigator()


export default function App() {
  
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='OnboardingScreen' 
        screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Deliveries" component={DeliveriesScreen} />
          <Stack.Screen name="Signup" component={Signup}/>
          <Stack.Screen name="Signin" component={Signin}/>
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="OtpVerification" component={OtpVerification} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    
    </NavigationContainer>
    
  )
}


