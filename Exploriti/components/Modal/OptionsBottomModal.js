import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {Theme, ThemeStatic} from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';
import ModalHeader from './ModalHeader';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light;

/**
 * Modal for displaying extra options. Currently setup for user options
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly selectedData?: *, readonly setData?: *, readonly title?: *, readonly data?: *}> & React.RefAttributes<unknown>>}
 */
const OptionsBottomModal = React.forwardRef(({data, title, selectedData, setData}, ref) => {


    return (
        <Modalize
            ref={ref}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}
            modalStyle={styles.container}
            adjustToContentHeight>
            <ModalHeader
                heading='Options'
                subHeading='Tell us what you think'
            />
            <View style={styles.content}>
                <Option
                    label='Block'
                    iconName='close-o'
                    color={ThemeStatic.delete}
                    onPress={console.log('Blocked')}
                />
                <Option
                    label='Report'
                    iconName='tag'
                    color={ThemeStatic.delete}
                    onPress={console.log('Reported')}
                />
                <Option
                    label='Share Profile'
                    iconName={Platform.select({ios: 'share-apple', android: 'share-google'})}
                    color={ThemeStatic.black}
                    onPress={console.log('Share')}
                />
            </View>
        </Modalize >
    );
});

const Option = ({ label, iconName, onPress, children, color }) => {

    if (children)
        return (
            <View style={styles.optionContainer}>
                <Icon name={iconName} size={20} color={color || colours.text01} />
                {children}
            </View>
        );

    return (
        <TouchableOpacity style={styles.optionContainer} activeOpacity={0.9} onPress={onPress}>
            <Icon name={iconName} size={20} color={color || colours.text01} />
            <Text style={[styles.label, { color: color || colours.text01 }]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles =  StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colours.base
    },
    content: {
        paddingTop: 20,
        paddingBottom: 16,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8
    },
    label: {
        ...FontWeights.Light,
        ...FontSizes.Body,
        marginLeft: 10
    }
});

export default OptionsBottomModal
