import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin({ navigation }) {
  return (
    <SafeAreaView className="px-6">
      <Text className="text-[24px] mt-[30px] text-[#3A3A3A] ">
        Create Account
      </Text>
      <Text className="text-[14px] text-[#A7A7A7]">
        Complete the sign up process to get started
      </Text>
      {/* Form */}
      <View className="mt-[30px]">
        <Text className="text-[#A7A7A7]">Full Name</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-4"
          maxLength={40}
          placeholder="Favour Chamberlain"
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Phone Number</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-4"
          maxLength={40}
          placeholder="07080136822"
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Email</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-4"
          maxLength={40}
          placeholder="favourchamberlain32@gmail.com"
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Password</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-4"
          maxLength={16}
          placeholder="********"
          secureTextEntry={true}
        />
      </View>

      <View>
       
      </View>
    </SafeAreaView>
  );
}
