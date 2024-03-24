import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Alert, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ToastAndroid } from "react-native";

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

export default function Deliveries() {
  const [ongoingDeliveries, setOngoingDeliveries] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOngoingDeliveries = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (!user) {
          console.error('User not authenticated');
          return;
        }

        const userId = user.uid;
        const deliveriesRef = firebase.firestore().collection('deliveries');

        // Query ongoing deliveries assigned to the current user
        const querySnapshot = await deliveriesRef
          .where('assignedTo', '==', userId)
          .where('isCompleted', '==', false)
          .get();

        const deliveries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOngoingDeliveries(deliveries);
      } catch (error) {
        console.error('Error fetching ongoing deliveries:', error);
        Alert.alert('Error', 'Failed to fetch ongoing deliveries');
      }
      finally{
        setLoading(false)
      }
    };

    fetchOngoingDeliveries();
  }, []);

  const handleCompleteDelivery = async (deliveryId) => {
    try {
      const deliveryRef = firebase.firestore().collection('deliveries').doc(deliveryId);
      await deliveryRef.update({
        isCompleted: true,
      });
      setOngoingDeliveries(prevDeliveries => prevDeliveries.filter(delivery => delivery.id !== deliveryId));
      Alert.alert('Success', 'Delivery marked as completed');
    } catch (error) {
      console.error('Error completing delivery:', error);
      Alert.alert('Error', 'Failed to mark delivery as completed');
    }
  };

  return (
    <SafeAreaView className="">
      <View  className="" >
        
        {loading ? (
          <View className="items-center">
            <Image source={require('../../assets/images/ZKZx.gif')} style={{ width: 50, height: 50 }} />
          </View>
        ) : ongoingDeliveries.map((delivery) => (
          <View key={delivery.id} className="pl-3 pb-5">
            <Text>Destination: <Text className="text-[#EC8000]">{delivery.destinationAddress}</Text></Text>
            <Text>Destination Landmark: <Text className="text-[#EC8000]">{delivery.destinationLandMark}</Text></Text>
            <Text>Origin: <Text className="text-[#EC8000]">{delivery.originAddress}</Text></Text>
            
            {/* Add more delivery details as needed */}
            <Button
              title="Complete"
              buttonStyle={{width: 100 , backgroundColor: "green", marginTop: 30}}
              onPress={() => handleCompleteDelivery(delivery.id)}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
