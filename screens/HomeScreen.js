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
       
    </SafeAreaView>
  );
}
