import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  totalTasks: number;
  completionRate: number;
}

const TaskSummaryCard: React.FC<Props> = ({
  totalTasks,
  completionRate,
}) => {
  const safeRate = Math.min(Math.max(completionRate, 0), 100);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weekly Task Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Total Tasks</Text>
        <Text style={styles.value}>{totalTasks}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Completion Rate</Text>
        <Text style={styles.highlightValue}>{safeRate}%</Text>
      </View>
    </View>
  );
};

export default TaskSummaryCard;

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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 14,
    color: "#444",
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  highlightValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6C63FF",
  },

  divider: {
    height: 1,
    backgroundColor: "#E9ECF2",
    marginVertical: 14,
  },
});