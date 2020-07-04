import React, {useRef, useState} from 'react';
import {StyleSheet, Text, Dimensions, View, TouchableOpacity, Image, Linking} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {Theme, ThemeStatic} from '../../theme/Colours';
import HorizontalUserList from '../ReusableComponents/HorizontalUserList';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import RSVPButton from '../ReusableComponents/RSVPButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import HorizontalUserCard from '../ReusableComponents/HorizontalUserCard';
import {linkError} from '../ReusableComponents/SocialMediaIcons';
import LinearGradient from "react-native-linear-gradient";
import UserCountPreview from '../ReusableComponents/UserCountPreview';
import UsersBottomModal from './UsersBottomModal';
import {useQuery} from '@apollo/react-hooks';
import {GET_DETAILED_EVENT, GET_USERS_BY_ID} from '../../graphql';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

/**
 * @param eventId {string} the uuid for the event to be rendered
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly event?: *}> & React.RefAttributes<unknown>>}
 */
const EventInfoModal = React.forwardRef(({eventId}, ref) => {

  const inviteRef = useRef();
  const {loading, data, error} = useQuery(GET_DETAILED_EVENT, {variables: {id: eventId}})

  const Tabs = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Details' },
      { key: 'second', title: 'Guest List' },
      { key: 'third', title: 'Join' },
    ]);

    const renderScene = SceneMap({
      first: Details,
      second: GuestList,
        third: Join
    });

    const renderTabBar = (props) => {
      return <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: ThemeStatic.gold, width: '16.66%', marginLeft: WIDTH*0.083 }}
          style={styles.tabBar}
          renderLabel={({ route, focused, color }) => (
              <Text style={{ ...styles.tabText, color:  color }}>
                {route.title}
              </Text>
              )}
          activeColor={ThemeStatic.gold}
          inactiveColor={colours.text03}
      />
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: WIDTH}}
            renderTabBar={renderTabBar}
            swipeEnabled={false}
        />
    );
  };


    const Details = () => {
      if (loading) return null
      if (error) return <Text>{error.message}</Text>

      const date = new Date(data.event.startDate);
      const end = new Date(data.event.endDate);
      const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, dayPeriod: 'short' })
      const [{ value: month },,{ value: day },,{ value: year },, {value: hour},,{value: minute},,{value: dayPeriod}] = dateTimeFormat .formatToParts(date )
      const [{ value: endMonth },,{ value: endDay },,{ value: endYear },, {value: endHour},,{value: endMinute},,{value: endDayPeriod}] = dateTimeFormat .formatToParts(end)
      const parsedYear = year === "2020" ? "" : year


      return (
          <>
            <RSVPButton style={styles.rsvp} selectedTitle={"Cancel RSVP"} unSelectedTitle={"Tap to RSVP"}/>
            <View style={styles.container}>
              {
                data.event.isOfficial ?
                    <View style={styles.iconView}>
                      <Image source={{uri: "https://www.iedp.com/media/1699/rotman-circle-blue.png"}} style={styles.icon}
                             width={32} height={32} borderRadius={16}/>
                      <Text style={styles.iconLabel}>Rotman Event</Text>
                    </View>
                    :
                    null
              }
              <View style={styles.iconView}>
                <FeatherIcon style={styles.icon} name={'calendar'} size={32} color={colours.text03}/>
                <Text style={styles.iconLabel}>{`${month} ${day} ${parsedYear}`}</Text>
              </View>
              <View style={styles.iconView}>
                <FeatherIcon style={styles.icon} name={'clock'} size={32} color={colours.text03}/>
                <Text style={styles.iconLabel}>{`${hour}:${minute} - ${endHour}:${endMinute} ${endDayPeriod} EST`}</Text>
              </View>
              <View style={styles.iconView}>
                <FeatherIcon style={styles.icon} name={'map-pin'} size={32} color={colours.text03}/>
                <Text style={styles.iconLabel}>{data.event.location}</Text>
              </View>
              <Text style={styles.sectionText}>Description</Text>
              <Text style={styles.descriptionText}>{data.event.description}</Text>
            </View>
          </>

      );
    }


  const GuestList = () => {


    if (loading || error) return null

    const going = data.event.attendees.map((attendee) => attendee.user)

    return (
        <>
          <RSVPButton unSelectedTitle={"Invite Friends"}  style={styles.rsvp} plusIcon={true} onPress={()=>inviteRef.current.open()}/>
          <Text style={styles.sectionText}>Going</Text>
          <HorizontalUserList data={going} style={{marginBottom: 15}} />
          <Text style={{...styles.sectionText, marginTop: 0}}>Invited</Text>
          <HorizontalUserList data={null} />

        </>
    )
  }

  const Join = () => (
    <View style={{paddingHorizontal: 40, marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.eventIconView}>
            <FeatherIcon name={"play"} size={16} color={colours.white} style={{marginLeft: 3}} />
          </View>
          <View style={{marginLeft: 10}}>
          <Text style={{...styles.iconLabel, color: colours.text01}}>Welcome Event</Text>
          <Text style={styles.countdownText}>Started: 34m ago</Text>
          <HappeningNow/>
        </View>
        </View>
      <TouchableOpacity onPress={openLink}>
        <Image source={{uri: "https://www.newhorizons.com/Portals/278/EasyDNNnews/162459/img-business-presentation-tips.jpg"}} style={styles.eventImage}/>
        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}  style={styles.videoTitleView}>
          <Text style={styles.videoTitleText}>Tap to Join</Text>
            <View style={styles.smallPlayButton}>
              <FeatherIcon name={"play"} size={13} color={ThemeStatic.lightBlue} style={{marginLeft: 2}} />
            </View>
        </LinearGradient>
        <UserCountPreview count={33} style={styles.userCountPreview} ref={inviteRef} />
      </TouchableOpacity>

    </View>
  );

  const openLink = () => {
      const link = "https://www.youtube.com/watch?v=2k5OvVIUk5A";
    Linking.canOpenURL(link).then((result) => {
      if (result) {
        Linking.openURL(link).catch((e)=>console.log(e));
      } else {
        linkError(null,"Video");
      }
    }).catch((error)=>{
      linkError(error, "Video");
    })
  }




    return (
      <Modalize
        ref={ref}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          bounces: false,
        }}
        alwaysOpen={HEIGHT * 0.47}
        modalTopOffset={110}
        rootStyle={[StyleSheet.absoluteFill, { minHeight: HEIGHT * 0.4 }]}>
        <Tabs />
        <UsersBottomModal type={"invite"} ref={inviteRef}/>
      </Modalize>
    );
});

