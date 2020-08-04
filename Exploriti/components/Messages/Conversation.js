import React, { useContext, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext, processError, processWarning } from '../../context';
import {
  useMutation,
  useSubscription,
  useLazyQuery,
} from '@apollo/react-hooks';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import GoBackHeader from '../Menu/GoBackHeader';
import { Theme } from '../../theme/Colours';
import ChatHeaderImage from './ChatHeaderImage';
import CustomComposer from './CustomComposer';
import CustomMessageText from './CustomMessageText';
import CustomSend from './CustomSend';
import CustomScrollToBottom from './CustomScrollToBottom';
import CustomInputToolbar from './CustomInputToolbar';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {
  GET_EARLIER_MESSAGES,
  GET_NEW_MESSAGES,
  SEND_MESSAGE,
  UPDATE_MESSAGE_SEEN,
} from '../../graphql';
import { showMessage } from 'react-native-flash-message';

const { colours } = Theme.light;

/**
 * Screen for showing a GiftedChat component and messaging users
 * @returns {*}
 * @constructor
 */
const Conversation = () => {
  const route = useRoute();
  const {
    chatId,
    name,
    participants,
    numMessages,
    messages: initialMessages,
  } = route.params;
  const { navigate } = useNavigation();
  const { authState } = useContext(AuthContext);
  const [sendMessage, { error: sendError }] = useMutation(SEND_MESSAGE);
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
  const [messages, setMessages] = useState(initialMessages);
  const [messageOffset, setMessageOffset] = useState(initialMessages.length);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [loadEarlier, setLoadEarlier] = useState(messageOffset < numMessages);
  const didSetFirst = useRef(false);
  const numToLoad = 5;

  useSubscription(GET_NEW_MESSAGES, {
    variables: {
      chatId: chatId,
    },
    onSubscriptionData: ({ subscriptionData }) => {
      const newMessage = subscriptionData.data.messages[0];
      if (didSetFirst.current) {
        console.log(newMessage.user._id !== authState.user.uid);
        if (newMessage.user._id !== authState.user.uid) {
          setMessages(
            GiftedChat.append(messages, subscriptionData.data.messages),
          );
        }
      } else {
        didSetFirst.current = true;
      }
    },
  });

  if (earlierError) {
    processWarning(earlierError, 'Could not load messages')
  }

  if (sendError) {
   processError(sendError, 'Could not send message')
  }

  const onSend = (updatedMessages) => {
    const [updatedMessage] = updatedMessages;
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
        participants: participants
          .map((p) => p.id)
          .filter(p => p.id !== authState.user.uid),
        seen: false,
      },
    }).catch((e) => console.log(e));
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
    if (participants.length === 2) {
      const userId = participants.filter(
        (participant) => participant._id !== authState.user.uid,
      )[0]._id;
      navigate('Profile', { userId: userId });
    } else {
      console.log('Maybe we can show a modal of users in this chat?');
    }
  };

  // let content = <ConversationScreenPlaceholder />

  let content = <Text>Loading...</Text>;

  // if (chatQueryCalled && !chatQueryLoading && !chatQueryError) {
  // const transform = transformMessages(messages);
  content = (
    <GiftedChat
      alignTop={false}
      scrollToBottom
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
      <GoBackHeader title={name} titleStyle={styles.headerTitleStyle} />
      {content}
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
  },
});

export default Conversation;
