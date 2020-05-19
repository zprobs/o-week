import React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler';
import Fonts from '../../theme/Fonts';
import {ThemeStatic} from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';

const { FontWeights, FontSizes } = Fonts;
export default function Selection({title}) {

    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Icon name={'chevron-down'} size={30} style={styles.icon}/>

                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 3,
        color: ThemeStatic.white,
        borderColor: ThemeStatic.white,
    },
    title: {
        ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: ThemeStatic.white,
        padding: 15,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        color: ThemeStatic.white,
        paddingRight: 15,
        alignContent: 'center'
    }
});
