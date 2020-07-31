import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { Theme } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import Icon from 'react-native-vector-icons/EvilIcons';
import MessageCard from './MessageCard';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_CHATS, GET_USER_FRIENDS, NEW_CHAT, SEARCH_CHATS } from '../../graphql';
import EmptyMessages from '../../assets/svg/empty-messages.svg';
import { AuthContext, getDefaultImage, graphqlify } from '../../context';
import SearchableFlatList from '../Modal/SearchableFlatList';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { useSafeArea } from 'react-native-safe-area-context';

import MessagesListPlaceholder from '../Placeholders/MessagesListPlaceholder';
import { showMessage } from 'react-native-flash-message';
const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * MessagesList shows all the current users conversations
 * @returns {*}
 * @constructor
 */
export default function MessagesList() {
  const [chatSearch, setChatSearch] = useState('');
  const [friendsSelection, setFriendsSelection] = useState([]);
  const navigation = useNavigation();
  const newMessageBottomModalRef = useRef();
  const headerHeight = useHeaderHeight();
  const insets = useSafeArea();


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
      name: chatName,
      messagesAggregate,
    } = item;

    let image;

    if (participants.length === 2) {
      image = participants.filter(user=>user.id !== authState.user.uid)[0].image;
    } else {
      image = item.image
    }

    console.log('image', image)

    console.log('participants', participants)

    const name =
      chatName ||
      participants
        .filter((participant) => participant._id !== authState.user.uid)
        .map((participant) => participant.name)
        .join(', ');

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

  if (chatsError) {
    showMessage({
      message: "Server Error",
      description: chatsError.message,
      autoHide: false,
      type: 'warning',
      icon: 'warning'
    });
  }

  const {data: searchData, loading: searchLoading, error: searchError} = useQuery(SEARCH_CHATS, {variables: {user: authState.user.uid, query: `%${chatSearch}%`}, skip: chatSearch === ''})

  if (searchError) {
    showMessage({
      message: "Server Error",
      description: searchError.message,
      type: 'warning',
      autoHide: false,
      icon: 'warning'
    });
  }

  console.log('searchData', searchData)

  //  Selection needs to reset if  one makes a chat and then decides to back
  // out of it

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

      navigation.navigate('Conversation', {
        chatId,
        image,
        name,
        participants,
        numMessages,
        messages,
      });
    },
  });

  if (newChatError) {
    showMessage({
      message: "Cannot Create Chat",
      description: newChatError.message,
      autoHide: false,
      type: 'danger',
      icon: 'danger'
    });
  }

  const newConversation = (participants) => {
    if (participants.length !== 0) {
      newChat({
        variables: {
          participants: graphqlify(
            [
              ...participants.map((participant) => participant.id),
              authState.user.uid,
            ],
            'user',
          ),
          image:
            participants.length === 1
              ? participants[0].image
              : getDefaultImage(),
        },
      });
    }
  };

  const content = (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={ searchData ? searchData.chats : chatsLoading ? [] : chatsError ? [] : chatsData.chats}
      ListEmptyComponent={listEmptyComponent}
      style={styles.messagesList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Messages</Text>
        <IconRight />
      </View>
      <SearchBar
        onChangeText={setChatSearch}
        placeholder="Search for chats..."
        hideBackground={true}
      />
      <View style={{ height: 10 }} />
      {chatsLoading ? <MessagesListPlaceholder /> : content}
      <SearchableFlatList
        ref={newMessageBottomModalRef}
        title={'friends'}
        query={GET_USER_FRIENDS}
        hasImage={true}
        variables={{ userId: authState.user.uid }}
        setSelection={setFriendsSelection}
        aliased={false}
        floatingButtonText={'Next'}
        min={1}
        max={100}
        onPress={newConversation}
        initialSelection={null}
        clearOnClose={true}
        offset={70 + headerHeight}
        floatingButtonOffset={70 + insets.bottom}
      />
    </SafeAreaView>
  );
}

const listEmptyComponent = () => (
  <ImgBanner
    Img={EmptyMessages}
    placeholder="No messages yet"
    spacing={0.15}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: colours.text01,
  },
  messagesList: {
    paddingHorizontal: 4,
    paddingTop: 5,
  },
});
