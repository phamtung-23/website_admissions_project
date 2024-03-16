import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors'
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
  const {user, isLoading} = useUser()
  return user&&(
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingTop: 20
        }}>
          <Image 
            source={{uri:user?.imageUrl}} 
            style={styles.userImage}  
          />
          <View>
            <Text style={{color: 'white'}}>Welcome,</Text>
            <Text style={{color: 'white'}}>{user?.fullName}</Text>
          </View>
        </View>
        <FontAwesome name="bookmark-o" size={27} color="white" />
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 15
      }}>
        <TextInput
          placeholder='Search'
          style={styles.inputText}
        />
        <View style={styles.searchBtn}>
          <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,

  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99
  },
  inputText: {
    width: '85%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  },
  searchBtn:{
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  }
})