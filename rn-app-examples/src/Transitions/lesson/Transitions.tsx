import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Button, StyleGuide, cards } from "../../components";

import { AnimatedCard } from "./AnimatedCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

const useSpring = (state: boolean) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = state ? 1 : 0;
  }, [state, value]);
  return useDerivedValue(() => {
    return withSpring(value.value);
  });
};

export const Transitions = () => {
  const [toggled, setToggle] = useState(false);
  const transition = useSpring(toggled);

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
    </View>
  );
};
