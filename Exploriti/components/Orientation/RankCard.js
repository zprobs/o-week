import React from 'react';
import {StyleSheet, View, Dimensions, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../theme/Fonts';
import {Theme} from '../../theme/Colours';
import Icon from 'react-native-vector-icons/Feather';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light;
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const RankCard = ({style, onPress, rank}) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>

        <LinearGradient colors={['rgb(247, 190, 100)', 'rgb(244, 166, 4)']} style={styles.container}>
            <View style={styles.ring} />
            <View style={styles.row}>
                <Text style={styles.place}>{rank}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 22}}>
                        <Text style={styles.label}>Team Tag</Text>
                        <Text style={styles.text}>Broncos</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Points</Text>
                        <Text style={styles.text}>27, 098</Text>
                    </View>
                </View>
            </View>
            <View style={styles.moreInfo}>
                <Text style={styles.moreInfoText}>MORE INFO</Text>
                <Icon name={'chevron-right'} color={colours.white} size={16}/>
            </View>
        </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        overflow: 'hidden',
        height: HEIGHT*0.2

    },
    ring: {
        position: 'absolute',
        top: -30,
        left: -100,
        height: '130%',
        width: '70%',
        borderRadius: WIDTH*0.7 ,
        borderWidth: 18,
        borderColor: colours.white,
        borderStyle: 'solid'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center'
    },
    place: {
        ...FontSizes.SuperHeading,
        ...FontWeights.Bold,
        color: colours.white,
    },
    label: {
        ...FontWeights.Bold,
        ...FontSizes.Body,
        color: colours.white,
        opacity: 0.7
    },
    text: {
        ...FontSizes.Label,
        ...FontWeights.Bold,
        color: colours.white,

    },
    moreInfo: {
        flexDirection: 'row',
        position: 'absolute',
        right: 20,
        bottom: 20,

    },
    moreInfoText: {
        ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: colours.white,
        marginHorizontal: 12
    }

});

export default RankCard;
