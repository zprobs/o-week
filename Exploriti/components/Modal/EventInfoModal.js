import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import HorizontalUserList from '../ReusableComponents/HorizontalUserList';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import RSVPButton from '../ReusableComponents/RSVPButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { linkError } from '../ReusableComponents/SocialMediaIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  CHECK_USER_EVENT_ACCEPTED,
  CONFIRM_EVENT_INVITE,
  GET_DETAILED_EVENT,
  GET_EVENT_ATTENDANCE,
  GET_EVENT_INVITED,
  REMOVE_USER_FROM_EVENT,
  SIGN_UP_USER_FOR_EVENT,
} from '../../graphql';
import { AuthContext } from '../../context';
import { showMessage } from 'react-native-flash-message';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

/**
 * @param eventId {string} the uuid for the event to be rendered
 * @param inviteRef {Ref} the reference to the usersBottomModal where users can invite their friends
 * @param initialIndex {int} the initial state of the tab index
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly event?: *}> & React.RefAttributes<unknown>>}
 */
const EventInfoModal = React.forwardRef(
  ({ eventId, inviteRef, initialIndex }, ref) => {
    const { authState } = useContext(AuthContext);
    const { loading, data, error } = useQuery(GET_DETAILED_EVENT, {
      variables: { id: eventId },
    });

    if (error) {
      showMessage({
        message: "Server Error",
        description: error.message,
        type: 'warning',
        icon: 'warning'
      });
    }

    const Tabs = () => {
      const [index, setIndex] = useState(initialIndex);
      const [routes] = useState([
        { key: 'first', title: 'Details' },
        { key: 'second', title: 'Guest List' },
        { key: 'third', title: 'Join' },
      ]);

      const renderScene = SceneMap({
        first: Details,
        second: GuestList,
        third: Join,
      });

      const renderTabBar = (props) => {
        return (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: ThemeStatic.gold,
              width: '16.66%',
              marginLeft: WIDTH * 0.083,
            }}
            style={styles.tabBar}
            renderLabel={({ route, color }) => (
              <Text style={{ ...styles.tabText, color: color }}>
                {route.title}
              </Text>
            )}
            activeColor={ThemeStatic.gold}
            inactiveColor={colours.text03}
          />
        );
      };

      return (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: WIDTH }}
          renderTabBar={renderTabBar}
          swipeEnabled={false}
        />
      );
    };

    const Details = () => {
      /**
       * @Todo fix this selected problem. It flashes when deleting an RSVP
       */
      const [isSelected, setIsSelected] = useState(false);

      const {
        loading: acceptLoading,
        data: acceptData,
        error: acceptError,
      } = useQuery(CHECK_USER_EVENT_ACCEPTED, {
        variables: { eventId: eventId, userId: authState.user.uid },
      });
      const [signUp, { loading: signUpLoading, error: signUpError }] = useMutation(
        SIGN_UP_USER_FOR_EVENT,
        {
          variables: { eventId: eventId, userId: authState.user.uid },
        },
      );
      const [
        confirm,
        { loading: confirmLoading, error: confirmError },
      ] = useMutation(CONFIRM_EVENT_INVITE, {
        variables: { eventId: eventId, userId: authState.user.uid },
        refetchQueries: [
          {
            query: GET_EVENT_ATTENDANCE,
            variables: { eventId: eventId },
          },
          {
            query: CHECK_USER_EVENT_ACCEPTED,
            variables: { eventId: eventId, userId: authState.user.uid },
          },
          {
            query: GET_EVENT_INVITED,
            variables: { eventId: eventId },
          },
        ],
      });
      const [
        remove,
        { loading: removeLoading, error: removeError },
      ] = useMutation(REMOVE_USER_FROM_EVENT, {
        variables: { eventId: eventId, userId: authState.user.uid },
        refetchQueries: [
          {
            query: GET_EVENT_ATTENDANCE,
            variables: { eventId: eventId },
          },
          {
            query: CHECK_USER_EVENT_ACCEPTED,
            variables: { eventId: eventId, userId: authState.user.uid },
          },
        ],
      });

      if (acceptError) {
        showMessage({
          message: "Server Error",
          description: acceptError.message,
          type: 'warning',
          icon: 'warning'
        });
      }

      if (signUpError) {
        showMessage({
          message: "Cannot RSVP",
          description: signUpError.message,
          type: 'danger',
          icon: 'danger'
        });
      }

      if (confirmError) {
        showMessage({
          message: "Cannot Confirm Invite",
          description: confirmError.message,
          type: 'danger',
          icon: 'danger'
        });
      }

      if (removeError) {
        showMessage({
          message: "Cannot Cancel RSVP",
          description: removeError.message,
          type: 'danger',
          icon: 'danger'
        });
      }
      const isInvited = acceptData ? acceptData.user.events.length > 0 : false;
      const isAccepted = acceptData
        ? isInvited && acceptData.user.events[0].didAccept
        : false;

      useEffect(() => {
        setIsSelected(isAccepted);
      }, [acceptData]);

      const mutationLoading =
        signUpLoading || confirmLoading || acceptLoading || removeLoading;

      if (loading || acceptLoading) return null;
      if (error || acceptError) return null;

      const date = new Date(data.event.startDate);
      const end = new Date(data.event.endDate);
      const dateTimeFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        dayPeriod: 'short',
      });
      const [
        { value: month },
        ,
        { value: day },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: dayPeriod },
      ] = dateTimeFormat.formatToParts(date);
      const [
        { value: endMonth },
        ,
        { value: endDay },
        ,
        { value: endYear },
        ,
        { value: endHour },
        ,
        { value: endMinute },
        ,
        { value: endDayPeriod },
      ] = dateTimeFormat.formatToParts(end);
      const parsedYear = year === '2020' ? '' : year;

      return (
        <>
          <RSVPButton
            style={styles.rsvp}
            selectedTitle={'Cancel RSVP'}
            unSelectedTitle={'Tap to RSVP'}
            isSelected={isSelected}
            loading={mutationLoading}
            unSelectedOnPress={isInvited && !isSelected ? confirm : signUp}
            selectedOnPress={remove}
          />
          <View style={styles.container}>
            {data.event.isOfficial ? (
              <View style={styles.iconView}>
                <Image
                  source={{
                    uri:
                      'https://www.iedp.com/media/1699/rotman-circle-blue.png',
                  }}
                  style={styles.icon}
                  width={32}
                  height={32}
                  borderRadius={16}
                />
                <Text style={styles.iconLabel}>Rotman Event</Text>
              </View>
            ) : null}
            <View style={styles.iconView}>
              <FeatherIcon
                style={styles.icon}
                name={'calendar'}
                size={32}
                color={colours.text03}
              />
              <Text
                style={
                  styles.iconLabel
                }>{`${month} ${day} ${parsedYear}`}</Text>
            </View>
            <View style={styles.iconView}>
              <FeatherIcon
                style={styles.icon}
                name={'clock'}
                size={32}
                color={colours.text03}
              />
              <Text
                style={
                  styles.iconLabel
                }>{`${hour}:${minute} - ${endHour}:${endMinute} ${endDayPeriod}`}</Text>
            </View>
            {data.event.location.constructor !== Object ? (
              <View style={styles.iconView}>
                <FeatherIcon
                  style={styles.icon}
                  name={'map-pin'}
                  size={32}
                  color={colours.text03}
                />
                <Text style={styles.iconLabel}>{data.event.location}</Text>
              </View>
            ) : null}
            <Text style={styles.sectionText}>Description</Text>
            <Text style={styles.descriptionText}>{data.event.description}</Text>
          </View>
        </>
      );
    };

    const GuestList = () => {
      if (loading || error) return null;

      const going = [];
      const invited = [];

      data.event.attendees.map((attendee) => {
        going.push(attendee.user);
      });
      data.event.invited.map((attendee) => {
        invited.push(attendee.user);
      });

      return (
        <>
          <RSVPButton
            unSelectedTitle={'Invite Friends'}
            style={styles.rsvp}
            plusIcon={true}
            unSelectedOnPress={() => inviteRef.current.open()}
          />
          {going.length > 0 ? (
            <>
              <Text style={styles.sectionText}>Going</Text>
              <HorizontalUserList data={going} style={{ marginBottom: 15 }} />
            </>
          ) : null}
          {invited.length > 0 ? (
            <>
              <Text style={{ ...styles.sectionText, marginTop: 0 }}>
                Invited
              </Text>
              <HorizontalUserList data={invited} />
            </>
          ) : null}
        </>
      );
    };

    const Join = () => {
      if (loading || error) return null;

      const now = new Date();
      let minutes, hours, days, weeks, timeString;
      let happeningNow = false;
      const total = Date.parse(data.event.startDate) - Date.parse(now);
      if (total < 0) {
        const endTotal = Date.parse(data.event.endDate) - Date.parse(now);
        if (endTotal < 0) {
          timeString = 'Event is already over';
        } else {
          happeningNow = true;
          minutes = Math.abs(Math.ceil((total / 1000 / 60) % 60));
          hours = Math.abs(Math.ceil((total / (1000 * 60 * 60)) % 24));
          days = Math.abs(Math.ceil(total / (1000 * 60 * 60 * 24)));
          if (days) {
            const singleOrPlural = days === 1 ? 'day' : 'days';
            timeString = `Started ${days} ${singleOrPlural} ago`;
          } else if (hours) {
            const singleOrPlural = hours === 1 ? 'hour' : 'hours';
            timeString = `Started ${hours} ${singleOrPlural} ago`;
          } else if (minutes) {
            const singleOrPlural = minutes === 1 ? 'minute' : 'minutes';
            timeString = `Started ${minutes} ${singleOrPlural} ago`;
          } else {
            timeString = 'Started just now';
          }
        }
      } else {
        minutes = Math.floor((total / 1000 / 60) % 60);
        hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        days = Math.floor(total / (1000 * 60 * 60 * 24));
        weeks = Math.floor(total / (1000 * 60 * 60 * 24 * 7));

        if (weeks) {
          const singleOrPlural = weeks === 1 ? 'week' : 'weeks';
          timeString = `Starting in ${weeks} ${singleOrPlural}`;
        } else if (days) {
          const singleOrPlural = days === 1 ? 'day' : 'days';
          timeString = `Starting in ${days} ${singleOrPlural}`;
        } else if (hours) {
          const singleOrPlural = hours === 1 ? 'hour' : 'hours';
          timeString = `Starting in ${hours} ${singleOrPlural}`;
        } else if (minutes) {
          const singleOrPlural = minutes === 1 ? 'minute' : 'minutes';
          timeString = `Starting in ${minutes} ${singleOrPlural}`;
        } else {
          timeString = 'Starting just now';
        }
      }

      return (
        <View style={{ paddingHorizontal: 40, marginTop: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.eventIconView}>
              <FeatherIcon
                name={'play'}
                size={16}
                color={colours.white}
                style={{ marginLeft: 3 }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ ...styles.iconLabel, color: colours.text01 }}>
                Join Zoom Meeting
              </Text>
              <Text style={styles.countdownText}>{timeString}</Text>
              {happeningNow ? <HappeningNow /> : null}
            </View>
          </View>
          <TouchableOpacity onPress={openLink}>
            <Image
              source={{
                uri:
                  'https://www.newhorizons.com/Portals/278/EasyDNNnews/162459/img-business-presentation-tips.jpg',
              }}
              style={styles.eventImage}
            />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
              style={styles.videoTitleView}>
              <Text style={styles.videoTitleText}>Tap to Join</Text>
              <View style={styles.smallPlayButton}>
                <FeatherIcon
                  name={'play'}
                  size={13}
                  color={ThemeStatic.lightBlue}
                  style={{ marginLeft: 2 }}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    };

    const openLink = () => {
      const link = data.event.website;
      Linking.canOpenURL(link)
        .then((result) => {
          if (result) {
            Linking.openURL(link).catch((e) => console.log(e));
          } else {
            linkError(null, 'Video');
          }
        })
        .catch((error) => {
          linkError(error, 'Video');
        });
    };

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
      </Modalize>
    );
  },
);

