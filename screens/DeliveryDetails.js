import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function DeliveryDetails() {
  // Use useRoute() hook to get the route object
  const route = useRoute();

  // Access the params passed from the SendPackage screen
  const {
    originAddress,
    originState,
    originPhoneNumber,
    destinationAddress,
    destinationState,
    destinationPhoneNumber,
    packageItem,
    packageWeight,
    packageWorth,
    deliveryType
  } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Origin Address: {originAddress}</Text>
      <Text>Origin State: {originState}</Text>
      <Text>Origin Phone Number: {originPhoneNumber}</Text>
      <Text>Destination Address: {destinationAddress}</Text>
      <Text>Destination State: {destinationState}</Text>
      <Text>Destination Phone Number: {destinationPhoneNumber}</Text>
      <Text>Package Item: {packageItem}</Text>
      <Text>Package Weight: {packageWeight}</Text>
      <Text>Package Worth: {packageWorth}</Text>
      <Text>Delivery Type: {deliveryType}</Text>
    </View>
  );
}
