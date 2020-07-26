import React, { useState } from 'react';
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
import { parseTimeElapsed } from '../../context';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  GET_EVENT_IMAGE_NAME,
  GET_USER_BY_ID,
  SEE_NOTIFICATION,
} from '../../graphql';
import { useNavigation } from '@react-navigation/native';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

const NotificationCard = ({
  image,
  title,
  message,
  timestamp,
  id,
  seen,
  nav,
}) => {
  const [seeNotification] = useMutation(SEE_NOTIFICATION, {
    variables: { id: id },
  });
  const [isSeen, setIsSeen] = useState(seen);

  console.log('seen', seen);

  const onPress = () => {
    if (!isSeen) {
      setIsSeen(true);
      seeNotification();
    }
    nav && nav();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isSeen ? colours.placeholder : colours.base },
      ]}
      onPress={onPress}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.message}>
            <Text style={{ ...FontWeights.Bold }}>{title}</Text>
            {` ${message}`}
          </Text>
        </View>
      </View>
      <Text style={styles.timeStamp}>
        {parseTimeElapsed(timestamp).readableTime}
      </Text>
    </TouchableOpacity>
  );
};

const LoadingNotificationCard = () => <Text>Loading...</Text>;

const ErrorNotificationsCard = ({ error }) => (
  <Text>{`Error: ${error.message}`}</Text>
);

export const SystemNotificationCard = ({ item }) => {
  return (
    <NotificationCard
      title={'System'}
      message={'Welcome to the App'}
      timestamp={item.timestamp}
      image={
        'https://banner2.cleanpng.com/20180714/hpt/kisspng-computer-software-computer-icons-system-integratio-b2c-5b4ab6436b7241.1214688515316229794401.jpg'
      }
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
  if (error || !data.user)
    return (
      <ErrorNotificationsCard
        error={error ? error : { message: 'no users found' }}
      />
    );
  const nav = () => {
    navigation.push('Profile', { userId: item.typeId });
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

export const EventNotificationCard = ({ item, message }) => {
  const { loading, data, error } = useQuery(GET_EVENT_IMAGE_NAME, {
    variables: { id: item.typeId },
  });
  const navigation = useNavigation();
  if (loading) return <LoadingNotificationCard />;
  if (error || !data.event)
    return (
      <ErrorNotificationsCard
        error={error ? error : { message: 'Could not find event' }}
      />
    );
  const nav = () => {
    navigation.push('EventScreen', { eventId: item.typeId });
  };
  return (
    <NotificationCard
      timestamp={item.timestamp}
      title={data.event.name}
      message={message}
      image={data.event.image}
      id={item.id}
      seen={item.seen}
      nav={nav}
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
