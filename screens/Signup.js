import React from "react";
import { Button, Text, View } from 'react-native'

export default function Signup({navigation}){
    return(
        <View className="flex-1 items-center justify-center">
           
            <Button
            title="Sign Up" 
            onPress={() => navigation.navigate('Signin')}/>
        </View>
    )
}