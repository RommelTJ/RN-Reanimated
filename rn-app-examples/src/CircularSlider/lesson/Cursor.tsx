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
    onStart: (event, ctx) => {
      ctx.offset = polar2Canvas({ theta: theta.value, radius: r }, center);
    },
    onActive: (event, ctx) => {
      const { translationX, translationY } = event;
      const x = ctx.offset.x + translationX;
      const y = ctx.offset.y + translationY;
      const value = canvas2Polar({ x, y }, center).theta;
      theta.value = value > 0 ? value : 2 * Math.PI + value;
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
