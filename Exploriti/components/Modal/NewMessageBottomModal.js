import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Modalize } from "react-native-modalize";
import ModalHeader from "./ModalHeader";
import UserCard from "../ReusableComponents/UserCard";
import { Theme } from "../../theme/Colours";
import Images from "../../assets/images";
import ImgBanner from "../ReusableComponents/ImgBanner";
import { AuthContext, parseChats, graphqlify } from "../../context";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USER_FRIENDS, NEW_CHAT } from "../../graphql";
import SearchableFlatList from "./SearchableFlatList";
import { useNavigation } from "@react-navigation/native";

const { colours } = Theme.light;
const window = Dimensions.get("window").height;
const window05 = window * 0.05;

const NewMessageBottomModal = React.forwardRef(({ friends, setData }, ref) => {
  const { authState } = useContext(AuthContext);
  const [friendsSelection, setFriendsSelection] = useState([]);
  const navigation = useNavigation();

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

  const newConversation = () => {
    // navigate tp "Conversation page"
    // useMutation for newConversation
    // graphqlify(friendsSelection, "user");
    const result = newChat({
      variables: {
        participants: graphqlify(friendsSelection, "user"),
      },
    });
    console.log(result);
  };

  const renderItem = ({ item }) => {
    console.log(item);
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
  };

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
      subHeading={"Connect with your friends"}
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
      title={"friends"}
      query={GET_USER_FRIENDS}
      variables={{ userId: authState.user.uid }}
      //   setData={setFriendsData}
      setSelection={setFriendsSelection}
      aliased={false}
      cancelButtonText={"Next"}
      onPress={newConversation}
    />
  );
});

export default NewMessageBottomModal;

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get("window").height * 0.12,
    padding: 20,
    paddingTop: 0,
    backgroundColor: colours.base,
  },
});
