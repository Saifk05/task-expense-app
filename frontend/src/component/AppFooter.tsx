import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FooterItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

interface AppFooterProps {
  navigation: any;
  activeRoute: string;
  items: FooterItem[];
}

const AppFooter: React.FC<AppFooterProps> = ({
  navigation,
  activeRoute,
  items,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {items.map((item) => {
          const isActive = activeRoute === item.route;

          return (
            <TouchableOpacity
              key={item.route}
              style={styles.tab}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(item.route)}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={isActive ? "#2F6FE4" : "#B8C1CC"}
              />

              <Text
                style={[
                  styles.label,
                  { color: isActive ? "#2F6FE4" : "#B8C1CC" },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AppFooter;
const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,              // lift from bottom
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  container: {
    flexDirection: "row",
    height: 65,
    width: "92%",            // spacing from edges
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

    // Android
    elevation: 15,
  },

  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: "500",
  },
});