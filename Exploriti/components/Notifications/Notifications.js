import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { DrawerIcon } from "../Menu/DrawerIcon";
import { MessagesIcon } from '../Menu/MessagesIcon';
import NotificationsList from './NotificationsList';


const Stack = createStackNavigator();

export default function Notifications() {
    console.log('beginning render');

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Notifications"
                component={NotificationsList}
                options={{
                    headerLeft: () => <DrawerIcon/>,
                    headerRight: () => <MessagesIcon/>
                }}
            />
        </Stack.Navigator>
    );
}


