import React from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function HelpLanding({navigation}) {
  return(
    <View>
    <Button onPress={()=>{navigation.navigate('Settings')}} title='Back'/>
    <Button onPress={()=>{navigation.navigate('ReportBug')}} title='Report a Bug'/>
    </View>
  );
}
