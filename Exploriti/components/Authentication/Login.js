import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Alert, Linking,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { linkError } from '../ReusableComponents/SocialMediaIcons';

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
  const passwordRef = useRef();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const processLogin = async ({ email, password }) => {
    console.log('processLogin', email, password);
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
        `${error.message}`,

        [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'default',
          },
        ],
      );
    }
  };

  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={[ThemeStatic.darkPurple, ThemeStatic.lightBlue]}
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
      <KeyboardAwareScrollView
        style={styles.bg}
        scrollEnabled={false}
        bounces={false}
        enableOnAndroid={true}>
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

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => processLogin(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextLine
                style={styles.textLine}
                label={'Email'}
                icon={'envelope'}
                placeholder={'*****@my.yorku.ca'}
                type={'email'}
                value={values.email}
                onChangeText={handleChange('email')}
                next={true}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                onSubmit={() => passwordRef.current.focus()}
                blurOnSubmit={false}
              />
              <TextLine
                style={styles.textLine}
                label={'Password'}
                icon={'lock'}
                type={'password'}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                ref={passwordRef}
                error={errors.password}
                touched={touched.password}
              />

              <ButtonColour
                colour={colours.white}
                label={'Log in'}
                containerStyle={styles.login}
                labelStyle={styles.loginText}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>

        <TouchableOpacity style={styles.touchable}>
          <TouchableOpacity onPress={()=>{
            Linking.canOpenURL('https://www.arravon.com/verification')
              .then((result) => {
                if (result) {
                  Linking.openURL('https://www.arravon.com/verification').catch((e) => console.log(e));
                } else {
                  linkError('', 'Reset Password');
                }
              })
              .catch((error) => {
                linkError(error, 'Reset Password');
              });
          }}>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    paddingTop: yMargin,
    zIndex: 5,
  },
  backgroundImage: {
    flex: 1,
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
