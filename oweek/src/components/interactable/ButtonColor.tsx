import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import getTheme from '@root/theme';
import LoadingDots from '@components/loading/LoadingDots';
import useStyles from './ButtonColor.styles';

interface Props {
  Icon?: React.ComponentType;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  color: string;
  isLight?: boolean;
  loadColor?: string;
  isDisabled?: boolean;
}

const ButtonColour: React.FC<Props> = ({
  Icon,
  label,
  onPress,
  isLoading = false,
  containerStyle,
  labelStyle,
  color,
  isLight = false,
  loadColor,
  isDisabled = false,
}) => {
  const styles = useStyles(!!Icon, isLight, color);
  const theme = getTheme();

  let content = (
    <LoadingDots
      background={loadColor || '#fafafa'}
      activeBackground={loadColor || theme.palette.white}
    />
  );
  if (!isLoading)
    content = (
      <>
        {Icon && <View style={{ marginLeft: 20 }} />}
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {Icon && (
          <View style={styles.icon}>
            <Icon />
          </View>
        )}
      </>
    );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      style={[styles.container, containerStyle]}>
      {content}
    </TouchableOpacity>
  );
};

export default ButtonColour;
