import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { G, Rect, Line } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const AnimatedLine = Animated.createAnimatedComponent(Line);

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const ScheduleSVG = ({ color, size }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G strokeWidth={2}>
        <AnimatedRect
          stroke={color}
          rx="3"
          height="19.5"
          width="22"
          y="3.7"
          x="1"
          fill="none"
        />
        <AnimatedRect
          rx="1"
          height="6"
          width="1"
          y="1"
          x="6"
          stroke={color}
          fill={color}
        />
        <AnimatedRect
          rx="1"
          height="6"
          width="1"
          y="1"
          x="17"
          stroke={color}
          fill={color}
        />
        <AnimatedLine
          stroke-linecap="null"
          stroke-linejoin="null"
          y2="11.064509"
          x2="23.286173"
          y1="11.064509"
          x1="0.906753"
          stroke={color}
          fill="none"
        />
      </G>
    </Svg>
  );
};

export default ScheduleSVG;
