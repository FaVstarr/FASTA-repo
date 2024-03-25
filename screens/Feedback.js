import React, { useState } from 'react';
import { View, Text, Alert, TextInput } from 'react-native';
import { AirbnbRating } from '@rneui/themed';
import { Button } from "@rneui/themed";
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
  
  

export default function Feedback({ route, navigation }) {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const { deliveryId } = route.params;

  const handleSubmitRating = async () => {
    try {
      const user = firebase.auth().currentUser;
      console.log(user)
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const userId = user.uid;
      const deliveriesRef = firebase.firestore().collection('deliveries').doc(deliveryId);

      await deliveriesRef.update({
        rating: rating,
        feedback: feedbackText, // Add the feedback if needed
      });
      setFeedbackSubmitted(true)
      Alert.alert('Success', 'Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert('Error', 'Failed to submit rating');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feedback</Text>
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Bad", "OK", "Good", "Excellent"]}
        defaultRating={rating}
        onFinishRating={(rating) => {
            setRating(rating);
            if (rating < 4) {
              setShowFeedbackInput(true);
            }
        }
    }
      />
      {showFeedbackInput && (
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
          onChangeText={text => setFeedbackText(text)}
          value={feedbackText}
          placeholder="Enter your feedback"
        />
      )}
      {!feedbackSubmitted && (
        <Button
          title="Rate"
          onPress={handleSubmitRating}
          buttonStyle={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}
