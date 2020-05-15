import React from 'react';
import {ImageBackground, StyleSheet, View, Dimensions, Text, Image, Platform, TextInput} from 'react-native'
import images from '../../assets/images';
import Icon from 'react-native-vector-icons/EvilIcons';
import Fonts from '../../theme/Fonts';
import {Theme} from '../../theme/Colours';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const yMargin = height * 0.08;
const xMargin = width * 0.08;

export default function Login() {
    return (
        <View style={styles.bg}>
            <ImageBackground source={images.login} style={styles.backgroundImage}>
                <View style={styles.logo}>
                    <Image style={{height: 160, width: 160, borderRadius: 80,}} source={images.logo}/>
                </View>
                <View style={styles.email}>
                    <View style={styles.icons}>
                        <Icon size={28} name={'envelope'} color={colours.white}/>
                        <Text style={styles.label}>Email</Text>
                    </View>
                    <TextInput  placeholder={"first.last@utoronto.ca"} placeholderTextColor={'#f1f1f1'} style={styles.textBox} selectionColor={colours.white} />

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    marginTop: yMargin,
  },
  logo: {
    alignSelf: "center",
    height: 160,
    width: 160,
    borderRadius: 80,
    marginTop: yMargin*0.5,

      ...Platform.select({
          ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
          },
          android: {
              elevation: 5,
          },
      }),
  },
    email: {
      alignSelf: 'center',
        marginTop: 40,
        flexDirection: 'row',
        marginHorizontal: 60,
        justifyContent: 'flex-start',
        width: width-xMargin,
        borderBottomColor: colours.white,
        borderBottomWidth: 1,
        paddingBottom: 5,



    },
    icons: {
      height: 20,
        flexDirection: 'column-reverse'

    },
    label: {
      ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: colours.white,
    },
    textBox: {
      ...FontWeights.Light,
    ...FontSizes.Body,
      color: colours.white,
        marginLeft: 5,
    },


  forgot: {
    alignSelf: "center",
  },
});
