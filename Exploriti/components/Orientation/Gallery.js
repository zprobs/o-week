import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Theme } from '../../theme/Colours';
import { useRoute } from '@react-navigation/native'

const {width} = Dimensions.get('window')
const {colours} = Theme.light

const Gallery = () => {
  const route = useRoute();
  const {images} = route.params

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          images.map((img, i) => (
            <Image source={{uri: img}} style={styles.image} key={i}/>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Gallery

const styles = StyleSheet.create({
  image: {
    width: width - 50,
    height: width - 50,
    borderRadius: 12,
    marginVertical: 10,
    backgroundColor: colours.placeholder
  },
  container: {
    flex: 1,
    backgroundColor: colours.base,
    alignItems: 'center',

  }

})
