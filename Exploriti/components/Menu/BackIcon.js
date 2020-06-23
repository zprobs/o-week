import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";

/**
 * Simple chevron to be used in the GoBackHeader
 * @returns Icon
 * @constructor
 */
const BackIcon = ({iconColor}) => {
  const { goBack } = useNavigation();
  return (
    <Icon name="chevron-down" size={38} color={iconColor ? iconColor : "#000"} onPress={() => goBack()} />
  );
};

export default BackIcon;
