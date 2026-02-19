import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2563EB", "#06B6D4"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>
          Go ahead and complete your account setup
        </Text>
        <Text style={styles.headerSubtitle}>
          Create your account and simplify your workflow instantly.
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.card}
      >
        {/* Toggle Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inactiveTab}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.inactiveTabText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password with show/hide */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={{ flex: 1 }}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me */}
        <View style={styles.rememberRow}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRemember(!remember)}
          >
            {remember && (
              <Ionicons name="checkmark" size={16} color="#2563EB" />
            )}
          </TouchableOpacity>

          <Text style={styles.rememberText}>Remember me</Text>

          <TouchableOpacity style={{ marginLeft: "auto" }}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <LinearGradient
          colors={["#2563EB", "#06B6D4"]}
          style={styles.button}
        >
          <TouchableOpacity style={{ width: "100%" }}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.line} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={20} color="#EA4335" />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={20} color="#000" />
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    height: 260,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },

  headerSubtitle: {
    color: "#E0F2FE",
    fontSize: 14,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },

  /* ===== Improved Segmented Control ===== */

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 30,
    padding: 4,
    marginBottom: 25,
  },

  activeTab: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderRadius: 26,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  inactiveTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 26,
    alignItems: "center",
  },

  activeTabText: {
    fontWeight: "600",
    color: "#111827",
  },

  inactiveTabText: {
    color: "#6B7280",
  },

  /* ===== Inputs ===== */

  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  /* ===== Remember Row ===== */

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  rememberText: {
    fontSize: 14,
    color: "#374151",
  },

  forgotText: {
    color: "#2563EB",
    fontSize: 14,
  },

  /* ===== Button ===== */

  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },

  /* ===== Divider ===== */

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  orText: {
    marginHorizontal: 10,
    color: "#6B7280",
    fontSize: 13,
  },

  /* ===== Social Buttons ===== */

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flex: 0.48,
    justifyContent: "center",
  },

  socialText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
});

