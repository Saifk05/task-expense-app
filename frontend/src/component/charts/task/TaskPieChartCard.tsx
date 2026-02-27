import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface Props {
  completed: number;
  cancelled: number;
}

const TaskPieChartCard: React.FC<Props> = ({
  completed,
  cancelled,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const chartRadius = screenWidth * 0.18;

  const pieData = [
    {
      value: completed,
      color: "#4F6DFF",
      text: `${completed}%`,
    },
    {
      value: cancelled,
      color: "#FF7A7A",
      text: `${cancelled}%`,
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Task Status Distribution</Text>

      <View style={styles.row}>
        {/* LEFT - Donut */}
        <PieChart
          data={pieData}
          donut
          showText
          textColor="white"
          textSize={13}
          radius={chartRadius}
          innerRadius={chartRadius * 0.6}
          innerCircleColor="#FFFFFF"
        />

        {/* RIGHT - Labels */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.dot, { backgroundColor: "#4F6DFF" }]}
            />
            <View>
              <Text style={styles.legendTitle}>Completed</Text>
              <Text style={styles.legendValue}>
                {/* {completed}% */}
              </Text>
            </View>
          </View>

          <View style={styles.legendItem}>
            <View
              style={[styles.dot, { backgroundColor: "#FF7A7A" }]}
            />
            <View>
              <Text style={styles.legendTitle}>Cancelled</Text>
              <Text style={styles.legendValue}>
                {/* {cancelled}% */}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskPieChartCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 28,
    marginBottom: 25,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 25,
    color: "#222",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  legendContainer: {
    flex: 1,
    marginLeft: 20,
    gap: 18,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },

  legendTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  legendValue: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
});