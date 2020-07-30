import React, { useContext, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';

import Icon from 'react-native-vector-icons/EvilIcons';
import EditProfileBottomModal from './EditProfileBottomModal';
import UsersBottomModal from '../Modal/UsersBottomModal';
import GroupBottomModal from '../Modal/GroupBottomModal';
import { AuthContext, graphqlify, NotificationTypes } from '../../context';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import {
  CHECK_FRIEND_REQUESTS,
  CONFIRM_FRIEND_REQUEST,
  DELETE_FRIEND_REQUEST,
  GET_DETAILED_USER,
  GET_USER_FRIENDS_ID,
  NEW_CHAT,
  REMOVE_FRIEND,
  SEND_FRIEND_REQUEST,
  SEND_NOTIFICATION,
} from '../../graphql';
import Error from '../ReusableComponents/Error';
import GoBackHeader from '../Menu/GoBackHeader';
import OptionsIcon from '../Menu/OptionsIcon';
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
import OptionsBottomModal from '../Modal/OptionsBottomModal';
import LoadingDots from '../ReusableComponents/LoadingDots';
import SocialMediaAnimation from '../ReusableComponents/SocialMediaAnimation';
import SocialMediaIcons from '../ReusableComponents/SocialMediaIcons';
import NewSocialMediaLinkBottomModal from '../Modal/NewSocialMediaLinkBottomModal';
import { useNavigation } from '@react-navigation/native';
import ProfilePlaceholder from '../Placeholders/ProfilePlaceholder';
import { showMessage } from 'react-native-flash-message';

const { FontWeights, FontSizes } = Fonts;

const { colours } = Theme.light;

/**
 * Profile is the screen which will display a users profile. Has two states: isCurrentUser = true or false
 * @param route The navigation route parameters set when navigating to this page using react-navigation. If it has a parameter userId then the page
 * will render with that users details. If the userId is the same as the authenticated user, then it will render the MyProfile tab with a Nav Header.
 * @returns {*}
 * @constructor
 */
export default function Profile({ route }) {
  // used to determine which social media is to be added
  const [socialIndex, setSocialIndex] = useState(0);


  const { authState } = useContext(AuthContext);
  const insets = useSafeArea()

  const editProfileBottomModalRef = useRef();
  const optionsBottomModalRef = useRef();
  const usersBottomModalRef = useRef();
  const groupBottomModalRef = useRef();
  const newSocialMediaLinkBottomModalRef = useRef();



  const isMyProfilePage = !route.params;
  const userId = isMyProfilePage ? authState.user.uid : route.params.userId;
  const isCurrentUser = !(!isMyProfilePage && userId !== authState.user.uid);

  const { loading, error, data } = useQuery(GET_DETAILED_USER, {
    variables: { id: userId },
  });

  if (error) {
    showMessage({
      message: "Server Error",
      description: error.message,
      type: 'warning',
      icon: 'auto'
    });
  }

  if (loading)
    return (
      <View style={{ backgroundColor: colours.base, flex: 1, paddingTop: insets.top }}>
          {isMyProfilePage ? null : (
            <GoBackHeader/>
          )}
          <ProfilePlaceholder hasInteractions={!isCurrentUser} />
      </View>
    );
  if (error) return <Error e={error} />;
  const description = data.user.description;
  const name = data.user.name;
  const image =
    data.user.image === 'default_user.png'
      ? 'https://reactjs.org/logo-og.png'
      : data.user.image;
  const programs = data.user.programs
    .map((userProgram) => userProgram.program.name)
    .join(', ');
  const year = data.user.year;
  const friendCount = data.user.friends_aggregate.aggregate.count;
  const groupCount = data.user.member_aggregate.aggregate.count;

  const onEdit = () => editProfileBottomModalRef.current.open();
  const onOptions = () => optionsBottomModalRef.current.open();
  const onFriendsOpen = () => usersBottomModalRef.current.open();
  const onGroupsOpen = () => groupBottomModalRef.current.open();
  const onAddSocial = () => newSocialMediaLinkBottomModalRef.current.open();

  const renderInteractions = () => {
    return (
      <UserInteractions
        userId={userId}
        navigation={useNavigation()}
        image={image}
      />
    );
  };

  const openModal = (index) => {
    setSocialIndex(index);
    onAddSocial();
  };

  return (
    <View style={{ backgroundColor: colours.base, flex: 1 }}>
      <SafeAreaView>
        {isMyProfilePage ? null : (
          <GoBackHeader IconRight={OptionsIcon} IconRightOnPress={onOptions} />
        )}
        <ProfileCard
          editable={isCurrentUser}
          description={description}
          name={name}
          programs={programs}
          image={image}
          onEdit={onEdit}
          onFriendsOpen={onFriendsOpen}
          onGroupsOpen={onGroupsOpen}
          renderInteractions={isCurrentUser ? null : renderInteractions}
          userId={userId}
          groupCount={groupCount}
          friendCount={friendCount}
        />
        {isCurrentUser ? <SocialMediaAnimation openModal={openModal} /> : null}
      </SafeAreaView>
      <UsersBottomModal
        ref={usersBottomModalRef}
        type="Friends"
        name={isCurrentUser ? null : name}
        userId={userId}
      />
      <GroupBottomModal
        ref={groupBottomModalRef}
        userId={userId}
        type="Member"
        name={isCurrentUser ? null : name}
      />
      {isCurrentUser ? (
        <>
          <EditProfileBottomModal
            ref={editProfileBottomModalRef}
            image={image}
            name={name}
            programs={data.user.programs}
            year={year}
            description={description}
          />
          <NewSocialMediaLinkBottomModal
            ref={newSocialMediaLinkBottomModalRef}
            type={socialIndex}
          />
        </>
      ) : (
        <OptionsBottomModal ref={optionsBottomModalRef} />
      )}
    </View>
  );
}

const EditProfile = ({ onEdit }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onEdit}
      style={styles.editProfile}>
      <Icon name="pencil" size={25} color={ThemeStatic.white} />
    </TouchableOpacity>
  );
};

