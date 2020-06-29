import React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler';
import Fonts from '../../theme/Fonts';
import {ThemeStatic} from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';

const { FontWeights, FontSizes } = Fonts;

/**
 * Selection is a box used to trigger the open of a bottom modal to select some data
 * @param title {string}
 * @param onPress
 * @param accent {boolean} if true background color is accented else white
 * @returns {*}
 * @constructor
 */
export default function Selection({title, onPress, accent}) {

    const styles = StyleSheet.create({
        container: {
            borderRadius: 8,
            borderWidth: 3,
            color: accent ? ThemeStatic.accent : ThemeStatic.white,
            borderColor: accent ? ThemeStatic.accent : ThemeStatic.white,
        },
        title: {
            ...FontWeights.Bold,
            ...FontSizes.Caption,
            color: accent ? ThemeStatic.accent : ThemeStatic.white,
            padding: 15,
        },
        content: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        icon: {
            color: accent ? ThemeStatic.accent : ThemeStatic.white,
            paddingRight: 15,
            alignContent: 'center'
        }
    });

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Icon name={'chevron-down'} size={30} style={styles.icon}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}


