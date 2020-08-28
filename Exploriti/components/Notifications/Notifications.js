import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import EmptyNotifications from '../../assets/svg/empty-notifications.svg';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { useSubscription } from '@apollo/react-hooks';
import { GET_NOTIFICATIONS } from '../../graphql';
import { AuthContext, NotificationTypes, processWarning } from '../../context';

import {
  CommentNotificationCard,
  EventNotificationCard,
  LikeNotificationCard,
  PostNotificationCard,
  SystemNotificationCard,
  TrophyNotificationCard,
  UserNotificationCard,
} from './NotificationCard';
import NotificationsPlaceholder from '../Placeholders/NotificationsPlaceholder';

/**
 * List of users notifications found in MyProfile -> NotificationIcon
 * @returns {JSX.Element}
 * @constructor
 */
export default function Notifications() {
  const { authState } = useContext(AuthContext);
  const { data, loading, error } = useSubscription(GET_NOTIFICATIONS, {
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
    processWarning(error, 'Server Error');
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
            titleLast={true}
          />
        );
      case NotificationTypes.eventTimeChange:
        return (
          <EventNotificationCard
            item={item}
            message={'has updated the time of the event'}
          />
        );
      case NotificationTypes.newEvent:
        return (
          <EventNotificationCard
            item={item}
            message={'A new event has been created: '}
            titleLast={true}
          />
        );
      case NotificationTypes.trophyAwarded:
        return <TrophyNotificationCard item={item} />;
      case NotificationTypes.newPost:
        return <PostNotificationCard item={item} />;
      case NotificationTypes.newComment:
        return <CommentNotificationCard item={item} />;
      case NotificationTypes.newLike:
        return <LikeNotificationCard item={item} />;
      default:
        return <SystemNotificationCard item={item} />;
    }
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
