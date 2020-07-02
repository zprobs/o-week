import React, { useEffect, useRef, useState } from 'react';
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
  const carouselRef = useRef();
  const [index, setIndex] = useState(0);
  const [titleOpacity, setTitleOpacity] = useState(new Animated.Value(1));
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     StatusBar.setBarStyle('dark-content');
  //   });
  //
  //   return unsubscribe;
  // }, [navigation]);

  const title = () => {
    switch (index) {
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
    }
  };

  const number = () => {
    switch (index) {
      case 0:
        return '7th';
      case 1:
        return '8th';
      case 2:
        return '9th';
      case 3:
        return '10th';
      case 4:
        return '11th';
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        {item.events.map((event) => {
          return (
            <EventCard
              title={event.title}
              image={event.image}
              time={event.time}
              key={event.time + event.title + index}
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
    <ScrollView style={styles.container} bounces={false}>
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
          <View style={styles.header}>
            <CircleBackIcon />
            <Icon size={32} name={'calendar'} color={'white'} onPress={()=>{
              navigation.navigate('Calendar')
            }} />
          </View>
          <View style={styles.date}>
            <Animated.Text style={{ ...styles.dayText, opacity: titleOpacity }}>
              {title()}
            </Animated.Text>
            <Text style={styles.dateText}>{'September ' + number()}</Text>
          </View>
          <Carousel
            ref={carouselRef}
            data={DATA}
            renderItem={renderItem}
            sliderWidth={WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carousel}
            removeClippedSubviews={false}
            onBeforeSnapToItem={onSwipe}
          />
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: ThemeStatic.placeholder,
    opacity: 0.8,
  },
  slide: {},
  carousel: {
    marginTop: 30,
    height: HEIGHT
  },

});

export default Schedule;

export const DATA = [
  {
    events: [
      {
        title: 'Registration',
        image:
          'https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg',
        time: '9:00am',
      },
      {
        title: 'Welcome Fest',
        image:
          'https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170',
        time: '11:30am',
      },
      {
        title: 'Taking Care of Business',
        image:
          'https://www.metromba.com/wp-content/uploads/2015/09/Rotman-Sept-2012-41-Smaller-e1443470483451-300x150.jpg',
        time: '3:00pm',
      },
      {
        title: 'Scavenger Hunt',
        image:
          'https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg',
        time: '5:00pm',
      },
    ],
  },
  {
    events: [
      {
        title: 'Scavenger Hunt',
        image:
          'https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg',
        time: '1:00pm',
      },
      {
        title: 'Event',
        image:
          'https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170',
        time: '2:30pm',
      },
      {
        title: 'Game',
        image:
          'https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg',
        time: '1:00pm',
      },
      {
        title: 'Event 2',
        image:
          'https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170',
        time: '2:30pm',
      },
    ],
  },
  {
    events: [
      {
        title: 'Scavenger Hunt part 2',
        image:
          'https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg',
        time: '1:00pm',
      },
      {
        title: 'Event',
        image:
          'https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170',
        time: '2:30pm',
      },
    ],
  },
];
