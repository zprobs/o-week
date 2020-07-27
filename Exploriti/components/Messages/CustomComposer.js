import React from 'react';
import { StyleSheet } from 'react-native';
import { Composer } from 'react-native-gifted-chat';
import { Theme } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

const CustomComposer = (composerProps) => {
  return (
    <Composer {...composerProps} multiline textInputStyle={styles.inputStyle} />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: colours.text01,
    paddingTop: 10,
    paddingLeft: 10,
  },
});

export default CustomComposer;
