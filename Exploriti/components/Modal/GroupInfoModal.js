import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Linking,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import HorizontalUserList from '../ReusableComponents/HorizontalUserList';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import RankCard from '../Orientation/RankCard';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import {
  ADD_USERS_TO_CHAT,
  GET_CHAT,
  GET_DETAILED_GROUP,
  GET_EVENTS_BY_ID, GET_GROUP_CHAT,
  GET_GROUP_POSTS,
  GET_LEADERBOARD,
} from '../../graphql';
import EventCard from '../ReusableComponents/EventCard';
import TrophyList from '../Orientation/TrophyList';
import EmptyFeed from '../../assets/svg/empty-feed.svg';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { AuthContext, processError, processWarning, rankData } from '../../context';
import EmptyPosts from '../../assets/svg/empty-likes.svg';
import Post from '../ReusableComponents/Post';
import { log } from 'react-native-reanimated';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const GroupInfoModal = React.forwardRef(
  /**
   *
   * @param groupId {string} the uuid of the group in question
   * @param isMember {boolean } true if the user is a member and can call / message the group
   * @param allLeadersRef
   * @param allMembersRef
   * @param ref
   * @returns {JSX.Element}
   */
  ({ groupId, isMember, allLeadersRef, allMembersRef }, ref) => {
    const navigation = useNavigation();
    const {authState} = useContext(AuthContext)
    const { loading, data, error } = useQuery(GET_DETAILED_GROUP, {
      variables: { id: groupId, currentUser: authState.user.uid },
    });
    console.log({ error });

    if (error) {
      processWarning(error, 'Server Error');
    }

    const Tabs = () => {
      const [index, setIndex] = useState(0);
      const initialRoutes = isMember
        ? [
            { key: 'first', title: 'Feed' },
            { key: 'second', title: 'About' },
            { key: 'third', title: 'Events' },
          ]
        : [
            { key: 'first', title: 'About' },
            { key: 'second', title: 'Events' },
          ];
      const [routes] = useState(initialRoutes);

      const sceneMap = isMember
        ? {
            first: Feed,
            second: About,
            third: Events,
          }
        : {
            first: About,
            second: Events,
          };

      const renderScene = SceneMap(sceneMap);

      const renderTabBar = (props) => {
        return (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: ThemeStatic.gold,
              width: isMember ? '16.66%' : '25%',
              marginLeft: isMember ? WIDTH * 0.083 : WIDTH * 0.125,
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

    const Feed = () => {
      const {
        data: postData,
        loading: postsLoading,
        error: postsError,
      } = useQuery(GET_GROUP_POSTS, {
        variables: { groupId: groupId },
        fetchPolicy: 'cache-and-network',
      });

      if (loading || postsLoading) return <TabLoading />;

      if (error || postsError) return null;

      const count = postData.group.posts_aggregate.aggregate.count;
      const posts = postData.group.posts;

      return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 16 }}>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() =>
              navigation.navigate('Create Post', { groupId: groupId })
            }>
            <Icon name={'plus'} size={24} color={ThemeStatic.white} />
            <Text style={styles.postText}>Post Something</Text>
          </TouchableOpacity>
          {count === 0 ? (
            <ImgBanner
              Img={EmptyPosts}
              placeholder={'No Posts Yet'}
              spacing={0.01}
            />
          ) : (
            posts.map((p, i) => <Post item={p} index={i} key={p.id} />)
          )}
          {count > 4 ? (
            <View style={{ marginVertical: 20 }}>
              <Button
                title={'See All'}
                onPress={() =>
                  navigation.navigate('AllPosts', { groupId: groupId })
                }
              />
            </View>
          ) : null}
        </View>
      );
    };

    const About = () => {
      const {
        data: scoreData,
        loading: scoreLoading,
        error: scoreError,
      } = useQuery(GET_LEADERBOARD);

      const [addToChat, {error: addToChatError}] = useMutation(ADD_USERS_TO_CHAT, {onCompleted: addToChatData => {
          console.log({addToChatData});
          console.log(addToChatData.insert_userChat.returning);
          openGroupChat(addToChatData.insert_userChat.returning[0].chat)
        }});

      if (addToChatError) processError(addToChatError, 'Could not join chat')

      if (loading || scoreLoading || scoreError || error) return null;


      const openGroupChat = (chat) => {

        console.log({chat});

        const {
          _id: chatId,
          image,
          name,
          participants,
          numMessages,
          messages,
        } = chat;

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
          initial: false,
        });
      }

      const rank = scoreData.groups.findIndex((g) => g.id === groupId);

      const leaders = data.group.owners.map((o) => o.user);
      const members = data.group.members.map((m) => m.user);

      return (
        <>
          {isMember ? (
            <View style={styles.contactContainer}>
              {data.group.phone ? (
                <TouchableOpacity
                  style={styles.contactView}
                  onPress={() => {
                    Linking.openURL(`tel:${data.group.phone}`).catch((e) => {
                      processError(e, 'Cannot call number');
                    });
                  }}>
                  <Icon name={'phone'} size={18} style={styles.contactIcon} />
                  <Text style={styles.contactText}>Call</Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                style={styles.contactView}
                onPress={() => {
                  if (data && data.group.groupChats[0])
                      openGroupChat(data.group.groupChats[0].chat);
                  else {
                    addToChat({
                      variables: {
                        objects: [
                          {
                            chatId: data.group.allChats[0].chatId,
                            userId: authState.user.uid,
                          },
                        ],
                      },
                    }).catch((e) => log(e));
                  }
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

          <View style={styles.sectionView}>
            <Text style={styles.sectionText}>Description</Text>
          </View>
          <Text style={styles.descriptionText}>{data.group.description}</Text>

          <>
            {leaders.length > 0 ? (
              <>
                <View style={styles.sectionView}>
                  <Text style={styles.sectionText}>Leaders</Text>
                  {leaders.length >= 20 ? (
                    <TouchableOpacity
                      style={styles.seeAllButton}
                      onPress={allLeadersRef.current.open}>
                      <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
                <HorizontalUserList data={leaders} style={{ marginTop: 10 }} />
              </>
            ) : null}
            {members.length > 0 ? (
              <>
                <View style={styles.sectionView}>
                  <Text style={styles.sectionText}>Members</Text>
                  {members.length >= 20 ? (
                    <TouchableOpacity
                      style={styles.seeAllButton}
                      onPress={allMembersRef.current.open}>
                      <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
                <HorizontalUserList data={members} style={{ marginTop: 10 }} />
              </>
            ) : null}
          </>
          {data.group.groupType === 'orientation' ? (
            <>
              <View style={styles.sectionView}>
                <Text style={styles.sectionText}>Leaderboard</Text>
              </View>
              <RankCard
                style={{ margin: 25, marginBottom: 5 }}
                onPress={() => navigation.navigate('Leaderboard', { groupId })}
                rank={rankData[rank]}
                gold={true}
                team={data.group.name}
                points={data.group.trophies_aggregate.aggregate.sum.score}
              />
              {data.group.trophies.length > 0 ? (
                <>
                  <View style={styles.sectionView}>
                    <Text style={styles.sectionText}>Trophies</Text>
                  </View>
                  <TrophyList
                    style={{ marginVertical: 25, marginBottom: 5 }}
                    data={data.group.trophies}
                  />
                </>
              ) : null}
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
        processWarning(eventsError, 'Server Error');
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
  },
);

const TabLoading = () => (
  <View style={{ marginTop: 80, width: '100%', flex: 1, height: 200 }}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  sectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: colours.text03,
    marginHorizontal: 25,
    marginBottom: 5,
  },
  seeAllText: {
    ...FontSizes.Body,
    ...FontWeights.Regular,
    color: ThemeStatic.lightBlue,
  },
  seeAllButton: {
    marginHorizontal: 25,
    marginLeft: 'auto',
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
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 15,
    flex: 1,
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
  postButton: {
    backgroundColor: ThemeStatic.gold,
    width: 200,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: 20,
  },
  postText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: ThemeStatic.white,
    marginLeft: 5,
  },
});

export default GroupInfoModal;
