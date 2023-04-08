/* eslint-disable react-native/no-unused-styles */

import { View, StyleSheet } from "react-native";

import { StyleGuide } from "../../components";
import { ReText, round } from "react-native-redash";
import Animated, { useDerivedValue } from "react-native-reanimated";

const styles = StyleSheet.create({
  date: {
    ...StyleGuide.typography.title3,
    textAlign: "center",
  },
  price: {
    ...StyleGuide.typography.title2,
    textAlign: "center",
  },
});

export interface DataPoint {
  coord: {
    x: number;
    y: number;
  };
  data: {
    x: number;
    y: number;
  };
}

interface LabelProps {
  point: Animated.SharedValue<DataPoint>;
}

export const Label = ({ point }: LabelProps) => {
  const date = useDerivedValue(() => {
    return new Date(point.value.data.x).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  const price = useDerivedValue(() => {
    const p = point.value.data.y;
    return `$ ${round(p, 2).toLocaleString("en-US", { currency: "USD" })}`;
  });

  return (
    <View>
      <ReText text={date} style={styles.date} />
      <ReText text={price} style={styles.date} />
    </View>
  );
};
