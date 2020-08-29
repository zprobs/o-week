import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path, G } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const NotificationsSVG = ({ color, size }) => {

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G
        stroke={color}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
      <AnimatedPath
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"

      />
      <AnimatedPath
        d="M13.73 21a2 2 0 0 1-3.46 0"
      />
      </G>
    </Svg>
  );
};

export default NotificationsSVG;
