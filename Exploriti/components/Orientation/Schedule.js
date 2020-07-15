import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import CircleBackIcon from '../Menu/CircleBackIcon';
import Carousel from 'react-native-snap-carousel';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import EventCard from './EventCard';
import Icon from 'react-native-vector-icons/Feather';
import { useQuery } from '@apollo/react-hooks';
import { GET_SCHEDULED_EVENTS } from '../../graphql';
import {AuthContext} from '../../context';

const { FontWeights, FontSizes } = Fonts;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = 0.75 * WIDTH;



/**
 * Schedule to display events in a carousel
 * @returns {*}
 * @constructor
 */
const Schedule = () => {
  const {authState} = useContext(AuthContext);
  const {data, loading, error} = useQuery(GET_SCHEDULED_EVENTS, {
    variables: {
      userId: authState.user.uid
    }
  });
  const carouselRef = useRef();
  const [index, setIndex] = useState();
  const [titleOpacity, setTitleOpacity] = useState(new Animated.Value(1));
  const [scheduleData, setScheduleData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(()=> {
    // separating all the events into pages based on which day they occur on.
    if (!data || data.events.length===0) return;

    // reset schedule data (Kind of a weird solution and I honestly dont fully understand so may not be efficient or stable)
    scheduleData.forEach((item)=>item=null);
    scheduleData.length = 0;

    // keep track of all groupIds that are not on user's calendar and then don't render event if that group made it
    const notOnCalendar = [];
    data.user.member.forEach((member)=>{
      if (!member.onCalendar) notOnCalendar.push(member.groupId);
    })


    let i = 0;
    let array = [];
    let date = undefined;
    data.events.forEach((event)=>{
      if (notOnCalendar.includes(event.hosts[0].groupId)) return
      const thisDate = new Date(event.startDate);
      if (date === undefined) date = thisDate;
      if (thisDate.getFullYear() === date.getFullYear() && thisDate.getMonth() === date.getMonth() && thisDate.getDate() === date.getDate()) {
        array.push(event)
      } else {
        scheduleData[i] = array;
        i++;
        array = [];
        array.push(event);
        date = new Date(event.startDate);
      }
    })
    // one more time to catch the last day which isn't handeled in the for each loop
    if (array.length > 0) scheduleData[i] = array;
    // to trigger a rerender to display the title date
    setIndex(0);

  }, [data])


  if (loading || error) return null


  const title = () => {
    if (!scheduleData[index] || scheduleData[index].length <= 0) return null
    const day = new Date(scheduleData[index][0].startDate).getDay()
    switch (day) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
    }
  };


  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' })

  const pageDate = () => {
    if (!scheduleData[index] || scheduleData[index].length <= 0) return null;
    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(new Date(scheduleData[index][0].startDate))
    return `${month} ${day} ${year}`;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {item.map((event) => {
          return (
            <EventCard
              id={event.id}
              name={event.name}
              image={event.image}
              startDate={event.startDate}
              key={event.id}
              userImages={event.attendees.map((attendee)=>attendee.user.image)}
              count={event.attendees_aggregate.aggregate.count}
              description={event.description}
              hosts={event.hosts}
            />
          );
        })}
      </View>
    );
  };

  const onSwipe = (slideIndex) => {
    Animated.timing(titleOpacity, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      setIndex(slideIndex);
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }).start();
    });
  };


  return (
      <LinearGradient
        colors={['#ed1b2f', '#fc8c62']}
        style={{ height: HEIGHT }}>
        <SafeAreaView>
          {
            isFocused ?
                <StatusBar barStyle="light-content"/>
                :
                null
          }
          <ScrollView bounces={false}>
          <View style={styles.header}>
            <CircleBackIcon />
            <Icon size={32} name={'calendar'} color={'white'} onPress={()=>{
              navigation.navigate('Calendar', {myCalendars: data.user.member})
            }} />
          </View>
            <View style={styles.date}>
              <Animated.Text style={{ ...styles.dayText, opacity: titleOpacity }}>
                {title()}
              </Animated.Text>
              <Text style={styles.dateText}>{pageDate()}</Text>
            </View>
          <Carousel
            ref={carouselRef}
            data={scheduleData}
            renderItem={renderItem}
            sliderWidth={WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carousel}
            removeClippedSubviews={false}
            onBeforeSnapToItem={onSwipe}
          />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({

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
    color: ThemeStatic.placeholder,
    opacity: 0.8,
  },
  slide: {
  },
  carousel: {
    marginTop: 30,
    height: HEIGHT
  },

});

export default Schedule;
