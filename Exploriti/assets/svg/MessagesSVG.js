import * as React from 'react';
import Animated, { call, interpolate } from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';
import { Text, View } from 'react-native';
import { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_UNREAD_CHAT_COUNT } from '../../graphql';
import { AuthContext } from '../../context';

const AnimatedPath = Animated.createAnimatedComponent(Path);

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const MessagesSVG = ({ color, size, animatedFocus }) => {
  const {authState} = useContext(AuthContext)
  const {data, loading, error} = useQuery(GET_UNREAD_CHAT_COUNT, {variables: {id: authState.user.uid }, pollInterval: 3000})
  const badgeCount = data ? data.user.userChats.length : 0


  const focusLength = animatedFocus.__inputNodes.length
  const value = animatedFocus.__inputNodes[focusLength-1]._value
  console.log('value', value );


  return (
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

export default MessagesSVG;
