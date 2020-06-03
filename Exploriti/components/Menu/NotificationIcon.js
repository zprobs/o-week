import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";

/**
 * Notification menu icon for the top right of Home Screen
 * @param navigate The reference to Drawer Navigation which it opens onPress
 * @returns react-native-vector-icons menu icon
 */
export const NotificationIcon = ({mainNavigation}) => {
    return (
        <Icon
            style={{marginRight: 5}}
            name="comment"
            size={38}
            color="#000"
            onPress={()=>mainNavigation.navigate('Messages')}
        />
    );
};
