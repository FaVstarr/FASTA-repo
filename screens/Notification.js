import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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


export default function Notification() {
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedDeliveries = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (!user) {
          console.error('User not authenticated');
          return;
        }

        const userId = user.uid;
        console.log(userId)
        const deliveriesRef = firebase.firestore().collection('deliveries');

        // Query completed deliveries assigned to the current user
        const querySnapshot = await deliveriesRef
          .where('userId', '==', userId)
          // .where('isCompleted', '==', true || 'isCompleted', '==', false)
          .get();

        const completedDeliveriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCompletedDeliveries(completedDeliveriesData);
      } catch (error) {
        console.error('Error fetching completed deliveries:', error);
        Alert.alert('Error', 'Failed to fetch completed deliveries');
      } finally {
        setLoading(false);
      }
    };
    console.log("fetching...")
    fetchCompletedDeliveries();
  }, []);

  return (
    <SafeAreaView>
      <View>
        {loading ? (
          <Text>Loading...</Text>
        ) : completedDeliveries.length === 0 ? (
          <Text>No notifications at the moment...</Text>
        ) : (
          completedDeliveries.map((delivery) => (
            <View key={delivery.id} className="pl-5">
              
              <View>
              <View className="flex-row gap-9">
                <Text className='text-[25px]'>Delivery status</Text>
               
              </View>
              <Text>Delivery ID:<Text className={`${delivery.isCompleted ? 'text-green-600' : 'text-yellow-500'}`}> {delivery.trackingNumber}</Text></Text>
              <Text>Destination: <Text className={`${delivery.isCompleted ? 'text-green-600' : 'text-yellow-500'}`}>{delivery.destinationAddress}</Text></Text>
              <Text>Origin: <Text className={`${delivery.isCompleted ? 'text-green-600' : 'text-yellow-500'}`}>{delivery.originAddress}</Text></Text>
              </View>
              <Text className={`bg-${delivery.isCompleted ? 'green' : 'yellow'}-500 px-2 py-2 text-white w-[100px] mt-4 rounded-md`}>{delivery.isCompleted ? 'Completed' : 'Pending'}</Text>
              {/* Add more delivery details as needed */}
            </View>
          ))
        )}
      </View>
    </SafeAreaView>
  );
}
