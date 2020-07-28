import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { Theme } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import Icon from 'react-native-vector-icons/EvilIcons';
import MessageCard from './MessageCard';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { GET_CHATS, GET_USER_FRIENDS, NEW_CHAT } from '../../graphql';
import EmptyMessages from '../../assets/svg/empty-messages.svg';
import { AuthContext, getDefaultImage, graphqlify } from '../../context';
import SearchableFlatList from '../Modal/SearchableFlatList';
import { useNavigation } from '@react-navigation/native';
const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * MessagesList shows all the current users conversations
 * @returns {*}
 * @constructor
 */
export default function MessagesList() {
  const [chatSearch, setChatSearch] = useState();
  const [friendsSelection, setFriendsSelection] = useState([]);
  const navigation = useNavigation();
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
      messagesAggregate,
    } = item;

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



  //  Selection needs to reset if  one makes a chat and then decides to back
  // out of it

  const [newChat] = useMutation(NEW_CHAT, {
    onCompleted: ({ createChat }) => {
      const {
        _id: chatId,
        participants,
        messages,
        image,
        name: chatName,
        messagesAggregate
      } = createChat;

      const name = chatName || participants
        .filter((participant) => participant._id !== authState.user.uid)
        .map((participant) => participant.name).join(', ');

      const numMessages = messagesAggregate.aggregate.count;

      navigation.navigate("Conversation", {
        chatId,
        image,
        name,
        participants,
        numMessages,
        messages,
      });
    },
  });

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
              : getDefaultImage()
        },
      });
    }
  };

  const content = (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={chatsLoading ? [] : chatsError ? [] : chatsData.chats}
      ListEmptyComponent={listEmptyComponent}
      style={styles.messagesList}
      spacing={20}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
        <Text  style={styles.title}>Messages</Text>
          <IconRight />
        </View>
        <SearchBar
          value={chatSearch}
          onChangeText={setChatSearch}
          placeholder="Search for chats..."
          hideBackground={true}
        />
        <View style={{height: 10}} />
        {content}
        <SearchableFlatList
          ref={newMessageBottomModalRef}
          title={'friends'}
          query={GET_USER_FRIENDS}
          hasImage={true}
          variables={{ userId: authState.user.uid }}
          setSelection={setFriendsSelection}
          aliased={false}
          floatingButtonText={"Next"}
          min={1}
          onPress={newConversation}
          initialSelection={null}
          clearOnClose={true}
        />
      </SafeAreaView>
  );
}

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
    flex: 1,
    paddingHorizontal: 4,
    paddingTop: 5,
  },
});
