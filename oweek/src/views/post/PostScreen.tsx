import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { OrientationStackParamList } from '@views/orientation/OrientationStackParamList';
import { Modalize } from 'react-native-modalize';
import { DeletePost, GetDetailedPost, GetPostComments } from '@graphql/Post';
import {
  getDetailedPost,
  getDetailedPostVariables,
} from '@graphql/types/getDetailedPost';
import { deletePost, deletePostVariables } from '@graphql/types/deletePost';
import { GetGroupPosts, GetGroupPostsPaginated } from '@graphql/Group';
import {
  getPostComments,
  getPostCommentsVariables,
} from '@graphql/types/getPostComments';
import { processError } from '@util/messages';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OptionsIcon from '@components/interactable/OptionsIcon';
import LikeButton from '@components/interactable/LikeButton';
import parseTimeElapsed from '@util/parseTimeElapsed';
import RenderImages from '@views/post/RenderImages';
import RenderLink from '@views/post/RenderLink';
import Icon from 'react-native-vector-icons/Feather';
import RenderComment from '@views/post/RenderComment';
import AddCommentModal from '@views/post/AddCommentModal';
import OptionsBottomModal from '@components/modal/OptionsBottomModal';
import useStyles from './PostScreen.styles';
import usePostStyles from './Post.styles';

const PostScreen: React.FC = () => {
  const route = useRoute<RouteProp<OrientationStackParamList, 'PostScreen'>>();
  const styles = useStyles();
  const postStyles = usePostStyles();
  const navigation = useNavigation();
  const addCommentsRef = useRef<Modalize>(null);
  const optionsRef = useRef<Modalize>(null);
  const [optionsId, setOptionsId] = useState<string>();
  const [optionsCommentId, setOptionsCommentId] = useState<number>();
  const { postId, comment } = route.params;
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery<getDetailedPost, getDetailedPostVariables>(GetDetailedPost, {
    variables: { postId },
  });

  const [deletePostMutation, { error: deleteError }] = useMutation<
    deletePost,
    deletePostVariables
  >(DeletePost, {
    variables: { id: postId },
    refetchQueries: [
      {
        query: GetGroupPosts,
        variables: {
          groupId: postData?.post?.groupId || '',
        },
      },
      {
        query: GetGroupPostsPaginated,
        variables: {
          groupId: postData?.post?.groupId || '',
          offset: 0,
        },
      },
    ],
    onCompleted: () => {
      navigation.goBack();
    },
  });
  const {
    data: commentsData,
    loading,
    error,
    fetchMore,
  } = useQuery<getPostComments, getPostCommentsVariables>(GetPostComments, {
    variables: { postId, offset: 0 },
  });
  const { images, link, text, user, time } = postData?.post || {};
  if (deleteError) processError(deleteError, 'Could not delete post');
  if (postError) processError(postError, 'Cannot load post');

  useLayoutEffect(() => {
    if (postLoading || postError) return;
    navigation.setOptions({
      headerRight: () => (
        <OptionsIcon
          onPress={() => {
            if (user?.id !== 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3') {
              setOptionsId(user?.id);
              optionsRef.current?.open();
            } else {
              Alert.alert(
                'Delete this post?',
                'This will permanently remove this post and all the comments',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', onPress: () => deletePostMutation() },
                ],
                { cancelable: true },
              );
            }
          }}
        />
      ),
    });
  }, [
    deletePostMutation,
    navigation,
    postData,
    postError,
    postLoading,
    user?.id,
  ]);

  useEffect(() => {
    if (comment && addCommentsRef.current) {
      addCommentsRef.current.open();
    }
  }, [comment]);

  const onEndReached = useCallback(() => {
    fetchMore({
      variables: { postId, offset: commentsData?.post?.comments.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const previous = prev as getPostComments;
        const fmr = fetchMoreResult as getPostComments;

        return {
          post: {
            ...previous.post,
            comments: [
              ...(previous.post?.comments || []),
              ...(fmr.post?.comments || []),
            ],
          },
        };
      },
    });
  }, [commentsData?.post?.comments.length, fetchMore, postId]);

  if (postLoading || postError) return null;

  const Header = () => (
    <>
      <View style={postStyles.header}>
        <TouchableOpacity
          style={postStyles.user}
          onPress={() => navigation.navigate('Profile', { userId: user?.id })}>
          <Image
            source={{
              uri: user?.image,
            }}
            style={postStyles.image}
          />
          <View>
            <Text style={postStyles.name}>{user?.name}</Text>
            <Text style={postStyles.time}>
              {parseTimeElapsed(time).readableTime}
            </Text>
          </View>
        </TouchableOpacity>
        <LikeButton
          style={styles.likeButton}
          postId={postId}
          authorId={user?.id || ''}
        />
      </View>
      <Text style={postStyles.body}>{text}</Text>
      {images && images.length > 0 && <RenderImages images={images} />}
      <RenderLink link={link || null} />
      <View style={styles.line} />
      <TouchableOpacity
        style={[styles.postButton, { alignSelf: 'center' }]}
        onPress={() => addCommentsRef.current?.open()}>
        <Icon name="plus" color="white" size={24} />
        <Text style={styles.postText}>Add Comment</Text>
      </TouchableOpacity>
    </>
  );

  const EmptyComponent = () => {
    if (loading)
      return (
        <View style={styles.commentEmptyView}>
          <ActivityIndicator size="large" />
        </View>
      );
    if (error)
      return (
        <View style={styles.commentEmptyView}>
          <Text style={styles.commentErrorText}>CANNOT LOAD COMMENTS</Text>
        </View>
      );
    return null;
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={commentsData?.post?.comments || []}
        ListEmptyComponent={EmptyComponent}
        ListHeaderComponent={Header}
        renderItem={({ item }) => (
          <RenderComment
            item={item}
            setOptionsId={setOptionsId}
            optionsRef={optionsRef}
            setOptionsCommentId={setOptionsCommentId}
            currentUser="MeacvK7z4gWhfkCC6jTNAfEKgXJ3"
          />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={7}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddCommentModal
        postId={postId}
        authorId={user?.id || ''}
        ref={addCommentsRef}
        closeModal={() => addCommentsRef.current?.close()}
      />
      <OptionsBottomModal
        ref={optionsRef}
        id={optionsId || ''}
        commentId={optionsCommentId}
        postId={postId}
      />
    </SafeAreaView>
  );
};

export default PostScreen;
