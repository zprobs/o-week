import React from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import {SafeAreaView} from 'react-native-safe-area-context';


const About = ({navigation}) => {
  return(
    <View>
    <Text style={styles().headerStyle} >User Agreement</Text>
    <View style={styles().viewStyle} />
    <Text style={styles().paragraphStyle} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    paragraphStyle: {
      margin: 10,
      fontWeight: 'normal',
      textShadowColor: 'black'
    },
    headerStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: 10,
      fontSize: 20
    },
    viewStyle:{
      backgroundColor: 'black',
      height: 1,
      marginHorizontal: 10,
      marginRight: 256,
    },
  });

export default About
