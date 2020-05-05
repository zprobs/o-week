import React, { Component } from "react";
import { Text, View } from "react-native";

class Dashboard extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>This is the Orientation Dashboard</Text>
      </View>
    );
  }
}

export default Dashboard;
