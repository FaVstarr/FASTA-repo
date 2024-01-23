import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Signin from './screens/Signin';

const HomeScreen = ()=>{
  return(
    <View className="items-center justify-center flex-1">
      <Text>
        Home Screen
      </Text>
    </View>
  )
}

const DeliveriesScreen = () =>{
  return(
    <View className="items-center justify-center flex-1">
      <Text>
          Deliveries
      </Text>
    </View>
  )
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Signup' >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Deliveries" component={DeliveriesScreen} />
          <Stack.Screen name="Signup" component={Signup}/>
          <Stack.Screen name="Signin" component={Signin}/>
        </Stack.Navigator>
    
    </NavigationContainer>
    
  )
}


