import React from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../theme/Fonts';


const {FontWeights, FontSizes} = Fonts

const BlockedUsers = () => {
  return(
    <View style={styles().centerView}>
      <Text style={styles().centerText}>Blocked users will appear here</Text>
      <Text style={styles().centerText}>You haven't blocked anyone yet</Text>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    centerView: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: 7,
    },
    centerText: {
      ...FontSizes.Caption,
      ...FontWeights.Light
    },
  });

export default BlockedUsers
