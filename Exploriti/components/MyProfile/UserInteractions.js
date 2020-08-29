import React, { useContext } from 'react';
import {
  AuthContext,
  graphqlify,
  NotificationTypes,
  processError,
  processWarning,
} from '../../context';
import gql from 'graphql-tag';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import {
  CHECK_FRIEND_REQUESTS,
  CHECK_USER_ADMIN,
  CONFIRM_FRIEND_REQUEST,
  DELETE_FRIEND_REQUEST,
  GET_USER_FRIENDS_ID,
  NEW_CHAT,
  REMOVE_FRIEND,
  SEND_FRIEND_REQUEST,
  SEND_NOTIFICATION,
} from '../../graphql';
import { showMessage } from 'react-native-flash-message';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoadingDots from '../ReusableComponents/LoadingDots';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * Render the buttons for Friend Requests and Messaging
 * @param userId {string} The userId of the profile in question. Not the current user.
 * @param navigation
 * @param image {string}
 * @param name {string} used for cache updates
 * @param onlyFriendsCanMessage {boolean} if true then you can't message unless friends
 * @param isLeader {boolean} affects weather leaders can message
 * @param isAdmin {boolean} affects weather leaders can message
 * @param existingChatId {int} if present then message will open an existing chat.
 * @returns {*}
 * @constructor
 */
