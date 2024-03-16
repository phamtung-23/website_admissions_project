import { View, Text } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import { ipAddress, sliderImage } from '../constants';
import useFetch from '../hooks/useFetch';

export default function ImageSlider() {
  const { data, loading, error } = useFetch(`http://${ipAddress}:3300/api/banner`)
  return (
    <Carousel
      data={data}
      loop={true}
      autoplay={true}
      renderItem={ItemCard}
      hasParallaxImages={true}
      sliderWidth={wp(100)}
      firstItem={1}
      autoplayInterval={4000}
      itemWidth={wp(100)-70}
      slideStyle={{display: 'flex', alignItems: 'center'}}
    />
  )
}

const ItemCard = ({item, index}, parallaxProps) => {
  return (
    <View style={{width: wp(100)-70, height: hp(25), marginTop: 10}}>
      <ParallaxImage
        source={{
          uri: `${item.imageUrl}`
        }}
        containerStyle={{flex: 1, borderRadius: 30}}
        style={{resizeMode: 'contain'}}
        parallaxFactor={1}
        {...parallaxProps}
      />
      <Text style={{
        position:'absolute', 
        bottom: 15, 
        left: 15, 
        color: '#fff', 
        fontSize: 17, 
        fontWeight: "bold"
      }}>{item.name}</Text>
    </View>
  )
}