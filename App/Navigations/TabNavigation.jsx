import { View, Text, TouchableOpacity, Platform, Image, Animated, Dimensions } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../Utils/Colors';
import { NavigationContainer } from '@react-navigation/native';
import { useRef } from 'react';
import { Entypo } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';
import ChatScreen from '../Screens/ChatScreen/ChatScreen';
import ChatNavigation from './ChatNavigation';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {

  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarShowLabel: false,
        tabBarStyle:{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 20,
          marginHorizontal: 10,
          // Max Height...
          height: 60,
          borderRadius: 30,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 20,
        }
        
        }}
          
      >
        <Tab.Screen name="home" component={HomeNavigation} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                // centring Tab Button...
                position: 'absolute',
                top: 20
              }}>
                <FontAwesome5
                  name="home"
                  size={25}
                  color={focused ? Colors.PRIMARY : 'gray'}
                ></FontAwesome5>
              </View>
            ),
          }} listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true
              }).start();
            }
          })}
        />
       
        <Tab.Screen name="chat" component={ChatNavigation} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                // centring Tab Button...
                position: 'absolute',
                top: 20
              }}>
                <Entypo
                  name="chat"
                  size={25}
                  color={focused ? Colors.PRIMARY : 'gray'}
                ></Entypo>
              </View>
            ),
          }} listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true
              }).start();
            }
          })}
        />
        <Tab.Screen name="profile" component={ProfileScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                // centring Tab Button...
                position: 'absolute',
                top: 20
              }}>
                <FontAwesome5
                  name="user-alt"
                  size={25}
                  color={focused ? Colors.PRIMARY : 'gray'}
                ></FontAwesome5>
              </View>
            ),
          }} listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true
              }).start();
            }
          })}
        />
      </Tab.Navigator>

      <Animated.View style={{
        width: getWidth() - 20,
        height: 2,
        backgroundColor: Colors.PRIMARY,
        position: 'absolute',
        bottom: 78,
        // Horizontal Padding = 20...
        left: 50,
        borderRadius: 20,
        transform: [
          { translateX: tabOffsetValue }
        ]
      }}>

      </Animated.View>
    </NavigationContainer>
  )
}

function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 3
}

function EmptyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
}