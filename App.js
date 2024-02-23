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
import { FontAwesome5 } from '@expo/vector-icons';
import Wallet from './screens/Wallet';
import Profile from './screens/Profile';
import Notification from './screens/Notification';
import SendPackage from './screens/SendPackage';






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
  
  const TabNavigation = ({route}) =>{

    const { firstName }= route.params

    return (
      <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}} labeled>
        <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon:({}) =>(<Entypo name="home" size={24} color="#0560FA" />)}} initialParams={{firstName: firstName}}/>
        <Tab.Screen name='Wallet' component={Wallet} options={{ tabBarIcon:({}) =>(<Entypo name="wallet" size={24} color="#0560FA" />) }} />
        <Tab.Screen name="Track" component={DeliveriesScreen} options={{ tabBarIcon:({}) =>(<MaterialIcons name="delivery-dining" size={24} color="#0560FA" />) }}  />
        <Tab.Screen name='Profile' component={Profile} options={{ tabBarIcon:({}) =>(<FontAwesome5 name="user-circle" size={24} color="#0560FA" />) }} />
      </Tab.Navigator>
    )
  }


  return (
    <NavigationContainer theme={navTheme} >
        <Stack.Navigator initialRouteName='OnboardingScreen' 
        >
          
          
          <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
          <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{headerShown: false}} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{headerShown: false}} />
          <Stack.Screen name="OtpVerification" component={OtpVerification} options={{headerShown: false}} />
          <Stack.Screen name="NewPassword" component={NewPassword} options={{headerShown: false}} />
          
          <Stack.Screen name="HomeScreen" component={TabNavigation} options={{headerShown: false}}  />
          <Stack.Screen name='Notification' component={Notification}  />
          <Stack.Screen name='SendPackage' component={SendPackage} options={{
            title: 'Send A Package',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#A7A7A7'
            },
            
          }} />
          <Stack.Screen name='Wallet' component={Wallet} />
          
          
        </Stack.Navigator>
    
    </NavigationContainer>
    
  )
}


