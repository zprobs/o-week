import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context';
import { useQuery } from '@apollo/react-hooks';
import { GET_UNREAD_NOTIFICATIONS_COUNT_QUERY } from '../../graphql';
import { Text, View } from 'react-native';

/**
 * Messages menu icon for the top right of Home Screen
 * @returns react-native-vector-icons comment icon
 */
export const NotificationsIcon = ({ white }) => {
  const { authState } = useContext(AuthContext);
  const { data } = useQuery(GET_UNREAD_NOTIFICATIONS_COUNT_QUERY, {
    variables: { id: authState.user.uid },
    fetchPolicy: 'cache-only',
  });
  const badgeCount = data ? data.user.notifications.length : 0;

  const navigation = useNavigation();
  return (
    <>
      <Icon
        name="bell"
        size={32}
        color={white ? 'white' : '#000'}
        onPress={() => navigation.navigate('Notifications')}
        style={{ paddingRight: 12 }}
      />
      {badgeCount > 0 ? (
        <View
          style={{
            position: 'absolute',
            right: 8,
            top: 2,
            backgroundColor: 'red',
            borderRadius: 7,
            width: badgeCount > 99 ? 21 : badgeCount > 9 ? 17 : 14,
            height: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 10,
              fontWeight: 'bold',
              textAlign: 'center',
              letterSpacing: -1,
            }}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </Text>
        </View>
      ) : null}
    </>
  );
};
