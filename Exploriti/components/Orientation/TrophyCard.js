import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Theme } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import {useNavigation} from '@react-navigation/native';
import Trophy from '../../assets/svg/trophy.svg'
import LinearGradient from 'react-native-linear-gradient';


const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 *
 * @param id
 * @param name {string}
 * @returns {*}
 * @constructor
 */
const TrophyCard = ({ id, name,  }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity  style={styles.container}>
            <View style={styles.shadow}>
                <LinearGradient colors={['rgba(247,190,98,1)', 'rgba(244,167,6,1)']} style={styles.image}>
                    <Trophy width={60} height={60} fill={'white'} />
                </LinearGradient>
            </View>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 10,
        overflow: 'visible'
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 44,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow: {
        shadowColor: "rgba(204, 204, 204, 0.5)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 8,
        shadowOpacity: 1
    },
    name: {
        ...FontSizes.Caption,
        ...FontWeights.Bold,
        color: colours.text02,
    },
});

export default TrophyCard;
