import React from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';

const Privacy = () => {
  const navigation = useNavigation();
  return(
    <View>
    <TouchableOpacity onPress={()=>{navigation.navigate('BlockedUsers')}}>
      <View>
        <View style={styles().settingItemViewStyle}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
              <Icon name={"close-o"} size={30} />
              <Text style={styles().settingItemTextStyle}> {"Blocked Users"} </Text>
            </View>

          <View style={{ justifyContent: "flex-start" }}>
            <Icon
            style={styles().settingItemChevronStyle}
            name="chevron-right"
            size={30}
            />
            </View>
        </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>{navigation.navigate('MessagePrivacy')}}>
      <View>
        <View style={styles().settingItemViewStyle}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
              <Icon name={"sc-telegram"} size={30} />
              <Text style={styles().settingItemTextStyle}> {"Messages & Invites"} </Text>
            </View>

          <View style={{ justifyContent: "flex-start" }}>
            <Icon
            style={styles().settingItemChevronStyle}
            name="chevron-right"
            size={30}
            />
            </View>
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    settingItemViewStyle: {
      //borderWidth: 1,
      //borderColor: 'black',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      margin: 7,
    },
    settingItemTextStyle: {
      fontSize: 16,
    },
    settingItemChevronStyle: {},
    viewOneStyle: {
      height: 50,
      width: 50,
      backgroundColor: "red",
    },
    viewTwoStyle: {
      height: 50,
      width: 50,
      backgroundColor: "green",
      alignSelf: "flex-end",
    },
    viewThreeStyle: {
      height: 50,
      width: 50,
      backgroundColor: "purple",
    },
  });
export default Privacy
