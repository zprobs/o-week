import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts

const HorizontalUserCard = ({id, name, image, isLeader }) => {
    return (
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>
    );

}

const styles = StyleSheet.create({
   container: {
       backgroundColor: colours.base,
       alignItems: 'center',
       marginHorizontal: 10,
   },
    image: {
       backgroundColor: colours.placeholder,
        width: 80,
        height: 80,
        borderRadius: 40,
        marginVertical: 10
    },
    name: {
       ...FontSizes.Caption,
        ...FontWeights.Bold,
        color: colours.text02
    },
});

export default HorizontalUserCard;
