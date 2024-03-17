import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox, Button } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { ToastAndroid } from "react-native";

export default function Signin({ navigation }) {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };



  const handleLogin = async () => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const fullName = user.displayName || "Unknown";
      const [firstName, lastName] = fullName.split(" ");
      // Redirect or perform actions after successful login
      console.log("User logged in successfully:", user);
      
      // Navigate to dashboard or home screen
      ToastAndroid.show("Login successful", 3000);

      navigation.navigate("HomeScreen", {
        firstName: firstName,
        lastName: lastName,
        routeName: "Home",
      });
    } catch (error) {
      // console.error("Error logging in:", error);

      // Alert.alert("Error", error.message);
      switch(error.code){
        case 'auth/email-already-in-use':
              Alert.alert('Email already in use !')
              break
        case 'auth/missing-password':
              Alert.alert('Please input a password !')
              break
        case 'auth/network-request-failed':
              Alert.alert('Please check your internet connection, and Try again later.')
              break
        case 'auth/invalid-credential':
            Alert.alert("Incorrect Email/password")
            break

      }
    }
  };

  return (
    <SafeAreaView className="px-6">
      <Text className="text-[24px] mt-[30px] text-[#3A3A3A] ">
        Welcome Back
      </Text>
      <Text className="text-[14px] text-[#A7A7A7]">
        Fill in your email and password to continue
      </Text>
      {/* Form */}
      <View className="mt-[30px]">
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

      <View className="flex flex-row gap-2">
        <View className="flex flex-row mt-4">
          <CheckBox
            className=""
            checked={checked}
            onPress={toggleCheckbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={"checkbox-blank-outline"}
          />
          <Text className="mr-6 text-[12px] block  pt-3 text-[#A7A7A7]">
            Remember password
          </Text>
        </View>
        <TouchableOpacity
          className="pt-3 "
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text className="text-[#0560FA] text-[12px]">Forgot Password</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-[30px]">
        <Button
          className=""
          title="Sign in"
          buttonStyle={{ backgroundColor: "rgba(5, 96, 250, 1)" }}
          onPress={handleLogin}
        />
      </View>

      <View className="flex flex-row">
        <Text className="mt-3">Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push("Signup")}>
          <Text className="pt-3 text-[#0560FA]">Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
