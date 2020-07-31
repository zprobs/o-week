import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import HorizontalUserList from '../ReusableComponents/HorizontalUserList';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import RankCard from '../Orientation/RankCard';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_CHAT_BY_ID,
  GET_DETAILED_GROUP,
  GET_EVENTS_BY_ID,
  GET_USERS_BY_ID,
} from '../../graphql';
import EventCard from '../ReusableComponents/EventCard';
import TrophyList from '../Orientation/TrophyList';
import EmptyFeed from '../../assets/svg/empty-feed.svg';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { showMessage } from 'react-native-flash-message';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

/**
 * @param group {object} An object of a group
 * @param isMember {boolean} true if the user is a member and can call / message the group
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly group?: *}> & React.RefAttributes<unknown>>}
 */
const GroupInfoModal = React.forwardRef(({ groupId, isMember }, ref) => {
  const navigation = useNavigation();
  const { loading, data, error } = useQuery(GET_DETAILED_GROUP, {
    variables: { id: groupId },
  });

  if (error) {
    showMessage({
      message: "Server Error",
      description: error.message,
      type: 'warning',
      icon: 'auto'
    });
  }

  const Tabs = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Overview' },
      { key: 'second', title: 'Members' },
      { key: 'third', title: 'Events' },
    ]);

    const renderScene = SceneMap({
      first: Overview,
      second: Members,
      third: Events,
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

  const Overview = () => {
    // temp for the demo
    const chat = groupId === 'ce945810-eb4a-47c6-83d4-5e642ac2d6c7' ? 182 : 181;
    const {
      loading: chatLoading,
      error: chatError,
      data: chatData,
    } = useQuery(GET_CHAT_BY_ID, { variables: { id: chat } });
    if (loading || chatLoading) return null;

    if (chatError) {
      showMessage({
        message: "Server Error",
        description: error.message,
        autoHide: false,
        type: 'warning',
        icon: 'auto'
      });
      return null
    }


    const {
      _id: chatId,
      image,
      name,
      participants,
      numMessages,
      messages,
    } =  chatData.chat;

    return (
      <>
        {isMember ? (
          <View style={styles.contactContainer}>
            <View style={styles.contactView}>
              <Icon name={'phone'} size={18} style={styles.contactIcon} />
              <Text style={styles.contactText}>Call</Text>
            </View>
            <View style={styles.contactView}>
              <Icon name={'video'} size={18} style={styles.contactIcon} />
              <Text style={styles.contactText}>Video</Text>
            </View>
            <TouchableOpacity
              style={styles.contactView}
              onPress={() => {
                navigation.navigate('Messages', {
                  screen: 'Conversation',
                  params: {
                    chatId,
                    image,
                    name,
                    participants,
                    numMessages,
                    messages,
                  },
                });
              }}>
              <Icon
                name={'message-square'}
                size={18}
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>Chat</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {data.group.trophies.length > 0 ? (
          <>
            <Text style={styles.sectionText}>Leaderboard</Text>
            <RankCard
              style={{ margin: 25, marginBottom: 5 }}
              onPress={() => navigation.navigate('Leaderboard')}
              rank={'3rd'}
              gold={true}
              teamTag={'Group A'}
              points={data.group.trophies_aggregate.aggregate.sum.score}
            />
            <Text style={styles.sectionText}>Trophies</Text>
            <TrophyList
              style={{ marginVertical: 25, marginBottom: 5 }}
              data={data.group.trophies}
            />
          </>
        ) : null}
        <Text style={styles.sectionText}>Description</Text>
        <Text style={styles.descriptionText}>{data.group.description}</Text>
      </>
    );
  };

  const Members = () => {
    if (loading || error) return null;
    const {
      data: members,
      loading: loadingMembers,
      error: errorMembers,
    } = useQuery(GET_USERS_BY_ID, {
      variables: { _in: data.group.members.map((member) => member.user.id) },
    });
    const {
      data: leaders,
      loading: loadingLeaders,
      error: errorLeaders,
    } = useQuery(GET_USERS_BY_ID, {
      variables: { _in: data.group.owners.map((owner) => owner.user.id) },
    });

    if (errorMembers) {
      showMessage({
        message: "Server Error",
        autoHide: false,
        description: errorMembers.message,
        type: 'warning',
        icon: 'auto'
      });
    }

    if (errorLeaders) {
      showMessage({
        message: "Server Error",
        autoHide: false,
        description: errorLeaders.message,
        type: 'warning',
        icon: 'auto'
      });
    }

    if (loadingMembers || errorMembers || loadingLeaders || errorLeaders)
      return null;
    return (
      <>
        {leaders.users.length > 0 ? (
          <>
            <Text style={styles.sectionText}>Leaders</Text>
            <HorizontalUserList
              data={leaders.users}
              style={{ marginTop: 10 }}
            />
          </>
        ) : null}
        {members.users.length > 0 ? (
          <>
            <Text style={styles.sectionText}>Members</Text>
            <HorizontalUserList
              data={members.users}
              style={{ marginTop: 10 }}
            />
          </>
        ) : null}
      </>
    );
  };

  const Events = () => {
    if (loading || error) return null;
    const {
      loading: eventsLoading,
      data: eventsData,
      error: eventsError,
    } = useQuery(GET_EVENTS_BY_ID, {
      variables: { _in: data.group.events.map((event) => event.event.id) },
    });

    if (eventsLoading || eventsError) return null;
    if (eventsError) {
      showMessage({
        message: "Server Error",
        autoHide: false,
        description: eventsError.message,
        type: 'warning',
        icon: 'auto'
      });
    }

    if (eventsData.events.length > 0) {
      return (
        <View style={styles.eventContainer}>
          {eventsData.events.map((event) => {
            return (
              <EventCard
                startDate={event.startDate}
                name={event.name}
                style={{ width: '100%', alignItems: 'center' }}
                image={event.image}
                key={event.id}
                count={event.attendees_aggregate.aggregate.count}
                description={event.description}
                userImages={event.attendees.map(
                  (attendee) => attendee.user.image,
                )}
                id={event.id}
                longDate={true}
                hosts={event.hosts}
              />
            );
          })}
        </View>
      );
    } else {
      return (
        <ImgBanner Img={EmptyFeed} placeholder="No Events yet" spacing={0} />
      );
    }
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
});

const styles = StyleSheet.create({
  sectionText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: colours.text03,
    marginTop: 20,
    marginHorizontal: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
    marginTop: 20,
  },
  contactView: {
    backgroundColor: colours.placeholder,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  contactText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: colours.text03,
    marginRight: 20,
  },
  contactIcon: {
    paddingHorizontal: 15,
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
  descriptionText: {
    ...FontSizes.Body,
    ...FontWeights.Regular,
    color: colours.text03,
    lineHeight: 22,
    marginTop: 15,
    marginHorizontal: 25,
    letterSpacing: 0.87,
  },
  scheduleDay: {
    ...FontSizes.Body,
    ...FontWeights.Bold,
    color: colours.text03,
    marginRight: 5,
  },
  scheduleDayContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 35,
    alignItems: 'center',
  },
  eventContainer: {
    paddingHorizontal: 25,
    marginTop: 30,
    alignItems: 'center',
  },
});

export default GroupInfoModal;
