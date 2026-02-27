import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import styles from "./OverdueTaskScreen.styles";
import ApiService from "../../services/api.service";
import CommonPopup from "../../component/CommonPopup";

type Props = NativeStackScreenProps<any>;

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
}

const OverdueTaskScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await ApiService.getOverdueTasks(undefined, 20);
      const { grouped } = response.data;

      const flatTasks = grouped.flatMap((group: any) =>
        group.tasks.map((task: any) => ({
          ...task,
          categoryName: group.categoryName,
        }))
      );

      setTasks(flatTasks);
    } catch (error) {
      console.log("Failed to load overdue tasks");
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

  const openPopup = (task: Task) => {
    setSelectedTask(task);
    setPopupVisible(true);
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedTask) return;

    try {
      if (status === "CANCELLED") {
        Alert.prompt(
          "Cancel Reason",
          "Enter reason for cancellation",
          async (reason) => {
            await ApiService.updateTask(selectedTask.id, {
              status,
              cancelledReason: reason,
            });

            setTasks((prev) =>
              prev.filter((t) => t.id !== selectedTask.id)
            );
          }
        );
      } else {
        await ApiService.updateTask(selectedTask.id, {
          status,
        });

        setTasks((prev) =>
          prev.filter((t) => t.id !== selectedTask.id)
        );
      }
    } catch (error) {
      console.log("Failed to update task");
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <Text style={styles.taskTitle}>{item.title}</Text>

      {item.description && (
        <Text style={styles.taskDescription}>
          {item.description}
        </Text>
      )}

      {item.dueDate && (
        <Text style={{ color: "#E53935", marginTop: 6 }}>
          Due: {new Date(item.dueDate).toDateString()}
        </Text>
      )}

      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: "#10B981",
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
            <Text style={styles.title}>Overdue Tasks</Text>
            <Text style={styles.subtitle}>
              Tasks that missed the deadline
            </Text>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#E53935"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#E53935"]}
            />
          }
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              No overdue tasks 🎉
            </Text>
          }
        />
      )}

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
    </View>
  );
};

export default OverdueTaskScreen;