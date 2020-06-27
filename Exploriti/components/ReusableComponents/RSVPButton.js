import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import Icon from 'react-native-vector-icons/Feather';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light

const RSVPButton = ({onPress, style}) => {
    return(
      <TouchableOpacity style={{...styles.container, ...style}} onPress={onPress}>
          <Icon name={"user-check"} size={26} style={{padding: 4}} />
          <Text style={styles.title}>Tap to RSVP</Text>
          <View style={{width: 32}}/>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
   container: {
       backgroundColor: colours.placeholder,
       height: 44,
       borderRadius: 22,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-around'
   },
    title: {
       ...FontSizes.Body,
        ...FontWeights.Regular,
        color: colours.text02
    },
});

export default RSVPButton;
