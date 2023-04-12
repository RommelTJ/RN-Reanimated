import type { ReactElement } from "react";
import React from "react";
import { ScrollView } from "react-native";
import { SortableItem } from "./SortableItem";
import { useSharedValue } from "react-native-reanimated";

interface SortableListProps {
  children: ReactElement[];
  item: { width: number; height: number };
}

export const SortableList = ({ children, item }: SortableListProps) => {
  const offsets = children.map((_, idx) => ({
    y: useSharedValue(item.height * idx),
  }));
  return (
    <ScrollView
      contentContainerStyle={{ height: item.height * children.length }}
    >
      {children.map((child, idx) => {
        return (
          <SortableItem
            key={idx}
            index={idx}
            offsets={offsets}
            width={item.width}
            height={item.height}
          >
            {child}
          </SortableItem>
        );
      })}
    </ScrollView>
  );
};
