import React from "react";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const toastConfig = {
  success: ({ text1 }: any) => (
    <LinearGradient
      colors={["#2563EB", "#06B6D4"]}
      style={styles.container}
    >
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>✓</Text>
        </View>
        <Text style={styles.title}>{text1}</Text>
      </View>
    </LinearGradient>
  ),

  error: ({ text1, text2 }: any) => (
    <LinearGradient
      colors={["#EF4444", "#F97316"]}
      style={styles.container}
    >
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>!</Text>
        </View>
        <View>
          <Text style={styles.title}>{text1}</Text>
          {text2 ? <Text style={styles.message}>{text2}</Text> : null}
        </View>
      </View>
    </LinearGradient>
  ),

  info: ({ text1 }: any) => (
    <LinearGradient
      colors={["#0EA5E9", "#3B82F6"]}
      style={styles.container}
    >
      <View style={styles.row}>
        <ActivityIndicator color="#fff" size="small" />
        <Text style={[styles.title, { marginLeft: 12 }]}>
          {text1}
        </Text>
      </View>
    </LinearGradient>
  ),
};

//
// Toast helpers
//

export const showSuccess = (message: string) => {
  Toast.show({
    type: "success",
    text1: message,
    position: "top",
    visibilityTime: 3000,
  });
};

export const showError = (message: string) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: message,
    position: "top",
    visibilityTime: 4000,
  });
};

export const showInfo = (message: string) => {
  Toast.show({
    type: "info",
    text1: message,
    position: "top",
    visibilityTime: 3000,
  });
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  icon: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  message: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    marginTop: 4,
  },
});
