import React from "react";
import { View, ScrollView } from "react-native";
import AppHeader from "../../component/AppHeader";
import { styles } from "./HomeScreen.styles";

import {
  TaskLineChartCard,
  TaskBarChartCard,
  TaskProgressChartCard,
} from "../../component/charts/task";

export default function TaskHomeScreen() {
  return (
    <View style={styles.container}>
      {/* Dashboard Header */}
      <AppHeader
        title="Dashboard"
        userName="John"
        showToggle={true}
        showGreeting={true}
      />

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TaskLineChartCard />
        <TaskBarChartCard />
        <TaskProgressChartCard />
      </ScrollView>
    </View>
  );
}