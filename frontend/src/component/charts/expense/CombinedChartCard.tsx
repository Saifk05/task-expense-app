import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { chartConfig } from "./chartConfig";

const screenWidth = Dimensions.get("window").width;

export default function CombinedChartCard() {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        data: [800, 950, 700, 1100],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        data: [600, 750, 500, 900],
      },
    ],
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Revenue vs Expense</Text>

      <BarChart
        data={barData}
        width={screenWidth - 60}
        height={150}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={chartConfig}
      />

      <LineChart
        data={lineData}
        width={screenWidth - 60}
        height={150}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },
});