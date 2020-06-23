import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Fonts from '../../theme/Fonts';
import Icon from "react-native-vector-icons/EvilIcons";

const {FontWeights, FontSizes} = Fonts

function UselessTextInput(props) {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

export default function UselessTextInputMultiline() {
  const [value, onChangeText] = React.useState('');

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View>
      <View style={styles().viewStyle}>
        <Text style={styles().titleTextStyle}>Something Isn't Working?</Text>
        <Text style={styles().bodyTextStyle}>Please explain the problem briefly, and describe how to reproduce the bug</Text>
      </View>
      <View
        style={{
          backgroundColor: value,
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
        }}>
        <UselessTextInput
          multiline
          numberOfLines={4}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View>
      <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
      <TouchableOpacity>
      <Icon name="sc-telegram"
      size={45}
      />
      </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = () =>
  StyleSheet.create({
    viewStyle:{
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginBottom: 30,
      padding: 10,
      borderColor: 'black',
      borderWidth: 0,
      elevation: 1,
    },
    titleTextStyle:{
      ...FontSizes.Caption,
      ...FontWeights.Bold,
    },
    bodyTextStyle:{
      ...FontSizes.Caption,
      ...FontWeights.Light,
    },
  });
