import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import images from '../../assets/images';

const height = Dimensions.get('window').height;

/**
 * Main loading screen (fullScreen with logo and spinner)
 * @constructor
 */
export default function Loading() {
  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Image source={images.logo} style={styles.image} />
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  inner: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.55,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 65,
    marginBottom: 60,
  },
});
