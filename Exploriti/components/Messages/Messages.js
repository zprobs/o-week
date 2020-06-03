import React from 'react';
import { Text, View } from "react-native";

/**
 * Messages is the component that handles all the current users messages.
 * @returns {*}
 * @constructor
 */
export default function Messages() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Hello from Messages</Text>
        </View>
    );
}
