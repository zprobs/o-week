import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import { parseTimeElapsed } from '../../context';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERS_BY_ID } from '../../graphql';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;
const WIDTH = Dimensions.get('window').width;

const NotificationCard = ({ image, title, message, timestamp }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row' }}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={{maxWidth: '80%'}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
      <Text style={styles.timeStamp}>{parseTimeElapsed(timestamp).readableTime}</Text>
  </View>
);

const LoadingNotificationCard = () => (
  <Text>Loading...</Text>
)

const ErrorNotificationsCard = (error) => (
  <Text>{`Error: ${error.message}`}</Text>
)

export const SystemNotificationCard = ({ item }) => {
  return (
    <NotificationCard
      title={item.title}
      message={item.message}
      timestamp={item.timestamp}
      image={
        'https://banner2.cleanpng.com/20180714/hpt/kisspng-computer-software-computer-icons-system-integratio-b2c-5b4ab6436b7241.1214688515316229794401.jpg'
      }
    />
  );
};

export const UserNotificationCard = ({ item, message }) => {
  const {loading, data, error} = useQuery(GET_USERS_BY_ID, {variables: {_in: [item.typeId]}})
  if (loading) return <LoadingNotificationCard/>
  if (error || !data.user) return <ErrorNotificationsCard/>
  return <NotificationCard timestamp={item.timestamp} title={data.user.name} message={message} image={data.user.image} />
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  title: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    marginVertical: 4,
  },
  message: {
    ...FontSizes.Body,
    ...FontWeights.Regular,
    color: colours.text02,
    marginRight: 5,
  },
  timeStamp: {
    alignSelf: 'flex-end',
    ...FontWeights.Regular,
    ...FontSizes.SubText,
    color: colours.text02,
    marginRight: 12
  }
});

export default NotificationCard;
