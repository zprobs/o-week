import React, {useEffect, useRef, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ScrollView,
    Animated,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import GoBackHeader from '../Menu/GoBackHeader';
import {Theme, ThemeStatic} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import CircleBackIcon from '../Menu/CircleBackIcon';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/EvilIcons';
import UserCountPreview from '../ReusableComponents/UserCountPreview';


const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = 0.75 * WIDTH

const Event = ({image, title, time}) => {

    const navigation = useNavigation();

    const [expanded, setExpanded] = useState(false);

    return (
      <View style={styles.event}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.eventImage} source={{ uri: image }} />
            <View style={{ justifyContent: "center", paddingBottom: 5 }}>
              <Text style={styles.eventTitle}>{title}</Text>
              <Text style={styles.eventDate}>{time}</Text>
            </View>
          </View>
            { expanded ?
          <View>
            <Text style={styles.eventDescription}>
              - Meet with crew at base{"\n"}- Activities start at 4:30{"\n"}
              - Dinner with the crew at 8
            </Text>
            <View style={styles.detailsView}>
              <UserCountPreview style={{marginLeft: 20}} count={8} />
              <TouchableOpacity style={styles.detailsButton} onPress={()=>navigation.push('EventScreen')}>
                <Text style={styles.detailsText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
                : null }
        </View>
        <Icon
          name={expanded ? "chevron-up" : "chevron-down"}
          color={colours.text02}
          size={32}
          style={{ marginRight: 5 }}
          onPress={() => setExpanded(!expanded)}
        />
      </View>
    );
}




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
                key={event.time + event.title + index}
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
                <LinearGradient colors={['#ed1b2f', '#fc8c62' ]} style={{height: HEIGHT}}>
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
        justifyContent: 'space-between',
        marginVertical: 12,
        maxWidth: ITEM_WIDTH
    },
    eventImage: {
       height: 54,
        width: 54,
        borderRadius: 27,
        marginVertical: 15,
        marginHorizontal: 12
    },
    eventTitle: {
       ...FontWeights.Bold,
        ...FontSizes.Label,
        maxWidth: WIDTH*0.4,
        marginVertical: 8
    },
    eventDate: {
       ...FontSizes.Caption,
        ...FontWeights.Bold,
        color: colours.text03
    },
    eventDescription: {
       maxWidth: ITEM_WIDTH*0.7,
        padding: 15,
        ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: colours.text03
    },
    detailsView: {
       flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 12,
        width: ITEM_WIDTH*0.85
    },
    detailsButton: {
       height: 30,
        borderRadius: 15,
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 1.5,
            height: 1.5
        },
        shadowOpacity: 0.6,
        paddingHorizontal: 10,
        backgroundColor: colours.base,
        justifyContent: 'center',
    },
    detailsText: {
       ...FontSizes.SubText,
        ...FontWeights.Bold,
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
                title: "Scavenger Hunt part 2",
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
