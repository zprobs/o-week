import React, { useContext } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import ModalHeader from "./ModalHeader";
import UserCard from "../ReusableComponents/UserCard";
import { Theme } from "../../theme/Colours";
import Images from "../../assets/images";
import ImgBanner from "../ReusableComponents/ImgBanner";
import {useLazyQuery} from '@apollo/react-hooks';
import {GET_USERS_BY_ID} from '../../graphql';

const { colours } = Theme.light;
const window = Dimensions.get("window").height;
const window05 = window * 0.05;

/**
 * List modal of users
 * @param data What is shown in the Flatlist. An array of Strings representing userIds
 * @param type Type = Friends when the component is rendering the users that a user is friends with
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly data?: *, readonly type?: *, readonly viewMode?: *, readonly handle?: *}> & React.RefAttributes<unknown>>}
 */
const UsersBottomModal = React.forwardRef(
  ({  name, data, type }, ref) => {

      const [getUsers, {data : userData, loading, error, called}] = useLazyQuery(GET_USERS_BY_ID, {variables: {_in: data}})

    let heading;
    let subHeading;

    if (type === "Friends") {
      heading = "Friends";
      if (name) {
        subHeading = `People ${name} is friends with`;
      } else {
        subHeading = "People you are friends with";
      }
    }

    console.log(userData);

    const listEmptyComponent = () => (
      <ImgBanner
        img={Images.emptyUsers}
        placeholder="No users found"
        spacing={0.16}
      />
    );

    const renderItem = ({ item }) => {
      const { id, image, name } = item;
      return (
        <UserCard userId={id} image={image} name={name} key={id} style={styles.userCard} />
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
          data: userData ? userData.users : null,
          ListEmptyComponent: listEmptyComponent,
          style: listContainer,
          renderItem: renderItem,
          ListHeaderComponent: header,
            bounces: false
        }}
        onOpen={called ? null : getUsers}
        disableScrollIfPossible={true}

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
      flex: 1
    },
    listItemContainer: {
      width: "106%",
    },
    listContentContainer: {
      alignItems: "center",
      justifyContent: "flex-start",
    },
    userCard: {
        marginVertical: 7,
    }
  });

export default UsersBottomModal;
