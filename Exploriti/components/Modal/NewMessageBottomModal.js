import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Dimensions,

} from 'react-native';
import ModalHeader from './ModalHeader';
import { Theme } from '../../theme/Colours';
import EmptyMessages from '../../assets/svg/empty-messages.svg'
import ImgBanner from '../ReusableComponents/ImgBanner';
import {AuthContext, graphqlify, getDefaultImage} from '../../context';
import { useMutation } from '@apollo/react-hooks';
import { GET_USER_FRIENDS, NEW_CHAT } from '../../graphql';
import SearchableFlatList from './SearchableFlatList';
import { useNavigation } from '@react-navigation/native';


const { colours } = Theme.light;
const NewMessageBottomModal = React.forwardRef(({ friends, setData }, ref) => {
  const { authState } = useContext(AuthContext);
  const [friendsSelection, setFriendsSelection] = useState([]);
  const navigation = useNavigation();

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

  // const renderItem = ({ item }) => {
  // return (
  //   <TouchableOpacity
  //     onPress={() => {
  //       setData(item);
  //       setTimeout(() => ref.current.close(), 300);
  //     }}
  //     style={{ flexDirection: "row" }}>
  //     <RadioButton selected={isSelected} />
  //     <Text style={styles.text}>{item}</Text>
  //   </TouchableOpacity>
  // );
  // };

  const listEmptyComponent = () => (
    <ImgBanner
      Img={EmptyMessages}
      placeholder="No users found"
      spacing={0.16}
    />
  );

  const header = () => (
    <ModalHeader
      heading={"Let's talk"}
      subHeading={'Connect with your friends'}
    />
  );

  return (
    // <Modalize
    //   ref={ref}
    //   modalStyle={styles.container}
    //   flatListProps={{
    //     showsVerticalScrollIndicator: false,
    //     data: friends,
    //     ListEmptyComponent: listEmptyComponent,
    //     ListHeaderComponent: header,
    //     renderItem: renderItem,
    //   }}
    //   onOpen={called ? null : getFriends}
    // />
    <SearchableFlatList
      ref={ref}
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
  );
});

export default NewMessageBottomModal;

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height * 0.12,
    padding: 20,
    paddingTop: 0,
    backgroundColor: colours.base,
  },
});
