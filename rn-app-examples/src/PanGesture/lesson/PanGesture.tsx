import { View, StyleSheet } from "react-native";

import { Card, CARD_HEIGHT, CARD_WIDTH, Cards } from "../../components";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface GestureProps {
  width: number;
  height: number;
}

export const PanGesture = (props: GestureProps) => {
  const { width, height } = props;

  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number;
      offsetY: number;
    }
    >({
    onStart: (_, context) => {
      context.offsetX = translateX.value;
      context.offsetY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = clamp(context.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(context.offsetY + event.translationY, 0, boundY);
    },
    onEnd: (event, _) => {
      translateX.value = withDecay({ velocity: event.velocityX, clamp: [0, boundX]});
      translateY.value = withDecay({ velocity: event.velocityY, clamp: [0, boundY]});
    }
  });

  const style = useAnimatedStyle(() => {
    return { transform: [{translateX: translateX.value}, {translateY: translateY.value}]}
  })

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
