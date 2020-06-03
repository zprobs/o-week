import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";

export const CloseIcon = ({mainNavigation}) => {
    return (
        <Icon
            name="close"
            size={38}
            color="#000"
            onPress={() => mainNavigation.navigate('HomeScreen')}
        />
    );
};
