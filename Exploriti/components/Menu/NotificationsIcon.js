import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

/**
 * Messages menu icon for the top right of Home Screen
 * @returns react-native-vector-icons comment icon
 */
export const NotificationsIcon = ({white}) => {
  const navigation = useNavigation();
  return (
    <Icon
      name="bell"
      size={32}
      color={ white ? 'white' : "#000"}
      onPress={() => navigation.push("Notifications")}
      style={{padding: 12}}
    />
  );
};
