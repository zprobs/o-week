import React from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

const FormInput = React.forwardRef(
  /**
   *
   * @param placeholder {string} A placeholder for the text box
   * @param value {string} the current value of the text
   * @param onChangeText {function}
   * @param onBlur {function}
   * @param touched {boolean} used with Formik. Weather or not view has been touched yet
   * @param multiline {boolean}
   * @param label {string} The label rendered above the text input
   * @param error {string} used with Formik
   * @param characterRestriction {int} char limit
   * @param containerStyle
   * @param autoCapitalize {boolean}
   * @param ref
   * @returns {JSX.Element}
   */
  (
    {
      placeholder,
      value,
      onChangeText,
      onBlur,
      touched,
      multiline,
      label,
      error,
      characterRestriction,
      containerStyle,
      autoCapitalize,
    },
    ref,
  ) => {
    const isValid = !touched || !error;

    return (
      <>
        <Text style={styles.labelTextStyle}>{`${label} ${
          isValid ? '' : `(${error})`
        }`}</Text>
        <TextInput
          ref={ref}
          autoCapitalize={autoCapitalize ? 'sentences' : 'none'}
          style={[styles.textStyle, { ...containerStyle }]}
          activeLineWidth={0}
          placeholder={placeholder}
          placeholderTextColor={colours.text02}
          onChangeText={onChangeText}
          value={value}
          multiline={multiline || false}
          returnKeyType={multiline ? 'default' : 'done'}
          maxLength={characterRestriction}
          onBlur={onBlur}
        />
      </>
    );
  },
);

const styles = StyleSheet.create({
  labelTextStyle: {
    ...FontWeights.Regular,
    color: colours.accent,
    fontSize: FontSizes.Label.fontSize,
    marginVertical: 10,
  },
  textStyle: {
    ...FontWeights.Light,
    color: colours.text01,
    fontSize: FontSizes.Body.fontSize,
    marginBottom: 15,
  },
});

export default FormInput;
