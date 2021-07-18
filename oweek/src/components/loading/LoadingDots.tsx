import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const dots = [1, 2, 3];
const INTERVAL = 300;

interface Props {
  size?: number;
  background?: string;
  activeBackground?: string;
  dotMargin?: number;
  animationDuration?: number;
  animationScale?: number;
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Dot: React.FC<Props & { active: boolean }> = ({
  active,
  size = 7,
  background = 'rgb(172, 172, 172)',
  activeBackground = '#808184',
  animationDuration = 400,
  animationScale = 1.4,
  dotMargin = 5,
}) => {
  const [scale] = useState<Animated.Value>(new Animated.Value(1));

  const scaleDown = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const scaleUp = () => {
    Animated.timing(scale, {
      toValue: animationScale,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (active) {
      scaleUp();
    } else {
      scaleDown();
    }
  });

  const style = {
    height: size,
    width: size,
    borderRadius: size / 2,
    marginHorizontal: dotMargin,
    backgroundColor: active ? activeBackground : background,
  };
  return <Animated.View style={[style, { transform: [{ scale }] }]} />;
};

/**
 * A simple animated loading Indicator.
 * Inspired by Artem Kosiakevych's loading component.
 */
const LoadingDots: React.FC<Props> = (props) => {
  const [active, setActive] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a > 2 ? 1 : a + 1));
    }, INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.main}>
      {dots.map((dot) => (
        <Dot {...props} active={dot === active} key={dot} />
      ))}
    </View>
  );
};

export default LoadingDots;
