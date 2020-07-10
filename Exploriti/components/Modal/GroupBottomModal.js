import React, { useContext } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import ModalHeader from "./ModalHeader";
import { Theme } from "../../theme/Colours";
import ImgBanner from "../ReusableComponents/ImgBanner";
import EmptyConnections from '../../assets/svg/empty-connections.svg'
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { GET_USER_GROUPS } from '../../graphql';
import { AuthContext } from '../../context';
import UserCard from '../ReusableComponents/UserCard';

const { colours } = Theme.light;
const window = Dimensions.get("window").height;
const window05 = window * 0.05;

/**
 * List modal of groups
 * @param data What is shown in the Flatlist
 * @param type {string} Type = Member when the component is rendering the groups that a user is a member of
 * @param name {string} The name of the user if it is not currentUser
 * @param onPress {function} optional function to replace navigation
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly data?: *, readonly type?: *, readonly viewMode?: *, readonly handle?: *}> & React.RefAttributes<unknown>>}
 */
const GroupBottomModal = React.forwardRef(
  ({ name, type, userId, onPress }, ref) => {

    const [getGroups, {data, called, loading, error}] = useLazyQuery(GET_USER_GROUPS, {variables: {id: userId }})

    console.log('userID', userId);
    console.log('loading', loading);
    console.log('error', error);
    console.log('data', data);


    let heading;
    let subHeading;

    if (type === "Member") {
      heading = "Groups";
      if (name) {
        subHeading = `Groups ${name} is a member`;
      } else {
        subHeading = "Groups you are a part of";
      }
    }

    const ListEmptyComponent = () => (
      <ImgBanner
        Img={EmptyConnections}
        placeholder="No groups found"
        spacing={0.16}
      />
    );

    const renderItem = ({ item }) => {
      const { id, image, name } = item.group;
      return (
        <UserCard
          groupId={id}
          image={image}
          name={name}
          key={id}
          style={styles.userCard}
          onPress={onPress}
        />
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
          data: data ? data.user.member : null,
          ListEmptyComponent: ListEmptyComponent,
          style: listContainer,
          renderItem: renderItem,
          ListHeaderComponent: header,
          keyExtractor: item => item.group.id
        }}
        onOpen={called ? null : getGroups}
        disableScrollIfPossible={true}
      />
    );
  },
);

const styles = StyleSheet.create({
    container: {
      marginTop: 60,
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
  userCard: {
      marginVertical: 12
  }
  });

export default GroupBottomModal;
