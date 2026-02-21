import React from "react";
import { View, ScrollView, Text } from "react-native";
import AppHeader from "../../component/AppHeader";
import { useMode } from "../../context/ModeContext";
import { styles } from "./HomeScreen.styles";

// ✅ Import from charts folder
import {
  LineChartCard,
  BarChartCard,
  PieChartCard,
  CombinedChartCard,
} from "../../component/charts/expense";

export default function HomeScreen() {
  const { mode } = useMode();
  const isExpense = mode === "expense";

  return (
    <View style={styles.container}>
      <AppHeader
        title="Dashboard"
        userName="John"
        showToggle={true}
        showGreeting={true}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isExpense ? (
          <>
            <Text style={styles.sectionTitle}>Monthly Spending</Text>
            <LineChartCard />

            <Text style={styles.sectionTitle}>Category Breakdown</Text>
            <BarChartCard />

            <Text style={styles.sectionTitle}>Spending Distribution</Text>
            <PieChartCard />

            <Text style={styles.sectionTitle}>Revenue vs Expense</Text>
            <CombinedChartCard />
          </>
        ) : (
          <Text style={styles.sectionTitle}>
            Task dashboard coming soon...
          </Text>
        )}
      </ScrollView>
    </View>
  );
}