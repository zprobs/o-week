import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Fonts from '../theme/Fonts';
import {ThemeStatic} from '../theme/Colours';

const { FontWeights, FontSizes } = Fonts;

const Button = ({ Icon, label, onPress, loading, containerStyle, labelStyle }) => {

    let content = <Text>Loading...</Text>
    if (!loading) content = (
        <>
            {Icon && <Icon />}
            <Text style={[styles.label, labelStyle]}>{label}</Text>
        </>
    );

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.container, containerStyle]}>
            {content}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 40,
        backgroundColor: ThemeStatic.accent
    },
    label: {
        ...FontWeights.Light,
        ...FontSizes.Body,
        marginLeft: 5,
        color: ThemeStatic.white
    }
});

export default Button;
