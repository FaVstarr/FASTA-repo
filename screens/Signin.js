import React from "react";
import { Button, Text, View } from 'react-native'

export default function Signin({navigation}){
    return(
        <View className="flex-1 items-center justify-center">
           
            <Button
            title="Sign In" 
            onPress={() => navigation.navigate('Home')}/>
        </View>
    )
}