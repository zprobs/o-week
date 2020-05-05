import React, {Component} from 'react';
import {Text, View} from 'react-native';

class Profile extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>This is the my profile page</Text>
            </View>
        );
    }
}

export default Profile;
