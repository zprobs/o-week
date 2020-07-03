import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Button,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SettingToggle } from "../ReusableComponents/SettingToggle.js";
import Fonts from "../../theme/Fonts";
import Icon from "react-native-vector-icons/EvilIcons";
import firebase from '@react-native-firebase/app';
import ButtonColour from '../ReusableComponents/ButtonColour';
import {AuthContext, UserContext} from '../../context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import About from "./About"
import Help from "./Help"
import ReportBug from "./ReportBug"
import Notifications from "./Notifications"
import {CloseIcon} from '../Menu/CloseIcon';
import { BackIcon } from "../Menu/BackIcon";
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation } from '@react-navigation/native';
import {Theme} from '../../theme/Colours';
const {FontWeights, FontSizes} = Fonts
const {colours} = Theme.light;


/**
 * Dashboard is the main view where the user can see what is important and what they need to know for the near future
 * @returns The UI view for Dashboard
 * @constructor
 */




export default function SettingsList() {

    const navigation = useNavigation();

    const {setAuthState} = useContext(AuthContext);

    const processLogout = async () => {
        try {
            setAuthState({ status: "loading" });
            await firebase.auth().signOut();
            setAuthState({ status: "out" });
        } catch (error) {
            console.log(error);
        }
    };

  return(
    <View style={{flex:9, backgroundColor: colours.base}}>
      <View>

      <TouchableOpacity onPress={()=>{navigation.navigate('Notifications')}}>
        <View>
          <View style={styles().settingItemViewStyle}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <Icon name={"bell"} size={30} />
                <Text style={styles().settingItemTextStyle}> {"Notifications"} </Text>
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

      <TouchableOpacity onPress={()=>{navigation.navigate('Privacy')}}>
        <View>
          <View style={styles().settingItemViewStyle}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <Icon name={"lock"} size={30} />
                <Text style={styles().settingItemTextStyle}> {"Privacy"} </Text>
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

        <TouchableOpacity onPress={()=>{navigation.navigate('About')}}>
          <View>
            <View style={styles().settingItemViewStyle}>
                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                  <Icon name={"question"} size={30} />
                  <Text style={styles().settingItemTextStyle}> {"About"} </Text>
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

        <TouchableOpacity onPress={()=>{navigation.navigate('Help')}}>
          <View>
            <View style={styles().settingItemViewStyle}>
                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                  <Icon name={"exclamation"} size={30} />
                  <Text style={styles().settingItemTextStyle}> {"Help"} </Text>
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

        <Button title="Logout" onPress={()=>{processLogout()}} />
      </View>
      <View style={styles().bottomBannerViewStyle}>
        <Text style={{...FontWeights.Light, color: 'gray'}}>Powered By</Text>
        <Image style={{}} source={require('../../assets/images/ArravonLogo.png')}/>
      </View>
    </View>
  );
}


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
    bottomBannerViewStyle: {
      flex:1,
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "flex-end",
      borderColor: "black",
      //backgroundColor: '#ECECEC',
      padding:10,
      paddingBottom:20
    },
  });