const HappeningNow = () => {
  return (
      <View style={styles.happeningNowView}>
        <Text style={styles.happeningNowText}>Happening Now</Text>
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  sectionText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: colours.text03,
    marginTop: 20,
    marginHorizontal: 25,
    marginBottom: 5,
  },
  descriptionText: {
    ...FontSizes.Body,
    ...FontWeights.Regular,
    color: colours.text03,
    lineHeight: 22,
    marginTop: 15,
    marginHorizontal: 12,
    letterSpacing: 0.87
  },
  rsvp: {
    alignSelf: "center",
    marginVertical: 25,
    width: "58%",
  },
  icon: {
    marginHorizontal: 12,
    marginVertical: 10,
  },
  iconLabel: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: colours.text03,
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
  },

  tabBar: {
    backgroundColor: colours.base,
    marginTop: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  tabText: {
    ...FontSizes.Body,
    ...FontWeights.Bold,
  },
  userRow: {
    flexDirection: "row",
    marginHorizontal: 12,
  },
  happeningNowView: {
    height: 24,
    borderRadius: 12,
    backgroundColor: ThemeStatic.accent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  happeningNowText: {
    ...FontWeights.Bold,
    ...FontSizes.SubText,
    color: colours.white
  },
  eventIconView: {
    backgroundColor: 'black',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  countdownText: {
    ...FontSizes.SubText,
    ...FontWeights.Bold,
    color: colours.text02,
    marginVertical: 4
  },
  eventImage: {
    width: '100%',
    height: HEIGHT*0.25,
    borderRadius: 18,
    marginTop: 20
  },
  videoTitleView: {
      position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 18
  },
  smallPlayButton: {
    backgroundColor: 'white',
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8
  },
  videoTitleText: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    color: colours.white,
    marginHorizontal: 5
  },
  userCountPreview: {
    position: 'absolute',
    top: 20,
    right: 0,
    margin: 20
  }

});

export default EventInfoModal;

const goingData = ["SgckB0cHQgPiHqXOY8ZUWF7mtk22", "g77kAqY0pDP0QFusPYO0EuWuBPw1", "MeacvK7z4gWhfkCC6jTNAfEKgXJ3", "VfBJazsBbEhpdmJL3G4fmGyTyh93", "jSqUoMtjOIStGOBLPhxG11nNglE3", "Fvy98EKaKXRfMP7YSX96M272pHC3", "2ts5t6mW3EWtqYJXduIxhUwaoKa2"]
