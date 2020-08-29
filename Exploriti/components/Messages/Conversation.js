import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { AuthContext, processError, processWarning } from '../../context';
import {
  useMutation,
  useSubscription,
  useLazyQuery,
  useQuery,
} from '@apollo/react-hooks';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import GoBackHeader from '../Menu/GoBackHeader';
import { Theme } from '../../theme/Colours';
import CustomComposer from './CustomComposer';
import CustomMessageText from './CustomMessageText';
import CustomSend from './CustomSend';
import CustomScrollToBottom from './CustomScrollToBottom';
import CustomInputToolbar from './CustomInputToolbar';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {
  GET_CHAT,
  GET_CHAT_MESSAGES,
  GET_EARLIER_MESSAGES,
  GET_NEW_MESSAGES,
  GET_USERS_IN_CHAT,
  SEND_MESSAGE,
  UPDATE_MESSAGE_SEEN,
} from '../../graphql';
import OptionsIcon from '../Menu/OptionsIcon';
import UsersBottomModal from '../Modal/UsersBottomModal';
import gql from 'graphql-tag';
import ChatOptionsModal from '../Modal/ChatOptionsModal';
import OptionsBottomModal from '../Modal/OptionsBottomModal';

const { colours } = Theme.light;

/**
 * Screen for showing a GiftedChat component and messaging users
 * @returns {*}
 * @constructor
 */
