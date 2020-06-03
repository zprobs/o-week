import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Button,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SettingToggle } from "../ReusableComponents/SettingToggle.js";
import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";
import { ThemeStatic } from "../../theme/Colours";
import Icon from "react-native-vector-icons/EvilIcons";
import firebase from '@react-native-firebase/app';
import ButtonColour from '../ReusableComponents/ButtonColour';
import {UserContext} from '../../context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import About from "./About"
import Settings from "./SettingsFile"
import Help from "./Help"
import ReportBug from "./ReportBug"

const Stack = createStackNavigator();

/**
 * Dashboard is the main view where the user can see what is important and what they need to know for the near future
 * @returns The UI view for Dashboard
 * @constructor
 */



 function SettingsStack() {

   return (
     <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Settings">
         <Stack.Screen name={"Settings"} component={SettingsList}/>
         <Stack.Screen name={"Help"} component={Help}/>
         <Stack.Screen name={"About"} component={About}/>
         <Stack.Screen name={"ReportBug"} component={ReportBug}/>
     </Stack.Navigator>
   );
 };


function SettingsList({navigation}) {
  return(
    <View>
    <Button title="Help" onPress={()=>{navigation.navigate('Help')}} />
    <Button title="About" onPress={()=>{navigation.navigate('About')}} />
    </View>
  );
}

function SettingsLis() {
  const {authState, setAuthState} = useContext(UserContext);

  const settingsItemList = [
    { settingName: "General", icon: "gear" },
    { settingName: "Notifications", icon: "bell" },
    { settingName: "Privacy", icon: "unlock" },
    { settingName: "About", icon: "exclamation", nav: 'About' },
    { settingName: "Help", icon: "question" },
  ];


  return (
    <View>
      <FlatList
        keyExtractor={setting => setting.settingName}
        data={settingsItemList}
        renderItem={({ item }) => {
          return (
            <SettingsItem settingName={item.settingName} icon={item.icon} nav={item.nav}/>
          );
        }}
      />
    </View>
  );
}

function SettingsItem({navigation}) {
  return (
    <TouchableOpacity onPress={()=>{console.log()}}>
      <View>
        <View style={styles().settingItemViewStyle}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
              <Icon name={"gear"} size={30} />
              <Text style={styles().settingItemTextStyle}> {"4"} </Text>
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

export default function SettingsPage() {
  return(
    <NavigationContainer independent={true}>
      <SettingsStack />
    </NavigationContainer>
  );
}
