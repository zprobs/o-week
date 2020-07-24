import React, { useState, useContext, useRef } from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';
import images from '../../assets/images';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import TextLine from '../ReusableComponents/TextLine';
import ButtonColour from '../ReusableComponents/ButtonColour';
import '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const yMargin = height * 0.08;
const xMargin = width * 0.15;

/**
 * Login component which is reached via the landing page
 * @param navigation Reference to navigation object in Auth stack from App.js
 * @returns {*}
 * @constructor
 */
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  const processLogin = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res.user.uid);
        });
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Login Unsuccessful',
        error.toString(),

        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'default',
        },
      );
    }
  };

  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={[ThemeStatic.darkPurple, ThemeStatic.pink]}
      style={styles.backgroundImage}>
      <Svg
        height={200}
        width={width}
        style={styles.mask}
        viewBox={`0 0 ${width / 2.1} 200`}
        preserveAspectRatio="none">
        <Path
          d="M 0 150 Q 50 50 200 200 L 200 0 L 0 0 L 0 150 "
          fill="white"
          stroke="white"
          fillRule="evenodd"
        />
      </Svg>
      <KeyboardAvoidingView style={styles.bg} behavior={'position'}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.navigate('Landing');
          }}>
          <FeatherIcon
            name={'arrow-left'}
            size={32}
            color={ThemeStatic.white}
          />
        </TouchableOpacity>
        <View style={styles.logo}>
          <Image
            style={{ height: 160, width: 160, borderRadius: 80 }}
            source={images.logo}
          />
        </View>
        <TextLine
          style={styles.textLine}
          label={'Email'}
          color={colours.white}
          icon={'envelope'}
          placeholder={'first.last@my.yorku.ca'}
          type={'emailAddress'}
          value={email}
          onChangeText={setEmail}
          next={true}
          onSubmit={() => passwordRef.current.focus()}
        />
        <TextLine
          style={styles.textLine}
          label={'Password'}
          color={colours.white}
          icon={'lock'}
          placeholder={'(8+ characters)'}
          type={'password'}
          value={password}
          onChangeText={setPassword}
          ref={passwordRef}
        />
        <ButtonColour
          colour={colours.white}
          label={'Log in'}
          containerStyle={styles.login}
          labelStyle={styles.loginText}
          onPress={processLogin}
        />

        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    marginTop: yMargin,
    zIndex: 5,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  logo: {
    alignSelf: 'center',
    height: 160,
    width: 160,
    borderRadius: 80,
    marginTop: yMargin * 0.5,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    alignSelf: 'center',
    marginTop: 40,
    width: width - xMargin,
    borderBottomColor: colours.white,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  login: {
    width: width - xMargin,
    alignSelf: 'center',
    marginTop: 30,
  },
  loginText: {
    ...FontWeights.Bold,
    ...FontSizes.Caption,
    color: colours.accent,
  },
  touchable: {
    alignSelf: 'center',
    marginTop: 20,
    width: width - xMargin,
  },

  forgot: {
    alignSelf: 'center',
    ...FontWeights.Regular,
    ...FontSizes.Label,
    color: colours.white,
  },
  backArrow: {
    left: width * 0.07,
    top: height * 0.02,
    zIndex: 2,
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: ThemeStatic.delete,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
});
