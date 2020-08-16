import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useContext } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_UNREAD_CHAT_COUNT } from '../../graphql';
import { AuthContext } from '../../context';
import { BadgeView } from './MyProfileSVG';

const AnimatedPath = Animated.createAnimatedComponent(Path);

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const MessagesSVG = ({ color, size, animatedFocus }) => {
  return (
    <>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <AnimatedPath
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          stroke={color}
          strokeWidth={2}
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <Badge animatedFocus={animatedFocus} />
    </>
  );
};

const Badge = ({ animatedFocus }) => {
  const { authState } = useContext(AuthContext);
  const { data } = useSubscription(GET_UNREAD_CHAT_COUNT, {
    variables: { id: authState.user.uid },
  });

  const badgeCount = data ? data.user.userChats.length : 0;

  return <BadgeView animatedFocus={animatedFocus} badgeCount={badgeCount} />;
};

export default MessagesSVG;
