import React, { useState, useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import images from "../../assets/images";
import Icon from "react-native-vector-icons/EvilIcons";
import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";
import TextLine from "../ReusableComponents/TextLine";
import ButtonColour from "../ReusableComponents/ButtonColour";
import '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app';
import { UserContext } from '../UserContext';

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
  const {authState, setAuthState} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const processLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        console.log(res.user.uid);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const processLogout = async () => {
    try {
      setAuthState({ status: "loading" });
      await firebase.auth().signOut();
      setAuthState({ status: "out" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.bg}>
      <ImageBackground source={images.login} style={styles.backgroundImage}>
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
        />
        <ButtonColour
          colour={colours.white}
          label={"Log in"}
          containerStyle={styles.login}
          labelStyle={styles.loginText}
          onPress={processLogin}
        />
        <ButtonColour
            colour={colours.white}
            label={"Log out"}
            containerStyle={styles.login}
            labelStyle={styles.loginText}
            onPress={processLogout}
        />
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    marginTop: yMargin,
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
});
