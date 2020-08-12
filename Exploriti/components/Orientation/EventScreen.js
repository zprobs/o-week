import React, { useContext, useRef, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import CircleBackIcon from '../Menu/CircleBackIcon';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import LinearGradient from 'react-native-linear-gradient';
import EventInfoModal from '../Modal/EventInfoModal';
import UsersBottomModal from '../Modal/UsersBottomModal';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  ALL_USERS_PAGINATION_TEST,
  CHECK_USER_ADMIN,
  CHECK_USER_EVENT_ACCEPTED,
  DELETE_EVENT,
  DETAILED_EVENT_FRAGMENT,
  DETAILED_USER_FRAGMENT,
  GET_EVENT,
  GET_EVENT_ATTENDANCE,
  GET_USER_FRIENDS,
  GET_USER_FRIENDS_NOT_ATTENDING_EVENT,
  GET_USER_GROUPS,
  INVITE_USERS_TO_EVENT,
  SEND_NOTIFICATION,
  SEND_NOTIFICATIONS,
} from '../../graphql';
import {
  AuthContext,
  graphqlify_relationship,
  NotificationTypes,
  processError,
  processWarning,
  refreshToken,
} from '../../context';
import CircleEditIcon from '../ReusableComponents/CircleEditIcon';
import NewEventModal from '../Modal/NewEventModal';
import { showMessage } from 'react-native-flash-message';
import SearchableFlatList from '../Modal/SearchableFlatList';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;
const HEIGHT = Dimensions.get('window').height;

/**
 * Screen that displays info for an event
 * @param route The navigation params, contains event object
 * @returns {*}
 * @constructor
 */
