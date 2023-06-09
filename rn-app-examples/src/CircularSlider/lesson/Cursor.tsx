import * as React from "react";
import { StyleSheet } from "react-native";

import { StyleGuide } from "../../components";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { canvas2Polar, clamp, polar2Canvas } from "react-native-redash";

const THRESHOLD = 0.001;

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
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offset: { x: number; y: number };
    }
  >({
    onStart: (event, ctx) => {
      ctx.offset = polar2Canvas({ theta: theta.value, radius: r }, center);
    },
    onActive: (event, ctx) => {
      const { translationX, translationY } = event;
      const x = ctx.offset.x + translationX;
      const y1 = ctx.offset.y + translationY;
      let y: number;
      if (x < r) {
        y = y1;
      } else if (theta.value < Math.PI) {
        y = clamp(y1, 0, r - THRESHOLD);
      } else {
        y = clamp(y1, r, 2 * r);
      }
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
