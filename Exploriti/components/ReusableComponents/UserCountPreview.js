import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';

const { FontWeights, FontSizes } = Fonts;

/**
 * A small decorator to display how many users are involved in something
 * @param style
 * @param count {int} The amount of users involved
 * @param images {[String]}
 * @returns {*}
 * @constructor
 */
const UserCountPreview = ({ style, count, images }) => {
  if (!images) return null;

  let number = 0;
  if (count > 3) {
    number = count - 3;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.numberView}>
        {number ? <Text style={styles.numberText}>{'+' + number}</Text> : null}
      </View>
      <View style={styles.imageContainer}>
        {images.map((img, index) => (
          <Image
            source={{
              uri: img,
            }}
            style={{ ...styles.image, left: index * 17 - 5, zIndex: 3 - index }}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberView: {
    backgroundColor: ThemeStatic.white,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    shadowOpacity: 0.6,
    elevation: 3,
  },
  numberText: {
    ...FontWeights.Regular,
    ...FontSizes.SubText,
    paddingHorizontal: 5,
  },
  imageContainer: {
    width: 53,
    height: 24,
  },
  image: {
    height: 24,
    width: 24,
    borderRadius: 12,
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 0.5,
  },
});

export default UserCountPreview;
