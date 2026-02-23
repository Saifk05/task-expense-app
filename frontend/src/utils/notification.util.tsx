import React from "react";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type BaseToastProps = {
  text1?: string;
  text2?: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
};

const BaseToast = ({
  text1,
  text2,
  icon,
  iconColor,
  iconBg,
}: BaseToastProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>

      <View style={styles.textContainer}>
        {text1 && <Text style={styles.title}>{text1}</Text>}
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>

      <TouchableOpacity onPress={() => Toast.hide()}>
        <Ionicons name="close" size={18} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
};

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      icon="checkmark"
      iconColor="#10B981"
      iconBg="#D1FAE5"
    />
  ),

  error: (props: any) => (
    <BaseToast
      {...props}
      icon="close"
      iconColor="#EF4444"
      iconBg="#FEE2E2"
    />
  ),

  warning: (props: any) => (
    <BaseToast
      {...props}
      icon="warning"
      iconColor="#F59E0B"
      iconBg="#FEF3C7"
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      icon="information"
      iconColor="#3B82F6"
      iconBg="#DBEAFE"
    />
  ),

  neutral: (props: any) => (
    <BaseToast
      {...props}
      icon="information-circle"
      iconColor="#6B7280"
      iconBg="#E5E7EB"
    />
  ),
};

//
// Toast helpers
//

export const showSuccess = (title: string, message?: string) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 3000,
  });
};

export const showError = (title: string, message?: string) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 4000,
  });
};

export const showWarning = (title: string, message?: string) => {
  Toast.show({
    type: "warning",
    text1: title,
    text2: message,
    position: "top",
  });
};

export const showInfo = (title: string, message?: string) => {
  Toast.show({
    type: "info",
    text1: title,
    text2: message,
    position: "top",
  });
};

//
// Styles
//

const styles = StyleSheet.create({
  container: {
    width: "92%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",

    // Soft floating shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  message: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
});