import React , {useState} from "react";
import {  Text, TextInput, View , FlatList, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox, Button } from '@rneui/themed';



export default function Signup({ navigation }) {
    const [checked, setChecked] = useState(true)
    const toggleCheckbox = () => setChecked(!checked);
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
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={40}
          placeholder="Favour Chamberlain"
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Phone Number</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={40}
          placeholder="07080136822"
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Email</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={40}
          placeholder="favourchamberlain32@gmail.com"
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Password</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={16}
          placeholder="********"
          secureTextEntry={true}
        />
      </View>
      
      <View className="flex flex-row mt-4">
      <CheckBox className=""
           checked={checked}
           onPress={toggleCheckbox}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
           
           
         />
        <Text className="mr-6 text-[12px] block pr-8 pt-3 text-[#A7A7A7]">By ticking this box, you agree to our <Text className="text-[#EBBC2E]"> Terms and conditions and private policy</Text></Text>

        
      </View>

      <View className="mt-[30px]">
        <Button className=""
        title="Sign up" 
        buttonStyle={{backgroundColor: 'rgba(5, 96, 250, 1)'}}/>
      </View>

      <View className="flex flex-row">
        <Text className="mt-3">Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text className="pt-3 text-[#0560FA]">Sign in</Text>
        </TouchableOpacity>
      </View>
      
      

        
      
      
    </SafeAreaView>
  );
}
