import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ()=>{
  return(
    <View className="items-center justify-center flex-1">
      <Text>
        Home Screen
      </Text>
    </View>
  )
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator className="" >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    
    </NavigationContainer>
    
  )
}


