import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStyles from './CircleBackIcon.styles';

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
}

const CircleBackIcon: React.FC<Props> = ({ onPress, style }) => {
  const navigation = useNavigation();
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={() => {
        if (onPress) onPress();
        navigation.goBack();
      }}>
      <Icon name="arrow-left" color="#000" size={23} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default CircleBackIcon;
