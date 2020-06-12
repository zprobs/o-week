import React from 'react';
import { StyleSheet } from 'react-native';
import { Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/EvilIcons';
import {ThemeStatic} from '../../theme/Colours';

const CustomSend = sendProps => (
    <Send
        {...sendProps}
        containerStyle={styles.container}>
        <Icon
            name='sc-telegram'
            size={20}
            color={ThemeStatic.accent}
        />
    </Send>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    }
});

export default CustomSend;
