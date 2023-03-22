import { View, StyleSheet } from "react-native";

import { Card, Cards } from "../../components";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// interface GestureProps {
//   width: number;
//   height: number;
// }

export const PanGesture = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event, _) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
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
