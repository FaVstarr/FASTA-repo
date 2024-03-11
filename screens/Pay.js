import { View, Text, TextInput, SafeAreaView, Alert } from "react-native";
import React, { useState, useRef } from "react";
import { Paystack } from "react-native-paystack-webview";
import { Button } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'

export default function Pay({navigation}) {

  const route = useRoute()
  const [amount, setAmount] = useState("");
  const [isPaymentInitiated, setPaymentInitiated] = useState(false)
  const [transactionHistory, setTransactionHistory] = useState([])

  const { channels } = route.params
  console.log(channels)

  const firebaseConfig = {
    apiKey: "AIzaSyAcyj5Sh9Isv6eLHfnPWyPA2gnl7Mj03oU",
  authDomain: "fasta-60df9.firebaseapp.com",
  databaseURL: "https://fasta-60df9-default-rtdb.firebaseio.com",
  projectId: "fasta-60df9",
  storageBucket: "fasta-60df9.appspot.com",
  messagingSenderId: "243432423325",
  appId: "1:243432423325:web:9a32395c903043fc4ab974",
  measurementId: "G-VQW632BYGD"
  }

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }



  const handlePayment = () =>{
    
    if (!amount){
      Alert.alert("Error", "Please Enter an Amount")
      return
    }

    setPaymentInitiated(true)
  }

  const storeTransactionInDatabase = async (amount) =>{
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      try {
        await firebase.firestore().collection('transactions').add({
          userId: userId,
          amount: amount,
          description: 'Top up',
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          type: 'Deposit',
        });
        console.log('Transaction added to Firestore');

        const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

        const currentBalance = userDoc.data().balance || 0;
        await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({balance: currentBalance + parseFloat(amount)})
      } catch (error) {
        console.error('Error adding transaction to Firestore:', error);
      }
    }
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
    billingEmail="fasta@gmail.com"
    amount={amount}
    channels={channels}
    onCancel={(e) => {
      console.log('Cancelled Top up', e)
      setPaymentInitiated(false)
    }}
    onSuccess={ async (res) => {
      console.log('Successful', res)
      setTransactionHistory([...transactionHistory, amount]);
      await storeTransactionInDatabase(amount);
      setPaymentInitiated(false)
      navigation.goBack()
      

    }}
    
    autoStart={true}
  />

  </View>
)}

    </SafeAreaView>
  );
}
