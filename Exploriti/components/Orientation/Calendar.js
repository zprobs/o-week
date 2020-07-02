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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import EventCard from './EventCard';
import Icon from 'react-native-vector-icons/Feather';

const { FontWeights, FontSizes } = Fonts;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = 0.75 * WIDTH;



/**
 * List of Calendars to be shown in the schedule or added to the phone's calendar
 * @returns {*}
 * @constructor
 */
const Calendar = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [invites, setInvites] = useState(invitesDATA);
    const [myCalenders, setMyCalendars] = useState(myCalendarsDATA)

    const removeCalendar = (key) => {
        const newCalendar = [];
        myCalenders.map((calendar, index)=> {
            if (index !== key) {
                newCalendar.push(calendar);
            }
        })
        setMyCalendars(newCalendar);
    }

    const removeInvite = (key) => {
        const newInvites = [];
        let toReturn;
        invites.map((invite, index)=> {
            if (index !== key) {
                newInvites.push(invite);
            } else {
                toReturn = invite;
            }
        })
        setInvites(newInvites);
        return toReturn
    }

    const acceptInvitation = (key) => {
        const newCal = removeInvite(key);
        setMyCalendars([...myCalenders, newCal]);

    }



    return (
        <ScrollView style={styles.container} bounces={false}>
            <LinearGradient
                colors={['#fc8c62', '#ed1b2f']}
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

                    </View>
                    <View style={styles.date}>
                        <Text style={styles.dayText}>
                           Calendars
                        </Text>
                    </View>
                    <View style={styles.calendarsContainer}>
                        {
                            invites.length > 0 ? <Text style={styles.dateText}>Invites</Text> : null
                        }

                        {
                            invites.map((invite, index)=>(
                                <EventCard calendar={true} title={invite.name} time={invite.type} plus={true} remove={()=>removeInvite(index)} key={index} onPress={()=>acceptInvitation(index)}/>
                            ))
                        }
                        {
                            myCalenders.length > 0 ? <Text style={styles.dateText}>My Calendars</Text> : null
                        }

                        {
                            myCalenders.map((calendar, index)=>(
                                <EventCard calendar={true} title={calendar.name} time={calendar.type} plus={false} remove={()=>removeCalendar(index)} isSelected={calendar.isSelected} key={index}/>
                            ))
                        }
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
        marginTop: 30
    }


});

export default Calendar;

const invitesDATA = [{name: 'Rotman', type: 'Program Group', isSelected: false}]
const myCalendarsDATA = [{name: 'Woodsworth', type: 'Orientation Group', isSelected: true}, {name: 'Arts & Science', type: 'Orientation Group', isSelected: true}, {name: 'Sports Trivia', type: 'Group', isSelected: false}]

