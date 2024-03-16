import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions

} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import useFetch from '../../hooks/useFetch'
import ImageSlider from '../../components/imageSlider';
import { useNavigation } from '@react-navigation/native';
import { ipAddress } from '../../constants';


const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

export default function HomeScreen() {
  const navigation = useNavigation()
  const {user} = useUser()
  const { data, loading, error } = useFetch(`http://${ipAddress}:3300/api/university?limit=10`)

  return user&&(
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <Image
              alt=""
              source={{
                uri:user?.imageUrl
              }}
              style={styles.avatar} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <FontAwesome name="heart-o" size={24} color="#1a2525" />
          </TouchableOpacity>
        </View>
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Hello, {user?.fullName}!</Text>
          <Text style={styles.greetingText}>Welcome to the admissions support app!</Text>
        </View>
        {/* <View style={styles.search}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9695b0"
            style={styles.searchInput}
          />
          <View style={styles.searchFloating}>
            <TouchableOpacity>
              <View style={styles.searchButton}>
                <FeatherIcon name="search" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
      <ScrollView>
        <ImageSlider />
        <View style={styles.content}>
          <View style={styles.list}>
            {/* <View style={styles.contentHeader}>
              <Text style={styles.contentTitle}>Courses</Text>
              <TouchableOpacity>
                <Text style={styles.contentLink}>See all</Text>
              </TouchableOpacity>
            </View> */}
            
          
          </View>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>University</Text>
            <TouchableOpacity
              onPress={() => navigation.push('ListUniversity')}
            >
              <Text style={styles.contentLink}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentPlaceholder}>
            <ScrollView contentContainerStyle={styles.container}>
              {data.map(
                (item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        // handle onPress
                      }}>
                      <View style={styles.card}>
                        <Image
                          alt=""
                          resizeMode="cover"
                          source={{ uri: `${item.imgCover}` }}
                          style={styles.cardImg} />

                        <View style={styles.cardBody}>
                          <Text >
                            <Text style={styles.cardTitle}>{item.name.vi}</Text>{' '}
                          </Text>

                          <View style={styles.cardRow}>
                            <View style={styles.cardRowItem}>
                              <FontAwesome
                                color="#6f61c4"
                                name="star"
                                size={10} />

                              <Text style={styles.cardRowItemText}>
                                {item.code}
                              </Text>
                            </View>

                            <View style={styles.cardRowItem}>
                              <FontAwesome
                                color="#6f61c4"
                                name="location-arrow"
                                size={10} />

                              <Text style={styles.cardRowItemText}>
                                {item.type}
                              </Text>
                            </View>
                          </View>


                          <TouchableOpacity
                            onPress={() => navigation.push('DetailUniversity',{
                              id : item._id,
                              imgGallery: item.imgGallery
                            })}>
                            <View style={styles.btn}>
                              <Text style={styles.btnText}>Detail</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                },
              )}
            </ScrollView>
          </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  top: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
  },
  /** Greeting */
  greeting: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
    marginBottom: 12,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a2525',
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a2525',
    marginTop: 8,
  },
  
  /** Content */
  content: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a2525',
  },
  contentLink: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2525',
  },
  contentPlaceholder: {
    marginBottom: 60
  },
  title: {
    paddingHorizontal: 24,
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** List */
  list: {
    marginBottom: 24,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#778599',
  },
  listContent: {
    paddingVertical: 12,
  },
  /** Card */
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  cardImg: {
    width: 160,
    height: 110,
    borderRadius: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#173153',
    marginRight: 8,
  },
  cardAirport: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5f697d',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -8,
    flexWrap: 'wrap',
    marginTop: 4,
    marginBottom: 3
  },
  cardRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  cardRowItemText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#5f697d',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5f697d',
  },
  cardPriceValue: {
    fontSize: 21,
    fontWeight: '700',
    color: '#173153',
  },
  cardPriceCurrency: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6f61c4',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    backgroundColor: '#5bd2bc',
    borderColor: '#5bd2bc',
    marginTop: 5
  },
  btnText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#fff',
  },
});