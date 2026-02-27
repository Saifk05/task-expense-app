import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

interface MetricItem {
  percentage: number;
}

interface Props {
  totalTasks: number;
  taskMetrics: {
    completed: MetricItem;
    pending: MetricItem;
    inProgress: MetricItem;
    cancelled: MetricItem;
    overdue: MetricItem;
  };
}

const TaskMetricsCard: React.FC<Props> = ({
  totalTasks,
  taskMetrics,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const countAnim = useRef(new Animated.Value(0)).current;

  const metrics = useMemo(
    () =>
      [
        {
          label: "Completed",
          percentage: taskMetrics.completed.percentage,
          colors: ["#4CAF50", "#81C784"] as const,
          emoji: "✅",
          message: "Great job finishing tasks!",
        },
        {
          label: "In Progress",
          percentage: taskMetrics.inProgress.percentage,
          colors: ["#FF9800", "#FFB74D"] as const,
          emoji: "🚧",
          message: "You're actively working.",
        },
        {
          label: "Pending",
          percentage: taskMetrics.pending.percentage,
          colors: ["#2196F3", "#64B5F6"] as const,
          emoji: "📝",
          message: "Tasks waiting to start.",
        },
        {
          label: "Cancelled",
          percentage: taskMetrics.cancelled.percentage,
          colors: ["#F44336", "#E57373"] as const,
          emoji: "❌",
          message: "Tasks were cancelled.",
        },
        {
          label: "Overdue",
          percentage: taskMetrics.overdue.percentage,
          colors: ["#9E9E9E", "#BDBDBD"] as const,
          emoji: "⏰",
          message: "Some tasks missed deadlines.",
        },
      ].filter((m) => m.percentage > 0),
    [taskMetrics]
  );

  useEffect(() => {
    if (metrics.length <= 1) return;

    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setActiveIndex((prev) =>
          prev === metrics.length - 1 ? 0 : prev + 1
        );

        fadeAnim.setValue(0);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [metrics.length]);

  if (metrics.length === 0) return null;

  const item = metrics[activeIndex];
  const finalCount = Math.round(
    (item.percentage / 100) * totalTasks
  );

  useEffect(() => {
    countAnim.setValue(0);

    const listener = countAnim.addListener(({ value }) => {
      setDisplayCount(Math.floor(value));
    });

    Animated.timing(countAnim, {
      toValue: finalCount,
      duration: 800,
      useNativeDriver: false,
    }).start();

    return () => {
      countAnim.removeListener(listener);
    };
  }, [activeIndex]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Task Metrics</Text>

      <Animated.View style={{ opacity: fadeAnim }}>
        <LinearGradient
          colors={item.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.metricCard}
        >
          <View style={styles.headerRow}>
            <Text style={styles.metricTitle}>
              {item.emoji} {item.label}
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {item.percentage}%
              </Text>
            </View>
          </View>

          <Text style={styles.metricValue}>
            {displayCount}
          </Text>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${item.percentage}%` },
              ]}
            />
          </View>

          <Text style={styles.messageText}>
            {item.message}
          </Text>
        </LinearGradient>
      </Animated.View>

      <View style={styles.dotsContainer}>
        {metrics.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default TaskMetricsCard;

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

  metricCard: {
    width: width - 40,
    padding: 24,
    borderRadius: 28,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  metricTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "600",
  },

  metricValue: {
    fontSize: 48,
    fontWeight: "900",
    color: "#fff",
    marginVertical: 10,
  },

  progressBackground: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
  },

  progressFill: {
    height: 8,
    backgroundColor: "#fff",
  },

  messageText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.95,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#6C63FF",
  },
});