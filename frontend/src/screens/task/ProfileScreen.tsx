import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ProfileScreen.styles";

interface Props {
  navigation: any;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ProfileScreen: React.FC<Props> = ({
  navigation,
  setIsLoggedIn,
}) => {
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
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />

          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.username}>@johndoe</Text>

          {/* ✅ Navigation Added Here */}
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
            onPress={() => {}}
          />

          <Option
            icon="location-outline"
            title="Address"
            onPress={() => {}}
          />

          <Option
            icon="lock-closed-outline"
            title="Change Password"
            onPress={() => {}}
          />

          <Option
            icon="log-out-outline"
            title="Logout"
            danger
            onPress={() => setIsLoggedIn(false)}
          />
        </View>
      </ScrollView>
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