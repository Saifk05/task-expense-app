import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useMode } from "../context/ModeContext";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


interface AppHeaderProps {
  title: string;
  subtitle?: string;          // ✅ For settings pages
  userName?: string;
  showToggle?: boolean;
  showGreeting?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  userName = "John",
  showToggle = false,
  showGreeting = false,
}) => {
  const { mode, setMode } = useMode();
  const isExpense = mode === "expense";
  const primaryColor = isExpense ? "#3985F7" : "#10B981";

  return (
    // <SafeAreaView
    //   edges={["top"]}
    //   style={[styles.wrapper, { backgroundColor: primaryColor }]}
    // >

      <SafeAreaView edges={["top"]} style={{ backgroundColor: "transparent" }}>
  <LinearGradient
    colors={
      isExpense
        ? ["#2563EB", "#60A5FA"]   // blue gradient for expense
        : ["#059669", "#34D399"]   // green gradient for task
    }
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.wrapper}
  >
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>

          {/* Greeting (Dashboard only) */}
          {showGreeting && (
            <Text style={styles.subtitle}>
              Hey {userName}, welcome back
            </Text>
          )}

          {/* Custom subtitle (Settings pages) */}
          {subtitle && !showGreeting && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>

        {/* <TouchableOpacity>
          <Ionicons name="person-circle" size={34} color="#fff" />
        </TouchableOpacity> */}

<View style={styles.rightSection}>
  <Image
    source={
      isExpense
        ? require("../../assets/flat-design-gathering-data-business-concept.png")
        : require("../../assets/hand-drawn-illustrated-people-planning-business.png")
    }
    style={styles.dashboardImage}
    resizeMode="contain"
  />

  {/* <TouchableOpacity>
    <Ionicons name="person-circle" size={34} color="#fff" />
  </TouchableOpacity> */}
</View>
      </View>

      {/* Toggle (Dashboard only) */}
      {showToggle && (
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              isExpense && styles.activeToggle,
            ]}
            onPress={() => setMode("expense")}
          >
            <Text
              style={[
                styles.toggleText,
                isExpense && styles.activeText,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              !isExpense && styles.activeToggle,
            ]}
            onPress={() => setMode("task")}
          >
            <Text
              style={[
                styles.toggleText,
                !isExpense && styles.activeText,
              ]}
            >
              Task
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#E5E7EB",
    marginTop: 4,
    fontSize: 14,
  },

  toggleContainer: {
    flexDirection: "row",
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 30,
    padding: 4,
    alignSelf: "flex-start",
  },

  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },

  activeToggle: {
    backgroundColor: "#fff",
  },

  toggleText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "500",
  },

  activeText: {
    color: "#111827",
    fontWeight: "600",
  },

  rightSection: {
  flexDirection: "row",
  alignItems: "center",
},

dashboardImage: {
  width: 120,
  height: 110,
  marginRight: 0,
  marginBottom:-48
  // marginTop:8
}


});