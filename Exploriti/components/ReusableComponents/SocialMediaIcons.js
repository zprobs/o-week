import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_LINKS } from '../../graphql';
import images from '../../assets/images';
import { showMessage } from 'react-native-flash-message';

/**
 * Icons that display a users social media links. Used in Profile. Max 6
 * @param id {string} the userId of user who's social media links are displayed
 * @returns {null|*}
 * @constructor
 */
const SocialMediaIcons = ({ id }) => {
  let icons;
  const { loading, error, data } = useQuery(GET_USER_LINKS, {
    variables: { user: id },
    fetchPolicy: 'cache-and-network',
  });
  if (loading) {
    return null;
  }
  if (!error) icons = data.user.links;

  if (icons) {
    const keys = Object.keys(icons);
    const values = Object.values(icons);
    return (
      <View style={styles.container}>
        {keys.map((type, index) => {
          return <Icon type={type} value={values[index]} key={index} />;
        })}
      </View>
    );
  } else {
    return null;
  }
};

const Icon = ({ type, value }) => {
  return (
    <TouchableOpacity onPress={() => toLink(type, value)}>
      <Image source={imgSource(type)} style={styles.image} />
    </TouchableOpacity>
  );
};

function imgSource(type) {
  switch (parseInt(type)) {
    case 1:
      return images.facebook;
    case 2:
      return images.instagram;
    case 3:
      return images.linkedin;
    case 4:
      return images.snapchat;
    case 5:
      return images.twitter;
    case 6:
      return images.tiktok;
    default:
      return images.logo;
  }
}

/**
 * @Todo Use an API to get userID from the profile link that users enter so I can open facebook app directly
 * @param type {string} The type of social media. 1 : FB, 2: Insta, 3: LinkedIn, 4: Snapchat, 5: Twitter, 6: TikTok
 * @param value {string}
 */
function toLink(type, value) {
  const url = 'https://www.';
  const page = () => {
    switch (parseInt(type)) {
      case 1:
        return 'facebook.com/';
      case 2:
        return 'instagram.com/';
      case 3:
        return 'linkedin.com/in/';
      case 5:
        return 'twitter.com/';
      case 6:
        return 'tiktok.com/@';
      default:
        return '';
    }
  };
  const link = url + page() + value;
  console.log(link);
  Linking.canOpenURL(link)
    .then((result) => {
      if (result) {
        Linking.openURL(link).catch((e) => console.log(e));
      } else {
        linkError('', 'Profile');
      }
    })
    .catch((error) => {
      linkError(error, 'Profile');
    });
}

export function linkError(error, title) {
  showMessage({
    message: `${title} Unavailable`,
    description: error.toString(),
    autoHide: true,
    type: 'danger',
    icon: 'danger',
  })
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 10,
    marginLeft: 10,
  },
  image: {
    height: 36,
    width: 36,
    borderRadius: 18,
    marginHorizontal: 8,
  },
});

export default SocialMediaIcons;
