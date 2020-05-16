import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Fonts from '../../theme/Fonts';
import {Theme} from '../../theme/Colours';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light;

export default function TextLine({style, label, icon, placeholder, color, type }) {

    const keyboardType = type=='email' ? 'email-address' : 'visible-password';
    const secureTextEntry = type=='email' ? false : true;

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            ...style

        },
        icons: {
            height: 20,
            flexDirection: 'column-reverse'

        },
        label: {
            ...FontWeights.Bold,
            ...FontSizes.Caption,
            color: colours.white,
        },
        textBox: {
            ...FontWeights.Light,
            ...FontSizes.Body,
            color: color,
            marginLeft: 5,
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                <Icon size={28} name={icon} color={color}/>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TextInput  placeholder={placeholder} placeholderTextColor={'#f1f1f1'} style={styles.textBox} selectionColor={color} textContentType={type} autoCompleteType={type} keyboardType={keyboardType} secureTextEntry={secureTextEntry} />

        </View>
    );



}

