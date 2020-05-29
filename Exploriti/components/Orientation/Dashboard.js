import React, {useContext} from 'react';
import { Text, View } from "react-native";
import {UserContext} from '../UserContext';

/**
 * Dashboard is the main view where the user can see what is important and what they need to know for the near future
 * @returns The UI view for Dashboard
 * @constructor
 */
export default function Dashboard() {
    const {authState, setAuthState} = useContext(UserContext);
    console.log(authState.user);

    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome, {authState.user.uid}!</Text>
    </View>
  );
}
