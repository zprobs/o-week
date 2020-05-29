import React, {useState, useContext, useRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  Platform,
  TouchableOpacity,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import images from "../../assets/images";
import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";
import TextLine from "../ReusableComponents/TextLine";
import ButtonColour from "../ReusableComponents/ButtonColour";
import '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app';
import {AuthContext} from '../../context';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const yMargin = height * 0.08;
const xMargin = width * 0.15;

/**
 * Login component which is reached via the landing page
 * @param navigation Reference to navigation object in Auth stack from App.js
 * @returns {*}
 * @constructor
 */
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  const processLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        console.log(res.user.uid);

      })
    } catch (error) {
      console.log(error);
      Alert.alert(
          "Login Unsuccessful",
          error.toString(),

            {
              text: "Ok",
              onPress: () => console.log("Cancel Pressed"),
              style: "default"
            }
      );
    }
  };


  return (
      <ImageBackground source={images.login} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.bg} behavior={"position"}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Landing')}}>
          <Image source={images.backArrow} style={styles.backArrow}/>
        </TouchableOpacity>
        <View style={styles.logo}>
          <Image
            style={{ height: 160, width: 160, borderRadius: 80 }}
            source={images.logo}
          />
        </View>
        <TextLine
          style={styles.textLine}
          label={"Email"}
          color={colours.white}
          icon={"envelope"}
          placeholder={"first.last@utoronto.ca"}
          type={"emailAddress"}
          value={email}
          onChangeText={setEmail}
          next={true}
          onSubmit={()=>passwordRef.current.focus()}
        />
        <TextLine
          style={styles.textLine}
          label={"Password"}
          color={colours.white}
          icon={"lock"}
          placeholder={"(8+ characters)"}
          type={"password"}
          value={password}
          onChangeText={setPassword}
          ref={passwordRef}
        />
        <ButtonColour
          colour={colours.white}
          label={"Log in"}
          containerStyle={styles.login}
          labelStyle={styles.loginText}
          onPress={processLogin}
        />

        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
      marginTop: yMargin
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  logo: {
    alignSelf: "center",
    height: 160,
    width: 160,
    borderRadius: 80,
    marginTop: yMargin * 0.5,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  textLine: {
    alignSelf: "center",
    marginTop: 40,
    width: width - xMargin,
    borderBottomColor: colours.white,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  login: {
    width: width - xMargin,
    alignSelf: "center",
    marginTop: 30,
  },
  loginText: {
    ...FontWeights.Bold,
    ...FontSizes.Caption,
    color: colours.accent,
  },
  touchable: {
    alignSelf: "center",
    marginTop: 20,
    width: width - xMargin,
  },

  forgot: {
    alignSelf: "center",
    ...FontWeights.Regular,
    ...FontSizes.Label,
    color: colours.white,
  },
  backArrow: {
    width: 40,
    height: 40,
    left: width*0.07,
    top: height*0.02,
    zIndex: 2,
    position: 'absolute',

  },
});
