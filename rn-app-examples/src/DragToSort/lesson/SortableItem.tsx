import React, { ReactElement } from "react";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

type Props = {
  index: number;
  offsets: { y: SharedValue<number> }[];
  children: ReactElement;
  width: number;
  height: number;
  activeCard: SharedValue<number>;
};
export const SortableItem = (props: Props) => {
  const { index, offsets, children, width, height, activeCard } = props;

  const currentOffset = offsets[index];
  const x = useSharedValue(0);
  const y = useSharedValue(currentOffset.y.value);
  const isGestureActive = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetY: number }
  >({
    onStart: (_, context) => {
      activeCard.value = index;
      isGestureActive.value = true;
      context.offsetY = y.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX;
      y.value = event.translationY + context.offsetY;
      const offsetY = Math.round(y.value / height) * height;
      offsets.forEach((offset, idx) => {
        if (offset.y.value == offsetY && index !== idx) {
          offset.y.value = currentOffset.y.value;
          currentOffset.y.value = offsetY;
        }
      });
    },
    onEnd: () => {
      isGestureActive.value = false;
      x.value = withSpring(0);
      y.value = withSpring(currentOffset.y.value);
    },
  });

  const translateY = useDerivedValue(() => {
    return isGestureActive.value ? y.value : withSpring(currentOffset.y.value);
  });
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width,
      height,
      transform: [
        { translateY: translateY.value },
        { translateX: x.value },
        { scale: withSpring(isGestureActive.value ? 1.05 : 1) },
      ],
      zIndex: activeCard.value == index ? 100 : 1,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>{children}</Animated.View>
    </PanGestureHandler>
  );
};
