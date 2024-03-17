import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useMemo, useState } from "react";
import { Paystack } from "react-native-paystack-webview";
import RadioGroup from "react-native-radio-buttons-group";
import { Button } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { ToastAndroid } from "react-native";

export default function DeliveriesPayment({ navigation }) {
  const radioButtons = useMemo(
    () => [
      {
        id: "wallet", // acts as primary key, should be unique and non-empty string
        label: "Pay with Wallet",
        value: "wallet",
        color: "#0560FA",
      },
      {
        id: "card",
        label: "Credit/ Debit card",
        value: "card",
        color: "#0560FA",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState();
  const route = useRoute();
  const [isPaymentInitiated, setPaymentInitiated] = useState(false);

  const [transactionHistory, setTransactionHistory] = useState([]);

  const { packageTotal, deliveryInfo } = route.params;
  console.log(packageTotal, deliveryInfo);

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

  const handlePayment = () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return; // Handle user not logged in
    }
    if (!selectedId) {
      Alert.alert("Select payment method");
      return;
    }

    if (selectedId === "card") {
      setPaymentInitiated(true);
    } else if (selectedId === "wallet") {
      // Handle wallet payment
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((userDoc) => {
          const currentBalance = userDoc.data()?.balance || 0;

          // check if balance is sufficient
          const { packageTotal } = route.params;
          if (packageTotal === undefined || isNaN(packageTotal)) {
            Alert.alert("Error", "Invalid package total");
            return;
          }

          if (packageTotal > currentBalance) {
            Alert.alert("Error", "Insufficient balance in wallet");
          } else {
            const updateBalance = currentBalance - packageTotal;
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({ balance: updateBalance })
              .then(() => {
                storeTransactionInDatabase(packageTotal).then((success) => {
                  if (success) {
                    ToastAndroid.show(
                      "Payment successful, redirecting...",
                      3000
                    );
                    setTransactionHistory([
                      ...transactionHistory,
                      packageTotal,
                    ]);
                    storeDeliveryInfoInFirestore()
                    navigation.navigate("HomeScreen", {
                      screen: "Track",
                    });
                  }
                });
              })
              .catch((error) => {
                console.error("Error updating wallet balance: ", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  };

  const storeTransactionInDatabase = async (packageTotal) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      try {
        await firebase.firestore().collection("transactions").add({
          userId: userId,
          amount: packageTotal, // Ensure packageTotal is defined and passed correctly
          description: "Delivery fee",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          type: "Payment",
        });
        console.log("Transaction added to Firestore");

        // Update user balance (optional)
        // Make sure to update user balance separately from the transaction
        // as it seems to be handled in the payment logic

        return true; // Indicate success
      } catch (error) {
        console.error("Error adding transaction to Firestore:", error);
        return false; // Indicate failure
      }
    }
  };

  const storeDeliveryInfoInFirestore = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }
  
      const userId = user.uid;
      const deliveryRef = firebase.firestore().collection("deliveries");
  
      // Add the delivery info to Firestore
      await deliveryRef.add({
        userId: userId,
        ...deliveryInfo,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
      console.log("Delivery info stored in Firestore successfully");
    } catch (error) {
      console.error("Error storing delivery info in Firestore:", error);
    }
  };
  

  return (
    <SafeAreaView>
      <View className="pt-[67px] pl-5">
        <View className="w-[341px] h-[84px]">
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
          />
        </View>
        <Button
          title={"Make Payment"}
          buttonStyle={{
            backgroundColor: "rgba(5, 96, 250, 1)",
            width: 240,
            marginLeft: 50,
          }}
          onPress={handlePayment}
        />
      </View>

      {isPaymentInitiated && (
        <View style={{ flex: 1 }}>
          <Paystack
            paystackKey="pk_test_08555b0e5cc78a3baca110871fd0f2da7e78417f"
            billingEmail="fasta@gmail.com"
            amount={packageTotal}
            channels={["card"]}
            onCancel={(e) => {
              console.log("Cancelled Top up", e);
              setPaymentInitiated(false);
            }}
            onSuccess={async (res) => {
              console.log("Successful", res);
              setTransactionHistory([...transactionHistory, packageTotal]);
              await storeTransactionInDatabase(packageTotal);
              await storeDeliveryInfoInFirestore();
              setPaymentInitiated(false);
              navigation.navigate("HomeScreen", {
                screen: "Track",
              });
            }}
            autoStart={true}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
