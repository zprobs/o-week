import * as React from 'react';
import Animated, { call, interpolate } from 'react-native-reanimated';
import Svg, { G, Path, Circle, } from 'react-native-svg';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../context';
import { useQuery } from '@apollo/react-hooks';
import { GET_UNREAD_CHAT_COUNT, GET_UNREAD_NOTIFICATIONS_COUNT } from '../../graphql';
import { Text } from 'react-native';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const MyProfileSVG = ({ color, size, animatedFocus }) => {

  const {authState} = useContext(AuthContext)
  const isFocused = useRef(false)
  const {data, loading, error, startPolling, stopPolling, refetch} = useQuery(GET_UNREAD_NOTIFICATIONS_COUNT, {variables: {id: authState.user.uid }, pollInterval: isFocused.current ? 0 : 10000,})
  const badgeCount = data ? data.user.notifications.length : 0

  if (data) console.log('chats', data.user.userChats)

  return (
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

      <Animated.Code>
        {
          () => call([animatedFocus], ([animatedFocus]) => {
            if ( !isFocused.current && animatedFocus === 1) {
              isFocused.current = true
              stopPolling();
              console.log('stopped polling')
            }
            else if (isFocused.current && animatedFocus < 1) {
              isFocused.current = false
              refetch()
              startPolling(3000)
              console.log('start Polling')
            }
          })
        }
      </Animated.Code>

      <Animated.View
        style={{
          position: 'absolute',
          right: -6,
          top: -3,
          backgroundColor: 'red',
          borderRadius: 7,
          width: badgeCount > 99 ? 21 : badgeCount > 9 ? 17 :  14,
          height: 14,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: badgeCount > 0 ? interpolate( animatedFocus, {
            inputRange: [0, 1],
            outputRange: [1, 0]
          }) : 0
        }}
      >
        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: 'center', letterSpacing: -1  }}>
          {badgeCount > 99 ? '99+' : badgeCount}
        </Text>
      </Animated.View>
    </Svg>
  );
};

export default MyProfileSVG;
