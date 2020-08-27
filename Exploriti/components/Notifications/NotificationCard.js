import React, { useContext, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import { AuthContext, parseTimeElapsed } from '../../context';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  GET_EVENT_IMAGE_NAME,
  GET_POST_NOTIFICATION,
  GET_USER_BY_ID,
  NOTIFICATION_FRAG,
  NOTIFICATION_SUBSCRIPTION_FRAG,
  SEE_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_LIKE_NOTIFICATION, GET_COMMENT_NOTIFICATION,
} from '../../graphql';
import { useNavigation } from '@react-navigation/native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Shine,
} from 'rn-placeholder';
import images from '../../assets/images';
import gql from 'graphql-tag';
import Trophy from '../../assets/svg/trophy.svg';
import LinearGradient from 'react-native-linear-gradient';
import CardWithDeleteAction from '../ReusableComponents/CardWithDeleteAction';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * Card for Notification list. Supports all notification types
 * @param image {string}
 * @param localImage An image stored within the app in the images file. Exclusive with image which is an image from the internet
 * @param title {string}
 * @param titleLast {boolean} if true, the bold title will appear after the message
 * @param message {string}
 * @param timestamp {string}
 * @param id {int}
 * @param seen {boolean}
 * @param nav
 * @param SVG
 * @returns {JSX.Element}
 * @constructor
 */