const HappeningNow = () => {
  return (
    <View style={styles.happeningNowView}>
      <Text style={styles.happeningNowText}>Happening Now</Text>
    </View>
  );
};

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
    letterSpacing: 0.87,
  },
  rsvp: {
    alignSelf: 'center',
    marginVertical: 25,
    width: '58%',
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
    flexDirection: 'row',
    alignItems: 'center',
  },

  tabBar: {
    backgroundColor: colours.base,
    marginTop: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    marginHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabText: {
    ...FontSizes.Body,
    ...FontWeights.Bold,
  },
  userRow: {
    flexDirection: 'row',
    marginHorizontal: 12,
  },
  happeningNowView: {
    height: 22,
    borderRadius: 11,
    backgroundColor: ThemeStatic.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  happeningNowText: {
    ...FontWeights.Bold,
    ...FontSizes.SubText,
    color: colours.white,
  },
  eventIconView: {
    backgroundColor: 'black',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownText: {
    ...FontSizes.SubText,
    ...FontWeights.Bold,
    color: colours.text02,
    marginVertical: 4,
  },
  eventImage: {
    width: '100%',
    height: HEIGHT * 0.25,
    borderRadius: 18,
    marginTop: 20,
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
    borderRadius: 18,
  },
  smallPlayButton: {
    backgroundColor: 'white',
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  videoTitleText: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    color: colours.white,
    marginHorizontal: 5,
  },
  userCountPreview: {
    position: 'absolute',
    top: 20,
    right: 0,
    margin: 20,
  },
});

export default EventInfoModal;
