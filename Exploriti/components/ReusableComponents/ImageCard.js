import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import UserCountPreview from './UserCountPreview';
import { Theme } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import { useQuery } from '@apollo/react-hooks';
import { GET_EVENT_IMAGE_CARD, GET_GROUP } from '../../graphql';
const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * ImageCard for displaying groups and events in a list
 * @param groupId {string} The id of group to be displayed
 * @param eventId {string} The id of event to be displayed. Exclusive with groupId
 * @returns {*}
 * @constructor
 */
const ImageCard = ({ groupId, eventId }) => {
  const { data, loading, error } = useQuery(GET_GROUP, {
    variables: { id: groupId },
    skip: !!eventId,
  });
  const {
    data: eventData,
    loading: eventLoading,
    error: eventError,
  } = useQuery(GET_EVENT_IMAGE_CARD, {
    variables: { id: eventId },
    skip: !!groupId,
  });

  if (loading || error || eventLoading || eventError) return null;
  let item, count;
  const images = [];

  if (groupId) {
    item = data.group;
    item.members.map((member) => {
      images.push(member.user.image);
    });
    console.log('images length', images.length)
    count = item.members_aggregate.aggregate.count;
  } else {
    item = eventData.event;
    item.attendees.map((attendee) => {
      images.push(attendee.user.image);
    });
    console.log('images length', images.length)
    count = item.attendees_aggregate.aggregate.count;
  }

  return (
    <View style={styles.imageRow}>
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
        locations={[0, 0.9]}
        style={styles.imageLabelContainer}>
        <UserCountPreview count={count} images={images} />
        <Text style={styles.imageLabelText}>{item.name}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 25,
  },
  groupImage: {
    height: 180,
    width: '100%',
    borderRadius: 30,
    marginHorizontal: 5,
  },
  imageLabelContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 8,
  },
  imageLabelText: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    marginTop: 5,
    color: colours.white,
  },
});

export default ImageCard;
