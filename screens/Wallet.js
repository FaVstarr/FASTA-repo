import { View, Text, SafeAreaView, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Wallet({route, navigation}) {

  const {firstName, lastName} = route.params


  const TopUpBank = () => {
    navigation.navigate('Pay', {
      channel: ['bank']
    })
  }

  const TopUpTransfer = () =>{
    navigation.navigate('Pay', {
      channel: ['bank']
    })
  }

  const TopUpCard = () =>{
    navigation.navigate('Pay', {
      channel: ['card']
    })
  }
  

  return (
    
    <SafeAreaView className="pl-2">
      <View className="flex flex-row">
        <Image source={require("../assets/images/defaultProfile.jpg")} style={{width: 100, height:100}} />
        <View>
        <Text className="pt-[20px] pl-3 text-[#3A3A3A] text-[16px] font-semibold">{firstName} {lastName}</Text>
        <Text className="pl-3 text-[12px]">Current Balance:<Text className="text-[#0560FA] ">N10,712.00</Text> </Text>
        </View>

      </View>

    {/* Top up card */}
      <View className="items-center bg-[#CFCFCF] w-[341.43px] ml-2 mt-[49px] py-[10px] rounded-[8px]">
        <Text className="pb-4 text-[16px] font-bold text-[#3A3A3A]" >Top Up</Text>
        <View className="flex flex-row gap-[50px]">
          <View>
          <TouchableOpacity className='bg-[#0560FA] py-[14px] px-[14px] rounded-[49px] ' onPress={TopUpBank}>
          <MaterialCommunityIcons name="bank" size={24} color="white" />
          </TouchableOpacity>
          <Text className="pl-2 text-[12px] text-[#3A3A3A]">Bank</Text>
          </View>
          <View>
          <TouchableOpacity className='bg-[#0560FA] py-[14px] px-[14px] rounded-[49px]' onPress={TopUpTransfer} >
          <FontAwesome name="exchange" size={24} color="white" style={{paddingLeft: 5}}/>
          </TouchableOpacity>
          <Text className="pl-2 text-[12px] text-[#3A3A3A]">Transfer</Text>
          </View>
          <View>
          <TouchableOpacity className='bg-[#0560FA] py-[14px] px-[14px] rounded-[49px]' onPress={TopUpCard} >
          <Ionicons name="card-sharp" size={24} color="white" />
          </TouchableOpacity>
          <Text className="pl-2 text-[12px] text-[#3A3A3A]">Card</Text>
          </View>
        </View>
      </View>

      {/* Transaction History */}
      <View>
        <Text className="pl-3 pt-[40px] text-[20px] text-[#3A3A3A] pb-[20px]">Transaction History</Text>
        {/* Map later */}
        <View className="ml-3 flex flex-row"style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          
          elevation: 15,
        }} >
         <View>
         <Text className="pl-2 text-[16px] text-[#3A3A3A]">Delivery fee</Text>
          <Text className="pl-2 text-[#A7A7A7] text-[12px]">February 23, 2024</Text>
         </View>
         <Text className="text-[#ED3A3A] text-[12px] font-medium pl-[160px] pt-[10px]">-N3000</Text>
        </View>
      </View>
      
    </SafeAreaView>
  )
}