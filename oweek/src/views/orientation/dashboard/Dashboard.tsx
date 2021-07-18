import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GetCurrentUser } from '@graphql/User';
import { processWarning } from '@util/messages';
import {
  getCurrentUser,
  getCurrentUserVariables,
  getCurrentUser_user_member as Item,
} from '@graphql/types/getCurrentUser';
import {
  SafeAreaView,
  SectionList,
  SectionListRenderItem,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SectionHeader from '@components/list/SectionHeader';
import ImageCard from '@components/card/ImageCard';
import useStyles from './Dashboard.styles';
import DashboardSection from './DashboardSection';
import Header from './Header';

/**
 * Dashboard is the main view where the user can see what is important and view the groups they are in
 * */
const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const { loading, error, data } = useQuery<
    getCurrentUser,
    getCurrentUserVariables
  >(GetCurrentUser, {
    variables: { id: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' },
  });

  const listData: DashboardSection[] = useMemo(
    () => [
      {
        title: 'My Groups',
        data: data?.user?.member ? data.user.member : [],
      },
    ],
    [data],
  );

  const renderItem: SectionListRenderItem<Item, DashboardSection> = ({
    item,
    section,
  }) => {
    let screen: string;
    let options: Record<string, unknown>;

    if (section.title === 'My Groups') {
      screen = 'GroupScreen';
      options = { groupId: item.group.id };
    } else {
      screen = 'EventScreen';
      options = { event: item };
    }

    return (
      <TouchableOpacity onPress={() => navigation.navigate(screen, options)}>
        <ImageCard id={item.group.id} type="group" />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return null;
  }

  if (error) {
    processWarning(error, 'Server Error');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList<Item, DashboardSection>
        bounces
        sections={listData}
        keyExtractor={(item, index) => item.group.id + index}
        renderItem={renderItem}
        renderSectionHeader={SectionHeader}
        ListHeaderComponent={() => (
          <Header name={data?.user?.name || 'there'} loading={loading} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
