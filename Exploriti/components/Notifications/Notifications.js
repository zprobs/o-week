import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { DrawerIcon } from "../Menu/DrawerIcon";
import { NotificationIcon } from '../Menu/NotificationIcon';
import NotificationsList from './NotificationsList';


export default function Notifications({mainNavigation}) {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Notifications"
                component={NotificationsList}
                options={{
                    headerLeft: () => <DrawerIcon mainNavigation={mainNavigation} />,
                    headerRight: () => <NotificationIcon mainNavigation={mainNavigation}/>
                }}
            />
        </Stack.Navigator>
    );
}
