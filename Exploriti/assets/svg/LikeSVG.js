import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import {
  CHECK_USER_LIKED,
  GET_UNREAD_CHAT_COUNT,
  LIKE_POST, SEND_NOTIFICATION,
  UNLIKE_POST,
} from '../../graphql';
import { AuthContext, NotificationTypes } from '../../context';
import { BadgeView } from './MyProfileSVG';
import { ThemeStatic } from '../../theme/Colours';
import { Text, TouchableOpacity, View } from 'react-native';
import gql from 'graphql-tag';
import Fonts from '../../theme/Fonts';
const { FontWeights, FontSizes } = Fonts;

const likesFragment = gql`
  fragment likesFragment on post {
    likes_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const aggLikesData = (count) => {
  return {
    __typename: 'post',
    likes_aggregate: {
      __typename: 'like_aggregate',
      aggregate: {
        __typename: 'like_aggregate_fields',
        count: count,
      },
    },
  };
};

const LikeSVG = ({ postId, style, authorId }) => {
  const { authState } = useContext(AuthContext);
  const didSetFirst = useRef(false);
  const hasLiked = useRef(false)
  console.log('postId', postId);
  const [sendNotification] = useMutation(SEND_NOTIFICATION);

  const options = { variables: { postId: postId, userId: authState.user.uid } };

  const { data } = useQuery(CHECK_USER_LIKED, {
    ...options,
    fetchPolicy: 'cache-and-network',
  });
  const [likePost] = useMutation(LIKE_POST, {
    ...options,
    update: (cache) => {
      try {
        const { likes_aggregate } = cache.readFragment({
          id: `post:${postId}`,
          fragment: likesFragment,
        });

        let newCount = likes_aggregate.aggregate.count + 1;

        cache.writeFragment({
          id: `post:${postId}`,
          fragment: likesFragment,
          data: aggLikesData(newCount),
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
  const [unLikePost] = useMutation(UNLIKE_POST, {
    ...options,
    update: (cache) => {
      try {
        const { likes_aggregate } = cache.readFragment({
          id: `post:${postId}`,
          fragment: likesFragment,
        });

        let newCount = likes_aggregate.aggregate.count - 1;

        cache.writeFragment({
          id: `post:${postId}`,
          fragment: likesFragment,
          data: aggLikesData(newCount),
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
  const [liked, setLiked] = useState(false);

  console.log('didsetfrist', didSetFirst.current);

  const handlePress = () => {
    didSetFirst.current = true;
    if (liked) {
      setLiked(false);
      unLikePost();
    } else {
      setLiked(true);
      likePost().then(() => {
        if (!hasLiked.current) {
          hasLiked.current = true;
          sendNotification({
            variables: {
              type: NotificationTypes.newLike,
              typeId: postId.toString(),
              recipient: authorId,
            },
          }).catch((e) => console.log(e));

        }
      });
    }
  };


  useEffect(() => {
    if (!didSetFirst.current && data) {
      if (data.like) {
        setLiked(true);
      } else {
        setLiked(false)
      }
    }

  }, [data, postId]);

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <View style={{padding: 4}}>
      <Svg width={26} height={26} viewBox="0 0 24 24">
        <Path
          d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
          stroke={ThemeStatic.accent}
          strokeWidth={2}
          fill={liked ? ThemeStatic.lightBlue : 'none'}
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      </View>
      <Text
        style={{
          ...FontSizes.SubText,
          ...FontWeights.Bold,
          color: ThemeStatic.accent,
        }}>
        {data && data.post.likes_aggregate.aggregate.count > 99
          ? '99+'
          : data ?  data.post.likes_aggregate.aggregate.count : '·'}
      </Text>
    </TouchableOpacity>
  );
};

export default LikeSVG;
