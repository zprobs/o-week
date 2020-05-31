import React from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function HelpLanding({navigation}) {
  return(
    <Button onPress={()=>{console.log(navigation), navigation.navigate('ReportBug')}} title='Report a Bug'/>
  );
}

function ReportBug({navigation}) {
  return(
    <Text>Report a Bug</Text>
  );
}

function Help() {
  return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={"HelpLanding"} component={HelpLanding}/>
          <Stack.Screen name={"ReportBug"} component={ReportBug}/>
      </Stack.Navigator>
  );
}


  /*
  export default function Help() {
    return (
      <NavigationContainer>
        <HelpStack />
      </NavigationContainer>
    );
  }
*/
export default Help
