import React, { useContext, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context";
import {
  useMutation,
  useSubscription,
  useLazyQuery,
} from "@apollo/react-hooks";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import GoBackHeader from "../Menu/GoBackHeader";
import { Theme } from "../../theme/Colours";
import ChatHeaderImage from "./ChatHeaderImage";
import CustomComposer from "./CustomComposer";
import CustomMessageText from "./CustomMessageText";
import CustomSend from "./CustomSend";
import CustomScrollToBottom from "./CustomScrollToBottom";
import CustomInputToolbar from "./CustomInputToolbar";
import { ifIphoneX } from "react-native-iphone-x-helper";
import {
  GET_EARLIER_MESSAGES,
  GET_NEW_MESSAGES,
  SEND_MESSAGE,
} from "../../graphql";

const { colours } = Theme.light;

const Conversation = () => {
  const route = useRoute();
  const {
    chatId,
    name,
    image,
    participants,
    numMessages,
    messages: initialMessages,
  } = route.params;
  const { navigate } = useNavigation();
  const { authState } = useContext(AuthContext);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [getEarlierMessages] = useLazyQuery(GET_EARLIER_MESSAGES, {
    onCompleted: ({ messages: oldMessages }) => {
      setMessages(GiftedChat.prepend(messages, oldMessages));
      setLoadEarlier(numMessages - messageOffset > numToLoad);
      setMessageOffset(messageOffset + numToLoad);
      setIsLoadingEarlier(false);
    },
  });
  const [messages, setMessages] = useState(initialMessages);
  const [messageOffset, setMessageOffset] = useState(initialMessages.length);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [loadEarlier, setLoadEarlier] = useState(messageOffset < numMessages);
  const didSetFirst = useRef(false);
  const numToLoad = 5;

  useSubscription(GET_NEW_MESSAGES, {
    variables: {
      chatId: chatId,
      latestId: messages.length === 0 ? 0 : Math.max(...messages.map(item => item._id)),
    },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);Math.max(...messages.map(item => item._id))
      if (didSetFirst.current) {
        setMessages(
          GiftedChat.append(messages, subscriptionData.data.messages),
        );
      } else {
        didSetFirst.current = true;
      }
    },
  });

  // const [queryChat, {
  //     called: chatQueryCalled,
  //     data: chatQueryData,
  //     loading: chatQueryLoading,
  //     error: chatQueryError
  // }] = useLazyQuery(QUERY_CHAT, {
  //     variables: { chatId },
  //     fetchPolicy: 'network-only'
  // });
  // const { data: chatSubscriptionData, loading: chatSubscriptionLoading } = useSubscription(SUBSCRIPTION_CHAT, {
  //     variables: { chatId }
  // });
  // const [addMessage] = useMutation(MUTATION_ADD_MESSAGE);
  // const [connectChat] = useMutation(MUTATION_CONNECT_CHAT_TO_USERS);

  // useEffect(() => {
  //     if (!chatSubscriptionLoading) {
  //         setMessages(chatSubscriptionData.chat.messages);
  //     } else if (chatSubscriptionLoading) {
  //         if (chatQueryCalled && !chatQueryLoading) {
  //             setMessages(chatQueryData.chat.messages);
  //         } else if (!chatQueryCalled) {
  //             queryChat();
  //         }
  //     }
  // }, [chatQueryData, chatQueryCalled, chatQueryLoading, chatSubscriptionData, chatSubscriptionLoading]);

  const onSend = updatedMessages => {
    console.log(Math.max(...[].map(item => item._id)));
    console.log(updatedMessages);
    const [updatedMessage] = updatedMessages;
    sendMessage({
      variables: {
        chatId: chatId,
        senderId: updatedMessage.user._id,
        body: updatedMessage.text,
      },
    });
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

  const handlePressAvatar = user => {
    navigate("Profile", { userId: user._id });
  };

  const handleTitlePress = () => {
    if (participants.length === 2) {
      const userId = participants.filter(
        participant => participant._id !== authState.user.uid,
      )[0]._id;
      navigate("Profile", { userId: userId });
    } else {
      console.log("Maybe we can show a modal of users in this chat?");
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
      renderComposer={composerProps => <CustomComposer {...composerProps} />}
      renderMessageText={CustomMessageText}
      renderSend={CustomSend}
      renderInputToolbar={CustomInputToolbar}
      onPressAvatar={handlePressAvatar}
      onSend={onSend}
      user={{ _id: authState.user.uid }}
      bottomOffset={ifIphoneX(20, -10)}
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
        title={name}
        onTitlePress={handleTitlePress}
        ContentLeft={() => (
          <ChatHeaderImage image={image} onPress={handleTitlePress} />
        )}
        titleStyle={styles.headerTitleStyle}
      />
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
