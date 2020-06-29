import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";

/**
 * Hamburger menu icon for the top left of Home Screen
 * @returns react-native-vector-icons menu icon
 */
export const DrawerIcon = () => {
  const navigation = useNavigation();
  return (
    <Icon
      name="navicon"
      size={38}
      color="#000"
      onPress={() => navigation.navigate("Settings")}
      style={{marginLeft: 8}}
    />
  );
};
