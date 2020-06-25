import React from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../theme/Fonts';

const {FontWeights, FontSizes} = Fonts

const TermsOfService = () => {
  const navigation = useNavigation();
  return(
    <View>
        <View style={styles().viewStyle}>
          <Image style={{height:40, width:40 }} source={require('../../assets/images/LOGOFINALWHITE.png')}/>
          <View style={styles().verticalLine}/>
          <Text style={styles().arravonTextStyle}>Arravon Technologies</Text>
        </View>
          <Text style={styles().headerStyle}> User Agreement </Text>
        <View style={styles().paragraphViewStyle}>
          <Text style={styles().paragraphStyle} >Lorem ipsum dolor sit amet, {"\n"}{"\n"}consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    paragraphStyle: {
      ...FontSizes.Caption,
      margin: 10,
      ...FontWeights.Light,
      textShadowColor: 'black'
    },
    headerStyle: {
      ...FontSizes.Body,
      ...FontWeights.Regular,
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: 10,
      marginBottom: 30,
      fontSize: 20,
    },
    underline:{
      backgroundColor: 'black',
      height: 1,
      marginHorizontal: 10,
      marginRight: 256,
    },
    verticalLine:{
      backgroundColor: 'black',
      height: '70%',
      width: '0.5%',
      marginHorizontal: 9,

    },
    viewStyle:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      paddingVertical: 10,
      borderColor: 'black',
      borderWidth: 0,
      elevation: 1,
    },
    arravonTextStyle:{
      ...FontWeights.Bold,
      ...FontSizes.Label
    },
    paragraphViewStyle:{
      marginHorizontal: 10,
      borderColor: 'black',
      borderWidth: 0,
    },
  });

export default TermsOfService
