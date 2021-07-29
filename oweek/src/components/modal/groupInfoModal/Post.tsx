import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { getGroupPosts_group_posts } from '@graphql/types/getGroupPosts';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import parseTimeElapsed from '@root/util/parseTimeElapsed';
import getTheme from '@root/theme';
import LikeButton from '@components/interactable/LikeButton';
import RenderImages from '@views/post/RenderImages';
import RenderLink from '@views/post/RenderLink';
import useStyles from './Post.styles';

interface Props {
  item: getGroupPosts_group_posts;
  index: number;
}

const Post: React.FC<Props> = ({ item, index }) => {
  const navigation = useNavigation();
  const styles = useStyles();
  const theme = getTheme();

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

  let numberOfLines = 5;
  if (hasContent) {
    numberOfLines = images && images.length > 0 ? 2 : 3;
  }

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...containerBorderRadius }}
      onPress={() =>
        navigation.navigate('PostScreen', {
          postId: item.id,
          authorId: user.id,
        })
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
          <LikeButton
            style={{ marginRight: 10, alignItems: 'center' }}
            postId={item.id}
            authorId={user.id}
          />
          <View style={{ alignItems: 'center' }}>
            <Icon
              color={theme.palette.gold}
              name="message-square"
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
            <Text style={styles.time}>
              {(item?.comments_aggregate?.aggregate?.count || 0) > 99
                ? '99+'
                : item?.comments_aggregate?.aggregate?.count}
            </Text>
          </View>
        </View>
      </View>
      <Text numberOfLines={numberOfLines} style={styles.body}>
        {text}
      </Text>
      {hasContent ? (
        <View>
          {images && images.length > 0 ? (
            <RenderImages images={images} />
          ) : (
            <RenderLink link={link} />
          )}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default Post;
