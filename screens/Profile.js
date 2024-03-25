import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React , { useEffect, useState, useCallback}from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

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




export default function Profile({ route, navigation }) {

  useEffect(() => {
    fetchCurrentBalance();
  
    return () => {};
  }, []);
  
  useFocusEffect(
    useCallback(()=>{
      
      fetchCurrentBalance();
    }, [])
  )

  const { firstName, lastName } = route.params;
  const [currentBalance, setCurrentBalance] = useState(0)

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

  return (
    <SafeAreaView>
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

      <View className="pt-[40px]">
        <View className="px-[30px]">
         <TouchableOpacity style={{elevation:2, backgroundColor: 'white', borderRadius: 3, padding: 10, marginVertical: 5}}>
          <View className="flex-row">
          <EvilIcons name="user" size={44} color="black" />
          <View>
            <Text className="text-[16px]">Edit Profile</Text>
            <Text className="text-[#A7A7A7] text-[12px]">Name, phone no, address, email ...</Text>
          </View>
          </View>
         </TouchableOpacity>
          {/* 2 */}
         <TouchableOpacity style={{elevation:2, backgroundColor: 'white', borderRadius: 3, padding: 10, marginVertical: 5}}>
          <View className="flex-row">
          <Ionicons name="newspaper-outline" size={34} color="black" />
          <View>
            <Text className="text-[16px]">Statements & Reports</Text>
            <Text className="text-[#A7A7A7] text-[12px]">Download transaction details, deliveries ...</Text>
          </View>
          </View>
         </TouchableOpacity>

         {/* 3 */}
         <TouchableOpacity style={{elevation:2, backgroundColor: 'white', borderRadius: 3, padding: 10, marginVertical: 5}}>
          <View className="flex-row">
          <Octicons name="bell" size={34} color="black" />
          <View>
            <Text className="text-[16px]">Notification Settings</Text>
            <Text className="text-[#A7A7A7] text-[12px]">mute, unmute, set location & tracking setting</Text>
          </View>
          </View>
         </TouchableOpacity>
         {/* 4 */}

         <TouchableOpacity style={{elevation:2, backgroundColor: 'white', borderRadius: 3, padding: 10, marginVertical: 5}}>
          <View className="flex-row">
          <EvilIcons name="user" size={44} color="black" />
          <View>
            <Text className="text-[16px]">Edit Profile</Text>
            <Text className="text-[#A7A7A7] text-[12px]">Name, phone no, address, email ...</Text>
          </View>
          </View>
         </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}