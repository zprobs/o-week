import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * A custom Text Input with three possible states: 'emailAddress', 'name', and 'password'
 * @param style Any custom styles for the container
 * @param label {string} The label which will appear above the icon to the left of the text input
 * @param icon An icon which will appear to the left of the text input
 * @param placeholder {string}
 * @param color {string} The color of the text within the text input
 * @param type {string} State of the TextInput either 'emailAddress', 'password' or 'name'
 * @returns {*}
 * @constructor
 */
const TextLine = React.forwardRef(
  (
    {
      style,
      label,
      icon,
      placeholder,
      type,
      value,
      onChangeText,
      next,
      onSubmit,
      blurOnSubmit,
      onBlur,
      error,
      touched
    },
    ref,
  ) => {

    const keyboardType = () => {
      switch (type) {
        case 'email':
          return 'email-address';
        case 'password':
          return Platform.OS === 'ios' ? 'ascii-capable' : 'default';
        default:
          return 'default';
      }
    };

    const textContentType = type === 'email' ? 'emailAddress' : type

    const secureTextEntry = type === 'password';

    const capitalize = type === 'name' ? 'words' : 'none';


    const isValid = !touched ||  !error

    const color = isValid ? ThemeStatic.white : ThemeStatic.red;
    const placeholderColor = isValid ? ThemeStatic.placeholder : ThemeStatic.red;

    if (blurOnSubmit === undefined) blurOnSubmit = true;

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderBottomColor: color,
        borderBottomWidth: 1,
        ...style,
      },
      input: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
      },
      label: {
        ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: color,
      },
      textBox: {
        ...FontWeights.Bold,
        color: color,
        flex: 1,
        padding: 0,
      },
      icon: {
        padding: 5,
        paddingLeft: 0,
      },

      error: {
        ...FontSizes.Caption,
        ...FontWeights.Bold,
        color: color,
      }
    });

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} >
        <Text style={styles.label} numberOfLines={1} flexWrap={'nowrap'}>
          {label}
        </Text>
          {
            !isValid && <Text style={styles.error}>{error}</Text>
          }
      </View>
        <View style={styles.input}>
          <Icon size={28} name={isValid ? icon : 'close-o' } color={color} style={styles.icon} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            style={styles.textBox}
            textContentType={textContentType}
            autoCompleteType={type}
            keyboardType={keyboardType()}
            secureTextEntry={secureTextEntry}
            adjustFontSizeToFit
            returnKeyType={next ? 'next' : 'done'}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize={capitalize}
            onSubmitEditing={onSubmit}
            blurOnSubmit={blurOnSubmit}
            onBlur={onBlur}
            ref={ref}
          />
        </View>
      </View>
    );
  },
);

export default TextLine;
