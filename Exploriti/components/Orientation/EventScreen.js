import React, { useContext, useRef, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import CircleBackIcon from '../Menu/CircleBackIcon';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import LinearGradient from 'react-native-linear-gradient';
import EventInfoModal from '../Modal/EventInfoModal';
import UsersBottomModal from '../Modal/UsersBottomModal';
import { Modalize } from 'react-native-modalize';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_USER_FRIENDS, INVITE_USER_TO_EVENT } from '../../graphql';
import { AuthContext } from '../../context';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;
const HEIGHT = Dimensions.get('window').height;

/**
 * Screen that displays info for an event
 * @param route The navigation params, contains event object
 * @returns {*}
 * @constructor
 */
const EventScreen = ({route}) => {

    const modalRef = useRef();
    const inviteRef = useRef();
  const {authState} = useContext(AuthContext);
  const [invite] = useMutation(INVITE_USER_TO_EVENT);
  const [tabIndex, setTabIndex] = useState(0);  // used to prevent tabs from defaulting to 0 after rerender


    const {event} = route.params;
    const date = new Date(event.startDate);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' })
    const [{ value: month },,{ value: day },,{ value: year },] = dateTimeFormat .formatToParts(date )

    const parsedYear = year=== "2020" ? "" : year

  const userFriends = () => {
    const {loading: friendsLoading, data: friendsData, error: friendsError} = useQuery(GET_USER_FRIENDS, {variables: {userId: authState.user.uid}} );
    if (friendsLoading || friendsError) return null ;
    const friendsIds = [];
    friendsData.friends.map((item)=>friendsIds.push(item.id));
    return friendsIds
  }

  const inviteUserToEvent = (userId) => {
      setTabIndex(1)
      invite({variables: {userId: userId, eventId: event.id}}).then(inviteRef.current.close()).catch(e=>console.log(e))
  }

    return (
      <View style={styles.container}>
        <ImageBackground source={{uri: event.image}} style={styles.backgroundImage}>
            <View style={styles.header}>
                <CircleBackIcon style={styles.circleBackIcon}/>
                <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}  style={styles.titleContainer}>
                    <Text style={styles.title}>{event.name}</Text>
                    <Text style={styles.date}>{`${month} ${day} ${parsedYear}`}</Text>
                </LinearGradient>
            </View>
        </ImageBackground>
          <EventInfoModal ref={modalRef} eventId={event.id} inviteRef={inviteRef} initialIndex={tabIndex}/>
        <UsersBottomModal type={"invite"} ref={inviteRef} data={userFriends()} onPress={inviteUserToEvent}/>
      </View>
);
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: colours.base
   },
    backgroundImage: {
       width: '100%',
        height: HEIGHT*0.44
    },
    header: {
        justifyContent: 'space-between',
        height: HEIGHT*0.44,
        alignItems: 'flex-start',
    },
    circleBackIcon: {
      marginTop: 45,
        marginLeft: 20,
    },
    titleContainer: {
        paddingBottom: 48,
        paddingHorizontal: 20,
        paddingTop: 20,
        width: '100%',
        flexDirection: 'row'

    },
    title: {
        ...FontWeights.Bold,
        ...FontSizes.Heading,
        color: colours.white,
        flex: 4
    },
    date : {
       ...FontWeights.Bold,
        ...FontSizes.Body,
        color: colours.placeholder,
        flex: 1,
        alignSelf: 'flex-end',
        marginBottom: 5
    }


});

export default EventScreen;
