import { View, Text, SafeAreaView, TextInput } from "react-native";
import React from "react";
import { Button } from "@rneui/themed"

export default function NewPassword() {
  return (
    <SafeAreaView className="px-6">
      <Text className="text-[24px] mt-[30px] text-[#3A3A3A] ">
        New Password
      </Text>
      <Text className="text-[14px] text-[#A7A7A7]">Enter New Password</Text>

      <View className="pt-[48px]">
        <Text className="pt-[20px] text-[#A7A7A7]">New Password</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={16}
          placeholder="********"
          secureTextEntry={true}
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Confirm Password</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={16}
          placeholder="********"
          secureTextEntry={true}
        />
      </View>

      <View className="mt-[64px] ">
        <Button title={'Set New Password'} 
        buttonStyle={{ backgroundColor: "rgba(5, 96, 250, 1)" }}
        onPress={() => navigation.navigate('NewPassword')}/>
    </View>

      
    </SafeAreaView>
  );
}
