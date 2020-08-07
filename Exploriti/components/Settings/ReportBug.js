import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import ButtonColour from '../ReusableComponents/ButtonColour';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

export default function ReportBug() {
  const [value, onChangeText] = useState('');
  const inputRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.viewStyle}>
        <Text style={styles.titleTextStyle}>Something Isn't Working?</Text>
        <Text style={styles.bodyTextStyle}>
          Please explain the problem briefly, and describe how to reproduce the
          bug
        </Text>
      </View>

      <TextInput
        ref={inputRef}
        autoCapitalize="none"
        style={styles.textStyle}
        activeLineWidth={1}
        onChangeText={onChangeText}
        value={value}
        multiline={true}
        returnKeyType={'default'}
        maxLength={600}
      />

      <ButtonColour
        colour={colours.accent}
        label={'Submit'}
        light={true}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },

  button: {
    marginVertical: 30,
    width: '80%',
    alignSelf: 'center',
  },

  viewStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 30,
    padding: 10,
    borderColor: 'black',
    borderWidth: 0,
    elevation: 1,
  },
  titleTextStyle: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    marginVertical: 10,
  },
  bodyTextStyle: {
    ...FontSizes.Body,
    ...FontWeights.Light,
  },
  textStyle: {
    ...FontWeights.Light,
    color: colours.text01,
    fontSize: FontSizes.Body.fontSize,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    height: 190,
    padding: 12,
  },
});
