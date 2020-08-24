import React, { useRef } from 'react';
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
} from 'react-native';
import { ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/Feather';
import { linkError } from './SocialMediaIcons';
import { getHostnameFromRegex, parseTimeElapsed } from '../../context';
import GoBackHeader from '../Menu/GoBackHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { log } from 'react-native-reanimated';
import { useQuery } from '@apollo/react-hooks';
import AddCommentModal from '../Modal/AddCommentModal';
import { GET_POST_COMMENTS } from '../../graphql';

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
        navigation.push('PostScreen', { post: item, authorId: user.id })
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
        <Icon color={ThemeStatic.gold} name={'message-square'} size={26} />
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
  const { post, authorId } = route.params;
  const {
    data: commentsData,
    loading,
    error,
    refetch,
  } = useQuery(GET_POST_COMMENTS, {
    variables: { postId: post.id, offset: 0 },
  });
  const { images, link, text, user, time } = post;
  if (link) console.log('link', link);

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
      </View>
      <Text style={styles.body}>{text}</Text>
      {images && images.length > 0 && renderImages(images)}
      {renderLink(link)}
      <View style={styles.line} />
      <TouchableOpacity style={[styles.postButton, { alignSelf: 'center' }]} onPress={()=>addCommentsRef.current.open()}>
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
        renderItem={renderComment}
      />
      <AddCommentModal postId={post.id} authorId={authorId} ref={addCommentsRef} />
    </SafeAreaView>
  );
};

const renderComment = ({item}) => {
  const {user} = item
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.user}
          onPress={() =>
            navigation.navigate('Profile', { userId: user.id })
          }>
          <Image
            source={{
              uri: user.image,
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.time}>{parseTimeElapsed(item.time).readableTime}</Text>
          </View>
        </TouchableOpacity>
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
    marginVertical: 10,
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
});
