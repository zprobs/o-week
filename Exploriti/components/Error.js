import React from "react";
import { View, Text } from "react-native";

export default function Error(props) {
  const { e } = props;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
      }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
        Error
      </Text>
      <Text style={{ marginBottom: 5 }}>
        We are unable to connect to the server at this time. Apologies for the
        inconvenience
      </Text>
      <Text style={{ color: "#808080" }}>{e.message}</Text>
    </View>
  );
}
