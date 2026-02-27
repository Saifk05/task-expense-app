import React, { useState, useCallback, useRef, useEffect } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { Animated } from "react-native";
import CommonPopup from "../../component/CommonPopup";
import AppLoader from "../../component/AppLoader"; // ✅ Added
import { Switch } from "react-native";

interface TaskSettingsScreenProps {
  navigation: any;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Card = ({ icon, value, label, color, bgColor }: any) => (
  <View style={[styles.statCard, { backgroundColor: bgColor }]}>
    <Ionicons
      name={icon}
      size={22}
      color={color}
      style={{ marginBottom: 12 }}
    />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statSubtitle}>{label}</Text>
  </View>
);

const SettingItem = ({
  icon,
  title,
  danger = false,
  onPress,
  showIncomplete = false,
}: any) => {
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showIncomplete) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [showIncomplete]);

  return (
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

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {showIncomplete && (
          <>
            <Animated.View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#EF4444",
                marginRight: 6,
                opacity: blinkAnim,
              }}
            />
            <Text
              style={{
                color: "#EF4444",
                fontSize: 12,
                marginRight: 6,
              }}
            >
              (Incomplete)
            </Text>
          </>
        )}

        {!danger && (
          <Ionicons
            name="chevron-forward"
            size={18}
            color="#9CA3AF"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const TaskSettingsScreen: React.FC<TaskSettingsScreenProps> = ({
  navigation,
  setIsLoggedIn,
}) => {
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  const [unreadCount, setUnreadCount] = useState(0);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [showSecurityPopup, setShowSecurityPopup] = useState(false);
  const [language, setLanguage] = useState("en");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

  const isBusy = statsLoading;

  const fetchSummary = async () => {
    try {
      setStatsLoading(true);

      const response = await ApiService.getTasks({
        summary: true,
      });

      const data = response.data;

      setStats({
        total: data.tasks.total,
        completed: data.tasks.completed,
        pending: data.tasks.pending,
        overdue: data.tasks.overdue,
      });

      setUnreadCount(data.notifications.unreadCount);
      setIsProfileIncomplete(data.profile.isIncomplete);
      setProfilePictureUrl(data.profile.profilePictureUrl);
      setMfaEnabled(data.profile.mfaEnabled);
    } catch (error) {
      console.log("Failed to fetch summary:", error);
    } finally {
      setStatsLoading(false);
    }
  };

const handleToggleMFA = async (value: boolean) => {
  try {
    setLoading(true);

    // Optimistic UI update
    setMfaEnabled(value);

    await ApiService.toggleMfa(value);

  } catch (error) {
    console.log("Failed to update MFA:", error);

    // Revert if API fails
    setMfaEnabled((prev) => !prev);
  } finally {
    setLoading(false);
  }
};

  useFocusEffect(
    useCallback(() => {
      fetchSummary();
    }, [])
  );

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
        {/* Header */}
        <View style={[styles.header, { backgroundColor: "#10B981" }]}>
          <View style={[styles.headerTop, { paddingTop: 10 }]}>
            <Ionicons
              name="notifications"
              size={30}
              color="#FFD700"
            />
          </View>

          <View style={styles.profileRow}>
            <Image
              source={
                profilePictureUrl
                  ? { uri: profilePictureUrl }
                  : require("../../../assets/profile-picture.svg")
              }
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

        {/* Stats Section */}
        <View style={styles.statsGrid}>
          <Card icon="list-outline" value={stats.total} label="Total Tasks" color="#2563EB" bgColor="#E0ECFF" />
          <Card icon="checkmark-done-outline" value={stats.completed} label="Completed" color="#059669" bgColor="#D1FAE5" />
          <Card icon="time-outline" value={stats.pending} label="Pending" color="#D97706" bgColor="#FEF3C7" />
          <Card icon="alert-circle-outline" value={stats.overdue} label="Overdue" color="#DC2626" bgColor="#FEE2E2" />
        </View>

        {/* Settings */}
        <View style={styles.settingsCard}>
          <SettingItem icon="language-outline" title="Language" onPress={() => setShowLanguagePopup(true)} />
          <SettingItem icon="list-outline" title="Task Categories" onPress={() => navigation.navigate("TaskCategory")} />
          <SettingItem icon="shield-checkmark-outline" title="Security" onPress={() => setShowSecurityPopup(true)} />
          <SettingItem icon="person-outline" title="Profile Settings" showIncomplete={isProfileIncomplete} onPress={() => navigation.navigate("Profile")} />
          <SettingItem icon="color-palette-outline" title="Theme Preferences" />
          <SettingItem icon="log-out-outline" title="Logout" danger onPress={() => setShowLogoutModal(true)} />
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

      <CommonPopup
        visible={showLanguagePopup}
        title="Choose Language"
        type="selection"
        options={[
          { label: "English", value: "en" },
          { label: "Kannada", value: "kn" },
        ]}
        selectedValue={language}
        onSelect={(val) => setLanguage(val)}
        onClose={() => setShowLanguagePopup(false)}
      />

<CommonPopup
  visible={showSecurityPopup}
  title="Security"
  type="toggle"
  toggleLabel="Multi-Factor Authentication"
  toggleValue={mfaEnabled}
  onToggle={handleToggleMFA}
  loading={loading} 
  onClose={() => setShowSecurityPopup(false)}
/>

      {/* ✅ FULL PAGE LOADER */}
      <AppLoader visible={isBusy} />
    </SafeAreaView>
  );
};

export default TaskSettingsScreen;