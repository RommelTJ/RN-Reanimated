import type { ProfileModel } from "./Profile";
import { A, Profile } from "./Profile";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Dimensions, StyleSheet } from "react-native";
import { snapPoint } from "react-native-redash";

const snapPoints = [-A, 0, A];

type Offset = { x: number; y: number };

interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  onTop: boolean;
  scale: SharedValue<number>;
}

const { width } = Dimensions.get("window");

export const Swipeable = ({ profile, onTop, onSwipe, scale }: SwiperProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Offset
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
      context.y = translateY.value;
    },
    onActive: (event, context) => {
      const { translationX, translationY } = event;
      translateX.value = translationX + context.x;
      translateY.value = translationY + context.y;
      scale.value = interpolate(
        translateX.value,
        [-width / 2, 0, width / 2],
        [1, 0.95, 1],
        Extrapolation.CLAMP
      );
    },
    onEnd: (event, _) => {
      const { velocityX, velocityY } = event;
      // Calculates the position of X, depending on the velocity, in 200ms, and then takes closest point to snap points.
      const destination = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        destination,
        {
          velocity: velocityX,
          restSpeedThreshold: destination == 0 ? 0.01 : 100,
          restDisplacementThreshold: destination === 0 ? 0.01 : 100,
        },
        () => {
          // This is the side effect. We are in the UI thread and we call back to the UI thread to do this.
          if (destination !== 0) {
            runOnJS(onSwipe)();
          }
        }
      );
      translateY.value = withSpring(0, { velocity: velocityY });
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Profile
          profile={profile}
          onTop={onTop}
          translateX={translateX}
          translateY={translateY}
          scale={scale}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
