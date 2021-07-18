import React from 'react';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useQuery } from '@apollo/client';
import { GetEventImageCard } from '@graphql/Event';
import { GetGroup } from '@graphql/Group';
import {
  getEventImageCard,
  getEventImageCard_event,
  getEventImageCardVariables,
} from '@graphql/types/getEventImageCard';
import {
  getGroup,
  getGroup_group,
  getGroupVariables,
} from '@graphql/types/getGroup';
import UserCountPreview from './UserCountPreview';
import useStyles from './ImageCard.styles';

interface Props {
  id: string;
  type: 'event' | 'group';
}

/**
 * ImageCard for displaying groups and events in a list
 * @constructor
 */
const ImageCard: React.FC<Props> = ({ id, type }) => {
  const styles = useStyles();
  const Query = type === 'event' ? GetEventImageCard : GetGroup;
  type QueryVariables = getEventImageCardVariables | getGroupVariables;
  type QueryType = getEventImageCard | getGroup;
  const { data, loading, error } = useQuery<QueryType, QueryVariables>(Query, {
    variables: { id },
  });

  if (loading || error) return null;
  let item: getGroup_group | getEventImageCard_event | null;
  let count = 0;
  const images: string[] = [];

  if (type === 'group') {
    const groupData = data as getGroup;
    item = groupData.group;
    if (item) {
      item.members.forEach((member) => {
        images.push(member.user.image);
      });
      count = item.members_aggregate?.aggregate?.count || 0;
    }
  } else {
    const eventData = data as getEventImageCard;
    item = eventData.event;
    if (item) {
      item.attendees.forEach((attendee) => {
        images.push(attendee.user.image);
      });
      count = item.attendees_aggregate?.aggregate?.count || 0;
    }
  }

  return (
    <View style={styles.imageRow}>
      <Image source={{ uri: item?.image }} style={styles.groupImage} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
        locations={[0, 0.9]}
        style={styles.imageLabelContainer}>
        <UserCountPreview count={count} images={images} />
        <Text style={styles.imageLabelText}>{item?.name}</Text>
      </LinearGradient>
    </View>
  );
};

export default ImageCard;
