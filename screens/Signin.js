import React, { useState } from "react";
import { Text, TextInput, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox, Button } from "@rneui/themed";

export default function Signin({ navigation }) {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  return (
    <SafeAreaView className="px-6">
      <Text className="text-[24px] mt-[30px] text-[#3A3A3A] ">
        Welcome Back
      </Text>
      <Text className="text-[14px] text-[#A7A7A7]">
        Fill in your email and password to continue
      </Text>
      {/* Form */}
      <View className="mt-[30px]">
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

      <View className="flex flex-row gap-2">
        <View className="flex flex-row mt-4">
          <CheckBox
            className=""
            checked={checked}
            onPress={toggleCheckbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={"checkbox-blank-outline"}
          />
          <Text className="mr-6 text-[12px] block  pt-3 text-[#A7A7A7]">
            Remember password
          </Text>
        </View>
      <TouchableOpacity className="pt-3 " onPress={()=>navigation.navigate('ForgotPassword')}>
        <Text className="text-[#0560FA] text-[12px]">Forgot Password</Text>
      </TouchableOpacity>
      </View>

      <View className="mt-[30px]">
        <Button
          className=""
          title="Sign up"
          buttonStyle={{ backgroundColor: "rgba(5, 96, 250, 1)" }}
        />
      </View>

      <View className="flex flex-row">
        <Text className="mt-3">Don't have an account?</Text>
        <TouchableOpacity onPress={()=> navigation.push('Signup')}>
            <Text className="pt-3 text-[#0560FA]">
                Sign up
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