const NotificationCard = ({
  image,
  localImage,
  title,
  titleLast,
  message,
  timestamp,
  id,
  seen,
  nav,
  SVG,
}) => {
  const { authState } = useContext(AuthContext);
  const [seeNotification] = useMutation(SEE_NOTIFICATION, {
    variables: { id: id },
    update: (cache) => {
      try {
        const { notifications } = cache.readFragment({
          id: `user:${authState.user.uid}`,
          fragment: NOTIFICATION_FRAG,
        });

        const newNotifications = notifications.filter((n) => n.id !== id);
        cache.writeFragment({
          id: `user:${authState.user.uid}`,
          fragment: NOTIFICATION_FRAG,
          data: { __typename: 'user', notifications: newNotifications },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
    variables: { notificationId: id, userId: authState.user.uid },
  });

  const [wasTapped, setWasTapped] = useState(false);

  const onPress = () => {
    if (!seen) {
      setWasTapped(true);
      seeNotification();
    }
    nav && nav();
  };

  return (
    <CardWithDeleteAction
      Card={
        <View style={{ backgroundColor: '#FFFFFFFF' }}>
          <TouchableOpacity
            style={[
              styles.container,
              {
                backgroundColor: seen
                  ? colours.placeholder
                  : wasTapped
                  ? colours.placeholder
                  : colours.base,
              },
            ]}
            onPress={onPress}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              {SVG ? (
                <SVG />
              ) : (
                <Image
                  source={localImage ? localImage : { uri: image }}
                  style={styles.image}
                />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.message}>
                  {titleLast ? `${message} ` : null}

                  <Text style={{ ...FontWeights.Bold }}>{title}</Text>
                  {titleLast ? null : ` ${message}`}
                </Text>
              </View>
            </View>
            <Text style={styles.timeStamp}>
              {parseTimeElapsed(timestamp).readableTime}
            </Text>
          </TouchableOpacity>
        </View>
      }
      deleteFunction={deleteNotification}
      cardHeight={60}
    />
  );
};

const LoadingNotificationCard = () => (
  <Placeholder Animation={Shine}>
    <View style={styles.container}>
      <View style={styles.image}>
        <PlaceholderMedia size={40} color={colours.placeholder} isRound />
      </View>
      <PlaceholderLine width={90} style={{ alignSelf: 'center' }} />
    </View>
  </Placeholder>
);

export const SystemNotificationCard = ({ item }) => {
  return (
    <NotificationCard
      title={''}
      message={item.typeId}
      timestamp={item.timestamp}
      localImage={images.logo}
      id={item.id}
      seen={item.seen}
    />
  );
};

export const UserNotificationCard = ({ item, message }) => {
  const { loading, data, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: item.typeId },
  });
  const navigation = useNavigation();
  if (loading) return <LoadingNotificationCard />;
  if (error || !data.user) return null;
  const nav = () => {
    navigation.navigate('Profile', { userId: item.typeId });
  };
  return (
    <NotificationCard
      timestamp={item.timestamp}
      title={data.user.name}
      message={message}
      image={data.user.image}
      id={item.id}
      seen={item.seen}
      nav={nav}
    />
  );
};

export const EventNotificationCard = ({ item, message, titleLast }) => {
  const { loading, data, error } = useQuery(GET_EVENT_IMAGE_NAME, {
    variables: { id: item.typeId },
  });
  const navigation = useNavigation();
  if (loading) return <LoadingNotificationCard />;
  if (error || !data.event) return null;
  const nav = () => {
    navigation.navigate('EventScreen', { eventId: item.typeId });
  };
  return (
    <NotificationCard
      timestamp={item.timestamp}
      title={data.event.name}
      titleLast={titleLast}
      message={message}
      image={data.event.image}
      id={item.id}
      seen={item.seen}
      nav={nav}
    />
  );
};

export const TrophyNotificationCard = ({ item }) => {
  const navigation = useNavigation();

  const nav = () => {
    navigation.navigate('GroupScreen', { groupId: item.typeId });
  };

  const SVG = () => (
    <LinearGradient
      colors={['rgba(247,190,98,1)', 'rgba(244,167,6,1)']}
      style={[
        styles.image,
        { alignItems: 'center', justifyContent: 'center' },
      ]}>
      <Trophy width={25} height={25} fill={'white'} />
    </LinearGradient>
  );

  return (
    <NotificationCard
      timestamp={item.timestamp}
      title={'A Trophy'}
      message={'has been awarded to your group!'}
      id={item.id}
      seen={item.seen}
      nav={nav}
      SVG={SVG}
    />
  );
};
/**
 *
 * @param item
 * @param comment {boolean} if true then the notification is a comment
 * @param like {boolean} if true then it is a like
 * @returns {JSX.Element|null}
 * @constructor
 */
export const PostNotificationCard = ({ item }) => {
  const navigation = useNavigation();

  const typeId = parseInt(item.typeId);

  console.log('typeId', typeId);

  const { data, loading, error } = useQuery(GET_POST_NOTIFICATION, {
    variables: { id: typeId },
  });

  console.log('Notification Post', error);

  if (loading) return <LoadingNotificationCard />;
  if (error || !data.post) return null;

  const nav = () => {
    navigation.navigate('PostScreen', { postId: typeId });
  };

  const message = `made a post in ${data.post.group.name}`;

  return (
    <NotificationCard
      timestamp={item.timestamp}
      title={`${data.post.user.name}`}
      message={message}
      id={item.id}
      seen={item.seen}
      nav={nav}
      image={data.post.user.image}
    />
  );
};

export const LikeNotificationCard = ({ item }) => {
  const navigation = useNavigation();

  const typeId = parseInt(item.typeId);

  console.log('typeId', typeId);

  const { data, loading, error } = useQuery(GET_LIKE_NOTIFICATION, {
    variables: { id: typeId },
  });

  console.log('Notification Like', error, data);

  if (loading) return <LoadingNotificationCard />;
  if (error || !data.like[0]) return null;

  const nav = () => {
    navigation.navigate('PostScreen', { postId: parseInt(data.like[0].post.id) });
  };

  const message = `liked your post in ${data.like[0].post.group.name}`;

  return (
    <NotificationCard
      timestamp={item.timestamp}
      title={`${data.like[0].user.name}`}
      message={message}
      id={item.id}
      seen={item.seen}
      nav={nav}
      image={data.like[0].user.image}
    />
  );
};

export const CommentNotificationCard = ({ item }) => {
  const navigation = useNavigation();

  const typeId = parseInt(item.typeId);

  console.log('typeId', typeId);

  const { data, loading, error } = useQuery(GET_COMMENT_NOTIFICATION, {
    variables: { id: typeId },
  });

  console.log('Notification Comment', error, data);

  if (loading) return <LoadingNotificationCard />;
  if (error || !data.comment) return null;

  const nav = () => {
    navigation.navigate('PostScreen', { postId: data.comment.post.id });
  };

  const message = `commented on your post in ${data.comment.post.group.name}`;

  return (
    <NotificationCard
      timestamp={item.timestamp}
      title={`${data.comment.user.name}`}
      message={message}
      id={item.id}
      seen={item.seen}
      nav={nav}
      image={data.comment.user.image}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colours.placeholder,
    marginLeft: 12,
    marginVertical: 5,
    marginRight: 10,
  },
  textContainer: {
    width: '70%',
    justifyContent: 'center',
  },
  message: {
    ...FontSizes.Body,
    ...FontWeights.Regular,
    color: colours.text02,
    marginRight: 5,
  },
  timeStamp: {
    alignSelf: 'center',
    ...FontWeights.Regular,
    ...FontSizes.SubText,
    color: colours.text02,
    marginRight: 8,
  },
});

export default NotificationCard;
