import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeStatic } from '../../theme/Colours';
import { useNavigation } from '@react-navigation/native';

/**
 *
 * @param onPress {function} an optional function that will be called before navigating back
 * @param style
 * @returns {*}
 * @constructor
 */
const CircleBackIcon = ({ onPress, style }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={() => {
        if (onPress) onPress();
        navigation.goBack();
      }}>
      <Icon
        name={'arrow-left'}
        color={'#000'}
        size={23}
        style={{ marginTop: 3 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeStatic.white,
    height: 44,
    width: 44,
    borderRadius: 22,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
  },
});

export default CircleBackIcon;
