import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import {useNavigation} from '@react-navigation/native';

/**
 * Messages menu icon for the top right of Home Screen
 * @param navigate The reference to Drawer Navigation which it opens onPress
 * @returns react-native-vector-icons menu icon
 */
export const MessagesIcon = () => {
    const navigation = useNavigation();
    return (
        <Icon
            style={{marginRight: 5}}
            name="comment"
            size={38}
            color="#000"
            onPress={()=>navigation.navigate('Messages')}
        />
    );
};
