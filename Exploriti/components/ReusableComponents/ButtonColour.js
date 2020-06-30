import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Fonts from '../../theme/Fonts';
import { ThemeStatic } from '../../theme/Colours';
import LoadingDots from './LoadingDots';

const { FontWeights, FontSizes } = Fonts;
/**
 * A styled button for general use
 * @param Icon An optional Icon that will appear to the left of any text in the button
 * @param label {string} The text of the button
 * @param onPress The function which the button invokes
 * @param loading {boolean} Weather the function has executed or is still waiting
 * @param containerStyle Additional style customization for container
 * @param labelStyle Additional style customization for button text
 * @param color {string} The background color of the button
 * @param light {boolean} Weather or not the label text is light or dark
 * @param loadColour {string} Optional string for the loading dots colour
 * @constructor
 */
const ButtonColour = ({
  Icon,
  label,
  onPress,
  loading,
  containerStyle,
  labelStyle,
  colour,
  light,
    loadColour
}) => {
  const styles = StyleSheet.create({
    container: {
      height: 40,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: Icon ? 'space-between' : 'center',
      paddingVertical: 5,
      borderRadius: 40,
      backgroundColor: colour,
    },
    label: {
      ...FontWeights.Regular,
      ...FontSizes.Body,
      marginLeft: 5,
      color: light ? ThemeStatic.white : ThemeStatic.accent,
      justifyContent: 'center',
    },
    icon: {
      marginRight: 20,
    },
  });

  let content = (
    <LoadingDots background={loadColour ? loadColour : '#fafafa'} activeBackground={loadColour ? loadColour : ThemeStatic.white} />
  );
  if (!loading)
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
      disabled={loading}
      style={[styles.container, containerStyle]}>
      {content}
    </TouchableOpacity>
  );
};

export default ButtonColour;
