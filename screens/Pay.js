import { View, Text, TextInput, SafeAreaView, Alert } from "react-native";
import React, { useState, useRef } from "react";
import { Paystack } from "react-native-paystack-webview";
import { Button } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

export default function Pay() {

  const route = useRoute()
  const [amount, setAmount] = useState("");
  const [isPaymentInitiated, setPaymentInitiated] = useState(false)

  const channels = route.params

  const handlePayment = () =>{
    
    if (!amount){
      Alert.alert("Error", "Please Enter an Amount")
      return
    }

    setPaymentInitiated(true)
  }
  
  return (
    <SafeAreaView >

      
      
      <View className="flex items-center justify-center mt-[50px]">
        <TextInput
          className="border mt-3 px-3"
          maxLength={40}
          placeholder="Enter Amount"
          keyboardType="numeric"
          onChangeText={(text) => setAmount(text.trim())}
        />

        <View className="mt-[70px]">
          <Button
            title="Top up"
            buttonStyle={{ backgroundColor: "rgba(5, 96, 250, 1)", width: 240 }}
            onPress={handlePayment}
            
          />
        </View>
      </View>

{isPaymentInitiated && (
  <View style={{flex: 1}}>
  <Paystack 
    paystackKey="pk_test_08555b0e5cc78a3baca110871fd0f2da7e78417f"
    billingEmail="favourchamberlain32@gmail.com"
    amount={amount}
    channels={channels}
    onCancel={(e) => {
      console.log('Cancelled Top up')
      setPaymentInitiated(false)
    }}
    onSuccess={(res) => {
      console.log('Successful', res)
      setPaymentInitiated(false)
    }}
    
    autoStart={true}
  />

  </View>
)}

    </SafeAreaView>
  );
}
