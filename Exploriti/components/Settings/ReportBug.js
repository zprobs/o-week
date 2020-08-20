import React, { useState, useRef, useContext } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from '@apollo/react-hooks';
import { REPORT_BUG, REPORT_USER } from '../../graphql';
import { showMessage } from 'react-native-flash-message';
import { AuthContext } from '../../context';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

export default function ReportBug() {
  const [value, onChangeText] = useState('');
  const inputRef = useRef();

  const { authState } = useContext(AuthContext);

  const [reportUser] = useMutation(REPORT_BUG, {
    variables: { description: value, reporter: authState.user.uid },
    onCompleted: () => {
      showMessage({
        message: 'Report Submitted',
        description:
          'Thank you for letting us know. We will examine this bug as soon as possible',
        autoHide: true,
        duration: 4000,
        type: 'success',
        icon: 'auto',
      });
      onChangeText('')
    },
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>

      <View style={styles.viewStyle}>
        <Text style={styles.titleTextStyle}>Something Isn't Working?</Text>
        <Text style={styles.bodyTextStyle}>
          Please explain the problem briefly, and describe how to reproduce the
          bug
        </Text>
      </View>

      <TextInput
        ref={inputRef}
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
        onPress={reportUser}
      />
      </KeyboardAwareScrollView>
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
    textAlignVertical: 'top'
  },
});
