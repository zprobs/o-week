import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

const ChatHeaderImage = ({ image, onPress }) => (
    <TouchableOpacity style={styles.container} activeOpacity={0.90} onPress={onPress}>
        <Image source={{uri: image}} style={styles.avatarImage} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        height: 36,
        width: 36,
        overflow: 'hidden',
        marginHorizontal: 10,
        borderRadius: 20
    },
    avatarImage: {
        flex: 1
    }
});

export default ChatHeaderImage;
