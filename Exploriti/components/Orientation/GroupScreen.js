import React, {useRef} from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions} from 'react-native';
import CircleBackIcon from '../Menu/CircleBackIcon';
import Fonts from '../../theme/Fonts';
import {Theme} from '../../theme/Colours';
import GroupInfoModal from '../Modal/GroupInfoModal';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light
const HEIGHT = Dimensions.get('window').height;

const GroupScreen = () => {

    const modalRef = useRef();

    return (
      <View style={styles.container}>
        <ImageBackground source={{uri: "https://www.mcgill.ca/firstyear/files/firstyear/frosh_2019.jpg"}} style={styles.backgroundImage}>
            <View style={styles.header}>
                <CircleBackIcon />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>My Section</Text>
                </View>
            </View>
        </ImageBackground>
          <GroupInfoModal ref={modalRef}/>
      </View>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: 'blue'
   },
    backgroundImage: {
       width: '100%',
        height: HEIGHT*0.44
    },
    header: {
       paddingHorizontal: 20,
        justifyContent: 'space-around',
        height: 400,
        alignItems: 'flex-start'
    },
    titleContainer: {
       backgroundColor: colours.white,
        height: 52,
        borderRadius: 26,
        paddingHorizontal: 18,
        justifyContent: 'center',


    },
    title: {
        ...FontWeights.Bold,
        ...FontSizes.Heading,
    }


});

export default GroupScreen;
