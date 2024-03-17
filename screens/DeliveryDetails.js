import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed'; 


export default function DeliveryDetails({ navigation }) {
  // Use useRoute() hook to get the route object
  const route = useRoute();

  // Access the params passed from the SendPackage screen
  const {
    originAddress,
    originState,
    originPhoneNumber,
    originLandMark,
    destinationAddress,
    destinationState,
    destinationPhoneNumber,
    destinationLandMark,
    packageItem,
    packageType,
    packageWorth,
    deliveryType
  } = route.params;

  return (
    <SafeAreaView className="pl-5">
        <Text className="text-[#0560FA] text-[16px]">Package Information</Text>
        <Text className="text-[#3A3A3A] text-[12px]">Origin Details</Text>
      <Text className="text-[#A7A7A7] text-[12px]">{originAddress} ,{originLandMark}, {originState} </Text>
      <Text className="text-[#A7A7A7] text-[12px]">{originPhoneNumber}</Text>
      <Text className="text-[#3A3A3A] text-[12px] pt-3">Destination details</Text>
      <Text className="text-[#A7A7A7] text-[12px]">{destinationAddress},{destinationLandMark},{destinationState}</Text>
      <Text className="text-[#A7A7A7] text-[12px]">{destinationPhoneNumber}</Text>
      <Text className="text-[#3A3A3A] text-[12px] pt-3">Other details</Text>
      <View className="flex flex-row">
      <Text className="text-[#A7A7A7] text-[12px]">Package Item</Text>
      <Text className="text-[#EC8000] text-[12px] pl-[190px]">{packageItem}</Text>
      </View>
      
     
      <View className="flex flex-row">
        <Text className="text-[#A7A7A7] text-[12px]">Package Type:</Text>
        <Text className="text-[#EC8000] text-[12px] pl-[190px]">{packageType}</Text>
      </View>
      <View className="flex flex-row">
        <Text className="text-[#A7A7A7] text-[12px]">Package Worth:</Text>
        <Text className="text-[#EC8000] text-[12px] pl-[180px]">N{packageWorth}</Text>
      </View>
      <View className="flex flex-row">
        <Text className="text-[#A7A7A7] text-[12px]">Tracking Number:</Text>
        <Text className="text-[#EC8000] text-[12px] pl-[65px]">R-7458-4567-4434-5854</Text>
      </View>
    

      <Text className="text-[#0560FA] text-[16px]">Charges</Text>
      <View>
        <Text className="text-[#A7A7A7] text-[12px]" >Delivery Charges</Text>
      </View>
      <View>
      <Text className="text-[#A7A7A7] text-[12px]">{deliveryType} delivery</Text>
      </View>
      <View>
      <Text className="text-[#A7A7A7] text-[12px]">Tax and service Charges</Text>
      </View>
      <View>
      <Text className="text-[#A7A7A7] text-[12px]">Package total</Text>
      </View>
      <View className="mt-[70px] flex flex-row ">
        <TouchableOpacity  >
            <Button title={"Edit Package"} type='outline'containerStyle={{
                width: 158
            }} buttonStyle={{
                borderColor: '#0560FA',
                borderRadius: 1,
            }} onPress={()=> navigation.navigate('SendPackage')} />
        </TouchableOpacity>
        <TouchableOpacity className="pl-[30px]">
            <Button title={"Make payment"} type='solid'containerStyle={{
                width: 158
            }} buttonStyle={{
                backgroundColor: '#0560FA',
                borderRadius: 1,
            }} />
        </TouchableOpacity>

      </View>
      
    </SafeAreaView>
  );
}
