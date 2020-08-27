import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/Feather';
import { linkError } from './SocialMediaIcons';
import {
  AuthContext,
  getHostnameFromRegex,
  parseTimeElapsed,
  processError,
} from '../../context';
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { log } from 'react-native-reanimated';
import { useMutation, useQuery } from '@apollo/react-hooks';
import AddCommentModal from '../Modal/AddCommentModal';
import {
  DELETE_POST,
  GET_DETAILED_POST,
  GET_GROUP_POSTS,
  GET_POST_COMMENTS,
} from '../../graphql';
import LikeSVG from '../../assets/svg/LikeSVG';
import OptionsIcon from '../Menu/OptionsIcon';
import OptionsBottomModal from '../Modal/OptionsBottomModal';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * Used in Group Feeds
 * @param item {object} an instance of post
 * @param index {int} the order in the list
 * @returns {JSX.Element}
 * @constructor
 */
const Post = ({ item, index }) => {
  const navigation = useNavigation();

  const { images, link, text, user, time } = item;
  const isLeft = index % 2 === 0;

  const containerBorderRadius = {
    borderBottomRightRadius: isLeft ? 15 : 0,
    borderTopRightRadius: isLeft ? 15 : 0,
    borderBottomLeftRadius: isLeft ? 0 : 15,
    borderTopLeftRadius: isLeft ? 0 : 15,
    marginRight: isLeft ? 25 : 0,
    paddingLeft: isLeft ? 25 : 0,
    marginLeft: isLeft ? 0 : 25,
    paddingRight: isLeft ? 0 : 25,
  };

  const hasContent = (images && images.length !== 0) || link;

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...containerBorderRadius }}
      onPress={() =>
        navigation.navigate('PostScreen', { postId: item.id, authorId: user.id })
      }>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.user}
          onPress={() => navigation.navigate('Profile', { userId: user.id })}>
          <Image
            source={{
              uri: user.image,
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.time}>
              {parseTimeElapsed(time).readableTime}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <LikeSVG
            style={{ marginRight: 10, alignItems: 'center' }}
            postId={item.id}
            authorId={user.id}
          />
          <View style={{ alignItems: 'center' }}>
            <Icon
              color={ThemeStatic.gold}
              name={'message-square'}
              size={26}
              style={{ padding: 4 }}
              onPress={() =>
                navigation.navigate('PostScreen', {
                  postId: item.id,
                  authorId: user.id,
                  comment: true,
                })
              }
            />
            <Text style={[styles.interactionText, { color: ThemeStatic.gold }]}>
              {item.comments_aggregate.aggregate.count > 99
                ? '99+'
                : item.comments_aggregate.aggregate.count}
            </Text>
          </View>
        </View>
      </View>
      <Text
        numberOfLines={hasContent ? (images && images.length > 0 ? 2 : 3) : 5}
        style={styles.body}>
        {text}
      </Text>
      {hasContent ? (
        <View>
          {images && images.length > 0
            ? renderImages(images)
            : renderLink(link)}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export const PostScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const addCommentsRef = useRef();
  const optionsRef = useRef();
  const [optionsId, setOptionsId] = useState();
  const [optionsCommentId, setOptionsCommentId] = useState();
  const { postId, comment } = route.params;
  const { authState } = useContext(AuthContext);
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(GET_DETAILED_POST, { variables: { postId: postId } });
  const [deletePost, { error: deleteError }] = useMutation(DELETE_POST, {
    variables: { id: postId },
    refetchQueries: [
      { query: GET_GROUP_POSTS, variables: { groupId: postData && postData.post ? postData.post.groupId : '' } },
    ],
    onCompleted: () => {
      navigation.goBack();
    },
  });
  const { data: commentsData, loading, error, fetchMore } = useQuery(
    GET_POST_COMMENTS,
    {
      variables: { postId: postId, offset: 0 },
    },
  );
  const { images, link, text, user, time } = postData ? postData.post : {};
  if (deleteError) processError(deleteError, 'Could not delete post');
  if (postError) processError(postError, 'Cannot load post');

  React.useLayoutEffect(() => {
    if (postLoading || postError) return;
    navigation.setOptions({
      headerRight: () => (
        <OptionsIcon
          onPress={() => {
            if (user.id !== authState.user.uid) {
              setOptionsId(user.id);
              optionsRef.current.open();
            } else {
              Alert.alert(
                'Delete this post?',
                'This will permanently remove this post and all the comments',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', onPress: deletePost },
                ],
                { cancelable: false },
              );
            }
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (comment && addCommentsRef.current) {
      addCommentsRef.current.open();
    }
  }, []);

  const onEndReached = useCallback(() => {
    console.log('onEndReached data', commentsData.post.comments.length);
    fetchMore({
      variables: { postId: postId, offset: commentsData.post.comments.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log('fetchMore', fetchMoreResult.post.comments);
        if (!fetchMoreResult) return prev;

        console.log('prev', prev.post.comments);

        return {
          post: {
            ...prev.post,
            comments: [...prev.post.comments, ...fetchMoreResult.post.comments],
          },
        };
      },
    });
  }, [commentsData]);

  if (postLoading || postError) return null

  const Header = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.user}
          onPress={() => navigation.navigate('Profile', { userId: user.id })}>
          <Image
            source={{
              uri: user.image,
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.time}>
              {parseTimeElapsed(time).readableTime}
            </Text>
          </View>
        </TouchableOpacity>
        <LikeSVG
          style={{ marginRight: 10, alignItems: 'center' }}
          postId={postId}
          authorId={user.id}
        />
      </View>
      <Text style={styles.body}>{text}</Text>
      {images && images.length > 0 && renderImages(images)}
      {renderLink(link)}
      <View style={styles.line} />
      <TouchableOpacity
        style={[styles.postButton, { alignSelf: 'center' }]}
        onPress={() => addCommentsRef.current.open()}>
        <Icon name={'plus'} color={'white'} size={24} />
        <Text style={styles.postText}>Add Comment</Text>
      </TouchableOpacity>
    </>
  );

  const EmptyComponent = () => {
    if (loading)
      return (
        <View style={styles.commentEmptyView}>
          <ActivityIndicator size={'large'} />
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colours.placeholder,
        paddingHorizontal: 10,
      }}>
      <FlatList
        data={commentsData ? commentsData.post.comments : []}
        ListEmptyComponent={EmptyComponent}
        ListHeaderComponent={Header}
        renderItem={({ item }) =>
          renderComment(
            item,
            setOptionsId,
            optionsRef,
            setOptionsCommentId,
            authState.user.uid,
          )
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={7}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddCommentModal
        postId={postId}
        authorId={user.id}
        ref={addCommentsRef}
      />
      <OptionsBottomModal
        ref={optionsRef}
        id={optionsId}
        commentId={optionsCommentId}
        postId={postId}
      />
    </SafeAreaView>
  );
};

const renderComment = (
  item,
  setOptionsId,
  optionsRef,
  setOptionsCommentId,
  currentUser,
) => {
  const { user } = item;
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.user}
          onPress={() => navigation.navigate('Profile', { userId: user.id })}>
          <Image
            source={{
              uri: user.image,
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.time}>
              {parseTimeElapsed(item.time).readableTime}
            </Text>
          </View>
        </TouchableOpacity>
        {user.id !== currentUser ? (
          <OptionsIcon
            size={20}
            onPress={() => {
              setOptionsId(user.id);
              setOptionsCommentId(item.id);
              optionsRef.current.open();
            }}
          />
        ) : null}
      </View>
      <Text style={styles.body}>{item.text}</Text>
    </>
  );
};

const renderImages = (images) => {
  const imageComponents = [];
  const navigation = useNavigation();
  let i = 0;
  while (i < images.length && i < 3) {
    imageComponents.push(
      <Image key={i} source={{ uri: images[i] }} style={styles.galleryImage} />,
    );
    i++;
  }
  if (images.length > 3) {
    imageComponents.push(
      <View
        style={[
          styles.galleryImage,
          { backgroundColor: colours.text02, justifyContent: 'center' },
        ]}
        key={4}>
        <Text style={styles.moreImagesText}>{`+${images.length - 3}`}</Text>
      </View>,
    );
  }

  console.log('imageComponenet', imageComponents);

  return (
    <TouchableOpacity
      style={styles.gallery}
      onPress={() => navigation.navigate('Gallery', { images: images })}>
      {imageComponents}
    </TouchableOpacity>
  );
};

const renderLink = (link) => {
  if (!link) return null;
  const hostname = getHostnameFromRegex(link);

  const goToLink = () => {
    Linking.canOpenURL(link)
      .then((result) => {
        if (result) {
          Linking.openURL(link).catch((e) => console.log(e));
        } else {
          linkError('', 'Link');
        }
      })
      .catch((error) => {
        linkError(error, 'Link');
      });
  };

  return (
    <TouchableOpacity style={styles.linkContainer} onPress={goToLink}>
      <Text style={styles.linkText}>
        {hostname ? hostname : 'External Link'}
      </Text>
      <Icon size={20} color={ThemeStatic.gold} name={'chevron-right'} />
    </TouchableOpacity>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 205,
    backgroundColor: ThemeStatic.placeholder,
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    ...FontWeights.Bold,
    color: colours.text03,
  },
  time: {
    ...FontWeights.Bold,
    ...FontSizes.SubText,
    color: ThemeStatic.gold,
  },
  body: {
    ...FontSizes.Body,
    ...FontWeights.Bold,
    color: colours.text02,
    lineHeight: 21,
    marginBottom: 8,
    marginTop: 12,
    marginHorizontal: 15,
  },
  gallery: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginVertical: 7,
    marginHorizontal: 15,
  },
  galleryImage: {
    height: 52,
    width: 52,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: colours.white
  },
  moreImagesText: {
    ...FontWeights.Regular,
    ...FontSizes.Label,
    color: ThemeStatic.white,
    alignSelf: 'center',
  },
  linkContainer: {
    height: 30,
    borderRadius: 8,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 12,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  linkText: {
    ...FontSizes.Caption,
    ...FontWeights.Bold,
    color: ThemeStatic.gold,
    marginRight: 12,
  },
  line: {
    borderBottomColor: colours.text02,
    borderBottomWidth: 0.5,
    marginVertical: 15,
  },
  postButton: {
    backgroundColor: ThemeStatic.gold,
    width: 200,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 20,
  },
  postText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: ThemeStatic.white,
    marginLeft: 5,
  },
  commentEmptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35,
  },
  commentErrorText: {
    ...FontSizes.Caption,
    ...FontWeights.Bold,
    color: colours.text02,
  },
  interactionText: {
    ...FontSizes.SubText,
    ...FontWeights.Bold,
  },
});
