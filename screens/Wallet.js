import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'

export default function Wallet({route}) {

  const {firstName, lastName} = route.params
  return (
    <SafeAreaView className="pl-5">
      <View className="flex flex-row">
        <Image source={require("../assets/images/defaultProfile.jpg")} style={{width: 80, height:100}} />
        <Text className="pt-[40px] pl-4">{firstName} {lastName}</Text>
      </View>
    </SafeAreaView>
  )
}