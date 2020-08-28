import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

/**
 * Hamburger menu icon for the top left of Home Screen
 * @param white {boolean} if true then the icon is white
 * @returns react-native-vector-icons menu icon
 */
export const DrawerIcon = ({ white }) => {
  const navigation = useNavigation();
  return (
    <Icon
      name="menu"
      size={32}
      color={white ? 'white' : '#000'}
      onPress={() => navigation.navigate('Settings')}
      style={{ marginLeft: 8 }}
    />
  );
};
