import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { chartConfig } from "../expense/chartConfig";

const screenWidth = Dimensions.get("window").width;

export default function TaskProgressChartCard() {
  const data = {
    labels: ["Completed"],
    data: [0.72], // 72%
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Overall Completion</Text>

      <ProgressChart
        data={data}
        width={screenWidth - 60}
        height={200}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
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