import React, {useContext} from 'react';
import { Text, View, StyleSheet, FlatList } from "react-native";
import EmptyNotifications from '../../assets/svg/empty-notifications.svg';
import ImgBanner from '../ReusableComponents/ImgBanner';



export default function NotificationsList() {
    return (
        <View style={styles.container}>
            <FlatList
                ListEmptyComponent={listEmptyComponent}
                data={null}
                />
        </View>
    );
}

const listEmptyComponent = () => (
    <ImgBanner
        Img={EmptyNotifications}
        placeholder="No notifications yet"
         spacing={0.15}
    />
);

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: 'white'
   }
});
