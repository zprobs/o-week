import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/Feather';
import { linkError } from './SocialMediaIcons';
import { getHostnameFromRegex } from '../../context';

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

  // const images = [
  //   'https://i5.walmartimages.com/asr/a88dd17b-3897-403e-a314-dc2ae3e61608_1.eaa5d834ffadc9a21464041fb54ac156.jpeg',
  //   'https://www.twoinchbrush.com/images/painting215.png',
  //   'https://c4.wallpaperflare.com/wallpaper/470/96/902/lake-water-wallpaper-preview.jpg',
  //   "https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg",
  //   "https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg",
  //   "https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg",
  //   "https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg",
  //
  // ];

  const images = [];

  const link = "https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg"


  const hasContent = images.length !== 0 || link;

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
          ]}
          key={4}
        >
          <Text style={styles.moreImagesText}>{`+${images.length - 3}`}</Text>
        </View>,
      );
    }

    return <View style={styles.gallery}>{imageComponents}</View>;
  };

  const renderLink = () => {
   const hostname = getHostnameFromRegex(link);

    return (
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>{hostname ? hostname : 'External Link'}</Text>
          <Icon size={20} color={ThemeStatic.gold} name={'chevron-right'}/>
        </View>
    )
  }

  console.log(renderImages());

  return (
    <View style={{ ...styles.container, ...containerBorderRadius }}>
      <View style={styles.header}>
        <View style={styles.user}>
          <Image
            source={{
              uri:
                'https://www.twoinchbrush.com/images/fanpaintings/fanpainting4294.jpg',
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
      <Text numberOfLines={hasContent ? (images.length > 0 ? 2 : 3) : 5} style={styles.body}>
        Contrary to popoular belief \I can type treallt reallt fast. so fast in
        fact that it exceeds my typing ability for handrwriting. Zoom zoom
        little one. Extra linkes just to fill in the spacesssssss ss hello helll brons basfd
      </Text>
      {hasContent ? (
        <View>{images.length > 0 ? renderImages() : renderLink()}</View>
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
    paddingHorizontal: 15,
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
    fontSize: 18,
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
    marginHorizontal: 15,
  },
  gallery: {
    flexDirection: 'row',
    marginVertical: 7,
    marginHorizontal: 15,
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
  linkContainer: {
    height: 30,
    borderRadius: 8,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 12,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 10
  },
  linkText: {
    ...FontSizes.Caption,
    ...FontWeights.Bold,
    color: ThemeStatic.gold,
    marginRight: 12,
  },

});
