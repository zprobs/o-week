import React, { useContext, useRef, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import SearchBar from "react-native-search-bar";
import { GiftedChat } from "react-native-gifted-chat";
import { Theme } from "../../theme/Colours";
import Fonts from "../../theme/Fonts";
import NewMessageBottomModal from "../Modal/NewMessageBottomModal";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from "../Menu/GoBackHeader";
import MessageCard from "./MessageCard";
import ImgBanner from "../ReusableComponents/ImgBanner";
import {useSubscription} from '@apollo/react-hooks';
import { GET_CHATS } from "../../graphql";
import EmptyMessages from "../../assets/svg/empty-messages.svg";
import {AuthContext, parseChats, saveImage} from '../../context';
const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * MessagesList shows all the current users conversations
 * @returns {*}
 * @constructor
 */
export default function MessagesList() {
  const [chatSearch, setChatSearch] = useState();

  const newMessageBottomModalRef = useRef();

  const IconRight = () => (
    <Icon
      name="sc-telegram"
      size={28}
      color={colours.text01}
      onPress={() => newMessageBottomModalRef.current.open()}
    />
  );

  const renderItem = ({ item }) => {
    const {
      _id: chatId,
      participants,
      messages,
      image,
      name: chatName,
      messagesAggregate
    } = item;

    const name = chatName || participants
            .filter((participant) => participant._id !== authState.user.uid)
            .map((participant) => participant.name).join(', ');

    return (
      <MessageCard
        chatId={chatId}
        participants={participants}
        image={image}
        name={name}
        messages={messages}
        numMessages={messagesAggregate.aggregate.count}
        isOnline={true}
        time={messages[0].createdAt}
        messageBody={messages[0].text}
      />
    );
  };

  const listEmptyComponent = () => (
    <ImgBanner
      Img={EmptyMessages}
      placeholder="No messages yet"
      spacing={0.15}
    />
  );

  const itemSeparatorComponent = () => <View style={{ height: 15 }} />;

  const { authState } = useContext(AuthContext);

  const {
    data: chatsData,
    loading: chatsLoading,
    error: chatsError,
  } = useSubscription(GET_CHATS, {
    variables: {
      user: authState.user.uid,
    },
  });

  const content = (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={
        chatsLoading
          ? []
          : chatsError
          ? []
          : chatsData.chats
      }
      ListEmptyComponent={listEmptyComponent}
      style={styles.messagesList}
      spacing={20}
      renderItem={renderItem}
      ItemSeparatorComponent={itemSeparatorComponent}
    />
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <GoBackHeader
          title={"Messages"}
          titleStyle={styles.title}
          IconRight={IconRight}
        />
        <SearchBar
          value={chatSearch}
          onChangeText={setChatSearch}
          placeholder="Search for chats..."
          hideBackground={true}
        />
        {content}
      </SafeAreaView>
      <NewMessageBottomModal
        ref={newMessageBottomModalRef}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: colours.text01,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 4,
    paddingTop: 5,
  },
});

const dummyMSGS = [
  {
    id: "434",
    participants: [
      {
        id: "1e847288-bd60-4135-9127-75b01f1b8f3f",
        image: "https://reactjs.org/logo-og.png",
        name: "Kid Cudi",
        lastSeen: new Date(90),
      },
    ],
    messages: [
      {
        id: 8,
        body: "Crystal raindrops",
        seen: true,
        author: {
          id: 1,
        },
        createdAt: new Date(),
      },
    ],
  },

  {
    id: "444",
    participants: [
      {
        id: 1,
        name: "Pusha T",
        lastSeen: new Date(),
      },
    ],
    messages: [
      {
        id: 2,
        body: "hey wassup",
        seen: false,
        author: {
          id: 999,
        },
        createdAt: new Date(2020, 4, 17),
      },
    ],
  },
];
