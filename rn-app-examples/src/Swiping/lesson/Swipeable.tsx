import type { ProfileModel } from "./Profile";
import { Profile } from "./Profile";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

type Offset = { x: number; y: number };

interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  onTop: boolean;
}

export const Swipeable = ({ profile, onTop }: SwiperProps) => {
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
    },
    // onEnd: (event, context) => {},
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Profile
          profile={profile}
          onTop={onTop}
          translateX={translateX}
          translateY={translateY}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
