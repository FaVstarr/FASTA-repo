import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
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

export default function DeliveriesScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState('Pending');
  const [loading, setLoading] = useState(true);

  const route = useRoute();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const fetchDeliveryInfo = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (!user) {
          console.error('User not authenticated');
          return;
        }
  
        const userId = user.uid;
        const deliveriesRef = firebase.firestore().collection('deliveries');
  
        const querySnapshot = await deliveriesRef
          .where('userId', '==', userId)
          .get();
  
        const deliveriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        let completedDelivery = null;
        for (const delivery of deliveriesData) {
          if (delivery.isCompleted) {
            completedDelivery = delivery;
            break;
          }
        }
  
        if (completedDelivery) {
          setDeliveryInfo(completedDelivery);
          setDeliveryStatus('Package Delivered');
        } else {
          // If there is no completed delivery, set status based on accepted status
          const latestDelivery = deliveriesData[0];
          setDeliveryInfo(latestDelivery);
  
          if (latestDelivery && latestDelivery.isAccepted) {
            setDeliveryStatus('Ready for Delivery');
          } else {
            setDeliveryStatus('Pending');
          }
        }
      } catch (error) {
        console.error('Error fetching delivery info:', error);
        Alert.alert('Error', 'Failed to fetch delivery info');
      } finally {
        setLoading(false);
      }
    };
  
    if (!deliveryInfo) {
      fetchDeliveryInfo();
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {deliveryStatus === 'Package Delivered' || deliveryStatus === 'Ready for Delivery'  ? (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location?.coords.latitude || 0,
              longitude: location?.coords.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Your Location"
                description="This is your current location"
              />
            )}
          </MapView>
          {deliveryStatus !== 'Package Delivered' && ( // Render only if the package is not delivered
          <View style={{ minHeight: 200, backgroundColor: 'lightgray', padding: 10 }}>
            <Text>Tracking Number: {deliveryInfo.trackingNumber}</Text>
            <Text>Status: {deliveryStatus}</Text>
            {/* Render other delivery info properties here */}
          </View>
        )}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ height: 400 }}>
            {location ? (
              <MapView
                style={{ flex: 1, height: 300 }}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="Your Location"
                  description="This is your current location"
                />
              </MapView>
            ) : (
              <Text className="flex-1 items-center justify-center">Loading ...</Text>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
