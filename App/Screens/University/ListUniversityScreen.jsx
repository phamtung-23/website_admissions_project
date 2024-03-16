import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import useFetch from '../../hooks/useFetch';
import { useNavigation } from '@react-navigation/native';
import { ipAddress } from '../../constants';


export default function ListUniversityScreen() {
  const [searchInput, setSearchInput] = useState('');
  const navigation = useNavigation()
  
  const url = `http://${ipAddress}:3300/api/university?q=${searchInput}`
  const { data, loading, error, reFetch } = useFetch(url)
  useEffect(() => {
    // Function to refetch data whenever searchInput changes
    reFetch();
  }, [searchInput]);
  const handleSearch = () => {
    // No need to refetch here, it's done in the useEffect
    reFetch();
  };
  return (
    <SafeAreaView style={{ 
      backgroundColor: '#f2f2f2' }}>
        <View style={{
          paddingRight: 16,
          paddingLeft: 16,
          paddingTop: 8,
          }}>
          <View style={{
            display: "flex",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View >
              <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <FeatherIcon
                  color="#000"
                  name="arrow-left"
                  size={24} />
              </TouchableOpacity>
            </View>

            <Text style={{
              fontSize: 19,
              fontWeight: '600',
              color: '#000',
            }}>All University</Text>

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
        <View style={styles.search}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9695b0"
            style={styles.searchInput}
            value={searchInput}
            onChangeText={text => setSearchInput(text)}
          />
          <View style={styles.searchFloating}>
            <TouchableOpacity onPress={handleSearch}>
              <View style={styles.searchButton}>
                <FeatherIcon name="search" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      <ScrollView style={{
        marginBottom: 60,
      }} contentContainerStyle={styles.container}>
        {/* check loading */}
        {!loading ? <>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.push('DetailUniversity',{
                  id : item._id,
                  imgGallery: item.imgGallery
                })}>
                <View style={styles.card}>
                  <View style={styles.cardLikeWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}>
                      <View style={styles.cardLike}>
                        <FontAwesome
                          // color={saved ? '#ea266d' : '#222'}
                          color= '#222'
                          name="heart"
                          // solid={saved}
                          size={22} />
                      </View>
                    </TouchableOpacity>
                  </View>
  
                  <View style={styles.cardTop}>
                    <Image
                      alt=""
                      resizeMode="cover"
                      style={styles.cardImg}
                      source={{ uri: `${item.imgCover}` }} />
                  </View>
  
                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{item.name.vi}</Text>
                      <Text style={styles.cardPrice}>
                        <Text style={{ fontWeight: '600' }}>{item.code} </Text>
                      </Text>
                    </View>
  
                    <View style={styles.cardFooter}>
                      <FontAwesome
                        color="#ea266d"
                        name="star"
                        solid={true}
                        size={12}
                        style={{ marginBottom: 2 }} />
  
                      <Text style={styles.cardStars}>{item.type}</Text>
  
                      <Text style={styles.cardReviews}>({item.email})</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </>:<Text>Loading..</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Card */
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#232425',
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '400',
    color: '#232425',
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#232425',
  },
  cardReviews: {
    fontSize: 14,
    fontWeight: '400',
    color: '#595a63',
  },
  /** Search */
  search: {
    paddingTop: 20,
    position: 'relative',
  },
  searchInput: {
    height: 45,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    color: '#1a2525',
    fontSize: 18,
    borderRadius: 9999,
  },
  searchFloating: {
    position: 'absolute',
    top: 20,
    right: 0,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  searchButton: {
    alignSelf: 'center',
    width: 35,
    height: 35,
    borderRadius: 9999,
    backgroundColor: '#5bd2bc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});