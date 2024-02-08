import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import DeliveriesScreen from './screens/DeliveriesScreen';
import ForgotPassword from './screens/ForgotPassword';
import OtpVerification from './screens/OtpVerification';
import NewPassword from './screens/NewPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Wallet from './screens/Wallet';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: 'white'
  }
}


export default function App() {
  
  const TabNavigation = () =>{
    return (
      <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon:({}) =>(<Entypo name="home" size={24} color="#0560FA" />) }} />
        <Tab.Screen name='Wallet' component={Wallet} options={{ tabBarIcon:({}) =>(<Entypo name="wallet" size={24} color="#0560FA" />) }} />
        <Tab.Screen name="Deliveries" component={DeliveriesScreen} options={{ tabBarIcon:({}) =>(<MaterialIcons name="delivery-dining" size={24} color="#0560FA" />) }}  />
      </Tab.Navigator>
    )
  }


  return (
    <NavigationContainer theme={navTheme} >
        <Stack.Navigator initialRouteName='OnboardingScreen' 
        screenOptions={{headerShown: false}}
        
        
        >
          
          
          <Stack.Screen name="Signup" component={Signup}/>
          <Stack.Screen name="Signin" component={Signin}/>
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="OtpVerification" component={OtpVerification} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          
          <Stack.Screen name="HomeScreen" component={TabNavigation} />
          
          
        </Stack.Navigator>
    
    </NavigationContainer>
    
  )
}


