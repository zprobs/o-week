import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  BubbleTabBarItemConfig,
  TabsConfig,
} from '@gorhom/animated-tabbar';
import OrientationView from '@views/orientation';
import ScheduleView from '@views/schedule';
import ProfileView from '@views/profile';
import MessagesView from '@views/messages';
import OrientationSVG from '@root/assets/svg/OrientationSVG';
import ScheduleSVG from '@root/assets/svg/ScheduleSVG';
import MessagesSVG from '@root/assets/svg/MessagesSVG';
import ProfileSVG from '@root/assets/svg/ProfileSVG';
import getTheme from '@root/theme';

const Tab = createBottomTabNavigator();

enum Tabs {
  Orientation = 'Orientation',
  Schedule = 'Schedule',
  Messages = 'Messages',
  Profile = 'Profile',
}

const TabNavigation: React.FC = () => {
  const [initialRoute] = useState(Tabs.Orientation);
  const theme = getTheme();

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
        component: OrientationSVG,
        ...iconColor,
      },
      ...tabStyles,
    },

    Schedule: {
      icon: {
        component: ScheduleSVG,
        ...iconColor,
      },
      ...tabStyles,
    },
    Messages: {
      icon: {
        component: MessagesSVG,
        ...iconColor,
      },
      ...tabStyles,
    },

    Profile: {
      icon: {
        component: ProfileSVG,
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
