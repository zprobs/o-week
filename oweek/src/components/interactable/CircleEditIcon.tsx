import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  GestureResponderEvent,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import useStyles from './CircleEditIcon.styles';

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  icon?: string;
}

const CircleEditIcon: React.FC<Props> = ({ onPress, style, icon = 'edit' }) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={onPress}>
      <Icon name={icon} color="#000" size={23} />
    </TouchableOpacity>
  );
};

export default CircleEditIcon;
