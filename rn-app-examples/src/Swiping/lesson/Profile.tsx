import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export interface ProfileModel {
  id: string;
  name: string;
  age: number;
  profile: number;
}

const { width, height } = Dimensions.get("window");
export const α = Math.PI / 12;
export const A = Math.sin(α) * height + Math.cos(α) * width;
const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
  },
  name: {
    color: "white",
    fontSize: 32,
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#6ee3b4",
  },
  likeLabel: {
    fontSize: 32,
    color: "#6ee3b4",
    fontWeight: "bold",
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#ec5288",
  },
  nopeLabel: {
    fontSize: 32,
    color: "#ec5288",
    fontWeight: "bold",
  },
});

interface CardProps {
  profile: ProfileModel;
  onTop: boolean;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
}

export const Profile = ({ profile, translateX, translateY }: CardProps) => {
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]}>
      <Image style={styles.image} source={profile.profile} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={[styles.like]}>
            <Text style={styles.likeLabel}>LIKE</Text>
          </View>
          <View style={[styles.nope]}>
            <Text style={styles.nopeLabel}>NOPE</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{profile.name}</Text>
        </View>
      </View>
    </Animated.View>
  );
};
