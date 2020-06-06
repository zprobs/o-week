import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";

/**
 * Messages menu icon for the top right of Home Screen
 * @returns react-native-vector-icons comment icon
 */
export const MessagesIcon = () => {
  const navigation = useNavigation();
  return (
    <Icon
      style={{ marginRight: 5 }}
      name="comment"
      size={38}
      color="#000"
      onPress={() => navigation.navigate("Messages")}
    />
  );
};
