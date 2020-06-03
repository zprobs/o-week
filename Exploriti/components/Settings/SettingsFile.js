import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";

 const Settings = ({ navigation }) => {
  return(
    <View>
     <TouchableOpacity onPress = {() =>
       //console.log({navigation})
       navigation.navigate('About')}>
       <Text>About Page</Text>
     </TouchableOpacity>
     <Button title="Help" onPress={ () => {navigation.navigate('Help')} } />
     </View>
  );
};

export default Settings
