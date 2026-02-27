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
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./SettingsScreen.styles";
import { ApiService } from "../../services/api.service";
import ConfirmModal from "../../component/ConfirmModal";
import { useNavigation } from "@react-navigation/native";
interface SettingsScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface SettingItemProps {
  icon: string;
  title: string;
  danger?: boolean;
  onPress?: () => void;
}

const StatCard = ({
  icon,
  value,
  label,
  bgColor,
}: any) => (
  <View style={[styles.statCard, { backgroundColor: bgColor }]}>
    <Ionicons name={icon as any} size={22} color="#1F2937" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
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
        size={20}
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
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    )}
  </TouchableOpacity>
);

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  setIsLoggedIn,
}) => {
  const navigation = useNavigation<any>();

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
        {/* 🔥 BLUE GRADIENT HEADER */}
        <LinearGradient
          colors={["#60A5FA", "#1D4ED8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <Ionicons
              name="notifications"
              size={30}
              color="#FFD700"
            />
          </View>

          <View style={styles.profileRow}>
            <Image
              source={require("../../../assets/profile-picture.svg")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>Alex Morgan</Text>
              <Text style={styles.subtitle}>
                Manage your finances
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* 📊 TWO STAT CARDS */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="wallet-outline"
            value="$3,257"
            label="Total Balance"
            bgColor="#E0F2FE"
          />
          <StatCard
            icon="pie-chart-outline"
            value="$950"
            label="Monthly Expenses"
            bgColor="#FEF3C7"
          />
        </View>

        {/* ⚙ SETTINGS LIST */}
        <View style={styles.settingsCard}>
          <SettingItem
            icon="person-outline"
            title="Profile Settings"
            onPress={() => navigation.navigate("Profile")}
          />

          <SettingItem
            icon="wallet-outline"
            title="Manage Accounts"
            onPress={() => navigation.navigate("ManageAccounts")}
          />

          <SettingItem
            icon="grid-outline"
            title="Categories"
          />

          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            onPress={() => navigation.navigate("Notifications")}
          />

          <SettingItem
            icon="log-out-outline"
            title={loading ? "Logging out..." : "Logout"}
            danger
            onPress={() => setShowLogoutModal(true)}
          />

          {loading && (
            <ActivityIndicator
              style={{ marginTop: 12 }}
              color="#EF4444"
            />
          )}
        </View>
      </ScrollView>

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