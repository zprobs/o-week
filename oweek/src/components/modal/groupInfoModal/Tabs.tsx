import React, { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import getTheme from '@root/theme';
import useStyles from './Tabs.styles';

const WIDTH = Dimensions.get('window').width;

interface Props {
  isMember: boolean;
  Feed: React.ComponentType;
  About: React.ComponentType;
  Events: React.ComponentType;
}

const Tabs: React.FC<Props> = ({ isMember, Feed, About, Events }) => {
  const styles = useStyles(isMember);
  const theme = getTheme();
  const [index, setIndex] = useState<number>(0);
  const initialRoutes = isMember
    ? [
        { key: 'first', title: 'Feed' },
        { key: 'second', title: 'About' },
        { key: 'third', title: 'Events' },
      ]
    : [
        { key: 'first', title: 'About' },
        { key: 'second', title: 'Events' },
      ];
  const [routes] = useState(initialRoutes);

  const renderScene = isMember
    ? SceneMap({
        first: Feed,
        second: About,
        third: Events,
      })
    : SceneMap({
        first: About,
        second: Events,
      });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{ key: string; title: string }>;
    },
  ) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabBar}
        renderLabel={({ route, color }) => (
          <Text style={{ ...styles.tabText, color }}>{route.title}</Text>
        )}
        activeColor={theme.palette.gold}
        inactiveColor={theme.palette.text03}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: WIDTH }}
      renderTabBar={renderTabBar}
      swipeEnabled={false}
    />
  );
};

export default Tabs;
