import React, {useState} from 'react';
import {StyleSheet, Text, Dimensions, View, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {Theme, ThemeStatic} from '../../theme/Colours';
import HorizontalUserList from '../ReusableComponents/HorizontalUserList';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import RankCard from '../Orientation/RankCard';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/react-hooks';
import { GET_EVENTS_BY_ID, GET_USERS_BY_ID } from '../../graphql';
import EventCard from '../Orientation/EventCard';
import TrophyList from '../Orientation/TrophyList';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

/**
 * @param group An object of a group
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly group?: *}> & React.RefAttributes<unknown>>}
 */
const GroupInfoModal = React.forwardRef(({group}, ref) => {

  const navigation = useNavigation();

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
      third: Events
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

  


    const Overview = () => (
      <>
          <View style={styles.contactContainer}>
            <View style={styles.contactView}>
              <Icon name={'phone'} size={18} style={styles.contactIcon} />
              <Text style={styles.contactText}>Call</Text>
            </View>
            <View style={styles.contactView}>
              <Icon name={'video'} size={18} style={styles.contactIcon}/>
              <Text style={styles.contactText}>Video</Text>
            </View>
            <View style={styles.contactView}>
              <Icon name={'message-square'} size={18} style={styles.contactIcon}/>
              <Text style={styles.contactText}>Chat</Text>
            </View>
          </View>
        <Text style={styles.sectionText}>Leaderboard</Text>
        <RankCard style={{margin: 25, marginBottom: 5}} onPress={()=>navigation.navigate('Leaderboard')} rank={"3rd"} gold={true}/>
        <Text style={styles.sectionText}>Trophies</Text>
        <TrophyList style={{margin: 25, marginBottom: 5}} data={trophiesData}/>
        <Text style={styles.sectionText}>Description</Text>
        <Text style={styles.descriptionText}>{"Welcome to the best frosh group at UofT, hosted on the best online orientation platform at UofT! This app is so great you can view your leaderboard score as you compete with the other groups for points. Maybe there will be a prize for the top 3 teams or something! People earn points for thier leaders by completing games and quizes perhaps a scavenger hunt or two organized by the lovely staff at Orientation. Thank you!" }
        </Text>

      </>
    );

    const Members = () => {
      const {data: members, loading: loadingMembers, error: errorMembers} = useQuery(GET_USERS_BY_ID, {variables: { _in: membersData }})
      const {data: leaders, loading: loadingLeaders, error: errorLeaders} = useQuery(GET_USERS_BY_ID, {variables: { _in: leadersData }})

      if (loadingMembers || errorMembers || loadingLeaders || errorLeaders) return null
      return (
          <>
            {
              leaders.users.length > 0 ? (
                <>
                  <Text style={styles.sectionText}>Leaders</Text>
                <HorizontalUserList data={leaders.users} style={{marginTop: 10}}/>
                </>
              ) : null
            }
            {
              members.users.length > 0 ? (
                <>
                  <Text style={styles.sectionText}>Members</Text>
                <HorizontalUserList data={members.users} style={{marginTop: 10}}/>
                </>
              ) : null
            }

          </>
      );
    }

    const Events = () => {
        const [day, setDay] = useState(0);

        const {loading: eventsLoading, data: eventsData, error: eventsError} = useQuery(GET_EVENTS_BY_ID, {variables: {_in: ["7858dd56-bea3-4ce9-9162-ac8edf641a12", "73114920-d7d4-4ae1-8362-fc8fe825bd01", "ab5c3a9d-42e8-4942-bb11-ad2f3b341ad2"]}});

        if (eventsLoading) return null
        if (eventsError) return <Text>{eventsError.message}</Text>

        return (
            <>
              <View style={styles.scheduleDayContainer}>
                <Text style={styles.scheduleDay}>Sept 3</Text>
                <Icon name={'chevron-down'} color={colours.text03} size={16}/>
              </View>
              <View style={styles.eventContainer}>
                {
                  eventsData.events.map((event) => {
                    return <EventCard startDate={event.startDate} name={event.name} style={{width: '100%', alignItems: 'center'}} image={event.image} key={event.id} count={event.attendees_aggregate.aggregate.count} description={event.description} userImages={event.attendees.map((attendee)=>attendee.user.image)} id={event.id}/>
                  })
                }
              </View>
            </>
        );

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
    marginTop: 20

  },
  contactView: {
    backgroundColor: colours.placeholder,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  contactText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: colours.text03,
    marginRight: 20
  },
  contactIcon: {
    paddingHorizontal: 15
  },


  tabBar: {
    backgroundColor: colours.base,
    marginTop: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabText: {
    ...FontSizes.Body,
    ...FontWeights.Bold
  },
  descriptionText: {
    ...FontSizes.Body,
    ...FontWeights.Regular,
    color: colours.text03,
    lineHeight: 22,
    marginTop: 15,
    marginHorizontal: 25,
    letterSpacing: 0.87
  },
  scheduleDay: {
    ...FontSizes.Body,
    ...FontWeights.Bold,
    color: colours.text03,
    marginRight: 5
  },
  scheduleDayContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 35,
    alignItems: 'center'
  },
  eventContainer: {
    paddingHorizontal: 25,
    marginTop: 30,
    alignItems: 'center',

  }

});

export default GroupInfoModal;

const membersData = [ "2ts5t6mW3EWtqYJXduIxhUwaoKa2", "eRDdv1sh1WMT00lY5AJFtb36wgt1", "DIhiYwWGbrcrKwHAgpwqETPZD3x1", "UG3dfi96lDTTVuRoCTD8yHDdpyI3"];
const leadersData = ["980gZXCVjWMBsHXBmSgLVeyrVqm2", "PJS2gqhmpWTbffEpbKHj3UungR82"];
const trophiesData = [{name: 'Newbie', id: 1}, {name: 'Veteren', id: 2}, {name: 'Quick Thinking', id: 3}]
