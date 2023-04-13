import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { onGestureEvent } from "react-native-redash/lib/typescript/v1";
import { clamp } from "react-native-redash";

export const CONTROL_POINT_RADIUS = 20;

type Offset = { x: number; y: number };

interface ControlPointProps {
  x: SharedValue<number>;
  y: SharedValue<number>;
  min: number;
  max: number;
}

export const ControlPoint = ({ x, y, min, max }: ControlPointProps) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Offset
  >({
    onStart: (_, context) => {
      context.x = x.value;
      context.y = y.value;
    },
    onActive: (event, context) => {
      const { translationY, translationX } = event;
      x.value = clamp(context.x + translationX, min, max);
      y.value = clamp(context.y + translationY, min, max);
    },
    onEnd: (event, context) => {},
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value - CONTROL_POINT_RADIUS },
        { translateY: y.value - CONTROL_POINT_RADIUS },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: CONTROL_POINT_RADIUS * 2,
            height: CONTROL_POINT_RADIUS * 2,
            // backgroundColor: "rgba(100, 200, 300, 0.5)",
          },
          style,
        ]}
      />
    </PanGestureHandler>
  );
};
