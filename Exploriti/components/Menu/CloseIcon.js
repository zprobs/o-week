import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

/**
 * Used to close the Settings page and return home
 * @returns react-native-vector-icons close icon
 * @constructor
 */
export const CloseIcon = () => {
  const navigation = useNavigation();
  return (
    <Icon
      name="close"
      size={38}
      color="#000"
      onPress={() => navigation.navigate('HomeScreen')}
    />
  );
};
