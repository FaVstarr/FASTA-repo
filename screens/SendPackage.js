import { View, Text,TextInput, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, {useState, useEffect} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function SendPackage({navigation}) {

const [originAddress, setOriginAddress] = useState("")
const [originState, setOriginState] = useState("")
const [originPhoneNumber, setOriginPhoneNumber] = useState("")
const [originLandMark, setOriginLandMark] = useState("")
const [destinationAddress, setDestinationAddress] = useState("")
const [destinationState, setDestinationState] = useState("")
const [destinationPhoneNumber, setDestinationPhoneNumber] = useState("")
const [destinationLandMark, setDestinationLandMark] = useState("")
const [packageItem, setPackageItem] = useState("")
const [packageType, setPackageType] = useState("")
const[packageWorth, setPackageWorth] = useState("")
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);




const handleInstantDeliveryClick = () =>{
  const today = new Date();
  const date =  today.toDateString() 

  navigation.navigate('DeliveryDetails', {
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
    deliveryType: 'Instant',
    date: date,
    trackingNumber: trackingNumber.toString()
    
  })
}

const handleScheduledDeliveryClick = (date) => {
  navigation.navigate('DeliveryDetails', {
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
    deliveryType: 'Scheduled',
    date: date.toDateString(),
    trackingNumber: trackingNumber.toString()
    
  });
};

const showDatePicker = () => {
  setDatePickerVisibility(true);
};

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
  handleScheduledDeliveryClick(date)
  hideDatePicker();
};

const generateTrackingNumber = () => {
  // Generate four random 4-digit numbers
  const randomNumber1 = Math.floor(1000 + Math.random() * 9000);
  const randomNumber2 = Math.floor(1000 + Math.random() * 9000);
  const randomNumber3 = Math.floor(1000 + Math.random() * 9000);
  const randomNumber4 = Math.floor(1000 + Math.random() * 9000);

  // Construct the tracking number in the desired format
  const trackingNumber = `R-${randomNumber1}-${randomNumber2}-${randomNumber3}-${randomNumber4}`;

  return trackingNumber;
};

const trackingNumber = generateTrackingNumber();


  return (
    <SafeAreaView>
      <ScrollView className="px-5">
        <View className="">
        <View className="flex flex-row gap-2 pt-2">
        <MaterialIcons name="location-searching" size={24} color="#0560FA" />
        {/* Origin Details Section */}
        <Text className="text-[14px] text-[#3A3A3A] font-medium">Origin Details</Text>
        </View>
        {/* The Text inputs for the Send Package */}
        <TextInput
          className={`shadow py-[17px] border rounded-lg ${Platform.OS === 'ios' ? 'placeholder-black' : 'placeholder-slate-800' }  text-[#3A3A3A] pl-5`}
          maxLength={40}
          placeholder="Address"
          onChangeText={setOriginAddress}
        />
        <TextInput
          className="shadow py-[17px] border mt-2 rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="State"
          onChangeText={setOriginState}
        />
        <TextInput
          className="shadow py-[17px] border mt-2 rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={11}
          placeholder="Phone number"
          keyboardType='numeric'
          onChangeText={setOriginPhoneNumber}
        />
        <TextInput
          className="shadow py-[17px] border mt-2 rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="Landmark"
          onChangeText={setOriginLandMark}
        />
        </View>
        {/* Destination Details Section */}
        <View className="mt-[39px]">
        <View className="flex flex-row gap-2">
        <MaterialIcons name="location-on" size={24} color="#0560FA" />
        {/* Origin Details Section */}
        <Text className="text-[14px]  text-[#3A3A3A] font-medium">Destination Details</Text>
        </View>
        {/* The Text inputs for the Send Package */}
        <TextInput
          className="shadow py-[17px] border mt-2 rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5"
          maxLength={40}
          placeholder="Address"
          onChangeText={setDestinationAddress}
        />
        <TextInput
          className="shadow py-[17px] border mt-2 rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="State"
          onChangeText={setDestinationState}
        />
        <TextInput
          className="shadow py-[17px] border mt-2 rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={11}
          placeholder="Phone number"
          keyboardType='numeric'
          onChangeText={setDestinationPhoneNumber}
        />
        <TextInput
          className="shadow py-[17px] border mt-2 rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="Landmark"
          onChangeText={setDestinationLandMark}
        />
        </View>
        {/* Package details */}
        <View className="pl-2 py-2">
        <Text className="text-[14px] text-[#3A3A3A] font-medium">Package Details</Text>
        </View>
        {/* The Text inputs for the Package Items */}
        <TextInput
          className="shadow py-[17px] border rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5"
          maxLength={40}
          placeholder="Package items"
          onChangeText={setPackageItem}
        />
        <TextInput
          className="shadow py-[17px] border mt-2 rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={40}
          placeholder="Good type eg. Food"
          onChangeText={setPackageType}
        />
        <TextInput
          className="shadow py-[17px] border mt-2 rounded-lg placeholder-slate-400 text-[#3A3A3A] pl-5 "
          maxLength={11}
          placeholder="Worth of Item"
          keyboardType='numeric'
          onChangeText={setPackageWorth}
        />
        <View>
          <Text className="pl-2">Select Delivery type</Text>
          <View className="flex flex-row gap-[14px] mb-[40px]">
            <TouchableOpacity className="bg-slate-300 " onPress={handleInstantDeliveryClick} >
              <View className="items-center h-[75px] w-[159px] rounded  pt-[13px]">
              <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
              <Text>Instant Delivery</Text>
              </View>
            </TouchableOpacity>
            {/* Scheduled delivery */}
            <TouchableOpacity className="bg-slate-300" onPress={showDatePicker}>
              <View className="items-center  h-[75px] w-[159px] rounded px-2 mb-3  pt-[13px]">
              <FontAwesome5 name="calendar-alt" size={24} color="black" />
              <Text>Scheduled Delivery</Text>
              </View>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}