import React, { useContext } from "react";
import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Modalize } from "react-native-modalize";
import ModalHeader from "./ModalHeader";
import UserCard from "../ReusableComponents/UserCard";
import { Theme } from "../../theme/Colours";
import Images from "../../assets/images";
import ImgBanner from "../ReusableComponents/ImgBanner";
import {AuthContext} from '../../context';
import {useLazyQuery, useQuery} from '@apollo/react-hooks';
import {GET_USER_FRIENDS} from '../../graphql';

const { colours } = Theme.light;
const window = Dimensions.get("window").height;
const window05 = window * 0.05;


const NewMessageBottomModal = React.forwardRef(
    ({ friends, setData }, ref) => {

        const {authState} = useContext(AuthContext);

        const [getFriends, {loading, data, error, called}] = useLazyQuery(GET_USER_FRIENDS, {variables: {userId: authState.user.uid }})

        const renderItem = ({item}) => {
            console.log(item);
            return (
                <TouchableOpacity onPress={() => {setData(item); setTimeout(()=>ref.current.close(), 300) }} style={{flexDirection: 'row'}}>
                    <RadioButton selected={isSelected}/>
                    <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
            );
        };


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
                    data: friends,
                    ListEmptyComponent: listEmptyComponent,
                    ListHeaderComponent: header,
                    renderItem: renderItem
                }}
                onOpen={called ? null : getFriends}
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
