import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  completionRate: number;
}

const TaskScoreCard: React.FC<Props> = ({ completionRate }) => {
  const score = Math.round(Math.min(Math.max(completionRate, 0), 100));

  const getMessage = () => {
    if (score >= 85) return "Excellent performance this week. Keep it up!";
    if (score >= 70) return "You're above average. Strong productivity!";
    if (score >= 50) return "Good effort. There's room to improve.";
    return "Let's focus on completing more tasks next week.";
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Task Score</Text>

      <View style={styles.card}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Productivity Score</Text>
          <Text style={styles.cardDesc}>{getMessage()}</Text>
        </View>
      </View>
    </View>
  );
};

export default TaskScoreCard;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },

  scoreBox: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: "#E0ECFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  scoreText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2D5BFF",
  },

  textContainer: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    color: "#222",
  },

  cardDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
});