const EventScreen = ({ route }) => {
  const modalRef = useRef();
  const inviteRef = useRef();
  const editRef = useRef();
  const allInvitedRef = useRef();
  const allAttendingRef = useRef();
  const { goBack } = useNavigation();
  const { authState, setAuthState } = useContext(AuthContext);
  const [sendNotifications] = useMutation(SEND_NOTIFICATIONS);
  const [invite, { error: inviteError }] = useMutation(INVITE_USERS_TO_EVENT);
  const { eventId } = route.params;
  const [tabIndex, setTabIndex] = useState(0); // used to prevent tabs from defaulting to 0 after rerender
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });
  const { data: isOwnerData } = useQuery(GET_USER_GROUPS, {
    variables: { id: authState.user.uid },
    fetchPolicy: 'cache-only',
  });

  const { data: isAdminData } = useQuery(CHECK_USER_ADMIN, {
    variables: { id: authState.user.uid },
    fetchPolicy: 'cache-only',
  });

  const [deleteEvent, { error: deleteError }] = useMutation(DELETE_EVENT, {
    variables: { id: eventId },
  });

  const insets = useSafeArea();

  if (loading) return null;
  if (error) {
    processWarning(error, 'Server Error');
    return null;
  }

  if (inviteError) {
    processWarning(inviteError, 'Could not Invite to Event');
  }

  if (deleteError) {
    processError(deleteError, 'Could not Delete event');
  }

  const filteredMemberships = isOwnerData
    ? isOwnerData.user.member.filter((membership) =>
        data.event.hosts
          .map((host) => host.groupId)
          .includes(membership.group.id),
      )
    : [];

  const isMember = filteredMemberships.length > 0;
  const isOwner = isMember && filteredMemberships[0].isOwner === true;

  const date = new Date(data.event.startDate);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  const parsedYear = year === '2020' ? '' : year;

  const inviteUserToEvent = (userIdArray) => {
    console.log('userIdArray', userIdArray);
    const IDs = userIdArray.map((user) => user.id);
    console.log('IdArray', IDs);
    setTabIndex(1);
    const objects = graphqlify_relationship(eventId, IDs, 'event', 'user');
    console.log('object', objects);
    invite({
      variables: { objects: objects },
      update: (cache) => {
        try {
          const { user } = cache.readQuery({
            query: GET_USER_FRIENDS_NOT_ATTENDING_EVENT,
            variables: { userId: authState.user.uid, eventId: eventId },
          });

          const event = cache.readFragment({
            fragment: DETAILED_EVENT_FRAGMENT,
            id: `event:${eventId}`,
          });
          console.log('user, event', user);
          console.log(event);

          const newInvites = [];
          user.friends.forEach((f) => {
            if (IDs.includes(f.friend.id)) {
              newInvites.push({
                __typename: 'attendee',
                user: {
                  __typename: 'user',
                  id: f.friend.id,
                  name: f.friend.name,
                  image: f.friend.image,
                },
              })
            }
          });

          console.log('newInvites length', newInvites.length);
          console.log('length', event.invited.length);
          event.invited = [
            ...newInvites,
            ...event.invited,
          ];
          console.log('length', event.invited.length);
          cache.writeFragment({
            fragment: DETAILED_EVENT_FRAGMENT,
            id: `event:${eventId}`,
            data: { ...event },
          });

        } catch (e) {
          console.log(e);
        }
      },
    })
      .then(() => {
        inviteRef.current.close();
        const recipients = [];
        IDs.forEach((id) => recipients.push({ userId: id }));
        console.log('recips', recipients);
        sendNotifications({
          variables: {
            type: NotificationTypes.eventInvite,
            typeId: eventId,
            recipients: recipients,
          },
        }).catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const edit = () => {
    modalRef.current.close();
    editRef.current.open();
  };

  const onCloseEdit = () => {
    modalRef.current.open();
  };

  const onDeleteEvent = () => {
    Alert.alert(
      'Permanently Delete this Event',
      'All event data will be erased, Users will not be notified. Reload the app to see changes.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteEvent().catch((e) => console.log(e));
            goBack();
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: data.event.image }}
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.icons}>
            <CircleBackIcon style={styles.circleBackIcon} />
            {isAdminData.user.isAdmin || isOwner ? (
              <View>
                <CircleEditIcon style={styles.circleEditIcon} onPress={edit} />
                <CircleEditIcon
                  style={styles.circleEditIcon}
                  onPress={onDeleteEvent}
                  icon={'trash-2'}
                />
              </View>
            ) : null}
          </View>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={styles.titleContainer}>
            <Text style={styles.title}>{data.event.name}</Text>
            <Text style={styles.date}>{`${month} ${day} ${parsedYear}`}</Text>
          </LinearGradient>
        </View>
      </ImageBackground>
      <EventInfoModal
        ref={modalRef}
        eventId={eventId}
        inviteRef={inviteRef}
        initialIndex={tabIndex}
        allAttendingRef={allAttendingRef}
        allInvitedRef={allInvitedRef}
      />
      <SearchableFlatList
        ref={inviteRef}
        title={'friends'}
        query={GET_USER_FRIENDS_NOT_ATTENDING_EVENT}
        hasImage={true}
        variables={{
          userId: authState.user.uid,
          eventId: eventId,
        }}
        setSelection={() => {}}
        aliased={false}
        floatingButtonText={'Invite'}
        min={1}
        onPress={inviteUserToEvent}
        initialSelection={null}
        clearOnClose={true}
        offset={70 + insets.top}
        floatingButtonOffset={70 + insets.bottom}
      />
      <UsersBottomModal
        query={GET_EVENT_ATTENDANCE}
        variables={{ eventId: eventId, didAccept: true }}
        type={'event'}
        ref={allAttendingRef}
      />
      <UsersBottomModal
        query={GET_EVENT_ATTENDANCE}
        variables={{ eventId: eventId, didAccept: false }}
        type={'event'}
        ref={allInvitedRef}
      />

      {isAdminData.user.isAdmin || isOwner ? (
        <NewEventModal
          ref={editRef}
          onClose={onCloseEdit}
          eventId={eventId}
          editMode={true}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },
  backgroundImage: {
    width: '100%',
    height: HEIGHT * 0.44,
  },
  header: {
    justifyContent: 'space-between',
    height: HEIGHT * 0.44,
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
    flexDirection: 'row',
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: colours.white,
    flex: 4,
  },
  date: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: colours.placeholder,
    flex: 1,
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  circleEditIcon: {
    marginTop: 45,
    marginRight: 20,
  },
});

export default EventScreen;
