import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * For rendering a list item. Shows a user in a list, probably a modal.
 * @param userId
 * @param avatar
 * @param handle
 * @param name
 * @param onPress
 * @param style Additional style for the entire card
 * @constructor
 */
const UserCard = ({ userId, avatar, handle, name, onPress, style }) => {
  const navigateToProfile = () => {
    console.log("navigate to profile");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress || navigateToProfile}
      style={[styles().container, style]}>
      <Image uri={avatar} style={styles().avatarImage} />
      <View style={styles().info}>
        <Text style={styles().handleText}>{handle}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles().nameText}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = () =>
  StyleSheet.create({
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
    handleText: {
      ...FontWeights.Regular,
      ...FontSizes.Body,
      color: colours.text01,
    },
    nameText: {
      ...FontWeights.Light,
      ...FontSizes.Caption,
      color: colours.text02,
      marginTop: 5,
    },
  });

export default UserCard;
