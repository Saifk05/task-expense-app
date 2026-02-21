import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { chartConfig } from "./chartConfig";

const screenWidth = Dimensions.get("window").width;

export default function LineChartCard() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [500, 700, 800, 650, 900, 1200],
      },
    ],
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Monthly Spending</Text>

      <LineChart
        data={data}
        width={screenWidth - 60}
        height={220}
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