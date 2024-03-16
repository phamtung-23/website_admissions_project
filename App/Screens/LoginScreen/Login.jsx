import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{alignItems:'center', paddingTop:40}}>
      <Image 
        source={require('../../../assets/myhc_337352.jpg')}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text style={{color: 'white', margin: 30, fontSize: 27, textAlign: 'center'}}>
          Let's Find 
          <Text style={{fontWeight: 'bold'}}> your dream major and university</Text>
        </Text>
        <Text style={{fontSize: 17, color: 'white', textAlign: 'center'}}>The best app to find your favorite universities and professions</Text>
        <TouchableOpacity 
          onPress={onPress}
          style={{
            width: '80%',
            backgroundColor: 'white', 
            padding: 15, 
            borderRadius: 30, 
            marginTop: 30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
          <Image  
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png'}} 
            style={{
              width: 30, 
              height: 30,
              marginRight:10
            }}
          />
          <Text style={{fontWeight:"bold", fontSize: 20}}>
            Login with Google
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  loginImage: {
    width: 350,
    height: 450,
    marginTop: 60,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15
  },
  subContainer: {
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    height: '70%',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center'
  }
})