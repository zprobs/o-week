import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {ThemeStatic} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';

const {FontWeights} = Fonts

/**
 *
 * @param style
 * @returns {*}
 * @constructor
 */
const UserCountPreview = ({style}) => {
    return (
      <View style={[styles.container, style]}>
          <View style={styles.numberView}>
              <Text style={styles.numberText}>9+</Text>
          </View>
          <View style={styles.imageContainer}>
              <Image source={{uri: "https://www.mainewomensnetwork.com/Resources/Pictures/vicki%20aqua%20headshot-smallmwn.jpg"}} style={{...styles.image, left: -5, zIndex: 3}}/>
              <Image source={{uri: "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"}} style={{...styles.image, left: 15, zIndex: 2}}/>
              <Image source={{uri: "https://miro.medium.com/max/3072/1*o-UCEnQ3VRCrHjI8cx4JBQ.jpeg"}} style={{...styles.image, left: 35, zIndex: 1}}/>
          </View>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberView: {
    backgroundColor: ThemeStatic.white,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },
  numberText: {
    ...FontWeights.Bold,
    paddingHorizontal: 5,
  },
  imageContainer: {
    width: 65,
    height: 30,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    position: "absolute",
  },
});

export default UserCountPreview;
