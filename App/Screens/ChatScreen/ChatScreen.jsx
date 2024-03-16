import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Features from '../../components/features';
import { dummyMessage } from '../../constants';




export default function ChatScreen() {

  const [messages, setMessages] = useState(dummyMessage)
  const [recording, setRecording] = useState(false)
  const [speaking, setSpeaking] = useState(true)
  
  const clear = ()=>{
    setMessages([])
  }
  const stopSpeaking = ()=>{
    setSpeaking(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerAction}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                {/* <FeatherIcon
                  color="#000"
                  name="arrow-left"
                  size={24} /> */}
              </TouchableOpacity>
            </View>

            <Text style={styles.headerTitle}>AI Chat Assistant</Text>

            <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                {/* <FeatherIcon
                  color="#000"
                  name="more-vertical"
                  size={24} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row justify-center">
                <Image source={require('../../../assets/iconAIBot.png')} style={{
                  height: hp(15),
                  width: hp(15)
                }}/>
          </View>
          <Features />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
});