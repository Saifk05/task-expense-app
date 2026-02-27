import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 40;

interface Props {
  completed: number;
  inProgress: number;
  pending: number;
  cancelled: number;
  overdue: number;
}

const TaskBarChartCard: React.FC<Props> = ({
  completed,
  inProgress,
  pending,
  cancelled,
  overdue,
}) => {
  // Build dataset dynamically
  const rawData = [
    { label: "Completed", value: completed },
    { label: "In Progress", value: inProgress },
    { label: "Pending", value: pending },
    { label: "Cancelled", value: cancelled },
    { label: "Overdue", value: overdue },
  ];

  // Remove zero values for cleaner UI
  const filteredData = rawData.filter((item) => item.value > 0);

  if (filteredData.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Task Status Overview</Text>
        <Text style={styles.emptyText}>
          No task data available for selected range.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Task Status Overview</Text>

      <BarChart
        data={{
          labels: filteredData.map((item) => item.label),
          datasets: [
            {
              data: filteredData.map((item) => item.value),
            },
          ],
        }}
        width={screenWidth}
        height={240}
        yAxisLabel=""
        yAxisSuffix="%"
        fromZero
        showValuesOnTopOfBars
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
          labelColor: () => "#444",
          propsForBackgroundLines: {
            stroke: "#f0f0f0",
            strokeDasharray: "",
          },
          barPercentage: 0.6,
        }}
        style={styles.chart}
      />
    </View>
  );
};

export default TaskBarChartCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 24,
    marginBottom: 25,
    elevation: 4,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
  },

  chart: {
    borderRadius: 16,
  },

  emptyText: {
    color: "#888",
    marginTop: 10,
  },
});