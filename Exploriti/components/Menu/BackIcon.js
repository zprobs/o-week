import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

/**
 * Simple chevron to be used in the GoBackHeader
 * @param iconColor {string} optional default black
 * @param destination {string} name of Screen to Go Back to. Optional. Without will just go to previous
 * @returns Icon
 * @constructor
 */
const BackIcon = ({ iconColor, destination }) => {
  const { goBack, navigate } = useNavigation();
  const leave = () => {
    if (destination) {
      navigate(destination)
    } else {
      goBack();
    }
  }
  return (
    <Icon
      name="chevron-left"
      size={32}
      color={iconColor ? iconColor : '#000'}
      onPress={leave}
    />
  );
};

export default BackIcon;
