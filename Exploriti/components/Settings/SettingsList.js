import React, {useState} from "react";
import { Text, View, Button, Switch, StyleSheet} from "react-native";
import {SettingToggle} from "../ReusableComponents/SettingToggle.js";
import Fonts from '../../theme/Fonts';
import {Theme} from '../../theme/Colours';
import {ThemeStatic} from '../../theme/Colours';
import Icon from "react-native-vector-icons/EvilIcons";

/**
 * Dashboard is the main view where the user can see what is important and what they need to know for the near future
 * @returns The UI view for Dashboard
 * @constructor
 */



function SettingsList() {

   return (
        <View>
          <SettingsItem settingName={'General'} icon={'gear'}/>
        </View>
   );
 };

const SettingsItem = ({settingName, icon}) => {

  return(
    <View style = {styles().settingItemViewStyle}>
    <Icon name={icon} size={35} />
    <Text style={styles().settingItemTextStyle}> {settingName} </Text>
    <View style={{borderWidth:1, borderColor: 'black', justifyContent: 'flex-start'}}>
    <Text style={styles().settingItemChevronStyle} name='chevron-right' size={35}> arrow</Text>
    </View>
    </View>
  );

}


 const styles = () => StyleSheet.create({

   settingItemViewStyle:{
     borderWidth: 1,
     borderColor: 'black',
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'flex-start',
     left: 10,
     top: 10,
   },
   settingItemTextStyle:{
     fontSize: 18,
   },
   settingItemChevronStyle: {

   },
   viewOneStyle: {
     height: 50,
     width: 50,
     backgroundColor: 'red',

   },
   viewTwoStyle: {
     height: 50,
     width: 50,
     backgroundColor: 'green',
     alignSelf: 'flex-end',
   },
   viewThreeStyle: {
     height: 50,
     width: 50,
     backgroundColor: 'purple',
   }
 });

export default SettingsList;
