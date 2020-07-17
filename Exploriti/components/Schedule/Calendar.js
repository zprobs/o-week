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
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import EventCard from '../ReusableComponents/EventCard';
import Icon from 'react-native-vector-icons/Feather';
import {useMutation} from '@apollo/react-hooks';
import { GET_SCHEDULED_EVENTS, UPDATE_CALENDARS } from '../../graphql';
import {AuthContext} from '../../context';

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
    const {authState} = useContext(AuthContext);
    const route = useRoute();
    const {
        myCalendars
    } = route.params;
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    // const [invites, setInvites] = useState(invitesDATA);
    // const [myCalendars, setMyCalendars] = useState(initialCalendars);
    const [updateCalendars] = useMutation(UPDATE_CALENDARS);

    const updateOnCalendar = (calendar, selected) => {
        updateCalendars({
            variables: {
                groupId: calendar.groupId,
                userId: authState.user.uid,
                onCalendar: selected
            },
            refetchQueries: [{
                query: GET_SCHEDULED_EVENTS,
                variables: {userId: authState.user.uid}
            }]
        })
    }

    // {
    //     invites.length > 0 ? <Text style={styles.dateText}>Invites</Text> : null
    // }
    //
    // {
    //     invites.map((invite, index)=>(
    //         <EventCard calendar={true} name={invite.name} calendarType={invite.type} plus={true} remove={()=>removeInvite(index)} key={index} onPress={()=>acceptInvitation(index)}/>
    //     ))
    // }

    // const removeInvite = (key) => {
    //     const newInvites = [];
    //     let toReturn;
    //     invites.map((invite, index)=> {
    //         if (index !== key) {
    //             newInvites.push(invite);
    //         } else {
    //             toReturn = invite;
    //         }
    //     })
    //     setInvites(newInvites);
    //     return toReturn
    // }

    // const acceptInvitation = (key) => {
    //     const newCal = removeInvite(key);
    //     setMyCalendars([...myCalendars, newCal]);
    // }



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
                            myCalendars.length > 0 ? <Text style={styles.dateText}>My Calendars</Text> : null
                        }

                        {
                            myCalendars.map((calendar, index)=>(
                                <EventCard calendar={true} name={calendar.group.name} calendarType={calendar.group.groupType} plus={false} onPress={(selected)=>updateOnCalendar(calendar, selected)} isSelected={calendar.onCalendar} key={index} isExpanded={true}/>
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

// const invitesDATA = [{name: 'Rotman', type: 'Program Group', isSelected: false}]
const myCalendarsDATA = [{name: 'Woodsworth', type: 'Orientation Group', isSelected: true}, {name: 'Arts & Science', type: 'Orientation Group', isSelected: true}, {name: 'Sports Trivia', type: 'Group', isSelected: false}]

