import React from 'react';
import {View, Image, StyleSheet, Linking, TouchableOpacity, Alert} from 'react-native';

const SocialMediaIcons = ({icons}) => {
    return (
        <View style={styles.container}>
            {icons.map((icon, index)=> {
                return <Icon icon={icon} key={index}/>
            })}
        </View>
    )
};

const Icon = ({icon}) => {
    return (
        <TouchableOpacity onPress={()=>toLink(icon)}>
            <Image source={{uri: imgSource(icon.type)}} style={styles.image} />
        </TouchableOpacity>
    );
}

function imgSource(type) {
  switch (type) {
    case 1:
      return "https://img.icons8.com/fluent/48/000000/facebook-new.png";
    case 2:
      return "https://img.icons8.com/fluent/48/000000/instagram-new.png";
    case 3:
      return "https://img.icons8.com/color/48/000000/linkedin-circled.png";
    case 4:
      return "https://img.icons8.com/color/48/000000/snapchat-circled-logo.png";
    case 5:
      return "https://img.icons8.com/color/48/000000/twitter-circled.png";
    case 6:
      return "https://img.icons8.com/fluent/48/000000/play-button-circled.png";
    default:
      return "https://img.icons8.com/fluent/48/000000/facebook-new.png";
  }
}

/**
 * @Todo Use an API to get userID from the profile link that users enter so I can open facebook app directly
 * @param icon The social media profile link to be navigated to
 */
function toLink(icon) {
    const url = 'https://www.';
    const page = () => {
        switch(icon.type) {
            case 1:
                return 'facebook.com/';
            case 2:
                return 'instagram.com/';
            case 3:
                return 'linkedin.com/';
            case 5:
                return 'twitter.com/'
            case 6:
                return 'youtube.com/';
            default:
                return '';
        }
    }
    const link = url + page() + icon.link;
    console.log(link);
     Linking.canOpenURL(link).then((result) => {
         if (result) {
             Linking.openURL(link).catch((e)=>console.log(e));
         } else {
             linkError();
         }
     }).catch((error)=>{
        linkError(error);
     })
}

function linkError(error) {
    Alert.alert(
        "Profile Unavailable.",
        error.toString(),

        {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "default",
        },
    );
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
        marginHorizontal: 8
    }
});

export default SocialMediaIcons;
