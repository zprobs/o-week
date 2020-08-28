import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import { AuthContext, ReloadContext } from '../../context';
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

  const emailSent = () => {
    showMessage({
      message: 'Email Sent',
      description: `email sent to ${authState.user.email} `,
      autoHide: true,
      type: 'success',
      icon: 'auto',
    });
  };

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
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={emailSent}>
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
