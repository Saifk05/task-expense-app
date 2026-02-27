import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import styles from "./PendingTaskScreen.styles";
import ApiService from "../../services/api.service";
import CommonPopup from "../../component/CommonPopup";
import ReasonModal from "../../component/ReasonModal";
import NotFoundAnimation from "../../component/NotFoundAnimation";

type Props = NativeStackScreenProps<any>;

interface Task {
  id: string;
  title: string;
  description?: string;
}

const PendingTaskScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const [reasonModalVisible, setReasonModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const response = await ApiService.getPendingTasks(undefined, 20);
      const { grouped } = response.data;

      const flatTasks = grouped.flatMap((group: any) =>
        group.tasks
      );

      setTasks(flatTasks);
    } catch (error) {
      console.log("Failed to load pending tasks");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  // ================= UPDATE FLOW =================
  const openPopup = (task: Task) => {
    setSelectedTask(task);
    setPopupVisible(true);
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedTask) return;

    if (status === "CANCELLED") {
      setReasonModalVisible(true);
      return;
    }

    try {
      await ApiService.updateTask(selectedTask.id, { status });

      // Remove task from Pending list
      setTasks((prev) =>
        prev.filter((t) => t.id !== selectedTask.id)
      );
    } catch (error) {
      console.log("Failed to update task");
    }
  };

  const handleReasonSubmit = async (reason: string) => {
    if (!selectedTask) return;

    try {
      await ApiService.updateTask(selectedTask.id, {
        status: "CANCELLED",
        cancelledReason: reason,
      });

      setTasks((prev) =>
        prev.filter((t) => t.id !== selectedTask.id)
      );
    } catch (error) {
      console.log("Failed to cancel task");
    }
  };

  // ================= RENDER =================
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <Text style={styles.taskTitle}>{item.title}</Text>

      {item.description && (
        <Text style={styles.taskDescription}>
          {item.description}
        </Text>
      )}

      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: "#20B27A",
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 8,
          alignSelf: "flex-start",
        }}
        onPress={() => openPopup(item)}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Pending Tasks</Text>
            <Text style={styles.subtitle}>
              Tasks waiting to be completed
            </Text>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#20B27A"
          style={{ marginTop: 40 }}
        />
      ) : (
        // <FlatList
        //   data={tasks}
        //   keyExtractor={(item) => item.id}
        //   renderItem={renderItem}
        //   contentContainerStyle={styles.listContainer}
        //   refreshControl={
        //     <RefreshControl
        //       refreshing={refreshing}
        //       onRefresh={handleRefresh}
        //       colors={["#20B27A"]}
        //     />
        //   }
        //   ListEmptyComponent={
        //     <Text style={{ textAlign: "center", marginTop: 40 }}>
        //       No pending tasks 🎉
        //     </Text>
        //   }
        // />

        <FlatList
  data={tasks}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
  contentContainerStyle={[
    styles.listContainer,
    tasks.length === 0 && { flex: 1, justifyContent: "center" },
  ]}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      colors={["#20B27A"]}
    />
  }
  ListEmptyComponent={
    <NotFoundAnimation
      title="No Pending Tasks"
      subtitle="You're all caught up 🎉"
    />
  }
/>
      )}

      {/* STATUS SELECTION POPUP */}
      <CommonPopup
        visible={popupVisible}
        title="Update Task Status"
        type="selection"
        options={[
          { label: "In Progress", value: "IN_PROGRESS" },
          { label: "Completed", value: "COMPLETED" },
          { label: "Cancelled", value: "CANCELLED" },
        ]}
        onSelect={handleStatusChange}
        onClose={() => setPopupVisible(false)}
      />

      {/* CANCEL REASON MODAL */}
      <ReasonModal
        visible={reasonModalVisible}
        onClose={() => setReasonModalVisible(false)}
        onSubmit={handleReasonSubmit}
      />
    </View>
  );
};

export default PendingTaskScreen;