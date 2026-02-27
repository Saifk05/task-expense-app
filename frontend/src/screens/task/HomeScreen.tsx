import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import AppHeader from "../../component/AppHeader";
import { styles } from "./HomeScreen.styles";
import {
  TaskBarChartCard,
  TaskMetricsCard,
  TaskLineChartCard,
  TaskProgressChartCard,
  TaskSummaryCard,
  TaskScoreCard,
  TaskPieChartCard,
} from "../../component/charts/task";
import ApiService from "../../services/api.service";
import AppLoader from "../../component/AppLoader";
import { useFocusEffect } from "@react-navigation/native";

interface DashboardData {
  firstName: string;
  range: { from: string; to: string };
  weeklySummary: {
    totalTasks: number;
    completionRate: number;
  };
  taskMetrics: {
    completed: { percentage: number };
    pending: { percentage: number };
    inProgress: { percentage: number };
    cancelled: { percentage: number };
    overdue: { percentage: number };
  };
  weeklyActivity: { date: string; count: number }[];
  statusDistribution: {
    completedPercentage: number;
    cancelledPercentage: number;
  };
}

export default function TaskHomeScreen() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async () => {
    try {
      const response = await ApiService.getTaskDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.log("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // useEffect(() => {
  //   fetchDashboard();
  // }, []);

  useFocusEffect(
  useCallback(() => {
    setLoading(true);
    fetchDashboard();
  }, [])
);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboard();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Full Screen Loader */}
      <AppLoader visible={loading} />

      <AppHeader
        title="Dashboard"
        userName={dashboard?.firstName || "User"}
        showToggle
        showGreeting
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {dashboard && (
          <>
            <TaskScoreCard
              completionRate={dashboard.weeklySummary.completionRate}
            />

            <TaskSummaryCard
              totalTasks={dashboard.weeklySummary.totalTasks}
              completionRate={dashboard.weeklySummary.completionRate}
            />

            <TaskProgressChartCard
              completionRate={dashboard.weeklySummary.completionRate}
            />

            <TaskBarChartCard
              completed={dashboard.taskMetrics.completed.percentage}
              inProgress={dashboard.taskMetrics.inProgress.percentage}
              pending={dashboard.taskMetrics.pending.percentage}
              cancelled={dashboard.taskMetrics.cancelled.percentage}
              overdue={dashboard.taskMetrics.overdue.percentage}
            />

            <TaskMetricsCard
              totalTasks={dashboard.weeklySummary.totalTasks}
              taskMetrics={dashboard.taskMetrics}
            />

            <TaskLineChartCard
              data={dashboard.weeklyActivity}
            />

            <TaskPieChartCard
              completed={dashboard.statusDistribution.completedPercentage}
              cancelled={dashboard.statusDistribution.cancelledPercentage}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}



// import React, { useState, useCallback } from "react";
// import {
//   View,
//   ScrollView,
//   StatusBar,
//   RefreshControl,
//   TouchableOpacity,
//   Text,
//   Platform,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import Icon from "react-native-vector-icons/Feather";
// import AppHeader from "../../component/AppHeader";
// import { styles } from "./HomeScreen.styles";
// import {
//   TaskBarChartCard,
//   TaskMetricsCard,
//   TaskLineChartCard,
//   TaskProgressChartCard,
//   TaskSummaryCard,
//   TaskScoreCard,
//   TaskPieChartCard,
// } from "../../component/charts/task";
// import ApiService from "../../services/api.service";
// import AppLoader from "../../component/AppLoader";
// import { useFocusEffect } from "@react-navigation/native";

// export default function TaskHomeScreen() {
//   const [dashboard, setDashboard] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [showStart, setShowStart] = useState(false);
//   const [showEnd, setShowEnd] = useState(false);

//   const [startDate, setStartDate] = useState<Date | undefined>();
//   const [endDate, setEndDate] = useState<Date | undefined>();

//   const fetchDashboard = async (weekStart?: string, weekEnd?: string) => {
//     try {
//       const response = await ApiService.getTaskDashboard({
//         weekStart,
//         weekEnd,
//       });

//       setDashboard(response);
//     } catch (error) {
//       console.log("Dashboard fetch error:", error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       setLoading(true);
//       fetchDashboard();
//     }, [])
//   );

//   const applyFilter = () => {
//     if (startDate && endDate) {
//       setLoading(true);
//       fetchDashboard(
//         startDate.toISOString(),
//         endDate.toISOString()
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <AppLoader visible={loading} />

//       <AppHeader
//         title="Dashboard"
//         userName={dashboard?.firstName || "User"}
//         showToggle
//         showGreeting
//       />

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => fetchDashboard()}
//           />
//         }
//       >
//         {dashboard && (
//           <>
//             {/* Task Score Header */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: 10,
//               }}
//             >
//               <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//                 Task Score
//               </Text>

//               <Icon name="calendar" size={22} color="#4F46E5" />
//             </View>

//             {/* WEB DATE INPUTS */}
//             {Platform.OS === "web" && (
//               <View style={{ marginBottom: 15 }}>
//                 <input
//                   type="date"
//                   onChange={(e: any) =>
//                     setStartDate(new Date(e.target.value))
//                   }
//                 />
//                 <input
//                   type="date"
//                   style={{ marginLeft: 10 }}
//                   onChange={(e: any) =>
//                     setEndDate(new Date(e.target.value))
//                   }
//                 />
//                 <button onClick={applyFilter}>Apply</button>
//               </View>
//             )}

//             {/* MOBILE PICKERS */}
//             {Platform.OS !== "web" && (
//               <View style={{ marginBottom: 15 }}>
//                 <TouchableOpacity onPress={() => setShowStart(true)}>
//                   <Text>Select Start Date</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => setShowEnd(true)}>
//                   <Text>Select End Date</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={applyFilter}>
//                   <Text style={{ color: "#4F46E5" }}>Apply</Text>
//                 </TouchableOpacity>

//                 {showStart && (
//                   <DateTimePicker
//                     value={startDate || new Date()}
//                     mode="date"
//                     onChange={(event, date) => {
//                       setShowStart(false);
//                       if (date) setStartDate(date);
//                     }}
//                   />
//                 )}

//                 {showEnd && (
//                   <DateTimePicker
//                     value={endDate || new Date()}
//                     mode="date"
//                     onChange={(event, date) => {
//                       setShowEnd(false);
//                       if (date) setEndDate(date);
//                     }}
//                   />
//                 )}
//               </View>
//             )}

//             <TaskScoreCard
//               completionRate={dashboard.weeklySummary.completionRate}
//             />

//             <TaskSummaryCard
//               totalTasks={dashboard.weeklySummary.totalTasks}
//               completionRate={dashboard.weeklySummary.completionRate}
//             />

//             <TaskProgressChartCard
//               completionRate={dashboard.weeklySummary.completionRate}
//             />

//             <TaskBarChartCard
//               completed={dashboard.taskMetrics.completed.percentage}
//               inProgress={dashboard.taskMetrics.inProgress.percentage}
//               pending={dashboard.taskMetrics.pending.percentage}
//               cancelled={dashboard.taskMetrics.cancelled.percentage}
//               overdue={dashboard.taskMetrics.overdue.percentage}
//             />

//             <TaskMetricsCard
//               totalTasks={dashboard.weeklySummary.totalTasks}
//               taskMetrics={dashboard.taskMetrics}
//             />

//             <TaskLineChartCard data={dashboard.weeklyActivity} />

//             <TaskPieChartCard
//               completed={dashboard.statusDistribution.completedPercentage}
//               cancelled={dashboard.statusDistribution.cancelledPercentage}
//             />
//           </>
//         )}
//       </ScrollView>
//     </View>
//   );
// }