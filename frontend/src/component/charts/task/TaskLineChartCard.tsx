import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { chartConfig } from "../expense/chartConfig";

const screenWidth = Dimensions.get("window").width;

export default function TaskLineChartCard() {
  const [range, setRange] = useState<"week" | "month">("week");

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ data: [2, 4, 3, 5, 6, 4, 7] }],
  };

  const monthlyData = {
    labels: ["W1", "W2", "W3", "W4"],
    datasets: [{ data: [18, 22, 15, 27] }],
  };

  const chartData = range === "week" ? weeklyData : monthlyData;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Tasks Completed</Text>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, range === "week" && styles.activeBtn]}
            onPress={() => setRange("week")}
          >
            <Text style={[styles.toggleText, range === "week" && styles.activeText]}>
              Week
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, range === "month" && styles.activeBtn]}
            onPress={() => setRange("month")}
          >
            <Text style={[styles.toggleText, range === "month" && styles.activeText]}>
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <LineChart
        data={chartData}
        width={screenWidth - 60}
        height={220}
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
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  toggleRow: {
    flexDirection: "row",
  },
  toggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 5,
    backgroundColor: "#E5E7EB",
  },
  activeBtn: {
    backgroundColor: "#10B981",
  },
  toggleText: {
    fontSize: 12,
    color: "#374151",
  },
  activeText: {
    color: "#FFFFFF",
  },
});