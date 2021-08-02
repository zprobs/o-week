import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

interface Props {
  onPress: () => void;
  size?: number;
}

/**
 * A simple Icon to display more options.
 */
const OptionsIcon: React.FC<Props> = ({ onPress, size }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="more-vertical" size={size || 26} />
    </TouchableOpacity>
  );
};

export default OptionsIcon;
