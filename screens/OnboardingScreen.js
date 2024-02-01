import { View, Text, FlatList,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Onboarding from 'react-native-onboarding-swiper';



export default function OnboardingScreen() {


  return (
    
    <Onboarding className="flex-1 items-center justify-center"

    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/images/onboardingImg1.png')} className=""  />,
        title: <Text className="text-[20px] font-semibold pb-[50px] text-blue-500">Quick Delivery At Your Door Step</Text>,
        subtitle: 'Enjoy quick pick-up and delivery to your destination',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/images/onboardingImg2.png')} className=""  />,
        title: <Text className="text-[20px] font-semibold pb-[50px] text-blue-500">Flexible Payment</Text>,
        subtitle: 'Different modes of payment either before and after delivery without stress',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/images/rafiki.png')} className=""  />,
        title: <Text className="text-[20px] font-semibold pb-[50px] text-blue-500">Quick Delivery At Your Door Step</Text>,
        subtitle: 'Done with React Native Onboarding Swiper',
      },
    ]}
  />
      
    
  )
}