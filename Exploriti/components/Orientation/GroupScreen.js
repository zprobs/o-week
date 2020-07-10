import React, { useRef } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import CircleBackIcon from '../Menu/CircleBackIcon';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import GroupInfoModal from '../Modal/GroupInfoModal';
import LinearGradient from 'react-native-linear-gradient';
import CircleEditIcon from '../ReusableComponents/CircleEditIcon';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;
const HEIGHT = Dimensions.get('window').height;

/**
 *
 * @param route The navigation route params, should contain an Object group
 * @returns {*}
 * @constructor
 */
const GroupScreen = ({route}) => {

    const modalRef = useRef();
    const {group, isOwner} = route.params

    return (
      <View style={styles.container}>
        <ImageBackground source={{uri: group.image}} style={styles.backgroundImage}>
            <View style={styles.header}>
              <View style={styles.icons}>
                <CircleBackIcon style={styles.circleBackIcon}/>
                {
                  isOwner ? <CircleEditIcon style={styles.circleEditIcon} /> : null
                }

              </View>
                <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}  style={styles.titleContainer}>
                    <Text style={styles.title}>{group.name}</Text>
                </LinearGradient>
            </View>
        </ImageBackground>
          <GroupInfoModal ref={modalRef} groupId={group.id}/>
      </View>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: colours.base
   },
    backgroundImage: {
       width: '100%',
        height: HEIGHT*0.44
    },
    header: {
        justifyContent: 'space-between',
        height: HEIGHT*0.44,
        alignItems: 'flex-start',
    },
  icons: {
     flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
    circleBackIcon: {
      marginTop: 45,
        marginLeft: 20,
    },
  circleEditIcon: {
     marginTop: 45,
    marginRight: 20
  },
    titleContainer: {
        paddingBottom: 48,
        paddingHorizontal: 20,
        paddingTop: 20,
        width: '100%',


    },
    title: {
        ...FontWeights.Bold,
        ...FontSizes.Heading,
        color: colours.white
    }


});

export default GroupScreen;
