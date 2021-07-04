import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  BubbleTabBarItemConfig,
  TabsConfig,
} from '@gorhom/animated-tabbar';
import OrientationView from '@views/Orientation';
import ScheduleView from '@views/Schedule';
import ProfileView from '@views/Profile';
import MessagesView from '@views/Messages';
import { useTheme } from '@material-ui/styles';

const Tab = createBottomTabNavigator();

enum Tabs {
  Orientation = 'Orientation',
  Schedule = 'Schedule',
  Messages = 'Messages',
  Profile = 'Profile',
}

const TabNavigation = () => {
  const [initialRoute] = useState(Tabs.Orientation);
  const theme = useTheme();

  const iconColor = {
    activeColor: theme.palette.accent,
    inactiveColor: theme.palette.black,
  };

  const tabStyles = {
    labelStyle: {
      color: theme.palette.tabLabel,
    },
    background: {
      activeColor: theme.palette.tabActiveBackground,
      inactiveColor: theme.palette.tabInactiveBackground,
    },
  };

  const tabs: TabsConfig<BubbleTabBarItemConfig> = {
    Orientation: {
      icon: {
        component: null,
        ...iconColor,
      },
      ...tabStyles,
    },

    Schedule: {
      icon: {
        component: null,
        ...iconColor,
      },
      ...tabStyles,
    },
    Messages: {
      icon: {
        component: null,
        ...iconColor,
      },
      ...tabStyles,
    },

    MyProfile: {
      icon: {
        component: null,
        ...iconColor,
      },
      ...tabStyles,
    },
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar tabs={tabs} {...props} />}
      initialRouteName={initialRoute}>
      <Tab.Screen name={Tabs.Orientation} component={OrientationView} />
      <Tab.Screen name={Tabs.Schedule} component={ScheduleView} />
      <Tab.Screen name={Tabs.Messages} component={MessagesView} />
      <Tab.Screen name={Tabs.Profile} component={ProfileView} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
