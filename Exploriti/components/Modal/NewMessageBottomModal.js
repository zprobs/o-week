import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import { Theme } from '../../theme/Colours';
import Images from '../../assets/images';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { AuthContext, parseChats, graphqlify } from '../../context';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER_FRIENDS, NEW_CHAT } from '../../graphql';
import SearchableFlatList from './SearchableFlatList';
import { useNavigation } from '@react-navigation/native';


const { colours } = Theme.light;
const window = Dimensions.get('window').height;
const window05 = window * 0.05;

const NewMessageBottomModal = React.forwardRef(({ friends, setData }, ref) => {
  const { authState } = useContext(AuthContext);
  const [friendsSelection, setFriendsSelection] = useState([]);
  const navigation = useNavigation();

  //  Selection needs to reset if  one makes a chat and then decides to back
  // out of it

  const [newChat] = useMutation(NEW_CHAT, {
    onCompleted: ({ createChat }) => {
      const {
        chatId,
        participants,
        image,
        name,
        messages,
        numMessages,
      } = parseChats(createChat, authState.user.uid);

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

  const newConversation = (participants) => {
    const defaultImages = [
      'https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/default1.png?alt=media&token=5a9700a9-d2f4-4ff2-9e2e-b053c884f4fd',
      'https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/default2.png?alt=media&token=9560020e-ca06-47b6-a11c-e26787a3e90d',
      'https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/default3.png?alt=media&token=cfe35641-c453-4859-8dc1-1804554f4111',
      'https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/default4.png?alt=media&token=91af31aa-2b62-4835-a631-7550dd2c05a2',
    ];
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
              : defaultImages[Math.floor(Math.random() * defaultImages.length)],
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
      img={Images.emptyUsers}
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
      cancelButtonText={'Next'}
      onPress={newConversation}
      initialSelection={null}
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
