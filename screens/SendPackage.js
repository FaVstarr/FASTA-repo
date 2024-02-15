import { View, Text,TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SendPackage() {

  const [color , setColor] = useState("")

  const click = (color) =>{

    setColor(color)
  }
useEffect(()=>{
  
},[color])

 


  return (
    <SafeAreaView>
      <ScrollView className="px-5">
        <View className="">
        <View className="flex flex-row gap-2 pt-2">
        <MaterialIcons name="location-searching" size={24} color="#0560FA" />
        {/* Origin Details Section */}
        <Text className="text-[14px] text-[#3A3A3A] font-medium">Origin Details</Text>
        </View>
        {/* The Text inputs for the Send Package */}
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5"
          maxLength={40}
          placeholder="Address"
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="State"
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={11}
          placeholder="Phone number"
          keyboardType='numeric'
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="Landmark"
        />
        </View>
        {/* Destination Details Section */}
        <View className="mt-[39px]">
        <View className="flex flex-row gap-2">
        <MaterialIcons name="location-on" size={24} color="#0560FA" />
        {/* Origin Details Section */}
        <Text className="text-[14px] text-[#3A3A3A] font-medium">Destination Details</Text>
        </View>
        {/* The Text inputs for the Send Package */}
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5"
          maxLength={40}
          placeholder="Address"
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="State"
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={11}
          placeholder="Phone number"
          keyboardType='numeric'
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="Landmark"
        />
        </View>
        {/* Package details */}
        <View className="pl-2 py-2">
        <Text className="text-[14px] text-[#3A3A3A] font-medium">Package Details</Text>
        </View>
        {/* The Text inputs for the Package Items */}
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5"
          maxLength={40}
          placeholder="Package items"
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="Good type eg. Food"
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={11}
          placeholder="Worth of Item"
          keyboardType='numeric'
        />
        <View>
          <Text className="pl-2">Select Delivery type</Text>
          <View className="flex flex-row gap-[14px]">
            <TouchableOpacity className="bg-slate-300 " onPress={() => {click}} >
              <View className="items-center h-[75px] w-[159px] rounded  pt-[13px]">
              <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
              <Text>Instant Delivery</Text>
              </View>
            </TouchableOpacity>
            {/* Scheduled delivery */}
            <TouchableOpacity className="bg-slate-300">
              <View className="items-center  h-[75px] w-[159px] rounded px-2 mb-3  pt-[13px]">
              <FontAwesome5 name="calendar-alt" size={24} color="black" />
              <Text>Scheduled Delivery</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}