import React from "react";
import {
  View,
  Modal,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";

interface AppLoaderProps {
  visible: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
    >
      <View style={styles.overlay}>
        <LottieView
          source={require("../../assets/loader.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    </Modal>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 160,
    height: 160,
  },
});