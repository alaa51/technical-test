import React from 'react';
import {Dimensions} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {styles} from '../styles.tsx';

const Delete =
  'https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-52-103683.png';
const Like =
  'https://png2.cleanpng.com/sh/3d98a21dfc1be00674b734ba0e82abbb/L0KzQYm3VsE3N6lng5H0aYP2gLBuTgRpfZ5nReVyZ37kfH7qjB1xfaVqip9yY3Bxg37ziftmNZpoh9C2NXK1RLPoUsZibZVmfqs3NkO4SYq4WccyPWMASaU8NkC5R4K9Ur5xdpg=/kisspng-thumb-signal-computer-icons-like-icon-5b24ba26aedaf9.6359919715291336067162.png';

const BUTTON_WIDTH = Dimensions.get('screen').width;
const SWIPE_RANGE_RIGHT = -100;
const SWIPE_RANGE_LEFT = 100;

export type SwipeButtonPropsType = {
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  panRef: any;
  title: string;
  index: number;
};

const SwipeableButton = ({
  panRef,
  index,
  onSwipeRight,
  onSwipeLeft,
  title,
}: SwipeButtonPropsType) => {
  const X = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const longPressGesture = Gesture.LongPress()
    .withTestId('long-press')
    .onStart(() => {
      isDragging.value = true;
    })
    .minDuration(100);

  const animatedGestureHandler = Gesture.Pan()
    .withRef(panRef)
    .withTestId('pan')
    .manualActivation(true)
    .onTouchesMove((_e, state) => {
      if (isDragging.value) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
    })
    .simultaneousWithExternalGesture(longPressGesture)
    .onUpdate(e => {
      const newValue = e.translationX;
      if (newValue >= 0 && newValue <= SWIPE_RANGE_LEFT) {
        X.value = newValue;
      }
      if (newValue <= 0 && newValue >= SWIPE_RANGE_RIGHT) {
        X.value = newValue;
      }
    })
    .onEnd(() => {
      if (X.value < SWIPE_RANGE_LEFT - 20) {
        X.value = withSpring(0);
      } else {
        runOnJS(onSwipeLeft)();
      }

      if (X.value > SWIPE_RANGE_RIGHT + 20) {
        X.value = withSpring(0);
      } else {
        runOnJS(onSwipeRight)();
      }
    });

  const AnimatedStyles = {
    swipeButton: useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: interpolate(
              X.value,
              [-BUTTON_WIDTH, -20, 20, BUTTON_WIDTH],
              [-BUTTON_WIDTH, 0, 0, BUTTON_WIDTH],
              Extrapolation.CLAMP,
            ),
          },
        ],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          [-BUTTON_WIDTH / 4, 0, BUTTON_WIDTH / 4],
          [0, 1, 0],
          Extrapolation.CLAMP,
        ),
      };
    }),
    iconLeft: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          [20, SWIPE_RANGE_LEFT],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      };
    }),
    iconRight: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          [-20, SWIPE_RANGE_RIGHT],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      };
    }),
  };

  return (
    <GestureHandlerRootView style={styles.fullFlex}>
      <GestureDetector
        gesture={Gesture.Race(animatedGestureHandler, longPressGesture)}>
        <Animated.View
          entering={FadeIn.delay(100 * index)}
          exiting={FadeOut}
          style={styles.flexCenter}>
          <Animated.Image
            source={{uri: Delete}}
            style={[styles.iconLeft, AnimatedStyles.iconLeft]}
          />
          <Animated.View
            style={[styles.swipeButtonContainer, AnimatedStyles.swipeButton]}>
            <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
              {title}
            </Animated.Text>
          </Animated.View>
          <Animated.Image
            source={{uri: Like}}
            style={[styles.iconRight, AnimatedStyles.iconRight]}
          />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

SwipeableButton.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
  panRef: null,
  title: '',
  index: 0,
  testID: 'swipeable-button',
};

export default SwipeableButton;
