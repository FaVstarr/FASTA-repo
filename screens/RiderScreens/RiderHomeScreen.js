import { View, Text, SafeAreaView, TouchableOpacity, Image, TouchableHighlight, Alert, BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import { SearchBar } from "@rneui/themed";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import firebase from "firebase/compat/app";
import 'firebase/compat/auth'


export default function HomeScreen({navigation, route}) {

  
  // const fullName = route.params
  const {firstName, routeName} = route.params;
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };





  useEffect(()=>{
    const backAction = () =>{
      if (navigation.isFocused() && routeName === 'Home'){
        Alert.alert(
          'Confirm Sign Out',
          'Are you sure you want to sign out?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel'
            },
            {text: 'Yes', onPress: () => { handleSignOut()}}
          ],
          {cancelable: false}
        );
        return true;
      }else{
        return false;
      }
      
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )
    return () => backHandler.remove()
  },[navigation, routeName])

  const handleSignOut = async () =>{

    try{
      await firebase.auth().signOut()
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
      navigation.reset({
        index: 0,
        routes: [{ name: "RiderSignup" }],
      });

    }catch(error){
      console.error('Error signing out:', error);
    }

  }

  return (

    
    <SafeAreaView className="px-3">
      
      
      <View className="mt-9 rounded">
      <SearchBar
      placeholder="Search Services"
      onChangeText={updateSearch}
      value={search}
      lightTheme
    />
      </View>

      <View className="bg-[#0560FA] py-5 mt-[24px] rounded-[8px] flex flex-row ">
        <View className="pl-4">
        <Text className="text-[24px] text-white">Hello {firstName}</Text>
        <Text className="text-[12px] text-white">We trust you're having a great time</Text>
      </View>
      <TouchableOpacity className="pl-[74px] pt-3" onPress={() => navigation.navigate('Notification')}>
        <Image source={require('../../assets/images/notification.png')}/>
      </TouchableOpacity>
        </View>

        <View className="mt-[38px]">
          <Text className="text-[#0560FA]">Special for you</Text>
        </View>

        {/* Cards */}
        <View className="mt-[90px]">  
        <Text className="text-[#0560FA]">What will you like to do</Text>

        {/* 1st 2 cards */}
        <View className="flex flex-row gap-[23px]">
        <TouchableOpacity >
          <View className="bg-[#F2F2F2] w-[159px] h-[159px] pt-[20px] pl-2 rounded-[8px] ">
            <Image source={require('../../assets/images/healthicons_call-centre.png')} />
            <Text className="text-[16px] text-[#0560FA]">Customer care</Text>
            <Text className="text-[7.45px] block">Our customer care service line is available from 8 -9pm week days and 9 - 5 weekends - tap to call us today</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('ReceivePackage')}>
          <View className="bg-[#F2F2F2] w-[159px] h-[159px] pt-[35px] pl-2 rounded-[8px]">
            <Image source={require('../../assets/images/codicon_package.png')} />
            <Text className="text-[16px] text-[#0560FA]">Receive a package</Text>
            <Text className="text-[7.45px] block">Receive request for deliveries or pickups</Text>
          </View>
        </TouchableOpacity>
        </View>

        {/* 2nd 2 cards */}
        <View className="flex flex-row gap-[23px] mt-[24px]">
        <TouchableOpacity onPress={() => navigation.navigate('Deliveries')}>
          <View className="bg-[#F2F2F2] w-[159px] h-[159px] pt-[20px] pl-2 rounded-[8px]">
          <MaterialIcons name="delivery-dining" size={54} color="#0560FA" />
            <Text className="text-[16px] text-[#0560FA]">Ongoing deliveries</Text>
            <Text className="text-[7.45px] block">keep track of pending deliveries</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="">
          <View className="bg-[#F2F2F2] w-[159px] h-[159px] pt-[35px] pl-2 rounded-[8px] ">
            <Feather name="phone-call" size={34} color="#0560FA" /> 
            <Text className="text-[16px] text-[#0560FA]">Chat with customers</Text>
            <Text className="text-[7.45px] block">Real-time communication with customers</Text>
          </View>
        </TouchableOpacity>
        </View>
        
        </View>
        
        
    </SafeAreaView>
  );
}
