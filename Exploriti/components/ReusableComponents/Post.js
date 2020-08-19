import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/Feather';
import { linkError } from './SocialMediaIcons';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * Used in Group Feeds
 * @param item {object} an instance of post
 * @param index {int} the order in the list
 * @returns {JSX.Element}
 * @constructor
 */
const Post = ({ item, index }) => {
  const isLeft = index % 2 === 0;

  const containerBorderRadius = {
    borderBottomRightRadius: isLeft ? 15 : 0,
    borderTopRightRadius: isLeft ? 15 : 0,
    borderBottomLeftRadius: isLeft ? 0 : 15,
    borderTopLeftRadius: isLeft ? 0 : 15,
    marginRight: isLeft ? 25 : 0,
    paddingLeft: isLeft ? 25 : 0,
    marginLeft: isLeft ? 0 : 25,
    paddingRight: isLeft ? 0 : 25,
  };

  const images = [
    'https://i5.walmartimages.com/asr/a88dd17b-3897-403e-a314-dc2ae3e61608_1.eaa5d834ffadc9a21464041fb54ac156.jpeg',
    'https://www.twoinchbrush.com/images/painting215.png',
    'https://c4.wallpaperflare.com/wallpaper/470/96/902/lake-water-wallpaper-preview.jpg',
    "https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg",
    "https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg",
    "https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg",
    "https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg",

  ];

  const links = [];

  const hasContent = images.length !== 0 || links.length !== 0;

  const renderImages = () => {
    var imageComponents = [];
    let i = 0;
    while (i < images.length && i < 3) {
      imageComponents.push(
        <Image
          key={i}
          source={{ uri: images[i] }}
          style={styles.galleryImage}
        />,
      );
      i++;
    }
    if (images.length > 3) {
      imageComponents.push(
        <View
          style={[
            styles.galleryImage,
            { backgroundColor: colours.text02, justifyContent: 'center' },
          ]}>
          <Text style={styles.moreImagesText}>{`+${images.length - 3}`}</Text>
        </View>,
      );
    }

    return <View style={styles.gallery}>{imageComponents}</View>;
  };

  console.log(renderImages());

  return (
    <View style={{ ...styles.container, ...containerBorderRadius }}>
      <View style={styles.header}>
        <View style={styles.user}>
          <Image
            source={{
              uri:
                'data:image/png;base64,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',
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.name}>Max</Text>
            <Text style={styles.time}>12m ago</Text>
          </View>
        </View>
        <Icon color={ThemeStatic.gold} name={'message-square'} size={26} />
      </View>
      <Text numberOfLines={hasContent ? 2 : 4} style={styles.body}>
        Contrary to popoular belief \I can type treallt reallt fast. so fast in
        fact that it exceeds my typing ability for handrwriting. Zoom zoom
        little one.
      </Text>
      {hasContent ? (
        <View>{images.length > 0 ? renderImages() : <View></View>}</View>
      ) : null}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 205,
    backgroundColor: ThemeStatic.placeholder,
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 15,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 15,
  },
  name: {
    ...FontSizes.Body,
    ...FontWeights.Bold,
    color: colours.text03,
  },
  time: {
    ...FontWeights.Bold,
    ...FontSizes.SubText,
    color: ThemeStatic.gold,
  },
  body: {
    ...FontSizes.Body,
    ...FontWeights.Bold,
    color: colours.text02,
    lineHeight: 21,
    marginBottom: 8,
    marginTop: 12,
    marginHorizontal: 14,
  },
  gallery: {
    flexDirection: 'row',
    marginVertical: 7,
    marginHorizontal: 14,
  },
  galleryImage: {
    height: 52,
    width: 52,
    borderRadius: 8,
    marginRight: 12,
  },
  moreImagesText: {
    ...FontWeights.Regular,
    ...FontSizes.Label,
    color: ThemeStatic.white,
    alignSelf: 'center',
  },
});