const UserInteractions = ({
  userId,
  navigation,
  image,
  name,
  onlyFriendsCanMessage,
  isLeader,
  isAdmin,
  existingChatId,
}) => {
  const { authState } = useContext(AuthContext);

  const [newChat, { error: newChatError }] = useMutation(NEW_CHAT, {
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
        initial: false,
      });
    },
  });

  const [sendNotification] = useMutation(SEND_NOTIFICATION);

  const { data: adminData } = useQuery(CHECK_USER_ADMIN, {
    variables: { id: authState.user.uid },
  });

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
      // update friends list

      try {
        const { friends } = cache.readFragment({
          id: `user:${authState.user.uid}`,
          fragment: userFriendsFragment,
        });

        let newFriends = friends.filter(
          (element) => element.friend.id !== userId,
        );

        cache.writeFragment({
          id: `user:${authState.user.uid}`,
          fragment: userFriendsFragment,
          data: { __typename: 'user', friends: newFriends },
        });
      } catch (e) {
        console.log(e);
      }

      try {
        const { friends } = cache.readFragment({
          id: `user:${userId}`,
          fragment: userFriendsFragment,
        });

        let newFriends = friends.filter(
          (element) => element.friend.id !== authState.user.uid,
        );

        cache.writeFragment({
          id: `user:${userId}`,
          fragment: userFriendsFragment,
          data: { __typename: 'user', friends: newFriends },
        });
      } catch (e) {
        console.log(e);
      }

      // update Aggregate counts

      let myFriendsAggregate = cache.readFragment({
        id: `user:${authState.user.uid}`,
        fragment: aggFriendsFragment,
      });
      let newCount = myFriendsAggregate.friends_aggregate.aggregate.count - 1;
      cache.writeFragment({
        id: `user:${authState.user.uid}`,
        fragment: aggFriendsFragment,
        data: aggFriendsData(newCount),
      });

      myFriendsAggregate = cache.readFragment({
        id: `user:${userId}`,
        fragment: aggFriendsFragment,
      });
      newCount = myFriendsAggregate.friends_aggregate.aggregate.count - 1;
      cache.writeFragment({
        id: `user:${userId}`,
        fragment: aggFriendsFragment,
        data: aggFriendsData(newCount),
      });
    },
    onCompleted: checkFriendRequests,
    refetchQueries: [
      { query: GET_USER_FRIENDS_ID, variables: { userId: authState.user.uid } },
    ],
  });

  const [
    confirmRequest,
    { error: confirmError, loading: confirmLoading },
  ] = useMutation(CONFIRM_FRIEND_REQUEST, {
    variables: { recipient: authState.user.uid, sender: userId },
    update: (cache) => {
      // update friends list for both

      try {
        const { friends } = cache.readFragment({
          id: `user:${authState.user.uid}`,
          fragment: userFriendsFragment,
        });

        if (friends) {
          let newFriend = {
            __typename: 'friend',
            friend: {
              __typename: 'user',
              id: userId,
              name: name,
              image: image,
            },
          };
          cache.writeFragment({
            id: `user:${authState.user.uid}`,
            fragment: userFriendsFragment,
            data: { __typename: 'user', friends: friends.concat(newFriend) },
          });
        }
      } catch (e) {
        console.log(e);
      }

      try {
        const { friends } = cache.readFragment({
          id: `user:${userId}`,
          fragment: userFriendsFragment,
        });

        if (friends) {
          const currentUser = cache.readFragment({
            id: `user:${authState.user.uid}`,
            fragment: gql`
              fragment basicFragment on user {
                id
                name
                image
              }
            `,
          });

          let newFriend = {
            __typename: 'friend',
            friend: {
              __typename: 'user',
              id: currentUser.id,
              name: currentUser.name,
              image: currentUser.image,
            },
          };
          cache.writeFragment({
            id: `user:${userId}`,
            fragment: userFriendsFragment,
            data: { __typename: 'user', friends: friends.concat(newFriend) },
          });
        }
      } catch (e) {
        console.log(e);
      }

      // update friend Counts

      let myFriendsAggregate = cache.readFragment({
        id: `user:${authState.user.uid}`,
        fragment: aggFriendsFragment,
      });
      let newCount = myFriendsAggregate.friends_aggregate.aggregate.count + 1;
      cache.writeFragment({
        id: `user:${authState.user.uid}`,
        fragment: aggFriendsFragment,
        data: aggFriendsData(newCount),
      });

      myFriendsAggregate = cache.readFragment({
        id: `user:${userId}`,
        fragment: aggFriendsFragment,
      });
      newCount = myFriendsAggregate.friends_aggregate.aggregate.count + 1;
      cache.writeFragment({
        id: `user:${userId}`,
        fragment: aggFriendsFragment,
        data: aggFriendsData(newCount),
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
    refetchQueries: [
      { query: GET_USER_FRIENDS_ID, variables: { userId: authState.user.uid } },
    ],
  });

  const {
    data: friendsData,
    loading: friendsLoading,
    error: friendsError,
  } = useQuery(GET_USER_FRIENDS_ID, {
    variables: { userId: authState.user.uid },
  });

  if (newChatError) {
    processError(newChatError, 'Cannot create Chat');
  }

  if (confirmError) {
    processError(confirmError, 'Cannot confirm request');
  }

  if (removeError) {
    processError(removeError, 'Cannot remove friend');
  }

  if (deleteError) {
    processError(deleteError, 'Cannot delete request');
  }

  if (friendsError) {
    processWarning(friendsError, 'Server Error');
  }

  let content;
  let isFriend;
  let friendInteraction = () => {
    return undefined;
  };
  // todo: find out if they are friends with query logic
  if (friendsData) {
    isFriend = friendsData.user.friends.some((e) => {
      return e.friend.id === userId;
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
      removeLoading ||
      friendsLoading
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
      content = <Text style={styles.followInteractionText}>Error</Text>;
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
    if (isFriend || !onlyFriendsCanMessage) {
      if (adminData && adminData.user.isLeader && !isLeader && !isAdmin) {
        showMessage({
          message: 'Cannot send message',
          description:
            'As a leader you may not send private messages to students',
          autoHide: true,
          type: 'danger',
          icon: 'auto',
        });
      } else {
        if (existingChatId) {
          navigation.navigate('Messages', {
            screen: 'Conversation',
            params: {
              chatId: existingChatId,
            },
            initial: false,
          });
        } else {
          const friendsSelection = [userId, authState.user.uid];
          newChat({
            variables: {
              participants: graphqlify(friendsSelection, 'user'),
              image: image,
            },
          });
        }
      }
    } else {
      showMessage({
        message: 'Cannot send message',
        description: 'This user does not allow non-friends to message them',
        autoHide: true,
        type: 'danger',
        icon: 'auto',
      });
    }
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

const aggFriendsFragment = gql`
  fragment aggFriends on user {
    friends_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const userFriendsFragment = gql`
  fragment userFriends on user {
    friends {
      friend {
        id
        image
        name
      }
    }
  }
`;

const aggFriendsData = (count) => {
  return {
    __typename: 'user',
    friends_aggregate: {
      __typename: 'friend_aggregate',
      aggregate: {
        __typename: 'friend_aggregate_fields',
        count: count,
      },
    },
  };
};

export default UserInteractions;

const styles = StyleSheet.create({
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
