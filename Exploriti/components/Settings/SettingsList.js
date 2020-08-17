import React, { useContext } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import firebase from '@react-native-firebase/app';
import { AuthContext } from '../../context';
import Notifications from './Notifications';
import { useNavigation } from '@react-navigation/native';
import { Theme, ThemeStatic } from '../../theme/Colours';
import { useQuery } from '@apollo/react-hooks';
import { CHECK_USER_ADMIN } from '../../graphql';
import { linkError } from '../ReusableComponents/SocialMediaIcons';
const { colours } = Theme.light;

export default function SettingsList() {
  const navigation = useNavigation();

  const { authState, setAuthState } = useContext(AuthContext);
  const { loading, data, error } = useQuery(CHECK_USER_ADMIN, {
    variables: { id: authState.user.uid },
  });

  const processLogout = async () => {
    try {
      setAuthState({ status: 'loading' });
      await firebase.auth().signOut();
      setAuthState({ status: 'out' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ListItem
          icon={'bell'}
          name={'Notifications'}
          destination={'Notifications'}
        />

        <ListItem
          destination={'Blocked Users'}
          icon={'close-o'}
          name={'Blocked Users'}
        />
        <ListItem
          destination={'Messages & Invitations'}
          icon={'sc-telegram'}
          name={'Messages'}
        />

        <ListItem
          name={'Terms Of Service'}
          icon={'archive'}
          link={'https://www.arravon.com/termsofuse'}
        />
        <ListItem
          name={'Our Company'}
          icon={'external-link'}
          link={'https://www.arravon.com'}
        />

        <ListItem
          destination={'Report Bug'}
          icon={'tag'}
          name={'Report a Bug'}
        />
        <ListItem
          link={'mailto:support@arravon.com'}
          icon={'envelope'}
          name={'Contact Support'}
        />

        <View style={{ height: 20 }} />

        <View style={styles.buttonViews}>
          <Button
            title={'Log Out'}
            onPress={processLogout}
            style={styles.button}
          />
          <View style={{ height: 20 }} />

          {!loading && !error && data.user && data.user.isAdmin ? (
            <Button
              title={'Admin Console'}
              onPress={() => navigation.push('Admin Console')}
              color={ThemeStatic.lightPurple}
            />
          ) : null}
        </View>
      </View>
      <View style={styles.bottomBannerViewStyle}>
        <Image
          style={{}}
          source={require('../../assets/images/ArravonLogo.png')}
        />
      </View>
    </View>
  );
}

export const ListItem = ({ name, icon, destination, link }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (link) {
          Linking.canOpenURL(link)
            .then((result) => {
              if (result) {
                Linking.openURL(link).catch((e) => console.log(e));
              } else {
                linkError('', 'Link');
              }
            })
            .catch((error) => {
              linkError(error, 'Link');
            });
        } else {
          navigation.navigate(destination);
        }
      }}>
      <View>
        <View style={styles.settingItemViewStyle}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon name={icon} size={30} />
            <Text style={styles.settingItemTextStyle}> {name} </Text>
          </View>

          <View style={{ justifyContent: 'flex-start' }}>
            <Icon
              style={styles.settingItemChevronStyle}
              name="chevron-right"
              size={30}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },
  settingItemViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 7,
    marginVertical: 12,
  },
  settingItemTextStyle: {
    fontSize: 16,
  },

  bottomBannerViewStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginBottom: 25,
  },
  button: {
    paddingVertical: 35,
  },
  buttonViews: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 7,
  },
});
