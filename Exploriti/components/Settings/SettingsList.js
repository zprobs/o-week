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
import Fonts from "../../theme/Fonts";
import Icon from "react-native-vector-icons/EvilIcons";
import firebase from '@react-native-firebase/app';
import {AuthContext } from '../../context';
import About from "./About"
import Help from "./Help"
import Notifications from "./Notifications"
import { BackIcon } from "../Menu/BackIcon";
import { useNavigation } from '@react-navigation/native';
import { Theme, ThemeStatic } from '../../theme/Colours';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useQuery } from '@apollo/react-hooks';
import { CHECK_USER_ADMIN } from '../../graphql';
const {FontWeights, FontSizes} = Fonts
const {colours} = Theme.light;


/**
 * Dashboard is the main view where the user can see what is important and what they need to know for the near future
 * @returns The UI view for Dashboard
 * @constructor
 */




export default function SettingsList() {


    const navigation = useNavigation();

    const {authState, setAuthState} = useContext(AuthContext);
  const {loading, data, error} = useQuery(CHECK_USER_ADMIN, {variables: {id: authState.user.uid}})

  const processLogout = async () => {
        try {
            setAuthState({ status: "loading" });
            await firebase.auth().signOut();
            setAuthState({ status: "out" });
        } catch (error) {
            console.log(error);
        }
    };

    const ListItem = ({name, icon, destination }) => {
      return (
        <TouchableOpacity onPress={()=>{navigation.navigate(destination)}}>
          <View>
            <View style={styles.settingItemViewStyle}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <Icon name={icon} size={30} />
                <Text style={styles.settingItemTextStyle}> {name} </Text>
              </View>

              <View style={{ justifyContent: "flex-start" }}>
                <Icon
                  style={styles.settingItemChevronStyle}
                  name="chevron-right"
                  size={30}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

  return(
    <View style={{flex:9, backgroundColor: colours.base}}>
      <View>

     <ListItem icon={'bell'} name={'Notifications'} destination={'Notifications'} />

     <ListItem icon={'lock'} name={'Privacy'} destination={'Privacy'} />

     <ListItem icon={'question'} name={'About'} destination={'About'} />

     <ListItem icon={'exclamation'} destination={'Help'} name={'Help'} />

     <View style={{height: 20}} />

        <ButtonColour label={'Logout'} colour={ThemeStatic.lightBlue} light={true} containerStyle={styles.button} onPress={processLogout} />

        {
          !loading && !error && data.user && data.user.isAdmin ? (
            <ButtonColour label={'Admin Console'} colour={ThemeStatic.lightPurple} light={true} containerStyle={styles.button} onPress={()=>navigation.push('Admin Console')} />
          ) : null
        }

      </View>
      <View style={styles.bottomBannerViewStyle}>
        <Text style={{...FontWeights.Light, color: 'gray'}}>Powered By</Text>
        <Image style={{}} source={require('../../assets/images/ArravonLogo.png')}/>
      </View>
    </View>
  );
}


const styles =
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

    button: {
      marginVertical: 15,
      width: '70%',
      alignSelf: 'center'
    }
  });
