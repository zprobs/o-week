import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const SIZE = 7;
const MARGIN = 5;
const BG = 'rgb(172, 172, 172)';
const ACTIVE_BG = '#808184';
const dots = [1, 2, 3];
const INTERVAL = 300;
const ANIMATION_DURATION = 400;
const ANIMATION_SCALE = 1.4;

/**
 * A simple animated loading Indicator. Parameters can be found in the defaultProps object inside of Dot.
 * @author ArtemKosiakevych It has been adapted to suppress unnecessary warnings.
 */
export default class LoadingDots extends React.Component {
  state = {
    active: 1,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const active = this.state.active;
      this.setState({ active: active > 2 ? 1 : active + 1 });
    }, INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const active = this.state.active;
    return (
      <View style={styles.main}>
        {dots.map((dot, index) => (
          <Dot {...this.props} active={dot === active} key={index} />
        ))}
      </View>
    );
  }
}

class Dot extends React.Component {
  static defaultProps = {
    size: SIZE,
    background: BG,
    activeBackground: ACTIVE_BG,
    dotMargin: MARGIN,
    animationDuration: ANIMATION_DURATION,
    animationScale: ANIMATION_SCALE,
  };

  constructor(props) {
    super(props);
    this.scale = new Animated.Value(1);
  }

  componentDidMount() {
    if (this.props.active) this.scaleUp();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active && !this.props.active) {
      this.scaleDown();
    }
    if (!prevProps.active && this.props.active) {
      this.scaleUp();
    }
  }

  scaleDown = () => {
    Animated.timing(this.scale, {
      toValue: 1,
      duration: this.props.animationDuration,
      useNativeDriver: true,
    }).start();
  };

  scaleUp = () => {
    Animated.timing(this.scale, {
      toValue: this.props.animationScale,
      duration: this.props.animationDuration,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      active,
      size,
      background,
      activeBackground,
      dotMargin,
    } = this.props;
    const style = {
      height: size,
      width: size,
      borderRadius: size / 2,
      marginHorizontal: dotMargin,
      backgroundColor: active ? activeBackground : background,
    };
    return (
      <Animated.View style={[style, { transform: [{ scale: this.scale }] }]} />
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
