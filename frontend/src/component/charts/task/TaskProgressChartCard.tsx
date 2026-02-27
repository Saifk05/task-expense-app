import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  completionRate: number;
}

const TaskProgressChartCard: React.FC<Props> = ({
  completionRate,
}) => {
  const progress = Math.min(Math.max(completionRate, 0), 100);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weekly Progress</Text>

      <View style={styles.progressHeader}>
        <Text style={styles.label}>Completion Rate</Text>
        <Text style={styles.percent}>{progress}%</Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[styles.progressFill, { width: `${progress}%` }]}
        />
      </View>
    </View>
  );
};

export default TaskProgressChartCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 24,
    marginBottom: 30,
    elevation: 4,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 18,
    color: "#111",
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: "#444",
  },

  percent: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6C63FF",
  },

  progressBackground: {
    height: 12,
    backgroundColor: "#E9ECF2",
    borderRadius: 30,
    overflow: "hidden",
  },

  progressFill: {
    height: 12,
    backgroundColor: "#6C63FF",
    borderRadius: 30,
  },
});