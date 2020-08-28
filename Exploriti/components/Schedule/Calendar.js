import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import { ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import CircleBackIcon from '../Menu/CircleBackIcon';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import EventCard from '../ReusableComponents/EventCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_SCHEDULED_EVENTS, UPDATE_CALENDARS } from '../../graphql';
import { AuthContext, processError } from '../../context';
import RNCalendarEvents from 'react-native-calendar-events';
import { showMessage } from 'react-native-flash-message';

const { FontWeights, FontSizes } = Fonts;

/**
 * List of Calendars to be shown in the schedule or added to the phone's calendar
 * @returns {*}
 * @constructor
 */
const Calendar = () => {
  const { authState } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const { data } = useQuery(GET_SCHEDULED_EVENTS, {
    variables: {
      userId: authState.user.uid,
    },
    fetchPolicy: 'cache-only',
  });
  const [updateCalendars, { error }] = useMutation(UPDATE_CALENDARS);
  const myCalendars = data ? data.user.member : [];

  const saveCalendar = async (calendar) => {
    try {
      const calendars = await RNCalendarEvents.findCalendars();

      console.log({ calendars });

      const thisCalendar = calendars.find(
        (cal) => cal.title === calendar.group.name,
      );

      console.log({ thisCalendar });

      if (thisCalendar) {
        const removed = await RNCalendarEvents.removeCalendar(thisCalendar.id);
        console.log({ removed });
      }

      RNCalendarEvents.saveCalendar({
        title: calendar.group.name,
        color: ThemeStatic.accent,
        entityType: 'event',
        name: calendar.group.name,
        accessLevel: 'owner',
        ownerAccount: authState.user.email,
        source: {
          name: authState.user.email,
          type: 'LOCAL',
        },
      })
        .then((id) => {
          const events = data.events.filter(
            (evt) =>
              evt.hosts.find((h) => h.groupId === calendar.group.id) !==
              undefined,
          );
          console.log({ events });
          events.map((evt) => {
            RNCalendarEvents.saveEvent(evt.name, {
              calendarId: id,
              startDate: new Date(evt.startDate).toISOString(),
              endDate: new Date(evt.endDate).toISOString(),
              location: evt.location,
            });
          });
          showMessage({
            message: 'Successfully Added to Calendar',
            description: 'Please check your phone calendar to see the events',
            autoHide: true,
            type: 'success',
            icon: 'auto',
          });
        })
        .catch((e) => processError(e, 'Could not create calendar'));
    } catch (e) {
      processError(e, 'Could not save calendar');
    }
  };

  const addToPhoneCalendar = (calendar) => {
    console.log({ calendar });
    RNCalendarEvents.checkPermissions(false)
      .then((result) => {
        console.log(result);
        if (result !== 'authorized') {
          RNCalendarEvents.requestPermissions(false)
            .then((result) => {
              if (result === 'authorized') saveCalendar(calendar);
            })
            .catch((e) => console.log(e));
        } else {
          saveCalendar(calendar);
        }
      })
      .catch((e) => console.log(e));
  };

  const updateOnCalendar = (calendar, selected) => {
    updateCalendars({
      variables: {
        groupId: calendar.groupId,
        userId: authState.user.uid,
        onCalendar: selected,
      },
      refetchQueries: [
        {
          query: GET_SCHEDULED_EVENTS,
          variables: { userId: authState.user.uid },
        },
      ],
    }).catch((e) => console.log(e));
  };

  if (error) {
    processError(error, 'Could not update Calendar changes');
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <LinearGradient colors={['#fc8c62', '#ed1b2f']} style={styles.container}>
        <SafeAreaView>
          {isFocused ? <StatusBar barStyle="light-content" /> : null}
          <View style={styles.header}>
            <CircleBackIcon />
          </View>
          <View style={styles.date}>
            <Text style={styles.dayText}>Calendars</Text>
          </View>
          <View style={styles.calendarsContainer}>
            {myCalendars.length > 0 ? (
              <Text style={styles.dateText}>My Calendars</Text>
            ) : null}

            {myCalendars.map((calendar) => (
              <EventCard
                calendar={true}
                name={calendar.group.name}
                calendarType={calendar.group.groupType}
                plus={false}
                onPress={(selected) => updateOnCalendar(calendar, selected)}
                addToPhoneCalendar={() => addToPhoneCalendar(calendar)}
                isSelected={calendar.onCalendar}
                key={calendar.group.id}
                isExpanded={true}
              />
            ))}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...FontSizes.SubHeading,
    ...FontWeights.Bold,
    color: ThemeStatic.white,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    marginHorizontal: 40,
    marginTop: 35,
  },
  dayText: {
    ...FontWeights.Bold,
    ...FontSizes.SuperHeading,
    color: ThemeStatic.white,
    marginVertical: 7,
  },
  dateText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: ThemeStatic.lightgray,
    opacity: 0.9,
  },
  calendarsContainer: {
    marginHorizontal: 25,
    marginTop: 30,
  },
});

export default Calendar;
