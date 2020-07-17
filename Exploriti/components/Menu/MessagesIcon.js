import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

/**
 * Messages menu icon for the top right of Home Screen
 * @returns react-native-vector-icons comment icon
 */
export const MessagesIcon = ({white}) => {
  const navigation = useNavigation();
  return (
    <Icon
      style={{ marginRight: 5 }}
      name="message-circle"
      size={32}
      color={ white ? 'white' : "#000"}
      onPress={() => navigation.navigate("Messages")}
      style={{marginRight: 8}}
    />
  );
};
