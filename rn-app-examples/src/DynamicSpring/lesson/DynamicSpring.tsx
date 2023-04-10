import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../../components";

import { DraggableCard } from "./DraggableCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

interface DynamicSpringProps {
  width: number;
  height: number;
}

export const DynamicSpring = ({ width, height }: DynamicSpringProps) => {
  const translate = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };

  const translateX2 = useDerivedValue(() => withSpring(translate.x.value));
  const translateY2 = useDerivedValue(() => withSpring(translate.y.value));
  const style2 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX2.value },
        { translateY: translateY2.value },
      ],
    };
  });

  const translateX3 = useDerivedValue(() => withSpring(translateX2.value));
  const translateY3 = useDerivedValue(() => withSpring(translateY2.value));
  const style3 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX3.value },
        { translateY: translateY3.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, style3]}>
        <Card card={Cards.Card3} />
      </Animated.View>
      <Animated.View style={[styles.card, style2]}>
        <Card card={Cards.Card2} />
      </Animated.View>
      <DraggableCard width={width} height={height} translate={translate} />
    </View>
  );
};
