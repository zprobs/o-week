import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import { StyleSheet, View } from "react-native";
import { ThemeStatic } from "../../theme/Colours";
import { useNavigation } from "@react-navigation/native";

const CircleBackIcon = ({ onPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Icon
        name={"chevron-left"}
        color={"#000"}
        size={42}
        style={{ marginTop: 3 }}
        onPress={() => {
          if (onPress) onPress();
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeStatic.white,
    height: 44,
    width: 44,
    borderRadius: 22,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CircleBackIcon;
