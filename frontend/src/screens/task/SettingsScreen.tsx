import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./SettingsScreen.styles";
import { ApiService } from "../../services/api.service";
import ConfirmModal from "../../component/ConfirmModal";

interface TaskSettingsScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Card = ({ icon, value, label }: any) => (
  <View style={styles.statCard}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statSubtitle}>{label}</Text>
  </View>
);

const SettingItem = ({
  icon,
  title,
  danger = false,
  onPress,
}: any) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.settingLeft}>
      <Ionicons
        name={icon}
        size={18}
        color={danger ? "#EF4444" : "#6B7280"}
      />
      <Text
        style={[
          styles.settingText,
          danger && { color: "#EF4444" },
        ]}
      >
        {title}
      </Text>
    </View>

    {!danger && (
      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    )}
  </TouchableOpacity>
);

const TaskSettingsScreen: React.FC<TaskSettingsScreenProps> = ({
  setIsLoggedIn,
}) => {
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const performLogout = async () => {
    try {
      setLoading(true);
      await ApiService.logout();
      setShowLogoutModal(false);
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* HEADER */}
        <View style={[styles.header, { backgroundColor: "#10B981" }]}>
          <View style={styles.headerTop}>
            <Ionicons name="notifications" size={22} color="#FFD700" />
          </View>

          <View style={styles.profileRow}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=8" }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>Task Manager</Text>
              <Text style={styles.email}>
                Manage your productivity
              </Text>
            </View>
          </View>
        </View>

        {/* TASK STATS */}
        <View style={styles.statsGrid}>
          <Card icon="📋" value="12" label="Total Tasks" />
          <Card icon="✅" value="8" label="Completed" />
          <Card icon="⏳" value="4" label="Pending" />
          <Card icon="🔥" value="5" label="High Priority" />
        </View>

        {/* SETTINGS LIST */}
        <View style={styles.settingsCard}>
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
          />
          <SettingItem
            icon="list-outline"
            title="Task Categories"
          />
          <SettingItem
            icon="person-outline"
            title="Profile Settings"
          />
          <SettingItem
            icon="color-palette-outline"
            title="Theme Preferences"
          />

          <SettingItem
            icon="log-out-outline"
            title={loading ? "Logging out..." : "Logout"}
            danger
            onPress={() => setShowLogoutModal(true)}
          />
        </View>
      </ScrollView>

      {/* 🔥 Confirm Modal */}
      <ConfirmModal
        visible={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        danger
        loading={loading}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={performLogout}
      />
    </SafeAreaView>
  );
};

export default TaskSettingsScreen;