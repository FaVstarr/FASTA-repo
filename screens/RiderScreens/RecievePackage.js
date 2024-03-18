import { View, Text, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { Button } from "@rneui/themed";

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




export default function RecievePackage() {

  const [deliveryInfo, setDeliveryInfo] = useState([])
const [loading, setLoading] = useState(true);




useEffect(() => {
  const fetchDeliveryInfo = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const userId = user.uid;
      const deliveryRef = firebase.firestore().collection("deliveries");

      // Query the delivery based on user ID and other relevant criteria
      const querySnapshot = await deliveryRef
        .where("isCompleted", "==", false)
        .orderBy("timestamp", "desc")
        .limit(1)
        .get();

        

      if (!querySnapshot.empty) {
        // Get the first document in the query result
        const request = querySnapshot.docs.map((doc)=> ({
          id: doc.id,
          ...doc.data()
        }))

        setDeliveryInfo(request)
      } else {
        console.log("No pending delivery found for the user");
      }
    } catch (error) {
      console.error("Error fetching delivery info:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDeliveryInfo();
}, []);

const handleAcceptDelivery = async (requestId) => {
  try {
    const deliveryRef = firebase.firestore().collection("deliveries").doc(requestId);
    await deliveryRef.update({
      isAccepted: true,
      assignedTo: firebase.auth().currentUser.uid
    });
    ToastAndroid.show("Delivery accepted", ToastAndroid.SHORT);
  } catch (error) {
    console.error("Error accepting delivery:", error);
    Alert.alert("Error", "Failed to accept delivery");
  }
};

const handleDeclineDelivery = async (requestId) => {
  try {
    const deliveryRef = firebase.firestore().collection("deliveries").doc(requestId);
    await deliveryRef.update({
      isDeclined: true,
    });
    ToastAndroid.show("Delivery declined", ToastAndroid.SHORT);
  } catch (error) {
    console.error("Error declining delivery:", error);
    Alert.alert("Error", "Failed to decline delivery");
  }
};
  return (
    <SafeAreaView>
      <View>
      {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View className="px-3">
            
            {deliveryInfo.map((request)=> (
              
              <View key={request.id} className="shadow ">
                <Text className="text-[20px]">Receive Delivery?</Text>
                <Text className="pt-4">Destination Address: <Text className="text-[#EC8000]">{request.destinationAddress}</Text> </Text>
                <Text>Origin Address: <Text className="text-[#EC8000]">{request.originAddress}</Text></Text>
                <Text>Sender's Phone Number: <Text className="text-[#EC8000]">{request.originPhoneNumber}</Text>  </Text>
                <Text>Tracking ID: <Text className="text-[#EC8000]">{request.trackingNumber}</Text>  </Text>
                <View className="flex-row flex pt-5 ">
                <Button title="Accept" buttonStyle={{width: 80 , backgroundColor: "green"}} onPress={handleAcceptDelivery} />
                <Button title="Decline" buttonStyle={{width: 80 , backgroundColor: "red", marginLeft: 8}} onPress={handleDeclineDelivery}/>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
