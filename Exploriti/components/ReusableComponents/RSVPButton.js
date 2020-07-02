import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import Icon from 'react-native-vector-icons/Feather';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * RSVP button used for events
 * @param onPress
 * @param style
 * @param selectedTitle {string} default title
 * @param unSelectedTitle {string} only include if you want a second selected state
 * @param plusIcon {boolean} if true, render 'user-plus' icon else 'user-check
 * @returns {*}
 * @constructor
 */
const RSVPButton = ({
  onPress,
  style,
  selectedTitle,
  unSelectedTitle,
  plusIcon,
    invite
}) => {
  const [selected, setSelected] = useState(false);

  const buttonPress = () => {
    if (selectedTitle) setSelected(!selected);
    if (onPress) onPress();
  };

  const defaultIcon = plusIcon ? 'user-plus' : 'user-check';

  const color = selected ? ThemeStatic.blackPurple : colours.placeholder;

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style, backgroundColor: color }}
      onPress={buttonPress}>
      <Icon
        name={selected ? 'user-x' : defaultIcon}
        size={26}
        style={{ padding: 4 }}
        color={selected ? 'white' : 'black'}
      />
      <Text style={styles.title}>
        {selected ? selectedTitle : unSelectedTitle}
      </Text>
      <View style={{ width: 32 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    ...FontSizes.Body,
    ...FontWeights.Regular,
    color: colours.text02,
  },
});

export default RSVPButton;
