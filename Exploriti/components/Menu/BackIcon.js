import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";

export const BackIcon = ({mainNavigation}) => {
    return (
        <Icon
            name="chevron-left"
            size={38}
            color="#000"
            onPress={() => mainNavigation.goBack()}
        />
    );
};
