import React, { useContext } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import ModalHeader from "./ModalHeader";
import UserCard from "./UserCard";
import { Theme } from "../../theme/Colours";
import Images from "../../assets/images";
import ImgBanner from "../ReusableComponents/ImgBanner";

const { colours } = Theme.light;
const window = Dimensions.get("window").height;
const window05 = window * 0.05;


const NewMessageBottomModal = React.forwardRef(
    ({ }, ref) => {

        return (
            <Modalize
                ref={ref}
            >
                <ModalHeader heading={"Send a new Message"} subHeading={"To a new USer"} />
            </Modalize>
        );
    },
);

export default NewMessageBottomModal;
