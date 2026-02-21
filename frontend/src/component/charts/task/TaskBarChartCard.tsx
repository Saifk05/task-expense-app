import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { chartConfig } from "../expense/chartConfig";

const screenWidth = Dimensions.get("window").width;

export default function TaskBarChartCard() {
  const data = {
    labels: ["Work", "Study", "Health", "Personal"],
    datasets: [{ data: [12, 8, 6, 10] }],
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tasks by Category</Text>

      <BarChart
        data={data}
        width={screenWidth - 60}
        height={220}
        yAxisSuffix=""
        yAxisLabel=""
        chartConfig={chartConfig}
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
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },
});