import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions, Image, ScrollView, Animated, StatusBar} from 'react-native';
import GoBackHeader from '../Menu/GoBackHeader';
import {Theme, ThemeStatic} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import CircleBackIcon from '../Menu/CircleBackIcon';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';


const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = 0.75 * WIDTH

const Event = ({image, title, time}) => (
    <View style={styles.event}>
        <Image style={styles.eventImage} source={{uri: image}}/>
        <Text style={styles.eventTitle}>{ title }</Text>
        <Text style={styles.eventDate}>{time}</Text>
    </View>
);


const Schedule = () => {

     const carouselRef = useRef();
    const [index, setIndex] = useState(0);
    const [titleOpacity, setTitleOpacity] = useState(new Animated.Value(1));
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            StatusBar.setBarStyle('dark-content')
        });

        return unsubscribe;
    }, [navigation]);

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
                return 'Thursday'
        }
    }

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
                return '11th'
        }
    }


    const renderItem = ({ item, index }) => {
      return (
        <View style={styles.slide}>
          {item.events.map(event => {
            return (
              <Event
                title={event.title}
                image={event.image}
                time={event.time}
                key={event.time + event.title}
              />
            );
          })}
        </View>
      );
    };


    const onSwipe = (slideIndex) =>{

            Animated.timing(titleOpacity, {
                toValue: 0,
                duration: 120,
                useNativeDriver: true
            }).start(()=>{
                setIndex(slideIndex);
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 120,
                    useNativeDriver: true,
                }).start();
            })

    }


    return (
        <ScrollView style={styles.container} bounces={false}>
            <SafeAreaView>

          <View style={styles.header}>
              <CircleBackIcon />
              <Text style={styles.title}>Schedule</Text>
              <View style={{width: 44}}/>
          </View>
          <View style={styles.date}>
              <Animated.Text style={{...styles.dayText, opacity: titleOpacity}}>{title()}</Animated.Text>
              <Text style={styles.dateText}>{"September " + number()}</Text>
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
          </ScrollView>
    );
};


const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: '#ed1b2f',
   },
    title: {
       ...FontSizes.SubHeading,
        ...FontWeights.Bold,
       color: ThemeStatic.white
    },
    header: {
       flexDirection: 'row',
        marginHorizontal: 25,
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    date: {
       marginHorizontal: 40,
        marginTop: 35
    },
    dayText: {
       ...FontWeights.Bold,
        ...FontSizes.SuperHeading,
        color: ThemeStatic.white,
        marginVertical: 7
    },
    dateText: {
       ...FontSizes.Label,
        ...FontWeights.Bold,
        color: ThemeStatic.placeholder,
        opacity: 0.8
    },
    slide: {
    },
    carousel: {
       marginTop: 30
    },
    event: {
       backgroundColor: colours.base,
        borderRadius: 20    ,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 12,
    },
    eventImage: {
       height: 54,
        width: 54,
        borderRadius: 27,
        marginVertical: 15
    },
    eventTitle: {
       ...FontWeights.Bold,
        ...FontSizes.Label,
        maxWidth: WIDTH*0.4,
        marginVertical: 8
    },
    eventDate: {
       ...FontSizes.Body,
        ...FontWeights.Regular,
        color: colours.text03
    }
});

export default Schedule;

const DATA = [
    {
        events: [
            {
                title: "Registration",
                image:
                    "https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg",
                time: "3:00pm",
            },
            {
                title: "Welcome Fest",
                image:
                    "https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170",
                time: "5:30pm",
            },
            {
                title: "Scavenger Hunt",
                image:
                    "https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg",
                time: "1:00pm",
            },
            {
                title: "Event",
                image:
                    "https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170",
                time: "2:30pm",
            },
            {
                title: "End",
                image:
                    "https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg",
                time: "3:00pm",
            },

        ],
    },
    {
        events: [
            {
                title: "Scavenger Hunt",
                image:
                    "https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg",
                time: "1:00pm",
            },
            {
                title: "Event",
                image:
                    "https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170",
                time: "2:30pm",
            },
        ],
    },
    {
        events: [
            {
                title: "Scavenger Hunt",
                image:
                    "https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg",
                time: "1:00pm",
            },
            {
                title: "Event",
                image:
                    "https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170",
                time: "2:30pm",
            },
            {
                title: "Game",
                image:
                    "https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg",
                time: "1:00pm",
            },
            {
                title: "Event 2",
                image:
                    "https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170",
                time: "2:30pm",
            },
        ],
    },
];
