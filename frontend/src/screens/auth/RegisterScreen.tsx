import React, { useState, useMemo } from "react";
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
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ApiService } from "../../services/api.service";
import { showSuccess, showError } from "../../utils/notification.util";

const RegisterScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    if (password.length < 6) return "Weak";
    if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.length >= 8
    )
      return "Strong";
    return "Medium";
  }, [password]);

  const strengthColor =
    passwordStrength === "Weak"
      ? "#EF4444"
      : passwordStrength === "Medium"
      ? "#F59E0B"
      : "#10B981";

  const validateForm = () => {
    if (!firstName.trim()) return showError("First name is required");
    if (!lastName.trim()) return showError("Last name is required");

    if (!phoneNumber) return showError("Mobile number is required");
    if (!/^[0-9]{10}$/.test(phoneNumber))
      return showError("Mobile number must be 10 digits");

    if (!email.trim()) return showError("Email is required");
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.trim()))
      return showError("Please enter a valid email");

    if (!password) return showError("Password is required");
    if (password.length < 6)
      return showError("Password must be at least 6 characters");

    if (password !== confirmPassword)
      return showError("Passwords do not match");

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await ApiService.register(
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        phoneNumber.trim(),
        password
      );

      showSuccess("Registration successful 🎉");
      navigation.replace("Login");
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
      <LinearGradient colors={["#3985F7", "#5AA9FF"]} style={styles.header}>
        <Text style={styles.headerTitle}>
          Sign up now to access your personal account
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.card}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={styles.inactiveTab}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.inactiveTabText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activeTab}>
              <Text style={styles.activeTabText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Name Row */}
          <View style={styles.row}>
            <TextInput
              placeholder="First Name"
              style={[
                styles.input,
                styles.halfInput,
                firstName ? styles.valid : null,
              ]}
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              placeholder="Last Name"
              style={[
                styles.input,
                styles.halfInput,
                lastName ? styles.valid : null,
              ]}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Mobile */}
          <TextInput
            placeholder="Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={(text) =>
              setPhoneNumber(text.replace(/[^0-9]/g, ""))
            }
            style={[
              styles.input,
              phoneNumber.length === 10
                ? styles.valid
                : phoneNumber.length > 0
                ? styles.invalid
                : null,
            ]}
          />

          {/* Email */}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, email.includes("@") ? styles.valid : null]}
          />

          {/* Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              secureTextEntry={securePass}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecurePass(!securePass)}>
              <Ionicons
                name={securePass ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {password.length > 0 && (
            <View style={styles.strengthRow}>
              <Text style={{ color: strengthColor }}>
                Strength: {passwordStrength}
              </Text>
            </View>
          )}

          {/* Confirm Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={secureConfirm}
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
          <LinearGradient
            colors={
              loading ? ["#9CA3AF", "#9CA3AF"] : ["#3985F7", "#5AA9FF"]
            }
            style={styles.button}
          >
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or sign up with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Buttons */}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;


/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  header: {
    height: 240,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
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
    backgroundColor: "#EEF2F7",
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
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
  valid: {
    borderColor: "#10B981",
  },
  invalid: {
    borderColor: "#EF4444",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  passwordInput: {
    flex: 1,
  },
  strengthRow: {
    marginBottom: 15,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  /* ======== ADDED FOR GOOGLE + APPLE ======== */

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