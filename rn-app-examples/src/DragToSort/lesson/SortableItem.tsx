import React, { ReactElement } from "react";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

type Props = {
  index: number;
  offsets: { y: SharedValue<number> }[];
  children: ReactElement;
  width: number;
  height: number;
};
export const SortableItem = (props: Props) => {
  const { index, offsets, children, width, height } = props;
  const currentOffset = offsets[index];
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width,
      height,
      transform: [{ translateY: currentOffset.y.value }],
    };
  });
  const onGestureEvent = useAnimatedGestureHandler({});

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>{children}</Animated.View>
    </PanGestureHandler>
  );
};
