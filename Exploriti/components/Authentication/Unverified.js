import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import { AuthContext, processError } from '../../context';
import { Theme, ThemeStatic } from '../../theme/Colours';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../theme/Fonts';
import EmailVerify from '../../assets/svg/email-verify.svg';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;
const { width } = Dimensions.get('window');

const svgSize = width * 0.45;

const Unverified = () => {
  const { authState, setAuthState } = React.useContext(AuthContext);

  function sendEmailVerification() {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() =>
        showMessage({
          message: 'Email Sent',
          description: `check your inbox at ${authState.user.email} `,
          autoHide: true,
          type: 'success',
          icon: 'auto',
        }),
      )
      .catch((e) => {
        console.log(e);
        if (e.message.includes('unusual')) {
          processError({message: 'Please wait before requesting another resend'}, 'Cannot send email')
        } else {
          processError(e, 'Could not send email verification');
        }
      })
  }

  useEffect(() => {
    sendEmailVerification();
  }, []);

  useEffect(() => {
    if (authState.user && authState.user.emailVerified) {

    }
  }, [authState])

  const logOut = () => {
    try {
      setAuthState({ status: 'loading' });
      firebase
        .auth()
        .signOut()
        .then(setAuthState({ status: 'out' }));
    } catch (error) {
      console.log(error);
    }
  };

  const onContinue = async () => {
    try {
       await firebase.auth().currentUser.reload();
      const user = firebase.auth().currentUser;
      console.log({user});
      if (user.emailVerified === false) {
        showMessage({
          message: 'Not Verified Yet',
          description: 'please click the link in your inbox to verify your account',
          autoHide: true,
          type: 'info',
          icon: 'auto',
        });
      } else {
        setAuthState({status: 'in', user})
      }
    } catch (e) {
      processError(e, 'Could not check status')
    }
  }

  return (
    <LinearGradient
      colors={[ThemeStatic.accent, ThemeStatic.navyBlue]}
      style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Icon
          name={'arrow-left'}
          size={32}
          style={styles.backIcon}
          color={colours.white}
          onPress={logOut}
        />

        <View style={styles.titleView}>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subTitle}>
            Check your email & click the link to activate your account
          </Text>
        </View>

        <EmailVerify height={svgSize} width={svgSize} fill={'white'} />

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendEmailVerification}>
            <Text style={styles.resend}>Resend Email</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Unverified;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  titleView: {
    paddingHorizontal: 25,
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: colours.white,
    textAlign: 'center',
    marginVertical: 12,
  },
  subTitle: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    textAlign: 'center',
    color: colours.white,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: colours.white,
    width: '80%',
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  continueText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: ThemeStatic.navyBlue,
  },
  resend: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: colours.white,
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
