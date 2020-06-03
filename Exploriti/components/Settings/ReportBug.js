import React from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

export default function ReportBug({navigation}) {
  return(
    <View>
    <Button onPress={()=>{navigation.navigate('Help')}} title='Back'/>
    <Text>Report a Bug</Text>
    </View>
  );
}
