import React, { useContext } from 'react';
import { StyleSheet, TextInput, Text} from 'react-native';
import  Fonts  from '../theme/Fonts';
import {Theme} from '../theme/Colours';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;


const FormInput = React.forwardRef(({ placeholder, value, onChangeText, multiline, label, error }, ref) => {

    return (
        <>
            <Text style={styles().labelTextStyle}>
                {label}
            </Text>
            <TextInput
                ref={ref}
                autoCapitalize='none'
                style={styles().textStyle}
                activeLineWidth={0}
                placeholder={placeholder}
                placeholderTextColor={colours.text02}
                onChangeText={onChangeText}
                value={value}
                multiline={multiline || false}
                returnKeyType='done'
            />
        </>

    );
});

const styles = () => StyleSheet.create({
    labelTextStyle: {
        ...FontWeights.Regular,
        color: colours.accent,
        fontSize: FontSizes.Label.fontSize,
        marginVertical: 10
    },
    textStyle: {
        ...FontWeights.Light,
        color: colours.text01,
        fontSize: FontSizes.Body.fontSize,
        marginBottom: 15

    }
});

export default FormInput;
