import React, { ChangeEvent } from 'react';
import { TextInput, Text, ViewStyle } from 'react-native';
import useStyles from './FormInput.styles';

interface Props {
  placeholder?: string; // A placeholder for the text box
  value: string; // the current value of the text
  onChangeText: (e: string | ChangeEvent<any>) => void;
  onBlur: (e: any) => void;
  touched?: boolean; // used with Formik. Weather or not view has been touched yet
  multiline: boolean;
  label: string; // The label rendered above the text input
  error?: string; // used with Formik.
  characterRestriction?: number; // char limit
  containerStyle?: ViewStyle;
  autoCapitalize?: boolean;
}

const FormInput = React.forwardRef<TextInput, Props>(
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
      autoCapitalize = false,
    },
    ref,
  ) => {
    const styles = useStyles();
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
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={styles.placeholderTextColor.color}
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

export default FormInput;
