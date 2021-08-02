import React from 'react';
import { Image, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { OrientationStackParamList } from '@views/orientation/OrientationStackParamList';
import useStyles from './Gallery.styles';

/**
 * used to show all images in a post. include images in route.params
 */
const Gallery: React.FC = () => {
  const styles = useStyles();
  const route = useRoute<RouteProp<OrientationStackParamList, 'Gallery'>>();
  const { images } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {images.map((img) => (
          <Image source={{ uri: img }} style={styles.image} key={img} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Gallery;
