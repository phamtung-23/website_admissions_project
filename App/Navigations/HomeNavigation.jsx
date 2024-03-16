import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ListUniversityScreen from '../Screens/University/ListUniversityScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import DetailUniversityScreen from '../Screens/University/DetailUniversityScreen';
import ChatAiSupport from '../Screens/ChatScreen/ChatAiSupport';


const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ListUniversity" component={ListUniversityScreen} />
      <Stack.Screen name="DetailUniversity" component={DetailUniversityScreen} />
      <Stack.Screen name="ChatAiSupport" component={ChatAiSupport} />
    </Stack.Navigator>
  )
}