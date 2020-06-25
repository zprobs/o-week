import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts

const DetailedUserCard = ({id, name, image, isLeader }) => {
    return (
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        {isLeader ? (
          <View style={styles.leaderView}>
            <Text style={styles.leaderText}>LEADER</Text>
          </View>
        ) : (
            <Text style={styles.locationText}>Toronto, Canada</Text>
        )}
      </View>
    );

}

const styles = StyleSheet.create({
   container: {
       backgroundColor: colours.base,
       borderRadius: 20,
       shadowRadius: 3,
       shadowColor: '#000',
       shadowOffset: {
           width: 2,
           height: 2
       },
       shadowOpacity: 0.7,
        paddingHorizontal: 12,
       marginHorizontal: 10,
       marginVertical: 10,
       elevation: 3,
       alignItems: 'center'
   },
    image: {
       backgroundColor: colours.placeholder,
        width: 80,
        height: 80,
        borderRadius: 40,
        marginVertical: 10
    },
    name: {
       ...FontSizes.Body,
        ...FontWeights.Bold,
    },
    leaderView: {
       backgroundColor: 'red',
        borderRadius: 11,
        height: 22,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 7
    },
    leaderText: {
       ...FontWeights.Bold,
        ...FontSizes.SubText,
        color: colours.white
    },
    locationText: {
       ...FontSizes.SubText,
        ...FontWeights.Regular,
    }
});

export default DetailedUserCard;
