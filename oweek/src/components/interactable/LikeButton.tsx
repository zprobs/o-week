import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CheckUserLiked } from '@graphql/User';
import { LikePost, UnlikePost } from '@graphql/Post';
import { SendNotification } from '@graphql/Notification';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { likesFragment } from '@graphql/types/likesFragment';
import {
  checkUserLiked,
  checkUserLikedVariables,
} from '@graphql/types/checkUserLiked';
import { likePost, likePostVariables } from '@graphql/types/likePost';
import { LikesFragment } from '@graphql/Fragments';
import { processError } from '@util/messages';
import { unLikePost, unLikePostVariables } from '@graphql/types/unLikePost';
import LikeSVG from '@root/assets/svg/LikeSVG';
import { NotificationTypes } from '@root/types/constants';
import useStyles from './LikeButton.styles';

const aggLikesData = (count: number): likesFragment => {
  return {
    __typename: 'post',
    likes_aggregate: {
      __typename: 'like_aggregate',
      aggregate: {
        __typename: 'like_aggregate_fields',
        count,
      },
    },
  };
};

interface Props {
  postId: number;
  style: ViewStyle;
  authorId: string;
}

const LikeButton: React.FC<Props> = ({ postId, style, authorId }) => {
  const didSetFirst = useRef(false);
  const hasLiked = useRef(false);
  const [sendNotification] = useMutation(SendNotification);

  const styles = useStyles();

  const options = {
    variables: { postId, userId: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' },
  };

  const { data } = useQuery<checkUserLiked, checkUserLikedVariables>(
    CheckUserLiked,
    {
      ...options,
      fetchPolicy: 'cache-and-network',
    },
  );
  const [likePostMutation] = useMutation<likePost, likePostVariables>(
    LikePost,
    {
      ...options,
      update: (cache) => {
        try {
          const result = cache.readFragment<likesFragment>({
            id: `post:${postId}`,
            fragment: LikesFragment,
          });

          if (result) {
            const { likes_aggregate } = result;
            const newCount = (likes_aggregate?.aggregate?.count || 0) + 1;
            cache.writeFragment<likesFragment>({
              id: `post:${postId}`,
              fragment: LikesFragment,
              data: aggLikesData(newCount),
            });
          } else {
            processError(
              { message: 'Could not connect to server' },
              'Could not like post',
            );
          }
        } catch (e) {
          processError(e, 'Could not like post');
          console.log(e);
        }
      },
    },
  );
  const [unLikePostMutation] = useMutation<unLikePost, unLikePostVariables>(
    UnlikePost,
    {
      ...options,
      update: (cache) => {
        try {
          const result = cache.readFragment<likesFragment>({
            id: `post:${postId}`,
            fragment: LikesFragment,
          });

          if (result) {
            const { likes_aggregate } = result;
            const newCount = (likes_aggregate?.aggregate?.count || 0) - 1;

            cache.writeFragment<likesFragment>({
              id: `post:${postId}`,
              fragment: LikesFragment,
              data: aggLikesData(newCount),
            });
          } else {
            processError(
              { message: 'Could not connect to server' },
              'Could not like post',
            );
          }
        } catch (e) {
          processError(e, 'Could not like post');
          console.log(e);
        }
      },
    },
  );
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    didSetFirst.current = true;
    if (liked) {
      setLiked(false);
      unLikePostMutation();
    } else {
      setLiked(true);
      likePostMutation().then((result) => {
        if (!hasLiked.current) {
          hasLiked.current = true;
          if (
            authorId !== 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' &&
            result?.data?.insert_like_one?.id
          ) {
            sendNotification({
              variables: {
                type: NotificationTypes.newLike,
                typeId: result.data.insert_like_one.id.toString(),
                recipient: authorId,
              },
            }).catch((e) => console.log(e));
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!didSetFirst.current && data) {
      if (data.like) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [data, postId]);

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <View style={styles.container}>
        <LikeSVG liked={liked} />
      </View>
      <Text style={styles.countText}>
        {(data?.post?.likes_aggregate?.aggregate?.count || 0) > 99
          ? '99+'
          : data?.post?.likes_aggregate?.aggregate?.count || '·'}
      </Text>
    </TouchableOpacity>
  );
};

export default LikeButton;
