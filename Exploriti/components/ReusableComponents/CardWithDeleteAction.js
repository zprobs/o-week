import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../theme/Fonts';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

const {
  Clock,
  cond,
  eq,
  add,
  set,
  useCode,
  multiply,
  abs,
  sub,
  min: min2,
  Value,
  block,
  timing: reTiming,
  not,
  clockRunning,
  stopClock,
  startClock,
  call,
  lessThan,
  divide,
  interpolate,
  Extrapolate,
} = Animated;

const { FontWeights, FontSizes } = Fonts;

/**
 * Wrapper for card component to enable swipe-to-delete
 *
 * @param Card Component to enable swipe-to-delete on
 * @param deleteFunction {Function} Function to delete item from backend
 * @param cardHeight {int} height of Card component
 * @returns {*}
 * @constructor
 */

const CardWithDeleteAction = ({ Card, deleteFunction, cardHeight }) => {
  const useConst = (initialValue) => {
    const ref = useRef();
    if (ref.current === undefined) {
      // Box the value in an object so we can tell if it's initialized even if the initializer
      // returns/is undefined
      ref.current = {
        value:
          typeof initialValue === 'function' ? initialValue() : initialValue,
      };
    }
    return ref.current.value;
  };
  const useValue = (value) => useConst(() => new Value(value));
  const useClock = () => useConst(() => new Clock());

  const onGestureEvent = (nativeEvent) => {
    const gestureEvent = Animated.event([{ nativeEvent }], {
      listener: ({ event }) => console.log(event),
    });

    return {
      onHandlerStateChange: gestureEvent,
      onGestureEvent: gestureEvent,
    };
  };

  const onPanGesture = () => {
    const positionX = useValue(0);
    const translationX = useValue(0);
    const velocityX = useValue(0);
    const positionY = useValue(0);
    const translationY = useValue(0);
    const velocityY = useValue(0);
    const state = useValue(State.UNDETERMINED);

    const gestureHandler = onGestureEvent({
      x: positionX,
      translationX: translationX,
      velocityX: velocityX,
      y: positionY,
      translationY: translationY,
      velocityY: velocityY,
      state,
    });

    return {
      gestureHandler,
      positionX,
      translationX,
      velocityX,
      positionY,
      translationY,
      velocityY,
      state,
    };
  };

  const snapPoint = (value, velocity, points) => {
    const point = add(value, multiply(0.2, velocity));
    const diffPoint = (p) => abs(sub(point, p));
    const deltas = points.map((p) => diffPoint(p));
    const minDelta = min(...deltas);

    return points.reduce(
      (acc, p) => cond(eq(diffPoint(p), minDelta), p, acc),
      new Value(),
    );
  };

  const animate = ({ fn, clock, state, config, from }) =>
    block([
      cond(not(clockRunning(clock)), [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, from),
        startClock(clock),
      ]),
      fn(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position,
    ]);

  const timing = (params) => {
    const { clock, easing, duration, from, to } = {
      clock: new Clock(),
      easing: Easing.linear,
      duration: 250,
      from: 0,
      to: 1,
      ...params,
    };

    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = { toValue: new Value(0), duration, easing };

    return block([
      cond(not(clockRunning(clock)), [
        set(config.toValue, to),
        set(state.frameTime, 0),
      ]),
      animate({
        clock,
        fn: reTiming,
        state,
        config,
        from,
      }),
    ]);
  };

  const Animation = ({ x, deleteOpacity }) => {
    const size = cond(lessThan(x, cardHeight), x, add(x, sub(x, cardHeight)));
    const translateX = cond(lessThan(x, cardHeight), 0, divide(sub(x, cardHeight), 2));
    const borderRadius = divide(size, 2);
    const scale = interpolate(size, {
      inputRange: [20, 30],
      outputRange: [0.001, 1],
      extrapolate: Extrapolate.CLAMP,
    });

    const iconOpacity = interpolate(size, {
      inputRange: [cardHeight - 10, cardHeight + 10],
      outputRange: [1, 0],
    });
    const textOpacity = sub(0.6, iconOpacity);
    return (
      <Animated.View
        style={{
          backgroundColor: '#D93F12',
          borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
          height: size,
          width: size,
          transform: [{ translateX }],
        }}>
        <Animated.View
          style={{
            height: 5,
            width: 20,
            backgroundColor: 'white',
            opacity: iconOpacity,
            transform: [{ scale }],
          }}
        />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: multiply(textOpacity, deleteOpacity),
          }}>
          <Text style={styles.remove}>Remove</Text>
        </Animated.View>
      </Animated.View>
    );
  };

  const min = (...args) => args.reduce((acc, arg) => min2(acc, arg));

  const { gestureHandler, translationX, velocityX, state } = onPanGesture();
  const dragX = useValue(0);
  const offsetX = useValue(0);
  const clock = useClock();
  const height = useValue(cardHeight);
  const deleteOpacity = useValue(1);

  const { width } = Dimensions.get('window');
  const snapPoints = [-width, -100, 0];
  const to = snapPoint(dragX, velocityX, snapPoints);

  const shouldRemove = useValue(0);

  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(dragX, add(offsetX, min(translationX, 0))),
      ),
      cond(eq(state, State.END), [
        [
          set(dragX, timing({ clock, from: dragX, to })),
          set(offsetX, dragX),
          cond(eq(to, -width), set(shouldRemove, 1)),
        ],
      ]),
      cond(shouldRemove, [
        set(height, timing({ from: cardHeight, to: 0 })),
        set(deleteOpacity, 0),
        cond(not(clockRunning(clock)), call([], deleteFunction)),
      ]),
    ],
    [],
  );

  return (
    <Animated.View>
      <View style={styles.background}>
        <TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
          <Animation x={abs(dragX)} {...{ deleteOpacity }} />
        </TouchableWithoutFeedback>
      </View>

      <PanGestureHandler {...gestureHandler} activeOffsetX={[-5, 5]}>
        <Animated.View style={{ height, transform: [{ translateX: dragX }] }}>
          {Card}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E1E2E3',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    // position: 'absolute',
  },

  remove: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardWithDeleteAction;
