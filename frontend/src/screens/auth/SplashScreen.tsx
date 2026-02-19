import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [index, setIndex] = useState(0);

  const images = [
    require("../../../assets/splash1.png"),
    require("../../../assets/splash2.png"),
    require("../../../assets/splash3.png"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % images.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Card */}
      <View style={styles.topContainer}>
        <Animated.Image
          source={images[index]}
          style={[styles.mainImage, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>
          Manage Tasks. Track Expenses.
        </Text>

        <Text style={styles.subtitle}>
          Stay organized, monitor spending, and keep everything under control
          in one simple workspace.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const CARD_HEIGHT = height * 0.35;
const IMAGE_SIZE = width * 0.65;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topContainer: {
    height: CARD_HEIGHT,
    backgroundColor: "#2563EB",
    marginTop: height * 0.03,
    marginHorizontal: width * 0.05,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: height * 0.07,
    
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  mainImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },

    bottomContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: width * 0.08,
    paddingTop: height * 0.05,
    alignItems: "center",
    },


  title: {
    fontSize: width * 0.06,
    fontWeight: "600",
    textAlign: "center",
    color: "#111827",
    marginBottom: height * 0.02,
  },

  subtitle: {
    fontSize: width * 0.04,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: height * 0.05,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: height * 0.02,
    width: "85%",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: height * 0.02,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: width * 0.04,
  },

  loginText: {
    fontSize: width * 0.035,
    color: "#6B7280",
  },

  loginLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
