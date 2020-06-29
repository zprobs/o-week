import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import UserCountPreview from './UserCountPreview';
import { Theme } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * ImageCard for displaying groups and events in a list
 * @param item {Object} Either group or event
 * @returns {*}
 * @constructor
 */
const ImageCard = ({ item }) => (
  <View style={styles.imageRow}>
    <Image source={{ uri: item.image }} style={styles.groupImage} />
    <LinearGradient
      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
      locations={[0, 0.9]}
      style={styles.imageLabelContainer}>
      <UserCountPreview count={item.count} />
      <Text style={styles.imageLabelText}>{item.title}</Text>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 25,
  },
  groupImage: {
    height: 180,
    width: '100%',
    borderRadius: 30,
    marginHorizontal: 5,
  },
  imageLabelContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 8,
  },
  imageLabelText: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    marginTop: 5,
    color: colours.white,
  },
});

export default ImageCard;
