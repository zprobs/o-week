import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import Fonts from '../../theme/Fonts';
import Icon from 'react-native-vector-icons/Feather';

const { FontWeights } = Fonts;

/**
 * A simple Icon to display more options. Uses an ASCII character instead of a third party library
 * @param onPress
 */
const OptionsIcon = ({ onPress, size }) => {
  return (
    <TouchableOpacity onPress={onPress}>
     <Icon name={'more-vertical'} size={size ? size : 26} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 25,
    ...FontWeights.Bold,
    paddingRight: 15,
    paddingTop: 5,
  },
});

export default OptionsIcon;
