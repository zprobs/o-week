import React, { useContext } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import ModalHeader from "./ModalHeader";
import UserCard from "../ReusableComponents/UserCard";
import { Theme } from "../../theme/Colours";
import Images from "../../assets/images";
import ImgBanner from "../ReusableComponents/ImgBanner";

const { colours } = Theme.light;
const window = Dimensions.get("window").height;
const window05 = window * 0.05;

/**
 * List modal of users
 * @param viewMode A boolean for determining what to render. True = other user; False = current user
 * @param data What is shown in the Flatlist
 * @param type Type = Friends when the component is rendering the users that a user is friends with
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly data?: *, readonly type?: *, readonly viewMode?: *, readonly handle?: *}> & React.RefAttributes<unknown>>}
 */
const UsersBottomModal = React.forwardRef(
  ({ viewMode, handle, data, type }, ref) => {
      console.log('a', data);
    let heading;
    let subHeading;

    if (type === "Friends") {
      heading = "Friends";
      if (viewMode) {
        subHeading = `People ${handle} is friends with`;
      } else {
        subHeading = "People you are friends with";
      }
    }

    const listEmptyComponent = () => (
      <ImgBanner
        img={Images.emptyUsers}
        placeholder="No users found"
        spacing={0.16}
      />
    );

    const renderItem = ({ item }) => {
      const { id, avatar, handle, name } = item;
      return (
        <UserCard userId={id} avatar={avatar} handle={handle} name={name} />
      );
    };

    const header = () => (
      <ModalHeader heading={heading} subHeading={subHeading} />
    );
    const listContainer = styles.listContainer;

    return (
      <Modalize
        ref={ref}
        modalStyle={styles.container}
        flatListProps={{
          showsVerticalScrollIndicator: false,
          data: data,
          ListEmptyComponent: listEmptyComponent,
          style: listContainer,
          renderItem: renderItem,
          ListHeaderComponent: header,
        }}
      />
    );
  },
);

const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      padding: 20,
      backgroundColor: colours.base,
    },
    content: {
      flex: 1,
      paddingBottom: window05,
    },
    listContainer: {
      flex: 1,
    },
    listItemContainer: {
      width: "106%",
    },
    listContentContainer: {
      alignItems: "center",
      justifyContent: "flex-start",
    },
  });

export default UsersBottomModal;
