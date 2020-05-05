import React, {Component} from 'react';
import {Text, View} from 'react-native-reanimated';

class Orientation extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Dashboard / Orientation</Text>
            </View>
        );
    }
}

export default Orientation;
