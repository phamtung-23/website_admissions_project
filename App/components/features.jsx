import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Features() {
  const navigation = useNavigation()
  return (
    <View style={{height:hp(60)}} className=" space-y-4 ">
       <TouchableOpacity onPress={() => navigation.push('ChatGpt')}>
        <View className=" bg-emerald-200 p-4 rounded-xl space-y-2">
          <View className=" flex-row items-center space-x-1">
            <Image source={require('../../assets/iconChatGPT.png')} style={{height: hp(4), width: hp(4)}}/>
            <Text style={{fontSize:wp(4.8), paddingLeft:10}} className=" font-semibold text-gray-700">Chat Assistant</Text>
          </View>
          <Text style={{fontSize: wp(3.8)}} className=" text-gray-700 font-medium">ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topic.</Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.push('ChatPdf')}>
        <View className=" bg-purple-200 p-4 rounded-xl space-y-2">
          <View className=" flex-row items-center space-x-1">
            <Image source={require('../../assets/chatPDF.png')} style={{height: hp(4), width: hp(4)}}/>
            <Text style={{fontSize:wp(4.8), paddingLeft:10}} className=" font-semibold text-gray-700">Chat PDF University</Text>
          </View>
          <Text style={{fontSize: wp(3.8)}} className=" text-gray-700 font-medium">AI chat will provide useful information about admission to majors and universities, and provide suggestions according to requirements.</Text>
        </View>
       </TouchableOpacity>
    </View>
  )
}