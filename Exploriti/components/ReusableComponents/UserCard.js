import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";
import { useNavigation } from '@react-navigation/native';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * For rendering a list item. Shows a user in a list, probably a modal.
 * @param userId
 * @param avatar
 * @param name
 * @param onPress
 * @param style Additional style for the entire card
 * @constructor
 */
const UserCard = ({ userId, image, name, onPress, style }) => {

    const navigation = useNavigation();


  const navigateToProfile = () => {
    console.log("navigate to profile");
    navigation.push('Profile', {userId: userId});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={navigateToProfile}
      style={[styles.container, style]}>
      <Image source={{uri: image}} style={styles.avatarImage} />
      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderRadius: 5,
      width: "100%",
    },
    avatarImage: {
      height: 50,
      width: 50,
      borderRadius: 50,
      backgroundColor: colours.placeholder,
    },
    info: {
      flex: 1,
      justifyContent: "center",
      paddingLeft: 10,
    },
    nameText: {
      ...FontWeights.Regular,
      ...FontSizes.Body,
      color: colours.text01,
    },

  });

export default UserCard;
