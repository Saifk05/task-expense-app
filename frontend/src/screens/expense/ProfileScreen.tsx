import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./ProfileScreen.styles";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

const MenuItem = ({
  icon,
  title,
  danger = false,
  onPress,
}: any) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
  >
    <View style={styles.menuLeft}>
      <Ionicons
        name={icon}
        size={20}
        color={danger ? "#EF4444" : "#6B7280"}
      />
      <Text
        style={[
          styles.menuText,
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

  return (
    <SafeAreaView style={styles.container}>
      {/* MODERN GRADIENT HEADER */}
<LinearGradient
  colors={["#60A5FA", "#1D4ED8"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.header}
>
  <View style={styles.headerRow}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backBtn}
    >
      <Ionicons name="arrow-back" size={22} color="#fff" />
    </TouchableOpacity>

    <View>
      <Text style={styles.headerTitle}>Profile</Text>
      <Text style={styles.headerSubtitle}>
        Manage your account
      </Text>
    </View>
  </View>
</LinearGradient>

      {/* PROFILE SECTION */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../../assets/picture.jpg")}
          style={styles.avatar}
        />

        <Text style={styles.name}>Saifali Kalkeri</Text>
        <Text style={styles.email}>user@user.com</Text>
        <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditProfile")}
        >
        <Text style={styles.editText}>
            Edit Profile
        </Text>
        </TouchableOpacity>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {/* <MenuItem icon="notifications-outline" title="Notifications" /> */}
        <MenuItem
        icon="location-outline"
        title="Address (Incomplete)"
        onPress={() => navigation.navigate("Address")}
        />
      <MenuItem
        icon="lock-closed-outline"
        title="Change Password"
        onPress={() => navigation.navigate("ChangePassword")}
        />
        {/* <MenuItem icon="log-out-outline" title="Logout" danger /> */}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;