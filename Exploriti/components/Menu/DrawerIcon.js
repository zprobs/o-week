import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';

/**
 * Hamburger menu icon for the top left of Home Screen
 * @param navigate The reference to Drawer Navigation which it opens onPress
 * @returns react-native-vector-icons menu icon
 */
export const DrawerIcon = (props) => {
    const {toggleDrawer} = props;
    return(
        <Icon
            name='navicon'
            size={30}
            color='#000'
            margin='0px 00px 0px 100px'
            onPress={() => toggleDrawer() }
        />

    );
};
