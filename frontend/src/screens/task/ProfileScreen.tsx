import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ProfileScreen.styles";
import ApiService from "../../services/api.service"; // adjust path if needed

interface Props {
  navigation: any;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ProfileScreen: React.FC<Props> = ({
  navigation,
  setIsLoggedIn,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageVisible, setImageVisible] = useState(false);

  const blinkAnim = useRef(new Animated.Value(1)).current;

  // 🔥 Fetch user overview
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await ApiService.getUserOverview();
        setUser(response.data);
      } catch (error) {
        console.log("Failed to fetch user overview", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🚨 Blinking animation if address incomplete
  useEffect(() => {
    if (user && user.addressComplete === false) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0.3,
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
  }, [user]);

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <Text style={{ textAlign: "center", marginTop: 60 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Green Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          <Text style={styles.headerSubtitle}>
            Manage your account
          </Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => setImageVisible(true)}>
        <Image
            source={{
            uri:
                user?.profilePictureUrl ||
                "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.avatar}
        />
        </TouchableOpacity>

          <Text style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Text>

          <Text style={styles.username}>
            {user?.email}
          </Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          
        </View>

        {/* Options Card */}
<View style={styles.card}>
      <Option
    icon="notifications-outline"
    title="Notifications"
    onPress={() => navigation.navigate("Notifications")}
  />

  {user?.unreadNotifications > 0 && (
    <View style={styles.notificationBadge}>
      <Text style={styles.notificationBadgeText}>
        {user.unreadNotifications > 10
          ? "10+"
          : user.unreadNotifications}
      </Text>
    </View>
  )}

          {/* 🚨 Address with blinking if incomplete */}
          <Animated.View style={{ opacity: user?.addressComplete === false ? blinkAnim : 1 }}>
            <Option
              icon="location-outline"
              title={
                user?.addressComplete === false
                  ? "Address (Incomplete)"
                  : "Address"
              }
              onPress={() => navigation.navigate("EditAddress")}
              danger={user?.addressComplete === false}
            />
          </Animated.View>

          <Option
            icon="lock-closed-outline"
            title="Change Password"
            onPress={() => navigation.navigate("ChangePassword")}
          />

          <Option
            icon="log-out-outline"
            title="Logout"
            danger
            onPress={async () => {
              await ApiService.logout();
              setIsLoggedIn(false);
            }}
          />
        </View>
      </ScrollView>

      <Modal
  visible={imageVisible}
  transparent
  animationType="fade"
>
  <View style={styles.imageModalContainer}>
    <TouchableOpacity
      style={styles.imageModalBackdrop}
      activeOpacity={1}
      onPress={() => setImageVisible(false)}
    />

    <View style={styles.imageModalContent}>
      <Image
        source={{
          uri:
            user?.profilePictureUrl ||
            "https://i.pravatar.cc/150?img=12",
        }}
        style={styles.fullImage}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setImageVisible(false)}
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
};

const Option = ({
  icon,
  title,
  onPress,
  danger = false,
}: any) => (
  <TouchableOpacity
    style={styles.option}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.optionLeft}>
      <Ionicons
        name={icon}
        size={18}
        color={danger ? "#EF4444" : "#6B7280"}
      />
      <Text
        style={[
          styles.optionText,
          danger && { color: "#EF4444" },
        ]}
      >
        {title}
      </Text>
    </View>

    <Ionicons
      name="chevron-forward"
      size={18}
      color="#9CA3AF"
    />
  </TouchableOpacity>
);

export default ProfileScreen;