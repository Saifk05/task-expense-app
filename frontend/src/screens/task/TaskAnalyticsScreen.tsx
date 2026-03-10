import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  RefreshControl,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from "react-native-svg";
import styles from "./TaskAnalyticsScreen.styles";
import AppLoader from "../../component/AppLoader";
import ApiService from "../../services/api.service";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const categories = [
  {
    name: "Income",
    example: "Salary arrives on 25th",
    progress: 40,
    color: "#FDE68A",
  },
  {
    name: "Work",
    example: "Submit client report",
    progress: 75,
    color: "#BFDBFE",
  },
  {
    name: "Personal",
    example: "Workout 30 mins daily",
    progress: 30,
    color: "#F9A8D4",
  },
];

const TaskAnalyticsScreen = () => {
  const navigation = useNavigation<any>();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState<any>(null);

  const [liveProgress, setLiveProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  const [pullDistance, setPullDistance] = useState(0);
  const [isWebRefreshing, setIsWebRefreshing] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayPercentage, setDisplayPercentage] = useState(0);  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch API
  const fetchSummary = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);

      const response = await ApiService.getProductivitySummary();
      setSummary(response.data);

      setLiveProgress(
        response.data?.active?.activePercentage ?? 0
      );
    } catch (error) {
      console.log("Analytics load error:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // Call API every time screen opens
  useFocusEffect(
    useCallback(() => {
      fetchSummary(true);
    }, [])
  );

  // Pull to refresh (mobile)
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchSummary(false);
    } finally {
      setRefreshing(false);
    }
  };

  // Web pull logic
  const handleWebScroll = (event: any) => {
    if (Platform.OS !== "web") return;

    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY < 0) {
      setPullDistance(Math.abs(offsetY));
    } else {
      setPullDistance(0);
    }

    if (offsetY < -80 && !isWebRefreshing) {
      triggerWebRefresh();
    }
  };

  const triggerWebRefresh = async () => {
    try {
      setIsWebRefreshing(true);
      setRefreshing(true);
      await fetchSummary(false);
    } finally {
      setRefreshing(false);
      setIsWebRefreshing(false);
      setPullDistance(0);
    }
  };

  // Live auto progress increment
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setLiveProgress((prev) => {
          if (prev >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 100;
          }
          return +(prev + 0.1).toFixed(1);
        });
      }, 60000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);


  const performanceLevel = summary?.weekly?.performanceLevel;


  const formatPerformanceLevel = (level?: string) => {
  if (!level) return "N/A";

  return level
    .toLowerCase()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


const getWeeklyCardColor = () => {
  switch (performanceLevel) {
    case "VERY_HIGH":
      return "#BBF7D0";
    case "HIGH":
      return "#DCFCE7";
    case "MEDIUM":
      return "#FEF9C3";
    case "LOW":
      return "#FDE68A";
    case "VERY_LOW":
    default:
      return "#fef3ca";
  }
};

const getPerformanceTextColor = () => {
  switch (performanceLevel) {
    case "VERY_HIGH":
      return "#16A34A";
    case "HIGH":
      return "#22C55E";
    case "MEDIUM":
      return "#EAB308";
    case "LOW":
      return "#F97316";
    case "VERY_LOW":
    default:
      return "#DC2626";
  }
};

const performanceTextColor = getPerformanceTextColor();
const getPerformanceLevelColor = () => {
  switch (performanceLevel) {
    case "VERY_HIGH":
      return "#D1FAE5"; // soft mint
    case "HIGH":
      return "#DBEAFE"; // soft blue
    case "MEDIUM":
      return "#FEF3C7"; // soft yellow
    case "LOW":
      return "#FEE2E2"; // light red
    case "VERY_LOW":
    default:
      return "#FDE2E2"; // different red (not same as weekly)
  }
};

const performanceLevelCardColor = getPerformanceLevelColor();


const isActiveMode = isRunning;

const currentPercentage = isActiveMode
  ? summary?.active?.activePercentage ?? 0
  : summary?.overall?.overallProductivityPercentage ?? 0;

// Animate arc when percentage changes
useEffect(() => {
  Animated.timing(animatedValue, {
    toValue: currentPercentage,
    duration: 700,
    useNativeDriver: false,
  }).start();
}, [currentPercentage]);

useEffect(() => {
  const listener = animatedValue.addListener(({ value }) => {
    setDisplayPercentage(Math.round(value));
  });

  return () => {
    animatedValue.removeListener(listener);
  };
}, []);


  
const currentTaskCount = isActiveMode
  ? summary?.active?.inProgressTasks ?? 0
  : summary?.overall?.completedTasks ?? 0;

const currentTitle = isActiveMode
  ? "In Progress Tasks"
  : "Completed Tasks";

const gradientColors = isActiveMode
  ? ["#6EE7B7", "#22C55E"]   // Green for Active
  : ["#93C5FD", "#3B82F6"]; // Blue for Overall



const weeklyCardColor = getWeeklyCardColor();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleWebScroll}
        scrollEventThrottle={16}
        refreshControl={
          Platform.OS !== "web" ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#10B981"]}
              tintColor="#10B981"
            />
          ) : undefined
        }
      >
        {Platform.OS === "web" && (
          <View
            style={{
              height: pullDistance,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pullDistance > 10 && (
              <Text style={{ color: "#10B981", fontWeight: "600" }}>
                {isWebRefreshing
                  ? "Refreshing..."
                  : pullDistance > 80
                  ? "Release to refresh"
                  : "Pull to refresh"}
              </Text>
            )}
          </View>
        )}

        <LinearGradient
          colors={["#10B981", "#059669"]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Stay Organized</Text>
          <Text style={styles.headerSubtitle}>
            Manage your daily tasks efficiently
          </Text>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {summary?.overall?.totalTasks ?? 0}
            </Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {summary?.streak ?? 0} 🔥
            </Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
        </View>

  <View
  style={[
    styles.scoreCard,
    { backgroundColor: weeklyCardColor,marginBottom: 20   },
  ]}
>
  <Text style={styles.scoreTitle}>Performance Level</Text>

  <Text style={styles.scoreValue}>
    {formatPerformanceLevel(summary?.weekly?.performanceLevel)}
  </Text>
{/* 
  <Text style={styles.scoreSub}>
    {summary?.weekly?.message}
  </Text> */}
</View>


<View
  style={[
    styles.liveCard,
    {
      backgroundColor: isActiveMode
        ? "#BBF7D0"
        : "#BFDBFE",
    },
  ]}
>
  
            <View style={styles.liveHeader}>
            <View>
              {/* <Text style={styles.liveSub}>Current tasks</Text>
              <Text style={styles.liveTitle}>
                {summary?.active?.currentTaskName ?? "App Design"}
              </Text> */}

              <Text style={styles.liveSub}>{currentTitle}</Text>
                <Text style={styles.liveTitle}>
                  {currentTaskCount}
                </Text>
            </View>

            <Switch
              value={isRunning}
              onValueChange={setIsRunning}
              trackColor={{ false: "#CBD5E1", true: "#4ADE80" }}
            />
          </View>

          <View style={styles.arcContainer}>
            <Svg width={240} height={140}>
              <Defs>
                <SvgGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor={gradientColors[0]} />
                  <Stop offset="1" stopColor={gradientColors[1]} />
                </SvgGradient>
              </Defs>

              <Path
                d="M20 120 A100 100 0 0 1 220 120"
                stroke="#D1FAE5"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
              />

              <Path
                d="M20 120 A100 100 0 0 1 220 120"
                stroke="url(#grad)"
                strokeWidth="20"
                fill="none"
                strokeDasharray={`${(displayPercentage  / 100) * 314} 314`}     
                 strokeLinecap="round"
              />
            </Svg>

            <Text style={styles.arcPercent}>{displayPercentage}%</Text>
          </View>
        </View>

        <View
  style={[
    styles.scoreCard,
    { backgroundColor: performanceLevelCardColor }
  ]}
>
        {/* <View style={styles.scoreCard}> */}
          <Text style={styles.scoreTitle}>Weekly Performance</Text>
        <Text style={[styles.scoreValue, { color: performanceTextColor }]}>
              {summary?.weekly?.weeklyPerformancePercentage ?? 0}%
          </Text>
          <Text style={styles.scoreSub}>
            {summary?.weekly?.message ??
              "You're doing great 🚀"}
          </Text>
        </View>
        {/* <View style={styles.categoryContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryCard,
                { backgroundColor: cat.color },
              ]}
            >
              <View>
                <Text style={styles.categoryTitle}>{cat.name}</Text>
                <Text style={styles.categoryExample}>
                  {cat.example}
                </Text>
              </View>

              <View style={styles.circleProgress}>
                <Text style={styles.circleText}>
                  {cat.progress}%
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View> */}


<View style={styles.categoryContainer}>

  {/* Overdue */}
  <TouchableOpacity
    style={[styles.categoryCard, { backgroundColor: "#FECACA" }]}
    onPress={() => navigation.navigate("OverdueTask")}
  >
    <View>
      <Text style={styles.categoryTitle}>Overdue</Text>
      <Text style={styles.categoryExample}>
        Tasks past due date
      </Text>
    </View>

    <View style={styles.circleProgress}>
      <Text style={[styles.circleText, { color: "#DC2626" }]}>
        {summary?.overdueTasksCount ?? 0}
      </Text>
    </View>
  </TouchableOpacity>

  {/* Pending */}
  <TouchableOpacity
    style={[styles.categoryCard, { backgroundColor: "#BFDBFE" }]}
    onPress={() => navigation.navigate("PendingTask")}
  >
    <View>
      <Text style={styles.categoryTitle}>Pending</Text>
      <Text style={styles.categoryExample}>
        Tasks waiting to complete
      </Text>
    </View>

    <View style={styles.circleProgress}>
      <Text style={styles.circleText}>
        {summary?.overall?.pendingCount ?? 0}
      </Text>
    </View>
  </TouchableOpacity>

  {/* In Progress */}
  <TouchableOpacity
    style={[styles.categoryCard, { backgroundColor: "#FED7AA" }]}
    onPress={() => navigation.navigate("InprogressTask")}
  >
    <View>
      <Text style={styles.categoryTitle}>In Progress</Text>
      <Text style={styles.categoryExample}>
        Tasks currently active
      </Text>
    </View>

    <View style={styles.circleProgress}>
      <Text style={[styles.circleText, { color: "#C2410C" }]}>
        {summary?.overall?.inProgressCount ?? 0}
      </Text>
    </View>
  </TouchableOpacity>

  {/* Completed */}
  <TouchableOpacity
    style={[styles.categoryCard, { backgroundColor: "#BBF7D0" }]}
    onPress={() => navigation.navigate("CompletedTask")}
  >
    <View>
      <Text style={styles.categoryTitle}>Completed</Text>
      <Text style={styles.categoryExample}>
        Tasks finished today
      </Text>
    </View>

    <View style={styles.circleProgress}>
      <Text style={styles.circleText}>
        {summary?.overall?.completedTasks ?? 0}
      </Text>
    </View>
  </TouchableOpacity>

  {/* Cancelled */}
  <TouchableOpacity
    style={[styles.categoryCard, { backgroundColor: "#E5E7EB" }]}
    onPress={() => navigation.navigate("CancelledTask")}
  >
    <View>
      <Text style={styles.categoryTitle}>Cancelled</Text>
      <Text style={styles.categoryExample}>
        Tasks that were cancelled
      </Text>
    </View>

    <View style={styles.circleProgress}>
      <Text style={[styles.circleText, { color: "#6B7280" }]}>
        {summary?.overall?.cancelledCount ?? 0}
      </Text>
    </View>
  </TouchableOpacity>

</View>

      </ScrollView>

      <View style={styles.fabWrapper}>
        {fabOpen && (
          <View style={styles.fabMenu}>
            {/* <TouchableOpacity
              style={styles.fabPill}
              onPress={() => setFabOpen(false)}
            >
              <Text style={styles.fabPillText}>Create Task</Text>
            </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.fabPill}
                onPress={() => {
                  setFabOpen(false);
                  navigation.navigate("Settings", {
                    screen: "TaskCategory",
                  });
                }}
              >
                <Text style={styles.fabPillText}>Create Task</Text>
              </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => setFabOpen(!fabOpen)}
        >
          <Text style={styles.fabIcon}>
            {fabOpen ? "✕" : "+"}
          </Text>
        </TouchableOpacity>
      </View>

      <AppLoader visible={loading} />
    </SafeAreaView>
  );
};

export default TaskAnalyticsScreen;