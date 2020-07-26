import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Theme } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;
const window = Dimensions.get('window').height;

/**
 * ImgBanner used for displaying empty list component images
 * @param img {component}
 * @param placeholder {string}
 * @param spacing {int}
 * @param textStyle
 * @returns {*}
 * @constructor
 */
const ImgBanner = ({ Img, placeholder, spacing, textStyle }) => {
  const space = spacing * window;

  return (
    <View style={[styles.container, { marginTop: space || undefined }]}>
      <Img height={window * 0.3} width={window * 0.3} />
      <Text style={[styles.placeholderText, textStyle]}>{placeholder}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  placeholderText: {
    ...FontWeights.Light,
    ...FontSizes.Label,
    color: colours.text02,
    marginTop: 40,
  },
});

export default ImgBanner;
