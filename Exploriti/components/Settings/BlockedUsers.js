import React from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';

const {FontWeights, FontSizes} = Fonts
const { colours } = Theme.light;

const BlockedUsers = () => {
  return(
    <View style={styles.centerView}>
      <Text style={styles.centerText}>Blocked users will appear here</Text>
      <Text style={styles.centerText}>You haven't blocked anyone yet</Text>
    </View>
  );
};

const styles =
  StyleSheet.create({
    centerView: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colours.base
    },
    centerText: {
      ...FontSizes.Caption,
      ...FontWeights.Light,
    },
  });

export default BlockedUsers
