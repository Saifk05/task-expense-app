import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ChangePasswordScreen.styles";
import {
  showError,
  showSuccess,
} from "../../utils/notification.util";
import ApiService from "../../services/api.service";

interface Props {
  navigation: any;
}

const ChangePasswordScreen: React.FC<Props> = ({
  navigation,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ---------- PASSWORD VALIDATION ---------- */

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=-]).{6,}$/;
    return regex.test(password);
  };

  const getPasswordStrength = () => {
    let score = 0;

    if (newPassword.length >= 6) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/\d/.test(newPassword)) score++;
    if (/[@$!%*?&#^()_+=-]/.test(newPassword)) score++;

    switch (score) {
      case 0:
      case 1:
        return { label: "Weak", color: "#EF4444" };
      case 2:
      case 3:
        return { label: "Medium", color: "#F59E0B" };
      case 4:
        return { label: "Strong", color: "#10B981" };
      default:
        return { label: "", color: "#E5E7EB" };
    }
  };

  const strength = getPasswordStrength();

const handleChangePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    showError("All fields are required");
    return;
  }

  if (!validatePassword(newPassword)) {
    showError(
      "Password must be at least 6 characters, include 1 uppercase letter, 1 number and 1 special character"
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    showError("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    await ApiService.changePassword(
      currentPassword,
      newPassword
    );

    showSuccess("Password updated successfully");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    navigation.goBack();
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong";

    showError(message);
  } finally {
    setLoading(false);
  }
};

  const getBorderColor = (
    value: string,
    compare?: string
  ) => {
    if (!value) return "#E5E7EB";
    if (compare !== undefined && value !== compare)
      return "#EF4444";
    return "#10B981";
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#FFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Change Password
          </Text>
        </View>

        <Text style={styles.headerSubtitle}>
          Update your account security
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Current Password */}
        <View
          style={[
            styles.inputWrapper,
            {
              borderColor:
                currentPassword.length > 0
                  ? "#10B981"
                  : "#E5E7EB",
            },
          ]}
        >
          <TextInput
            placeholder="Current Password"
            secureTextEntry={!showCurrent}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            onPress={() => setShowCurrent(!showCurrent)}
          >
            <Ionicons
              name={
                showCurrent
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        {/* New Password */}
        <View
          style={[
            styles.inputWrapper,
            {
              borderColor: getBorderColor(newPassword),
            },
          ]}
        >
          <TextInput
            placeholder="New Password"
            secureTextEntry={!showNew}
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            onPress={() => setShowNew(!showNew)}
          >
            <Ionicons
              name={
                showNew
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        {/* Strength Indicator */}
        {newPassword.length > 0 && (
          <Text
            style={{
              color: strength.color,
              marginBottom: 12,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Strength: {strength.label}
          </Text>
        )}

        {/* Confirm Password */}
        <View
          style={[
            styles.inputWrapper,
            {
              borderColor: getBorderColor(
                confirmPassword,
                newPassword
              ),
            },
          ]}
        >
          <TextInput
            placeholder="Confirm New Password"
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            onPress={() => setShowConfirm(!showConfirm)}
          >
            <Ionicons
              name={
                showConfirm
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            loading && { opacity: 0.6 },
          ]}
          disabled={loading}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>
            {loading
              ? "Updating..."
              : "Update Password"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;