const Connections = ({ total, type, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={styles.connections}>
      <Text style={styles.connectionsText}>{total}</Text>
      <Text style={styles.connectionsType}>{type}</Text>
    </TouchableOpacity>
  );
};

/**
 * Profile Card is the UI Component for a user's profile page.
 * @param image Profile picture
 * @param editable Weather or not a user can edit the page. Only true when it is the current user.
 * @param onEdit Opens the EditProfileBottomModal
 * @param onFriendsOpen Opens the UserBottomModal
 * @param onGroupsOpen Opens the GroupBottomModal
 * @param name
 * @param programs
 * @param description
 * @param renderInteractions Will render the ADD FRIEND and MESSAGE buttons if it exists. Should only be included when the profile is not the current user.
 * @param userId
 * @param groupCount Number of groups
 * @param friendCount Number of friends
 * @returns {*}
 * @constructor
 */
const ProfileCard = ({
  image,
  editable,
  onEdit,
  onFriendsOpen,
  onGroupsOpen,
  name,
  programs,
  description,
  renderInteractions,
  userId,
  groupCount,
  friendCount,
}) => {
  const friendType = friendCount === 1 ? 'FRIEND' : 'FRIENDS';
  const groupType = groupCount === 1 ? 'GROUP' : 'GROUPS';

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Connections
          onPress={onFriendsOpen}
          total={friendCount}
          type={friendType}
        />
        <ImageBackground
          source={{ uri: image || '' }}
          style={styles.image}
          imageStyle={styles.avatarImage}>
          {editable && <EditProfile onEdit={onEdit} />}
        </ImageBackground>
        <Connections
          onPress={onGroupsOpen}
          total={groupCount}
          type={groupType}
        />
      </View>
      <View style={styles.name}>
        <Text style={styles.usernameText}>{name}</Text>
        <Text style={styles.programText}>{programs}</Text>
      </View>
      {renderInteractions && renderInteractions()}
      <View style={styles.description}>
        <Text style={styles.descriptionTitle}>About</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <SocialMediaIcons id={userId} />
    </View>
  );
};

/**
 * Render the buttons for Friend Requests and Messaging
 * @param userId {string} The userId of the profile in question. Not the current user.
 * @param navigation
 * @param image {string}
 * @returns {*}
 * @constructor
 */
