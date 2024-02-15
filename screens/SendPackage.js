import { View, Text,TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function SendPackage() {

  



  return (
    <SafeAreaView>
      <View className="px-5">
        <View className="">
        <View className="flex flex-row gap-2">
        <MaterialIcons name="location-searching" size={24} color="#0560FA" />
        <Text className="text-[14px] text-[#3A3A3A] font-medium">Origin Details</Text>
        </View>
        {/* The Text inputs for the Send Package */}
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5"
          maxLength={40}
          placeholder="Address"
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 mt-1"
          maxLength={40}
          placeholder="State"
        />
        <TextInput
          className="shadow py-[17px]  placeholder-slate-400 text-[#3A3A3A] pl-5 mt-1"
          maxLength={11}
          placeholder="Phone number"
          keyboardType='numeric'
        />
        </View>
      </View>
    </SafeAreaView>
  )
}