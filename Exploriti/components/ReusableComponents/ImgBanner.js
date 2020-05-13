import React, { useContext } from 'react';
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import {Theme} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts;
const window = Dimensions.get('window').height;

const ImgBanner = ({ img, placeholder, spacing, textStyle }) => {

    const space = spacing * window;

    return (
        <View style={[styles().container, { marginTop: space || undefined }]}>
            <Image source={img}/>
            <Text style={[styles().placeholderText, textStyle]}>{placeholder}</Text>
        </View>
    );
};

const styles = () => StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    placeholderText: {
        ...FontWeights.Light,
        ...FontSizes.Label,
        color: colours.text02,
        marginTop: 40
    }
});

export default ImgBanner;
