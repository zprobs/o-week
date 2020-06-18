import React, {useContext} from 'react';
import { Text, View, StyleSheet, FlatList } from "react-native";
import images from '../../assets/images';
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
        img={images.emptyNotifications}
        placeholder="No notifications yet"
         spacing={0.32}
    />
);

const styles = StyleSheet.create({
   container: {
       flex: 1
   }
});
