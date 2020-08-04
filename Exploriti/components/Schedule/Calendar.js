import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import CircleBackIcon from '../Menu/CircleBackIcon';
import { useIsFocused, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import EventCard from '../ReusableComponents/EventCard';
import { useMutation } from '@apollo/react-hooks';
import { GET_SCHEDULED_EVENTS, UPDATE_CALENDARS } from '../../graphql';
import { AuthContext, processError } from '../../context';
import { showMessage } from 'react-native-flash-message';

const { FontWeights, FontSizes } = Fonts;
const HEIGHT = Dimensions.get('window').height;

/**
 * List of Calendars to be shown in the schedule or added to the phone's calendar
 * @returns {*}
 * @constructor
 */
const Calendar = () => {
  const { authState } = useContext(AuthContext);
  const route = useRoute();
  const { myCalendars } = route.params;
  const isFocused = useIsFocused();
  const [updateCalendars, {error}] = useMutation(UPDATE_CALENDARS);

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
    }).catch(e=>console.log(e));
  };

  if (error) {
    processError(error, 'Could not update Calendar changes')
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <LinearGradient
        colors={['#fc8c62', '#ed1b2f']}
        style={{ height: HEIGHT }}>
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

            {myCalendars.map((calendar, index) => (
              <EventCard
                calendar={true}
                name={calendar.group.name}
                calendarType={calendar.group.groupType}
                plus={false}
                onPress={(selected) => updateOnCalendar(calendar, selected)}
                isSelected={calendar.onCalendar}
                key={index}
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
