import * as React from 'react';
import Animated, { interpolate } from 'react-native-reanimated';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { useQuery } from '@apollo/react-hooks';
import { GET_UNREAD_NOTIFICATIONS_COUNT } from '../../graphql';
import { Text } from 'react-native';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const MyProfileSVG = ({ color, size, animatedFocus }) => {
  return (
    <>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <G
          transform="translate(4 3)"
          strokeWidth={2}
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round">
          <AnimatedPath
            d="M16 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2"
            stroke={color}
          />

          <AnimatedCircle cx={8} cy={4} r={4} stroke={color} />
        </G>
      </Svg>
      <Badge animatedFocus={animatedFocus} />
    </>
  );
};

const Badge = ({ animatedFocus }) => {
  const { authState } = useContext(AuthContext);
  const { data } = useQuery(GET_UNREAD_NOTIFICATIONS_COUNT, {
    variables: { id: authState.user.uid },
    pollInterval: 5000,
  });
  const badgeCount = data ? data.user.notifications.length : 0;

  return <BadgeView animatedFocus={animatedFocus} badgeCount={badgeCount} />;
};

export const BadgeView = ({ badgeCount, animatedFocus }) => (
  <Animated.View
    style={{
      position: 'absolute',
      right: -6,
      top: -3,
      backgroundColor: 'red',
      borderRadius: 7.5,
      width: badgeCount > 99 ? 22 : badgeCount > 9 ? 18 : 15,
      height: 15,
      justifyContent: 'center',
      alignItems: 'center',
      opacity:
        badgeCount > 0
          ? interpolate(animatedFocus, {
              inputRange: [0, 1],
              outputRange: [1, 0],
            })
          : 0,
    }}>
    <Text
      style={{
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 0,
        marginRight: 1,
        letterSpacing: -1,
      }}>
      {badgeCount > 99 ? '99+' : badgeCount}
    </Text>
  </Animated.View>
);

export default MyProfileSVG;
