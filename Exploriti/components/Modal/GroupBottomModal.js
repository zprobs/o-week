import React, { useContext } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import ModalHeader from "./ModalHeader";
import { Theme } from "../../theme/Colours";
import ImgBanner from "../ReusableComponents/ImgBanner";
import Images from "../../assets/images";

const { colours } = Theme.light;
const window = Dimensions.get("window").height;
const window05 = window * 0.05;

/**
 * List modal of groups
 * @param data What is shown in the Flatlist
 * @param type {string} Type = Member when the component is rendering the groups that a user is a member of
 * @param name {string} The name of the user if it is not currentUser
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly data?: *, readonly type?: *, readonly viewMode?: *, readonly handle?: *}> & React.RefAttributes<unknown>>}
 */
const GroupBottomModal = React.forwardRef(
  ({ name, data, type }, ref) => {
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
        img={Images.emptyUsers}
        placeholder="No groups found"
        spacing={0.16}
      />
    );

    const renderItem = ({ item }) => {
      return <Text>Group Card</Text>;
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
          ListEmptyComponent: ListEmptyComponent,
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

export default GroupBottomModal;
