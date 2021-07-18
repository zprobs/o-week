import React from 'react';
import { View, Text, Image, ViewStyle, StyleProp } from 'react-native';
import useStyles from './UserCountPreview.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  count: number;
  images: string[];
}

/**
 * A small decorator to display how many users are involved in something
 */
const UserCountPreview: React.FC<Props> = ({ style, count, images }) => {
  const styles = useStyles();
  let number = 0;
  if (count > 3) {
    number = count - 3;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.numberView}>
        {number ? <Text style={styles.numberText}>{`+ ${number}`}</Text> : null}
      </View>
      <View style={styles.imageContainer}>
        {images.map((img, index) => (
          <Image
            source={{
              uri: img,
            }}
            style={{ ...styles.image, left: index * 17 - 5, zIndex: 3 - index }}
            key={img}
          />
        ))}
      </View>
    </View>
  );
};

export default UserCountPreview;
