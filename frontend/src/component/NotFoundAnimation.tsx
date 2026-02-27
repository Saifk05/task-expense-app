import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const animationSource = require("../../assets/animations/not-found.json");

interface Props {
  title?: string;
  subtitle?: string;
}

const NotFoundAnimation: React.FC<Props> = ({
  title = "No Tasks Found",
  subtitle = "You're all caught up 🎉",
}) => {
  return (
    <View style={styles.wrapper}>
      <LottieView
        source={animationSource}
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default NotFoundAnimation;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 220,
    height: 220,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    color: "#6B7280",
    textAlign: "center",
  },
});