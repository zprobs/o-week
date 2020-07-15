import { useMutation } from '@apollo/react-hooks';
import React, {
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import { AuthContext, parseTimeElapsed } from '../../context';
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';
import DeleteCardRightActions from '../ReusableComponents/DeleteCardRightActions';

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
  min,
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

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

const MessageCard = ({
  chatId,
  image,
  name,
  participants,
  authorId,
  messageBody,
  numMessages,
  messages,
  seen,
  time,
  isOnline,
  onSwipe,
}) => {
  const { authState } = useContext(AuthContext);
  const { readableTime } = parseTimeElapsed(time);
  const navigation = useNavigation();
  // const [messageSeen] = useMutation(MUTATION_SEEN_MESSAGE);
  //  const [deleteChat, { loading: deleteChatLoading, called: deleteChatCalled }] = useMutation(MUTATION_DELETE_CHAT);

  const setSeenAndNavigate = () => {
    navigation.navigate('Conversation', {
      chatId,
      image,
      name,
      participants,
      numMessages,
      messages,
    });
  };

  const isHighlighted = authorId !== authState.user.uid && !seen;

  const highlightStyle = isHighlighted
    ? {
        ...FontWeights.Regular,
        color: colours.text01,
      }
    : null;

  const onlineDotColor = ThemeStatic.onlineDotColor[isOnline];
  const swipeableRef = useRef();

  const onDelete = () => {
    // if (!deleteChatLoading && !deleteChatCalled) {
    //     longPressDeleteNotification(() => {
    //         swipeableRef.current.close();
    //         deleteChat({ variables: { chatId } });
    //     });
    // }
  };

  const renderRightActions = (progress, dragX) => (
    <DeleteCardRightActions
      progress={progress}
      dragX={dragX}
      onDelete={onDelete}
    />
  );

  const onGestureEvent = (nativeEvent) => {
    const gestureEvent = Animated.event([{ nativeEvent }]);

    return {
      onHandlerStateChange: gestureEvent,
      onGestureEvent: gestureEvent,
    };
  };

  /// make a useValue function

  const onPanGesture = () => {
    const positionXRef = useRef(new Value(0));
    const translationXRef = useRef(new Value(0));
    const velocityXRef = useRef(new Value(0));
    const stateRef = useRef(new Value(State.UNDETERMINED));

    const positionX = positionXRef.current;
    const translationX = translationXRef.current;
    const velocityX = velocityXRef.current;
    const state = stateRef.current;
    const gestureHandler = onGestureEvent({
      x: positionX,
      translationX: translationX,
      velocityX: velocityX,
      state,
    });

    return {
      gestureHandler,
      positionX,
      translationX,
      velocityX,
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

  const Action = ({ x, deleteOpacity }) => {
    const size = cond(lessThan(x, HEIGHT), x, add(x, sub(x, HEIGHT)));
    const translateX = cond(lessThan(x, HEIGHT), 0, divide(sub(x, HEIGHT), 2));
    const borderRadius = divide(size, 2);
    const scale = interpolate(size, {
      inputRange: [20, 30],
      outputRange: [0.001, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    const iconOpacity = interpolate(size, {
      inputRange: [HEIGHT - 10, HEIGHT + 10],
      outputRange: [1, 0],
    });
    const textOpacity = sub(1, iconOpacity);
    return (
      <Animated.View
        style={{
          backgroundColor: '#D93F12',
          // borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
          height: HEIGHT,
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

  const HEIGHT = 65;

  const { gestureHandler, translationX, velocityX, state } = onPanGesture();
  //  In order to get rid of the red things being there at the start of render
  // the variables should be referenced lazily
  const dragX = useRef(new Value(0)).current;
  const offsetX = useRef(new Value(0)).current;
  const clock = useRef(new Clock()).current;
  const height = useRef(new Value(HEIGHT)).current;
  const deleteOpacity = useRef(new Value(1)).current;

  const { width } = Dimensions.get('window');
  const snapPoints = [-width, -70, 0];
  const to = snapPoint(dragX, velocityX, snapPoints);
  const shouldRemove = useRef(new Value(0)).current;

  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(dragX, add(offsetX, min(translationX, 0))),
      ),

      cond(eq(state, State.END), [
        set(dragX, timing({ clock, from: dragX, to })),
        set(offsetX, dragX),
        cond(eq(to, -width), set(shouldRemove, 1)),
      ]),
      cond(shouldRemove, [
        set(height, timing({ from: HEIGHT, to: 0 })),
        set(deleteOpacity, 0),
        // cond(not(clockRunning(clock)), call([], onSwipe)),
      ]),
    ],
    [],
  );

  return (
    // <Swipeable
    //   ref={swipeableRef}
    //   useNativeAnimations
    //   rightThreshold={-80}
    //   renderRightActions={renderRightActions}>

    <Animated.View>
      <View style={styles.background}>
        <TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
          <Action x={abs(dragX)} {...{ deleteOpacity }} />
        </TouchableWithoutFeedback>
      </View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{ height, transform: [{ translateX: dragX }] }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={setSeenAndNavigate}
            style={styles.container}>
            <View style={styles.avatar}>
              <Image source={{ uri: image }} style={styles.avatarImage} />
              <View
                style={[styles.onlineDot, { backgroundColor: onlineDotColor }]}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.nameText}>{name} </Text>
              <View style={styles.content}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.messageText, highlightStyle]}>
                  {messageBody}
                </Text>
                <Text style={[styles.timeText, highlightStyle]}>
                  {` · ${readableTime}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
    // </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingLeft: 5,
    // height: 65,
  },
  avatar: {
    height: 50,
    width: 50,
  },
  avatarImage: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: colours.placeholder,
  },
  onlineDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    bottom: 2.5,
    right: 2.5,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  nameText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: colours.text01,
  },
  content: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  messageText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    maxWidth: '70%',
    color: colours.text02,
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: colours.text02,
  },
  remove: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: 'white',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: '#E1E2E3',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    // position: 'absolute',
  },
});

export default MessageCard;
