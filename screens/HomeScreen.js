import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };


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
        <Text className="text-[24px] text-white">Hello Favour</Text>
        <Text className="text-[12px] text-white">We trust you're having a great time</Text>
      </View>
      <TouchableOpacity className="pl-[74px] pt-3">
        <Image source={require('../assets/images/notification.png')}/>
      </TouchableOpacity>
        </View>

        <View className="mt-[38px]">
          <Text className="text-[#0560FA]">Special for you</Text>
        </View>

        <View className="mt-[90px]">  
        <Text className="text-[#0560FA]">What will you like to do</Text>

        <TouchableOpacity>
          <View className="">
            <Image source={require('../assets/images/healthicons_call-centre.png')} />
            <Text className="text-[16px] text-[#0560FA]">Customer care</Text>
            <Text className="text-[7.45px] block">Our customer care service line is available from 8 -9pm week days and 9 - 5 weekends - tap to call us today</Text>
          </View>
        </TouchableOpacity>
        </View>
        
       
    </SafeAreaView>
  );
}
