import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native'
import images from '../../assets/images';

export default function Login() {
    return (
            <ImageBackground source={images.login} style={styles.backgroundImage}/>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100,
        height: 100,
    },

});
