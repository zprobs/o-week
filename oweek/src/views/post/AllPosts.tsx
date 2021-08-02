import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GetGroupPostsPaginated } from '@graphql/Group';
import { processWarning } from '@util/messages';
import { useSafeArea } from 'react-native-safe-area-context';
import { OrientationStackParamList } from '@views/orientation/OrientationStackParamList';
import { getGroupPostsPaginated } from '@graphql/types/getGroupPostsPaginated';
import getTheme from '@root/theme';
import { getGroupPosts_group_posts } from '@graphql/types/getGroupPosts';
import Post from './Post';

/**
 * Screen to view a groups posts in pagination. when navigating pass groupId in route.params
 */
const AllPosts: React.FC = () => {
  const route = useRoute<RouteProp<OrientationStackParamList, 'AllPosts'>>();
  const theme = getTheme();
  const insets = useSafeArea();
  const { groupId } = route.params;

  const { data, error, fetchMore } = useQuery(GetGroupPostsPaginated, {
    variables: { groupId, offset: 0 },
  });

  if (error) processWarning(error, 'Could not load posts');

  const renderItem: ListRenderItem<getGroupPosts_group_posts> = ({
    item,
    index,
  }) => <Post index={index} item={item} />;

  const onEndReached = useCallback(() => {
    fetchMore({
      variables: {
        groupId,
        offset: data?.group?.posts?.length || 0,
      },
      updateQuery: (prev: getGroupPostsPaginated, next) => {
        const { fetchMoreResult } = next;
        if (!fetchMoreResult) return prev;

        return {
          group: {
            ...prev.group,
            posts: [
              ...(prev.group?.posts || []),
              ...(fetchMoreResult.group?.posts || []),
            ],
          },
        };
      },
    });
  }, [data?.group?.posts?.length, fetchMore, groupId]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.base,
    },
    list: {
      flex: 1,
      marginBottom: 70 + insets.bottom,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.group?.posts}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={7}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AllPosts;
