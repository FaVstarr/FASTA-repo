import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

export default function DeliveriesScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const route = useRoute()
  const {deliveryInfo} = route.params

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{height: 400 }}>
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
      <View className="pl-5 mt-5">
        <Text>Tracking Number</Text>
      </View>
      <View className="pl-5 flex">
        
        <Text>Tracking Number here</Text>
      </View>
      <View></View>
    </SafeAreaView>
  );
}
