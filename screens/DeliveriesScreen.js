import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

export default function DeliveriesScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const route = useRoute()
  const {deliveryInfo} = route.params ?? {deliveryInfo: null}

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
      {deliveryInfo ? (
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
          <View style={{ minHeight: 200, backgroundColor: 'lightgray', padding: 10 }}>
            <Text>Tracking Number: {deliveryInfo.trackingNumber}</Text>
            {/* Render other delivery info properties here */}
          </View>
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