const UserInteractions = ({ userId, navigation, image }) => {
  const { authState } = useContext(AuthContext);

  const [newChat, {error: newChatError}] = useMutation(NEW_CHAT, {
    onCompleted: ({ createChat }) => {
      const {
        _id: chatId,
        participants,
        messages,
        image,
        name: chatName,
        messagesAggregate,
      } = createChat;

      const name =
        chatName ||
        participants
          .filter((participant) => participant._id !== authState.user.uid)
          .map((participant) => participant.name)
          .join(', ');

      const numMessages = messagesAggregate.aggregate.count;
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
        initial: false
      });
    },
  });

  const [sendNotification] = useMutation(SEND_NOTIFICATION);

  const [
    checkFriendRequests,
    {
      data: requestsData,
      loading: requestsLoading,
      error: requestsError,
      called,
    },
  ] = useLazyQuery(CHECK_FRIEND_REQUESTS, {
    variables: { currentUser: authState.user.uid, otherUser: userId },
    fetchPolicy: 'no-cache',
  });

  const [sendRequest, { error: sendError, loading: sendLoading }] = useMutation(
    SEND_FRIEND_REQUEST,
    {
      variables: { sender: authState.user.uid, recipient: userId },
      onCompleted: () => {
        checkFriendRequests();
        sendNotification({
          variables: {
            type: NotificationTypes.sendFriendRequest,
            typeId: authState.user.uid,
            recipient: userId,
          },
        }).catch((e) => console.log(e));
      },
      fetchPolicy: 'no-cache',
    },
  );

  const [
    deleteRequest,
    { error: deleteError, loading: deleteLoading },
  ] = useMutation(DELETE_FRIEND_REQUEST, {
    variables: { sender: authState.user.uid, recipient: userId },
    onCompleted: checkFriendRequests,
    fetchPolicy: 'no-cache',
  });

  const [
    removeFriend,
    { error: removeError, loading: removeLoading },
  ] = useMutation(REMOVE_FRIEND, {
    variables: { userId: authState.user.uid, friendId: userId },
    update: (cache) => {
      const { friends } = cache.readQuery({
        query: GET_USER_FRIENDS_ID,
        variables: { userId: authState.user.uid },
      });
      const newFriends = friends.filter((element) => element.id !== userId);
      cache.writeQuery({
        query: GET_USER_FRIENDS_ID,
        variables: { userId: authState.user.uid },
        data: { friends: newFriends },
      });
    },
    onCompleted: checkFriendRequests,
  });

  const [
    confirmRequest,
    { error: confirmError, loading: confirmLoading },
  ] = useMutation(CONFIRM_FRIEND_REQUEST, {
    variables: { recipient: authState.user.uid, sender: userId },
    update: (cache) => {
      // update friends list for currentUser
      const { friends } = cache.readQuery({
        query: GET_USER_FRIENDS_ID,
        variables: { userId: authState.user.uid },
      });
      const newFriend = {
        __typename: 'friendView',
        id: userId,
        userId: authState.user.uid,
      };
      cache.writeQuery({
        query: GET_USER_FRIENDS_ID,
        variables: { userId: authState.user.uid },
        data: { friends: friends.concat([newFriend]) },
      });
    },
    // update friend Requests
    onCompleted: () => {
      checkFriendRequests();
      sendNotification({
        variables: {
          type: NotificationTypes.confirmFriendRequest,
          typeId: authState.user.uid,
          recipient: userId,
        },
      }).catch((e) => console.log(e));
    },
  });

  const {
    data: friendsData,
    loading: friendsLoading,
    error: friendsError,
  } = useQuery(GET_USER_FRIENDS_ID, {
    variables: { userId: authState.user.uid },
  });

  if (newChatError) {
    showMessage({
      message: "Cannot Create Chat",
      description: newChatError.message,
      type: 'danger',
      icon: 'auto'
    });
  }

  if (confirmError) {
    showMessage({
      message: "Cannot Confirm Request",
      description: confirmError.message,
      type: 'danger',
      icon: 'auto'
    });
  }

  if (removeError) {
    showMessage({
      message: "Cannot Remove Friend",
      description: removeError.message,
      type: 'danger',
      icon: 'auto'
    });
  }

  if (deleteError) {
    showMessage({
      message: "Cannot Delete Request",
      description: deleteError.message,
      type: 'danger',
      icon: 'auto'
    });
  }

  if (friendsError) {
    showMessage({
      message: "Server Error",
      description: friendsError.message,
      type: 'warning',
      icon: 'auto'
    });
  }

  let content;
  let friendInteraction = () => {
    return undefined;
  };

  if (friendsData) {
    const isFriend = friendsData.friends.some((user) => {
      return user.id === userId;
    });
    if (isFriend) {
      content = <Text style={styles.followInteractionText}>REMOVE FRIEND</Text>;
      friendInteraction = () => removeFriend();
    }
  }

  if (!called && !content) {
    checkFriendRequests();
  }

  if (!content) {
    if (
      requestsLoading ||
      sendLoading ||
      deleteLoading ||
      confirmLoading ||
      removeLoading
    ) {
      content = LoadingIndicator();
    } else if (
      requestsError ||
      sendError ||
      deleteError ||
      confirmError ||
      friendsError ||
      removeError
    ) {
      content = (
        <Text style={styles.followInteractionText}>Error</Text>
      );
    } else if (
      requestsData &&
      requestsData.user.friendRequestsReceived.length !== 0
    ) {
      content = (
        <Text style={styles.followInteractionText}>ACCEPT FRIEND REQUEST</Text>
      );
      friendInteraction = () => confirmRequest();
    } else if (
      requestsData &&
      requestsData.user.friendRequestsSent.length !== 0
    ) {
      content = (
        <Text style={styles.followInteractionText}>REQUEST PENDING</Text>
      );
      friendInteraction = () => deleteRequest();
    } else {
      content = <Text style={styles.followInteractionText}>ADD FRIEND</Text>;
      friendInteraction = () => sendRequest();
    }
  }

  const messageInteraction = async () => {
    const friendsSelection = [userId, authState.user.uid];
    newChat({
      variables: {
        participants: graphqlify(friendsSelection, 'user'),
        image: image,
      },
    });
  };

  return (
    <View style={styles.userInteractionsContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={friendInteraction}
        style={styles.followInteraction}>
        {content}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={messageInteraction}
        style={styles.messageInteraction}>
        <Text style={styles.messageInteractionText}>MESSAGE</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoadingIndicator = () => (
  <View style={styles.loadingIndicatorView}>
    <LoadingDots
      size={6}
      activeBackground={colours.white}
      background={colours.white}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 4,
    paddingHorizontal: 15,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    height: 120,
    width: 120,
  },
  avatarImage: {
    backgroundColor: colours.placeholder,
    borderRadius: 120,
  },
  editProfile: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    width: 60,
    height: 32,
    borderWidth: 2,
    borderColor: colours.base,
    backgroundColor: colours.accent,
  },
  connections: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionsText: {
    ...FontWeights.Regular,
    ...FontSizes.SubHeading,
    color: colours.text01,
  },
  connectionsType: {
    ...FontWeights.Bold,
    ...FontSizes.Caption,
    color: colours.text02,
    marginTop: 5,
  },
  name: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  usernameText: {
    ...FontWeights.Bold,
    ...FontSizes.SubHeading,
    color: colours.text01,
  },
  programText: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: colours.text02,
    marginTop: 5,
  },
  description: {
    padding: 16,
    marginTop: 16,
    backgroundColor: colours.accent,
    borderRadius: 10,
    marginBottom: 10,
  },
  descriptionTitle: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: colours.white,
  },
  descriptionText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: colours.white,
    marginTop: 5,
  },
  userInteractionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  followInteraction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    paddingVertical: 7,
    borderRadius: 40,
    backgroundColor: colours.accent,
  },
  messageInteraction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingVertical: 7,
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colours.accent,
  },
  followInteractionText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: colours.white,
  },
  messageInteractionText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: colours.accent,
  },
  loadingIndicatorView: {
    height: 14,
    justifyContent: 'center',
  },
});
