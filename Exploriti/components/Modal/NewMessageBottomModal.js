import React, { useContext } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Modalize } from "react-native-modalize";
import ModalHeader from "./ModalHeader";
import UserCard from "../ReusableComponents/UserCard";
import { Theme } from "../../theme/Colours";
import Images from "../../assets/images";
import ImgBanner from "../ReusableComponents/ImgBanner";

const { colours } = Theme.light;
const window = Dimensions.get("window").height;
const window05 = window * 0.05;


const NewMessageBottomModal = React.forwardRef(
    ({ }, ref) => {

        const listEmptyComponent = () => (
            <ImgBanner
                img={Images.emptyUsers}
                placeholder="No users found"
                spacing={0.16}
            />
        );

        const header = () => (
            <ModalHeader heading={"Let's talk"} subHeading={"Connect with your friends"} />
        );

        return (
            <Modalize
                ref={ref}
                modalStyle={styles.container}
                flatListProps={{
                    showsVerticalScrollIndicator: false,
                    data: null,
                    ListEmptyComponent: listEmptyComponent,
                    ListHeaderComponent: header,
                }}
            >
            </Modalize>
        );
    },
);

export default NewMessageBottomModal;

const styles = StyleSheet.create({
    container: {
        marginTop: Dimensions.get('window').height*0.12,
        padding: 20,
        paddingTop: 0,
        backgroundColor: colours.base,
    }
});
