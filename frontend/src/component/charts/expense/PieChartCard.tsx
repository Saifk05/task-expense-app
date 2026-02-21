import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { chartConfig, primaryBlue } from "./chartConfig";

const screenWidth = Dimensions.get("window").width;

export default function PieChartCard() {
  const data = [
    {
      name: "Food",
      population: 400,
      color: "#3985F7",
      legendFontColor: "#6B7280",
      legendFontSize: 12,
    },
    {
      name: "Travel",
      population: 300,
      color: "#10B981",
      legendFontColor: "#6B7280",
      legendFontSize: 12,
    },
    {
      name: "Rent",
      population: 1000,
      color: "#F59E0B",
      legendFontColor: "#6B7280",
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Spending Distribution</Text>

      <PieChart
        data={data}
        width={screenWidth - 60}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
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