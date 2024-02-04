import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState } from 'react'
import OTPTextView from 'react-native-otp-textinput';
import { useRef } from 'react';
import { Button } from "@rneui/themed"


export default function OtpVerification({navigation}) {
  const [otpInput, setOtpInput] = useState('');

  const input = useRef<OTPTextView>(null);

  const clear = () => input.current?.clear();

  const updateOtpText = () => input.current?.setValue(otpInput);

  const showTextAlert = () => otpInput && Alert.alert(otpInput);

  const handleCellTextChange = async (text, i) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: 5,
      paddingVertical: 20,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      color: '#333333',
      marginBottom: 10,
    },
    textInputContainer: {
      marginBottom: 20,
    },
    roundedTextInput: {
      borderRadius: 10,
      borderWidth: 1,
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      width: '60%',
      gap: 10,
    },
    textInput: {
      height: 40,
      width: '80%',
      borderColor: '#000',
      borderWidth: 1,
      padding: 10,
      fontSize: 16,
      letterSpacing: 5,
      marginBottom: 10,
      textAlign: 'center',
    },
  });
  return (
    <SafeAreaView className="px-3">
        <Text className="text-[24px] mt-[30px] text-[#3A3A3A] ">
        Otp Verification
      </Text>
      <Text className="text-[14px] text-[#A7A7A7]">
      Enter the 6 digit numbers sent to your email
      </Text>


      <View className="mt-[70px]">
      <OTPTextView
           containerStyle={styles.textInputContainer}
           textInputStyle={styles.roundedTextInput}
          inputCount={6}
          inputCellLength={1}
          tintColor="#EC8000"
        />
      </View>
      <View className="flex flex-row items-center justify-center">
        <Text>If you didn’t receive code, </Text>
      <TouchableOpacity>
        <Text className="text-[#0560FA]">Resend</Text>
      </TouchableOpacity>
      </View>

      <View className="mt-[64px] ">
        <Button title={'Set New Password'} 
        buttonStyle={{ backgroundColor: "rgba(5, 96, 250, 1)" }}
        onPress={() => navigation.navigate('NewPassword')}/>
    </View>
      
      
    </SafeAreaView>
  )
}