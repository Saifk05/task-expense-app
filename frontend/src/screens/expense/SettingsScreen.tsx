import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./SettingsScreen.styles";
import { ApiService } from "../../services/api.service";
import ConfirmModal from "../../component/ConfirmModal";

interface SettingsScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface SettingItemProps {
  icon: string;
  title: string;
  danger?: boolean;
  onPress?: () => void;
}

const Card = ({ icon, value, label }: any) => (
  <View style={styles.statCard}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statSubtitle}>{label}</Text>
  </View>
);

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  danger = false,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.settingLeft}>
      <Ionicons
        name={icon as any}
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

const SettingsScreen: React.FC<SettingsScreenProps> = ({
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
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Ionicons
              name="notifications"
              size={22}
              color="#FFD700"
            />
          </View>

          <View style={styles.profileRow}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=8",
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>
                Alex Morgan
              </Text>
              <Text style={styles.email}>
                alex.morgan@staff.portexa.com
              </Text>
            </View>
          </View>
        </View>

        {/* SETTINGS LIST */}
        <View style={styles.settingsCard}>
          <SettingItem
            icon="person-outline"
            title="Edit Profile"
          />

          <SettingItem
            icon="log-out-outline"
            title={loading ? "Logging out..." : "Logout"}
            danger
            onPress={() => setShowLogoutModal(true)}
          />

          {loading && (
            <ActivityIndicator
              style={{ marginTop: 10 }}
              color="#EF4444"
            />
          )}
        </View>
      </ScrollView>

      {/* 🔥 CONFIRM MODAL */}
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

export default SettingsScreen;