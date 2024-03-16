import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatGptScreen from '../Screens/ChatScreen/ChatGptScreen';
import ChatScreen from '../Screens/ChatScreen/ChatScreen';
import ChatPdfScreen from '../Screens/ChatScreen/ChatPdfScreen';


const Stack = createStackNavigator();

export default function ChatNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatGpt" component={ChatGptScreen} />
      <Stack.Screen name="ChatPdf" component={ChatPdfScreen} />
    </Stack.Navigator>
  )
}