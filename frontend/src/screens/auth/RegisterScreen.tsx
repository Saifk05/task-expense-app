import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const RegisterScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("signup");
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const slideAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: activeTab === "signup" ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (width - 60) / 2],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <LinearGradient
          colors={["#3B82F6", "#06B6D4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>
            Sign up now to access your personal account
          </Text>
        </LinearGradient>

        {/* CARD CONTAINER */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.cardContainer}
        >
          <ScrollView
            contentContainerStyle={styles.card}
            showsVerticalScrollIndicator={false}
          >
            {/* Segmented Control */}
            <View style={styles.tabWrapper}>
              <Animated.View
                style={[styles.pill, { transform: [{ translateX }] }]}
              />

              <TouchableOpacity
                style={styles.tab}
                onPress={() => {
                  setActiveTab("signin");
                  navigation.navigate("Login");
                }}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "signin" && styles.activeText,
                  ]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tab}
                onPress={() => setActiveTab("signup")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "signup" && styles.activeText,
                  ]}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* INPUTS */}
            <View style={styles.row}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#9CA3AF"
                style={[styles.input, styles.halfInput]}
              />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#9CA3AF"
                style={[styles.input, styles.halfInput]}
              />
            </View>

            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              style={styles.input}
            />

            {/* Password */}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={securePass}
                style={styles.passwordInput}
              />
              <TouchableOpacity onPress={() => setSecurePass(!securePass)}>
                <Ionicons
                  name={securePass ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={secureConfirm}
                style={styles.passwordInput}
              />
              <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
                <Ionicons
                  name={secureConfirm ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Register Button */}
            <TouchableOpacity activeOpacity={0.85}>
              <LinearGradient
                colors={["#3B82F6", "#06B6D4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>Or continue with</Text>
              <View style={styles.line} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={18} color="#EA4335" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={18} color="#000" />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },

  header: {
    height: 250,
    paddingHorizontal: 28,
    justifyContent: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 30,
    width: "85%",
  },

  cardContainer: {
    flex: 1,
    marginTop: -50,
  },

  card: {
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 50,
    minHeight: "100%",
  },

  tabWrapper: {
    height: 52,
    backgroundColor: "#E5E7EB",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    padding: 5,
    overflow: "hidden",
  },

  pill: {
    position: "absolute",
    width: "50%",
    height: 42,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  tabText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  activeText: {
    color: "#111827",
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  halfInput: {
    width: "48%",
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 56,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    color: "#111827",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 56,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  button: {
    height: 56,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 26,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },

  orText: {
    marginHorizontal: 12,
    color: "#6B7280",
    fontSize: 13,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flex: 0.48,
  },

  socialText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
});
