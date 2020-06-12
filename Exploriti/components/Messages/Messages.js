import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import MessagesList from './MessagesList';
import Conversation from './Conversation';
import Profile from '../MyProfile/Profile';

const Stack = createStackNavigator();

/**
 * Messages is the component to handle all user messages.
 * @returns Stack Navigator of Messages
 * @constructor
 */
export default function Messages() {

    return (
        <Stack.Navigator initialRouteName="MessagesList">
            <Stack.Screen
                name="MessagesList"
                component={MessagesList}
                options={{
                    headerShown: false,
                }}

            />
            <Stack.Screen
                name="Conversation"
                component={Conversation}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

