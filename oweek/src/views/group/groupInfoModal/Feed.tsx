import React from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { GetGroupPosts } from '@graphql/Group';
import {
  getGroupPosts,
  getGroupPostsVariables,
} from '@graphql/types/getGroupPosts';
import {
  Text,
  TouchableOpacity,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ImgBanner from '@components/list/ImgBanner';
import EmptyPosts from '@root/assets/svg/empty-likes.svg';
import getTheme from '@root/theme';
import useStyles from './Feed.styles';
import Post from '../../post/Post';

const TabLoading = () => (
  <View style={{ marginTop: 80, width: '100%', flex: 1, height: 200 }}>
    <ActivityIndicator size="large" />
  </View>
);

interface Props {
  groupId: string;
  groupLoading: boolean;
  groupError: ApolloError | undefined;
}

const Feed: React.FC<Props> = ({ groupId, groupLoading, groupError }) => {
  const navigation = useNavigation();
  const styles = useStyles();
  const theme = getTheme();
  const { data, loading, error } = useQuery<
    getGroupPosts,
    getGroupPostsVariables
  >(GetGroupPosts, {
    variables: { groupId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading || groupLoading) return <TabLoading />;

  if (error || groupError) return null;

  const count = data?.group?.posts_aggregate?.aggregate?.count || 0;
  const posts = data?.group?.posts || [];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigation.navigate('CreatePost', { groupId })}>
        <Icon name="plus" size={24} color={theme.palette.white} />
        <Text style={styles.postText}>Post Something</Text>
      </TouchableOpacity>
      {count === 0 ? (
        <ImgBanner Img={EmptyPosts} placeholder="No Posts Yet" spacing={0.01} />
      ) : (
        posts.map((p, i) => <Post item={p} index={i} key={p.id} />)
      )}
      {count > 4 ? (
        <View style={styles.seeAll}>
          <Button
            title="See All"
            onPress={() => navigation.navigate('AllPosts', { groupId })}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Feed;
