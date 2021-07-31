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
import Feed from '@components/modal/groupInfoModal/Feed';
import About from '@components/modal/groupInfoModal/About';
import Events from '@components/modal/groupInfoModal/Events';
import { ApolloError } from '@apollo/client';
import useStyles from './Tabs.styles';

const WIDTH = Dimensions.get('window').width;

interface Props {
  isMember: boolean;
  groupId: string;
  groupLoading: boolean;
  groupError: ApolloError;
}

const Tabs: React.FC<Props> = ({
  isMember,
  groupId,
  groupLoading,
  groupError,
}) => {
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

  const FeedScene = <Feed
    groupId={groupId}
    groupError={groupError}
    groupLoading={groupLoading}
  />

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
