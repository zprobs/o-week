import React, { useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import  Fonts  from '../theme/Fonts';
import {Theme} from '../theme/Colours';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;


const FormInput = React.forwardRef(({ placeholder, value, onChangeText, multiline, error }, ref) => {

    return (
        <TextInput
            ref={ref}
            autoCapitalize='none'
            style={styles.textStyle}
            activeLineWidth={0}
            placeholder={placeholder}
            placeholderTextColor={colours.text02}
            onChangeText={onChangeText}
            value={value}
            multiline={multiline || false}
        />
    );
});

const styles = () => StyleSheet.create({
    labelTextStyle: {
        ...FontWeights.Regular
    },
    textStyle: {
        ...FontWeights.Light,
        color: colours.text01,
        tintColor: colours.accent,
        fontSize: FontSizes.Body.fontSize,
        lineWidth: 0,


    }
});

export default FormInput;
