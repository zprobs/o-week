import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
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
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';
import { UNSUBSCRIBE_FROM_CHAT, DELETE_CHAT, UPDATE_MESSAGE_SEEN } from '../../graphql';
import gql from 'graphql-tag';

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
  lessOrEq,
  greaterOrEq,
  and,
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
  senderId,
  messageBody,
  numMessages,
  messages,
  seen,
  time,
  isOnline,
  onSwipe,
  chatName
}) => {
  const HEIGHT = 65;
  const { authState } = useContext(AuthContext);
  const { readableTime } = parseTimeElapsed(time);
  const navigation = useNavigation();
  const [
    unsubscribeFromChat,
    { loading: unsubscribeLoading, error: unsubscribeError },
  ] = useMutation(UNSUBSCRIBE_FROM_CHAT, { variables: { chatId: chatId, userId: authState.user.uid } });

  const [deleteChat] = useMutation(DELETE_CHAT, {variables: {chatId: chatId}})

  const useValue = (value) => useConst(() => new Value(value));
  const useClock = () => useConst(() => new Clock());

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

  const isHighlighted = senderId !== authState.user.uid && !seen;


  const setSeenAndNavigate = () => {
    navigation.navigate('Conversation', {
      chatId,
      image,
      name,
      participants,
      numMessages,
      messages,
      isHighlighted,
      chatName
    });
  };

  const highlightStyle = isHighlighted
    ? {
        ...FontWeights.Regular,
        color: colours.text01,
      }
    : null;

  const onlineDotColor = ThemeStatic.onlineDotColor[isOnline];

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

  const DeleteAction = ({ x, deleteOpacity }) => {
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
  const height = useValue(HEIGHT);
  const deleteOpacity = useValue(1);
  // const isSwiped = useValue(0);

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
        set(height, timing({ from: HEIGHT, to: 0 })),
        set(deleteOpacity, 0),
        cond(
          not(clockRunning(clock)),
          call([], () => {
            if (participants.length <= 2) {
              deleteChat()
            } else {
              unsubscribeFromChat()
            }
          }),
        ),
      ]),
    ],
    [],
  );

  return (
    <Animated.View>
      <View style={styles.background}>
        <TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
          <DeleteAction x={abs(dragX)} {...{ deleteOpacity }} />
        </TouchableWithoutFeedback>
      </View>
      <PanGestureHandler {...gestureHandler} activeOffsetX={[-5, 5]}>
        <Animated.View style={{ height, transform: [{ translateX: dragX }] }}>
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={setSeenAndNavigate}
              style={styles.touchable}>
              <View style={styles.avatar}>
                <Image source={{ uri: image }} style={styles.avatarImage} />
                <View
                  style={[
                    styles.onlineDot,
                    { backgroundColor: onlineDotColor },
                  ]}
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
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFFFF',
    paddingBottom: 50,
  },
  touchable: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingLeft: 5,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    maxWidth: '70%',
    color: colours.text03,
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: colours.text03,
  },
  remove: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E1E2E3',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    // position: 'absolute',
  },
});

export default MessageCard;
