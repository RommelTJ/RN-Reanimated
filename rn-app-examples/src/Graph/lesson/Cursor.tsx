import { Dimensions, StyleSheet, View } from "react-native";

import type { Path } from "../../components/AnimatedHelpers";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { DataPoint } from "./Label";

const CURSOR = 100;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  cursorContainer: {
    width: CURSOR,
    height: CURSOR,
    justifyContent: "center",
    alignItems: "center",
  },
  cursor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#367be2",
    borderWidth: 4,
    backgroundColor: "white",
  },
});

interface CursorProps {
  path: Path;
  length: SharedValue<number>;
  point: Animated.SharedValue<DataPoint>;
}

export const Cursor = ({ path, length, point }: CursorProps) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number;
      offsetY: number;
    }
  >({
    onStart: (event, ctx) => {
      ctx.offsetX = interpolate(
        length.value,
        [0, path.length],
        [0, width],
        Extrapolation.CLAMP
      );
    },
    onActive: (event, ctx) => {
      length.value = interpolate(
        ctx.offsetX + event.translationX,
        [0, width],
        [0, path.length],
        Extrapolation.CLAMP
      );
    },
  });
  const style = useAnimatedStyle(() => {
    const translateX = point.value.coord.x - CURSOR / 2;
    const translateY = point.value.coord.y - CURSOR / 2;
    return {
      transform: [{ translateX }, { translateY }],
    };
  });
  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.cursorContainer, style]}>
          <View style={styles.cursor} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
