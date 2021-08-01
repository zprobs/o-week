import React, { useState } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import getTheme from '@root/theme';
import Feed from '@views/group/groupInfoModal/Feed';
import About from '@views/group/groupInfoModal/About';
import Events from '@views/group/groupInfoModal/Events';
import { ApolloError } from '@apollo/client';
import { getDetailedGroup } from '@graphql/types/getDetailedGroup';
import { Modalize } from 'react-native-modalize';
import useStyles from './Tabs.styles';

interface Props {
  isMember: boolean;
  groupId: string;
  groupLoading: boolean;
  groupError?: ApolloError;
  groupData?: getDetailedGroup;
  allLeadersRef: React.RefObject<Modalize>;
  allMembersRef: React.RefObject<Modalize>;
}

const Tabs: React.FC<Props> = ({
  isMember,
  groupId,
  groupLoading,
  groupError,
  groupData,
  allLeadersRef,
  allMembersRef,
}) => {
  const styles = useStyles(isMember);
  const theme = getTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState(
    isMember
      ? [
          { key: 'first', title: 'Feed' },
          { key: 'second', title: 'About' },
          { key: 'third', title: 'Events' },
        ]
      : [
          { key: 'first', title: 'About' },
          { key: 'second', title: 'Events' },
        ],
  );

  const renderScene = ({
    route,
  }: SceneRendererProps & {
    route: { key: string; title: string };
  }): React.ReactNode => {
    switch (route.key) {
      case 'first':
        return (
          <Feed
            groupId={groupId}
            groupError={groupError}
            groupLoading={groupLoading}
          />
        );
      case 'second':
        return (
          <About
            groupId={groupId}
            groupData={groupData}
            isMember={isMember}
            allLeadersRef={allLeadersRef}
            allMembersRef={allMembersRef}
          />
        );
      case 'third':
        return (
          <Events
            groupReady={!groupLoading && !groupError}
            groupData={groupData}
          />
        );
      default:
        return null;
    }
  };

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
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      swipeEnabled={false}
    />
  );
};

export default Tabs;
