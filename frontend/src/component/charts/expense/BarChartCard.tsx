import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { chartConfig } from "./chartConfig";

const screenWidth = Dimensions.get("window").width;

export default function BarChartCard() {
  const data = {
    labels: ["Food", "Travel", "Rent", "Bills"],
    datasets: [
      {
        data: [400, 300, 1000, 250],
      },
    ],
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Category Breakdown</Text>

      <BarChart
        data={data}
        width={screenWidth - 60}
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={chartConfig}
        style={{ borderRadius: 16 }}
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