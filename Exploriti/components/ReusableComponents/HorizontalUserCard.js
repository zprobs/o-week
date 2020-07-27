import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import { useNavigation } from '@react-navigation/native';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 *
 * @param id
 * @param name {string}
 * @param image {string}
 * @param isLeader {boolean}
 * @returns {*}
 * @constructor
 */
const HorizontalUserCard = ({ id, name, image, isLeader }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile', { userId: id })}
      style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.base,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    backgroundColor: colours.placeholder,
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  name: {
    ...FontSizes.Caption,
    ...FontWeights.Bold,
    color: colours.text02,
  },
});

export default HorizontalUserCard;
