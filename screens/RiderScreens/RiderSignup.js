import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox, Button } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

export default function Signup({ navigation }) {
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const[vehiclePlateNumber, setVehiclePlateNumber] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };



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

  const signUp = async () => {
    try {
      const [first, last] = fullName.split(" ");
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      // Optionally, you can update the user's profile information here
      console.log("Full name:", fullName);
      await userCredential.user.updateProfile({
        displayName: fullName,
      });

      await firebase
        .firestore()
        .collection("riders")
        .doc(userCredential.user.uid)
        .set({
          firstName: first.trim(),
          lastName: last.trim(),
          phoneNumber: phoneNumber,
          vehicleColor: vehicleColor,
          vehicleType: vehicleType,
          isRider: true
        });
      ToastAndroid.show("Sign up successful", 3000);
      navigation.navigate("RiderLogin");
      // Redirect or perform actions after successful signup
      console.log("User signed up successfully:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert("Error", error.message);
      console.log("Error message", error.message);
    }
  };

  return (
    <ScrollView>
          <SafeAreaView className="px-6">
      <Text className="text-[24px] mt-[30px] text-[#3A3A3A] ">
        Rider Signup
      </Text>
      <Text className="text-[14px] text-[#A7A7A7]">
        Complete the sign up process to get started
      </Text>
      {/* Form */}
      <View className="mt-[30px]">
        <Text className="text-[#A7A7A7]">Full Name</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={40}
          placeholder="Favour Chamberlain"
          onChangeText={(text) => setFullName(text.trim())}
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Phone Number</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={11}
          placeholder="07080136822"
          keyboardType="numeric"
          onChangeText={(text) => setPhoneNumber(text.trim())}
        />
        <Text className="pt-[20px] text-[#A7A7A7]">Vehicle Color</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={11}
          placeholder="Eg. Black"
          
          onChangeText={(text) => setVehicleColor(text.trim())}
        />

      <Text className="pt-[20px] text-[#A7A7A7]">Vehicle Type</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={11}
          placeholder="Eg. Car"
          
          onChangeText={(text) => setVehicleType(text.trim())}
        />

      <Text className="pt-[20px] text-[#A7A7A7]">Vehicle Plate Number</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={11}
          placeholder="Eg. LSD-144-CA"
          
          onChangeText={(text) => setVehiclePlateNumber(text.trim().toUpperCase())}
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Email</Text>
        <TextInput
          className="border border-[#A7A7A7] rounded placeholder-slate-400 text-[#3A3A3A] pl-2"
          maxLength={40}
          placeholder="favourchamberlain32@gmail.com"
          onChangeText={(text) => setEmail(text.trim())}
        />

        <Text className="pt-[20px] text-[#A7A7A7]">Password</Text>
        <View className="flex-row items-center border border-[#A7A7A7] rounded">
          <TextInput
            className=" placeholder-slate-400 text-[#3A3A3A] pl-2"
            maxLength={16}
            placeholder="********"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text.trim())}
          />

          <View
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: [{ translateY: -12 }],
            }}
          >
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword}
            />
          </View>
        </View>
      </View>

      <View className="flex flex-row mt-4">
        <CheckBox
          className=""
          checked={checked}
          onPress={toggleCheckbox}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon={"checkbox-blank-outline"}
        />
        <Text className="mr-6 text-[12px] block pr-8 pt-3 text-[#A7A7A7]">
          By ticking this box, you agree to our
          <TouchableOpacity className="">
            <Text className="text-[#EBBC2E] block text-[12px]">
              {" "}
              Terms and conditions and private policy
            </Text>
          </TouchableOpacity>{" "}
        </Text>
      </View>

      <View className="mt-[30px]">
        <Button
          className=""
          title="Sign up"
          buttonStyle={{ backgroundColor: "rgba(5, 96, 250, 1)" }}
          onPress={signUp}
          disabled={!checked}
        />
      </View>

      <View className="flex flex-row">
        <Text className="mt-3">Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RiderLogin")}>
          <Text className="pt-3  text-[#0560FA]">Sign in</Text>
        </TouchableOpacity>
        
      </View>
      {/* <TouchableOpacity onPress={()=> navigation.navigate("Rider")} className="pl-[130px] mt-11 bg-[#0560FA] h-[px]  rounded-[880px]">
        <MaterialCommunityIcons name="motorbike" size={50} color="white" />
        <Text className="pl-[0px] text-white text-[20px]">As a Rider</Text>
      </TouchableOpacity> */}
      
    </SafeAreaView>
    </ScrollView>

  );
}
