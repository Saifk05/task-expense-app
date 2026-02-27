import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 40;

interface Props {
  data: { date: string; count: number }[];
}

const TaskLineChartCard: React.FC<Props> = ({ data }) => {
  const labels = data.map((item) => {
    const d = new Date(item.date);
    return d.toLocaleDateString("en-US", { weekday: "short" });
  });

  const values = data.map((item) => item.count);

  const hasData = values.some((v) => v > 0);

  if (!hasData) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Weekly Task Activity</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No task activity in selected range.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weekly Task Activity</Text>

      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: values,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        withInnerLines={false}
        withOuterLines={false}
        withDots
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
          labelColor: () => "#444",
          propsForBackgroundLines: {
            stroke: "#f2f2f2",
            strokeDasharray: "",
          },
          strokeWidth: 3,
        }}
        style={styles.chart}
        bezier
      />
    </View>
  );
};

export default TaskLineChartCard;

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

  emptyContainer: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#888",
    fontSize: 14,
  },
});