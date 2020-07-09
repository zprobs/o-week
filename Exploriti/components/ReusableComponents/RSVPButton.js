import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import Icon from 'react-native-vector-icons/Feather';
import LoadingDots from './LoadingDots';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * RSVP button used for events
 * @param onPress
 * @param style
 * @param selectedTitle {string} default title
 * @param unSelectedTitle {string} only include if you want a second selected state
 * @param plusIcon {boolean} if true, render 'user-plus' icon else 'user-check
 * @param isSelected {boolean} true if button starts off selected
 * @returns {*}
 * @constructor
 */
const RSVPButton = ({
  style,
  selectedTitle,
  unSelectedTitle,
  plusIcon,
  isSelected,
  selectedOnPress,
  unSelectedOnPress,
  loading
}) => {
  const [selected, setSelected] = useState(isSelected);

  const buttonPress = () => {
    if (selectedTitle) setSelected(!selected);
    if (selected) {
      selectedOnPress()
    } else {
      if (unSelectedOnPress) unSelectedOnPress();
    }
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
      {
        loading ? (
          <LoadingDots background={'#fafafa'} activeBackground={'#ffffff'} />
        ) : (
          <Text style={styles.title}>
            {selected ? selectedTitle : unSelectedTitle}
          </Text>
        )
      }

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
