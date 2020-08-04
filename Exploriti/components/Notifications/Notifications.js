import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import EmptyNotifications from '../../assets/svg/empty-notifications.svg';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { useQuery } from '@apollo/react-hooks';
import { GET_NOTIFICATIONS } from '../../graphql';
import { AuthContext, NotificationTypes, refreshToken } from '../../context';
import {
  EventNotificationCard,
  SystemNotificationCard,
  UserNotificationCard,
} from './NotificationCard';
import { showMessage } from 'react-native-flash-message';
import NotificationsPlaceholder from '../Placeholders/NotificationsPlaceholder';

export default function Notifications() {
  const { authState, setAuthState } = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_NOTIFICATIONS, {
    variables: { id: authState.user.uid },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <NotificationsPlaceholder />
      </View>
    );
  }

  if (error) {
    refreshToken(authState.user, setAuthState);
    if (error.message !== 'GraphQL error: Could not verify JWT: JWTExpired') {
      showMessage({
        message: 'Server Error',
        description: error.message,
        type: 'warning',
        icon: 'auto',
      });
    }
  }

  const renderItem = ({ item }) => {
    switch (item.type) {
      case NotificationTypes.system:
        return <SystemNotificationCard item={item} />;
      case NotificationTypes.confirmFriendRequest:
        return (
          <UserNotificationCard
            item={item}
            message={'has accepted your friend request'}
          />
        );
      case NotificationTypes.sendFriendRequest:
        return (
          <UserNotificationCard
            item={item}
            message={'sent you a friend request'}
          />
        );
      case NotificationTypes.eventInvite:
        return (
          <EventNotificationCard
            item={item}
            message={'You have been invited to '}
          />
        );
    }
    return <Text>{item.type}</Text>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={listEmptyComponent}
        data={data ? data.user.notifications : null}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const listEmptyComponent = () => (
  <ImgBanner
    Img={EmptyNotifications}
    placeholder="No notifications yet"
    spacing={0.15}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
