import { View, Text, TextInput,  SafeAreaView } from 'react-native'
import React from 'react'
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { Button } from '@rneui/themed'

export default function Pay() {
  return (
    <SafeAreaView >

        <View className="flex items-center justify-center mt-[50px]">
        <TextInput className="border mt-3 px-3"
        maxLength={40}
        placeholder='Enter Amount'
        keyboardType='numeric'
        />

        <View className="mt-[70px]">
        <Button
        title="Top up"
        buttonStyle={{backgroundColor: 'rgba(5, 96, 250, 1)', width: 240}}
        
         />
        </View>
        
        </View>



    </SafeAreaView>
  )
}