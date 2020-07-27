import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path, Rect, Line } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const AnimatedLine = Animated.createAnimatedComponent(Line);

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const NotificationsSVG = ({ color, size }) => {
  console.log(size);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPath
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke={color}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default NotificationsSVG;
