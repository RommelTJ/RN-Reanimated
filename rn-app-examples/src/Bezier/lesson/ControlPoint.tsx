import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const CONTROL_POINT_RADIUS = 20;

interface ControlPointProps {
  x: SharedValue<number>;
  y: SharedValue<number>;
  min: number;
  max: number;
}

export const ControlPoint = ({ x, y }: ControlPointProps) => {
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: CONTROL_POINT_RADIUS * 2,
          height: CONTROL_POINT_RADIUS * 2,
        },
        style,
      ]}
    />
  );
};