const Conversation = () => {
  const route = useRoute();
  // chatId is always there but other ones are only there if navigating from message card. Name is used to tell if params have been supplied
  var {
    chatId,
    name,
    participants,
    numMessages,
    isHighlighted: notSeen,
    chatName,
    image,
    muted,
  } = route.params;
  const { navigate, goBack } = useNavigation();
  const { authState } = useContext(AuthContext);
  const [sendMessage, { error: sendError }] = useMutation(SEND_MESSAGE);

  // skip this query if you get chat data from parameters. It includes the initial messages aswell as chat name etc.
  const { data: chatData, error: chatError, loading: chatLoading } = useQuery(GET_CHAT, {
    variables: { userId: authState.user.uid, chatId: chatId },
    skip: name,
  });

  console.log({chatData});

  // skip this query if you didn't get chat data from parameters. You will already get messages form the query above
  const { data: messageData, error: messageError, loading: messageLoading } = useQuery(
    GET_CHAT_MESSAGES,
    { variables: { chatId: chatId }, skip: !name },
  );

  const [updateMessageSeen] = useMutation(UPDATE_MESSAGE_SEEN);
  const [getEarlierMessages, { error: earlierError }] = useLazyQuery(
    GET_EARLIER_MESSAGES,
    {
      onCompleted: ({ messages: oldMessages }) => {
        setMessages(GiftedChat.prepend(messages, oldMessages));
        setLoadEarlier(numMessages - messageOffset > numToLoad);
        setMessageOffset(messageOffset + numToLoad);
        setIsLoadingEarlier(false);
      },
    },
  );
  const [messages, setMessages] = useState([]);
  const [messageOffset, setMessageOffset] = useState(0);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [nameState, setNameState] = useState(name);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const usersRef = useRef();
  const optionsRef = useRef();
  const numToLoad = 5;

  const isFocused = useIsFocused();

  useEffect(() => {
    // for when nav to conversation screen from profile
    if (chatData) console.log('userChats',chatData.user.userChats);
    if (chatData && chatData.user.userChats[0]) {
      console.log('userEffect triggered');
      const { chat } = chatData.user.userChats[0];
      setMessages(chat.messages);
      setMessageOffset(chat.messages.length);
      chatName = chat.name;
      name =
        chatName ||
        participants
          .filter((participant) => participant._id !== authState.user.uid)
          .map((participant) => participant.name)
          .join(', ');
      participants = chat.participants;
      console.log('useEffect participants', participants);
      if (participants.length === 2) {
        image = participants.filter((user) => user.id !== authState.user.uid)[0]
          .image;
      } else {
        image = chat.image;
      }
      muted = chatData.user.userChats[0].muted ;
      notSeen = !chatData.user.userChats[0].seen;

      console.log('chat length, agg count', chat.messages.length, chat.messagesAggregate.aggregate.count );

      setLoadEarlier(chat.messages.length < chat.messagesAggregate.aggregate.count)

    }
  }, [chatData]);

  useEffect(() => {
    // for when nav to conversation screen from messages list
    if (messageData) {
      setMessages(messageData.chat.messages);
      setMessageOffset(messageData.chat.messages.length);

      setLoadEarlier(messageData.chat.messages.length < messageData.chat.messagesAggregate.aggregate.count)
    }
  }, [messageData]);

  useSubscription(GET_NEW_MESSAGES, {
    variables: {
      chatId: chatId,
      max: Math.max(
        ...messages
          .map((item) => item._id)
          .filter((item) => Number.isInteger(item)),
      ),
    },
    onSubscriptionData: ({ subscriptionData }) => {
      const newMessage = subscriptionData.data.messages;

      if (!newMessage) {
        goBack();
        return null;
      }

      const userId = authState.user.uid;
      setMessages(
        GiftedChat.append(
          messages,
          subscriptionData.data.messages.filter(
            (msg) => msg.user._id !== userId,
          ),
        ),
      );

      if (isFocused) setSeen();
    },
  });

  const [setSeen] = useMutation(UPDATE_MESSAGE_SEEN, {
    variables: {
      chatId: chatId,
      participants: [authState.user.uid],
      seen: true,
    },
    update: (cache) => {
      const frag = gql`
        fragment usersChats on user {
          userChats(
            where: {
              _and: [{ chat: { messages: {} } }, { seen: { _eq: false } }]
            }
          ) {
            chatId
            seen
          }
        }
      `;

      try {
        const { userChats } = cache.readFragment({
          id: `user:${authState.user.uid}`,
          fragment: frag,
        });

        const newChats = userChats.filter((e) => e.chatId !== chatId);

        cache.writeFragment({
          id: `user:${authState.user.uid}`,
          fragment: frag,
          data: { __typename: 'user', userChats: newChats },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const hasSetSeen = useRef(false);

  if (chatError) {
    processWarning(chatError, 'Cannot load conversation');
    return null;
  }

  if (!chatData && !name) {
    return null;
  }

  if (isFocused && notSeen && !hasSetSeen.current) {
    hasSetSeen.current = true;
    setSeen();
  }

  if (!isFocused) hasSetSeen.current = false;

  if (earlierError) {
    processWarning(earlierError, 'Could not load messages');
  }

  if (sendError) {
    processError(sendError, 'Could not send message');
  }

  if (messageError) {
    processWarning(messageError, 'Cannot load messages');
  }

  const onSend = (updatedMessages) => {
    const [updatedMessage] = updatedMessages;
    console.log({ updatedMessage });
    const userIds = participants
      .map((p) => p.id)
      .filter((p) => p.id !== authState.user.uid);
    sendMessage({
      variables: {
        chatId: chatId,
        senderId: updatedMessage.user._id,
        body: updatedMessage.text,
      },
    });
    setMessages(GiftedChat.append(messages, updatedMessages));
    updateMessageSeen({
      variables: {
        chatId: chatId,
        participants: userIds,
        seen: false,
      },
    }).catch((e) => console.log(e));
    setSeen();
  };

  const loadEarlierMessages = () => {
    setIsLoadingEarlier(true);
    getEarlierMessages({
      variables: {
        chatId: chatId,
        offset: messageOffset,
        limit: Math.min(numToLoad, numMessages - messageOffset),
      },
    });
  };

  const handlePressAvatar = (user) => {
    navigate('Profile', { userId: user._id });
  };

  const handleTitlePress = () => {
    if (participants && participants.length === 2) {
      const userId = participants.filter(
        (participant) => participant._id !== authState.user.uid,
      )[0]._id;
      navigate('Profile', { userId: userId });
    } else {
      usersRef.current.open();
    }
  };

  const handleOptionsPress = () => {
    optionsRef.current && optionsRef.current.open();
  };

  // if (chatQueryCalled && !chatQueryLoading && !chatQueryError) {
  // const transform = transformMessages(messages);
  const content = (
    <GiftedChat
      // alignTop={false}
      scrollToBottom
      isKeyboardInternallyHandled={Platform.OS !== 'android'}
      alwaysShowSend
      isLoadingEarlier={isLoadingEarlier}
      onLoadEarlier={loadEarlierMessages}
      loadEarlier={loadEarlier}
      infiniteScroll
      inverted
      maxInputLength={200}
      messages={messages}
      scrollToBottomComponent={CustomScrollToBottom}
      textInputProps={{ disable: true }}
      renderComposer={(composerProps) => <CustomComposer {...composerProps} />}
      renderMessageText={CustomMessageText}
      renderSend={CustomSend}
      renderInputToolbar={CustomInputToolbar}
      onPressAvatar={handlePressAvatar}
      onSend={onSend}
      user={{ _id: authState.user.uid }}
      bottomOffset={ifIphoneX(90, 60)}
      keyboardShouldPersistTaps={null}
      listViewProps={{
        showsVerticalScrollIndicator: false,
        style: { marginBottom: 16 },
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <GoBackHeader
        title={nameState}
        titleStyle={styles.headerTitleStyle}
        IconRight={() => <OptionsIcon onPress={handleOptionsPress} />}
        onTitlePress={handleTitlePress}
      />
      {content}
      <UsersBottomModal
        type={'chat'}
        name={chatName}
        query={GET_USERS_IN_CHAT}
        variables={{ chatId: chatId }}
        ref={usersRef}
      />
      {participants && participants.length > 2 ? (
        <ChatOptionsModal
          id={chatId}
          prevName={nameState}
          chatName={chatName}
          prevImage={image}
          ref={optionsRef}
          setName={setNameState}
          muted={muted}
        />
      ) : participants && participants.length === 2 ? (
        <OptionsBottomModal
          id={participants.find((p) => p.id !== authState.user.uid).id}
          ref={optionsRef}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },
  headerTitleStyle: {
    marginLeft: 0,
    maxWidth: '85%',
  },
});

export default Conversation;
