import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Theme } from '../../theme/Colours';
import { useQuery } from '@apollo/react-hooks';
import Post from '../ReusableComponents/Post';
import { GET_GROUP_POSTS_PAGINATED } from '../../graphql';
import { processWarning } from '../../context';
import { useSafeArea } from 'react-native-safe-area-context';

const { colours } = Theme.light;

const AllPosts = () => {
  const route = useRoute();
  const insets = useSafeArea();
  const { groupId } = route.params;

  const { data, error, fetchMore } = useQuery(GET_GROUP_POSTS_PAGINATED, {
    variables: { groupId: groupId, offset: 0 },
  });

  if (error) processWarning(error, 'Could not load posts');

  const renderItem = ({ item, index }) => <Post index={index} item={item} />;

  const onEndReached = useCallback(
    () => {
      console.log('onEndReached data', data.group.posts.length);
      fetchMore({
        variables: {
          groupId: groupId,
          offset: data.group.posts.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log('fetchMore', fetchMoreResult);
          if (!fetchMoreResult) return prev;

          console.log('prev', prev);

          return {
            group: {
              ...prev.group,
              posts: [...prev.group.posts, ...fetchMoreResult.group.posts],
            },
          };
        },
      });
    },
    [data]
  );


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colours.base,
    },
    list: {
      flex: 1,
      marginBottom: 70 + insets.bottom,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data ? data.group.posts : null}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={7}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default AllPosts;
