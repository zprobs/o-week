import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {ThemeStatic} from '../../theme/Colours';


const DeleteCardRightActions = ({ progress, dragX, onDelete, style }) => {
    const translateX = dragX.interpolate({
        inputRange: [0, 80, 100, 101],
        outputRange: [-10, 0, 0, 1]
    });

    const slideEffect = { opacity: progress, transform: [{ translateX }] };

    return (
        <Animated.View style={[styles.container, slideEffect, style]}>
            <Icon
                name='trash'
                onPress={onDelete}
                color={ThemeStatic.white}
                size={24}
                style={styles.delete}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ThemeStatic.delete,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    delete: {
        width: 50,
        textAlign: 'center'
    }
});

export default DeleteCardRightActions;
