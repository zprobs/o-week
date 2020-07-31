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
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  GET_EVENT,
  GET_USER_FRIENDS,
  GET_USER_GROUPS,
  INVITE_USERS_TO_EVENT,
} from '../../graphql';
import { AuthContext, graphqlify_relationship } from '../../context';
import CircleEditIcon from '../ReusableComponents/CircleEditIcon';
import NewEventModal from '../Modal/NewEventModal';
import { showMessage } from 'react-native-flash-message';
import SearchableFlatList from '../Modal/SearchableFlatList';
import { useSafeArea } from 'react-native-safe-area-context';

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
  const { authState } = useContext(AuthContext);
  const [invite, {error: inviteError}] = useMutation(INVITE_USERS_TO_EVENT);
  const { eventId } = route.params;
  const [tabIndex, setTabIndex] = useState(0); // used to prevent tabs from defaulting to 0 after rerender
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });
  const { data: isOwnerData } = useQuery(GET_USER_GROUPS, {
    variables: { id: authState.user.uid },
    fetchPolicy: 'cache-only',
  });
  const insets = useSafeArea();

  if (loading) return null;
  if (error) {
    showMessage({
      message: "Server Error",
      description: error.message,
      autoHide: false,
      type: 'warning',
      icon: 'auto'
    });
    return null
  }

  if (inviteError) {
    showMessage({
      message: "Cannot Invite to Event",
      description: inviteError.message,
      autoHide: false,
      type: 'warning',
      icon: 'auto'
    });
  }


  const filteredMemberships = isOwnerData ? isOwnerData.user.member.filter((membership) =>
    data.event.hosts.map((host) => host.groupId).includes(membership.group.id),
  ) : [];


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
    console.log('userIdArray', userIdArray)
    const IDs = userIdArray.map(user=>user.id)
    console.log('IdArray', IDs)
    setTabIndex(1);
    const objects = graphqlify_relationship(eventId, IDs, 'event', 'user' )
    console.log('object', objects);
    invite({ variables: { objects: objects } })
      .then(inviteRef.current.close())
      .catch((e) => console.log(e));
  };

  const edit = () => {
    modalRef.current.close();
    editRef.current.open();
  };

  const onCloseEdit = () => {
    modalRef.current.open();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: data.event.image }}
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.icons}>
            <CircleBackIcon style={styles.circleBackIcon} />
            {isOwner ? (
              <CircleEditIcon style={styles.circleEditIcon} onPress={edit} />
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
      />
      <SearchableFlatList
        ref={inviteRef}
        title={'friends'}
        query={GET_USER_FRIENDS}
        hasImage={true}
        variables={{ userId: authState.user.uid }}
        setSelection={()=>{}}
        aliased={false}
        floatingButtonText={'Invite'}
        min={1}
        onPress={inviteUserToEvent}
        initialSelection={null}
        clearOnClose={true}
        offset={70 + insets.top}
        floatingButtonOffset={70 + insets.bottom}
      />
      {isOwner ? (
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
