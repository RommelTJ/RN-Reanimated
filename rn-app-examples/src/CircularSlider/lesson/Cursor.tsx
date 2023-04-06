import * as React from "react";
import { StyleSheet } from "react-native";

import { StyleGuide } from "../../components";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { canvas2Polar, polar2Canvas } from "react-native-redash";

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: SharedValue<number>;
}

export const Cursor = ({ r, strokeWidth, theta }: CursorProps) => {
  const center = { x: r, y: r };
  const style = useAnimatedStyle(() => {
    const { x: translateX, y: translateY } = polar2Canvas(
      {
        theta: theta.value,
        radius: r,
      },
      center
    );
    return {
      transform: [{ translateX }, { translateY }],
    };
  });
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      const { translationX, translationY } = event;
      theta.value = canvas2Polar(
        { x: translationX, y: translationY },
        center
      ).theta;
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            borderColor: "white",
            borderWidth: 5,
            backgroundColor: StyleGuide.palette.primary,
          },
          style,
        ]}
      />
    </PanGestureHandler>
  );
};
