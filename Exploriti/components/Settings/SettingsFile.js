import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";

 const Settings = ({ navigation }) => {
  return(
     <TouchableOpacity onPress = {() =>
       //console.log({navigation})
       navigation.navigate('About')}>
       <Text>About Page</Text>
     </TouchableOpacity>
  );
};

export default Settings
