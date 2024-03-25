import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function Wallet({ route, navigation }) {
  const { firstName, lastName } = route.params;
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0)

  const firebaseConfig = {
    apiKey: "AIzaSyAcyj5Sh9Isv6eLHfnPWyPA2gnl7Mj03oU",
    authDomain: "fasta-60df9.firebaseapp.com",
    databaseURL: "https://fasta-60df9-default-rtdb.firebaseio.com",
    projectId: "fasta-60df9",
    storageBucket: "fasta-60df9.appspot.com",
    messagingSenderId: "243432423325",
    appId: "1:243432423325:web:9a32395c903043fc4ab974",
    measurementId: "G-VQW632BYGD",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    fetchTransactionHistory();
    fetchCurrentBalance();

    return () => {};
  }, []);

  useFocusEffect(
    useCallback(()=>{
      fetchTransactionHistory();
      fetchCurrentBalance();
    }, [])
  )

  

  const fetchTransactionHistory = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      try {
        const transactionsRef = firebase
          .firestore()
          .collection("transactions")
          .where("userId", "==", userId);
        const snapshot = await transactionsRef.get();
        const transactions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate().toDateString(), // Convert Firebase Timestamp to JavaScript Date object
        }));
        setTransactionHistory(transactions);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    }
  };

  const fetchCurrentBalance = async () =>{
    const user = firebase.auth().currentUser;
    if (user){
      const userId = user.uid;
      try{
        const userDoc = await firebase.firestore().collection("users").doc(userId).get();
        const balance = userDoc.data()?.balance ?? 0
        setCurrentBalance(balance)
      }catch(error){
        Alert.alert('Error', 'Error fetching current balance/Transaction history, Try again later.')
        // Alert.error("Error fetching current balance/Transaction history: ", error)
      }
    }
  }

  const TopUpBank = () => {
    navigation.navigate("Pay", {
      channels: ["bank"],
    });
  };

  const TopUpTransfer = () => {
    navigation.navigate("Pay", {
      channels: ["bank_transfer"],
    });
  };

  const TopUpCard = () => {
    navigation.navigate("Pay", {
      channels: ["card"],
    });
  };

 

  

  return (
    <ScrollView>
      <SafeAreaView className="pl-2">
      
      <View className="flex flex-row">
        <Image
          source={require("../assets/images/defaultProfile.jpg")}
          style={{ width: 100, height: 100 }}
        />
        <View>
          <Text className="pt-[20px] pl-3 text-[#3A3A3A] text-[16px] font-semibold">
            {firstName} {lastName}
          </Text>
          <Text className="pl-3 text-[12px]">
            Current Balance:<Text className="text-[#0560FA] ">₦{currentBalance}</Text>{" "}
          </Text>
        </View>
      </View>

      {/* Top up card */}
      <View className="items-center bg-[#CFCFCF] w-[341.43px] ml-2 mt-[49px] py-[10px] rounded-[8px]">
        <Text className="pb-4 text-[16px] font-bold text-[#3A3A3A]">
          Top Up
        </Text>
        <View className="flex flex-row gap-[50px]">
          <View>
            <TouchableOpacity
              className="bg-[#0560FA] py-[14px] px-[14px] rounded-[49px] "
              onPress={TopUpBank}
            >
              <MaterialCommunityIcons name="bank" size={24} color="white" />
            </TouchableOpacity>
            <Text className="pl-2 text-[12px] text-[#3A3A3A]">Bank</Text>
          </View>
          <View>
            <TouchableOpacity
              className="bg-[#0560FA] py-[14px] px-[14px] rounded-[49px]"
              onPress={TopUpTransfer}
            >
              <FontAwesome
                name="exchange"
                size={24}
                color="white"
                style={{ paddingLeft: 5 }}
              />
            </TouchableOpacity>
            <Text className="pl-2 text-[12px] text-[#3A3A3A]">Transfer</Text>
          </View>
          <View>
            <TouchableOpacity
              className="bg-[#0560FA] py-[14px] px-[14px] rounded-[49px]"
              onPress={TopUpCard}
            >
              <Ionicons name="card-sharp" size={24} color="white" />
            </TouchableOpacity>
            <Text className="pl-2 text-[12px] text-[#3A3A3A]">Card</Text>
          </View>
        </View>
      </View>

      {/* Transaction History */}
      <View>
        <Text className="pl-3 pt-[40px] text-[20px] text-[#3A3A3A] pb-[20px]">
          Transaction History
        </Text>
        {/* Map later */}
        {transactionHistory.map((transaction, index) => (
          
            <View
              key={index}
              className=" flex flex-row mb-1"
              style={{elevation:4, backgroundColor: 'white', borderRadius: 3, padding: 10, marginVertical: 5}}
            >
              <View>
                <Text className="pl-2 text-[16px] text-[#3A3A3A]">
                  {transaction.description}
                </Text>
                <Text className="pl-2 text-[#A7A7A7] text-[12px]">
                  { transaction.timestamp}
                </Text>
              </View>
              <Text className={`text-[12px] font-medium pl-[190px] pt-[10px] ${transaction.description === "Top up" ? "text-green-600" : "text-red-600"}`}>
               {transaction.description === "Top up" ? "+" : "-"} {transaction.amount}
              </Text>
            </View>
          
        ))}
      </View>
    </SafeAreaView>
    </ScrollView>
    
  );
}
