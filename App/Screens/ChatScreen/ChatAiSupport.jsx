import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Alert
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { dummyMessage, ipAddress } from '../../constants';
import { FontAwesome } from '@expo/vector-icons';
import { callAPI, callAPIChatPdf } from '../../api/openAI';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import axios from "axios";
import { FontAwesome5 } from '@expo/vector-icons';
import TextTransition, {presets} from 'react-text-transition';
import DropdownComponent from '../../components/dropdown';



export default function ChatAiSupport() {

  const param = useRoute().params
  const {user, isLoading} = useUser()
  const [messages, setMessages] = useState(dummyMessage)
  const [inputText, setInputText] = useState('');
  const [index, setIndex] = useState(0);
  const ScrollViewRef = useRef();
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(param.type);

  const navigation = useNavigation()

  useEffect(()=>{
    const client = axios.create({
      headers:{}
    })
    
    const fetchInJectPdf = async ()=>{
      const res = await client.post(`http://${ipAddress}:3300/chat/injectPdf`,{
        filename:`${param?.type}.pdf`
      })
      console.log(res.data)
    }
    fetchInJectPdf()
  },[])

  useEffect(()=>{
    const client = axios.create({
      headers:{}
    })
    const fetchMess = async ()=>{
      const res = await client.get(`http://${ipAddress}:3300/api/messagesPdf/${user.id}/${param.type}`)
      setMessages(res.data.messages)
    }
    fetchMess()
  },[])

  const saveMess = async (userId, messages, type) => {
    // console.log(userId, messages, type)
    const client = axios.create({
      headers:{
      }
    })
    const res = await client.post(`http://${ipAddress}:3300/api/messagesPdf`,{
      userId: userId,
      messages: messages,
      type: type
    })

    let result = res.data
    if(res.status != 200){
      Alert.alert(result.message);
    }
  }
  const fetchResponse = () => {
    console.log("Dropdown Value:", selectedDropdownValue);
    if(inputText.length>0){
      let newMessage = [...messages]
      newMessage.push({role: 'user', content: inputText.trim()})
      setMessages([...newMessage])
      setInputText('')
      // save message in db
      saveMess(user.id, {role: 'user', content: inputText.trim()}, selectedDropdownValue)
      // scroll end
      updateScrollView()

      callAPIChatPdf(inputText.trim()).then((response)=>{
        if(response.success){
          // console.log(response.data.data)
          saveMess(user.id, response.data.data, selectedDropdownValue)
          newMessage.push(response.data.data)
          setMessages([...newMessage])
          updateScrollView()
          setInputText('')
        }else{
          Alert.alert('Error', response.msg)
        }
      })
    }
  }

  const updateScrollView = ()=>{
    setTimeout(()=>{
      ScrollViewRef?.current?.scrollToEnd({animated: true});
    },200)
  }

  // const handleDropdownChange = async (value) => {
  //   // Make API call here
  //   const client = axios.create({
  //     headers: {}
  //   });
  //   const res = await client.post(`http://${ipAddress}:3300/api/messagesPdf`, {
  //     userId: user.id,
  //     messages: messages,
  //     type: value // Pass the selected value from dropdown
  //   });
  //   // console.log(user.id, messages, value)
  //   // Handle response
  // };
  const fetchInJectPdf = async (value)=>{
    const client = axios.create({
      headers:{}
    })
    const res = await client.post(`http://${ipAddress}:3300/chat/injectPdf`,{
      filename:`${value}.pdf`
    })
    console.log(res.data)
  }
  const handleDropdownChange = async (value) => {
    setSelectedDropdownValue(value);

    const client = axios.create({
      headers:{}
    })
    const res = await client.get(`http://${ipAddress}:3300/api/messagesPdf/${user.id}/${value}`)
    setMessages(res.data.messages) 

    fetchInJectPdf(value)
  };


  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerAction}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <FeatherIcon
                  color="#000"
                  name="arrow-left"
                  size={24} />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center items-center">
              <Image source={require('../../../assets/chatPDF.png')} style={{
                  height: hp(3),
                  width: hp(3),
                  paddingRight: 3
                }}/>
              <Text style={styles.headerTitle}>AI Chat Assistant</Text>
            </View>

            <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <FeatherIcon
                  color="#000"
                  name="more-vertical"
                  size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <DropdownComponent selectedDropdownValue={selectedDropdownValue} onValueChange={handleDropdownChange}/>
          <KeyboardAwareScrollView>
              <View className=" space-y-2 flex-1">
                  <View style={{height:hp(67)}}
                        className=" bg-neutral-200 rounded-3xl p-4"      
                  >
                    <ScrollView
                      ref={ScrollViewRef}
                      bounces={false}
                      className="space-y-4"
                      showsVerticalScrollIndicator={false}
                    >
                      {
                        messages.map((message, index)=>{
                          if(message.role =='assistant'){
                              return (
                                <View key={index} className="flex-row justify-start">
                                  <View key={index} style={{}}
                                    className=" bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                                  >
                                    <Text>{message.content}</Text>
                                  </View>
                                </View>
                              )
                            
                          }else{
                            return (
                              <View key={index} className=" flex-row justify-end">
                                <View style={{}}
                                  className=" bg-white rounded-xl p-2 rounded-tr-none"
                                >
                                  <Text>{message.content}</Text>
                                </View>
                              </View>
                            )
                          }
                        })
                      }
                    </ScrollView>
                    
                  </View>
                  <View style={styles.input}>
                    <TextInput
                       autoCorrect={false}
                       value={inputText}
                       onChangeText={e => {
                        setInputText(e)
                      }}
                       placeholder="Message here"
                       placeholderTextColor="#6b7280"
                       style={styles.inputControl}
                      />
                      <TouchableOpacity 
                        onPress={fetchResponse}
                        style={{
                          paddingLeft: 5
                        }}>
                        <FontAwesome5 name="arrow-circle-up" size={40} color="gray" />
                      </TouchableOpacity>
                  </View>
              </View>
          </KeyboardAwareScrollView>
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
  input: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    width:wp(80),
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 999,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
});