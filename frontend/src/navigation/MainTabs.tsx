import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useMode } from "../context/ModeContext";

import ExpenseHome from "../screens/expense/HomeScreen";
import ExpenseSettings from "../screens/expense/SettingsScreen";
import TaskHome from "../screens/task/HomeScreen";
import TaskSettings from "../screens/task/SettingsScreen";

const Tab = createBottomTabNavigator();

interface MainTabsProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const MainTabs: React.FC<MainTabsProps> = ({ setIsLoggedIn }) => {
  const { mode } = useMode();

  const activeColor = mode === "expense" ? "#3985F7" : "#10B981";
  const isExpense = mode === "expense";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.label,
        tabBarIconStyle: { margin: 0, padding: 0 },

        tabBarIcon: ({ color }) => {
          let iconName: any;

          if (route.name === "Home") iconName = "home-outline";
          if (route.name === "Analytics") iconName = "stats-chart-outline";
          if (route.name === "Settings") iconName = "settings-outline";

          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      {isExpense ? (
        <>
          <Tab.Screen
            name="Home"
            component={ExpenseHome}
            options={{ title: "Dashboard" }}
          />

          <Tab.Screen name="Analytics" options={{ title: "Reports" }}>
            {(props) => (
              <ExpenseSettings {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Tab.Screen>

          <Tab.Screen name="Settings">
            {(props) => (
              <ExpenseSettings {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Tab.Screen>
        </>
      ) : (
        <>
          <Tab.Screen
            name="Home"
            component={TaskHome}
            options={{ title: "Tasks" }}
          />

          {/* 🔥 FIXED HERE */}
          <Tab.Screen name="Analytics" options={{ title: "Progress" }}>
            {(props) => (
              <TaskSettings {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Tab.Screen>

          <Tab.Screen name="Settings">
            {(props) => (
              <TaskSettings {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 10,
    height: 65,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    padding: 0,
    margin: 0,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 20,
  },

  tabItem: {
    padding: 0,
    margin: 0,
    justifyContent: "center",
  },

  label: {
    fontSize: 11,
    marginTop: 2,
    marginBottom: 0,
    fontWeight: "500",
  },
});