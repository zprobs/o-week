import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import useStyles from './RenderImages.styles';

interface Props {
  images: string[];
}

const RenderImages: React.FC<Props> = ({ images }) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const imageComponents = [];
  let i = 0;
  while (i < images.length && i < 3) {
    imageComponents.push(
      <Image key={i} source={{ uri: images[i] }} style={styles.galleryImage} />,
    );
    i += 1;
  }
  if (images.length > 3) {
    imageComponents.push(
      <View style={styles.moreImages} key={4}>
        <Text style={styles.moreImagesText}>{`+${images.length - 3}`}</Text>
      </View>,
    );
  }

  return (
    <TouchableOpacity
      style={styles.gallery}
      onPress={() => navigation.navigate('Gallery', { images })}>
      {imageComponents}
    </TouchableOpacity>
  );
};

export default RenderImages;
