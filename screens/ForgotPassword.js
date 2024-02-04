import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import { CheckBox, Button } from "@rneui/themed";

export default function ForgotPassword() {
  return (
    <SafeAreaView className="px-6">
       <Text className="text-[24px] mt-[30px] text-[#3A3A3A] ">
        Forgot Password
      </Text>
      <Text className="text-[14px] text-[#A7A7A7]">
        Enter your email address
      </Text>
      {/* Form */}
      <View className="mt-[30px]">
        <Text className="pt-[20px] text-[#A7A7A7]">Email</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-4"
          maxLength={40}
          placeholder="favourchamberlain32@gmail.com"
        />
    </View>

    <View className="mt-[64px]">
        <Button title={'Send OTP'} 
        buttonStyle={{ backgroundColor: "rgba(5, 96, 250, 1)" }}/>
    </View>
    </SafeAreaView>
  )
}