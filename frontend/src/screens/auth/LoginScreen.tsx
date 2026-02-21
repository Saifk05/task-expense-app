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
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiService } from "../../services/api.service";
import { showSuccess, showError } from "../../utils/notification.util";

const LoginScreen = ({ navigation, setIsLoggedIn }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      showError("Email is required");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.trim())) {
      showError("Please enter a valid email");
      return false;
    }

    if (!password) {
      showError("Password is required");
      return false;
    }

    return true;
  };

const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    setLoading(true);

    await ApiService.login(email.trim(), password);

    showSuccess("Login successful");

    // Just update auth state
    setIsLoggedIn(true);

  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong";

    showError(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#3985f7", "#5aa9ff"]}
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
        {/* Tabs */}
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
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password */}
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

        {/* Remember */}
        <View style={styles.rememberRow}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRemember(!remember)}
          >
            {remember && (
              <Ionicons name="checkmark" size={16} color="#3985f7" />
            )}
          </TouchableOpacity>

          <Text style={styles.rememberText}>Remember me</Text>

          <TouchableOpacity style={{ marginLeft: "auto" }}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <LinearGradient
          colors={
            loading
              ? ["#9CA3AF", "#9CA3AF"]
              : ["#3985f7", "#5aa9ff"]
          }
          style={styles.button}
        >
          <TouchableOpacity
            style={{ width: "100%", alignItems: "center" }}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </LinearGradient>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.line} />
        </View>

        {/* Social */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../../assets/google-logo.png")}
              style={styles.googleIcon}
              resizeMode="contain"
            />
            <Text style={styles.googleText}>Google</Text>
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
    color: "#3985f7",
    fontSize: 14,
  },

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
  },

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

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flex: 0.48,
  },

  googleIcon: {
    width: 22,
    height: 22,
  },

  googleText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  socialText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});
