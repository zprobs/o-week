import React from 'react';
import { getDetailedGroup } from '@graphql/types/getDetailedGroup';
import { useQuery } from '@apollo/client';
import { GetEventsById } from '@graphql/Event';
import {
  getEventsById,
  getEventsByIdVariables,
} from '@graphql/types/getEventsById';
import { processWarning } from '@util/messages';
import { View } from 'react-native';
import ImgBanner from '@components/list/ImgBanner';
import EmptyFeed from '@root/assets/svg/empty-feed.svg';
import EventCard from '@components/card/EventCard';

interface Props {
  groupReady: boolean;
  groupData: getDetailedGroup;
}

const Events: React.FC<Props> = ({ groupReady, groupData }) => {
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
  } = useQuery<getEventsById, getEventsByIdVariables>(GetEventsById, {
    variables: {
      _in: groupData.group?.events.map((event) => event.event.id) || [],
    },
  });

  if (eventsLoading || !groupReady || !eventsData) return null;
  if (eventsError) {
    processWarning(eventsError, 'Could not load Events');
    return null;
  }

  if (eventsData.events.length > 0) {
    return (
      <View
        style={{
          paddingHorizontal: 25,
          marginTop: 30,
          alignItems: 'center',
        }}>
        {eventsData.events.map((event) => {
          return (
            <EventCard
              startDate={event.startDate}
              name={event.name}
              style={{ width: '100%', alignItems: 'center' }}
              image={event.image}
              key={event.id}
              count={event.attendees_aggregate?.aggregate?.count || 0}
              description={event.description || ''}
              userImages={event.attendees.map(
                (attendee) => attendee.user.image,
              )}
              id={event.id}
              longDate
              calendar={false}
              isExpanded={false}
              isSelected={false}
              plus={false}
            />
          );
        })}
      </View>
    );
  }
  return <ImgBanner Img={EmptyFeed} placeholder="No Events yet" spacing={0} />;
};

export default Events;
