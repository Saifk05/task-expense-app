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
import styles from "./CompletedTaskScreen.styles";
import ApiService from "../../services/api.service";

type Props = NativeStackScreenProps<any>;

interface Task {
  id: string;
  title: string;
  description?: string;
  completedAt?: string;
}

const CompletedTaskScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async (cursor?: string) => {
    try {
      const response = await ApiService.getCompletedTasks(
        cursor,
        10
      );

      const { grouped, nextCursor } = response.data;

      const flatTasks = grouped.flatMap(
        (group: any) => group.tasks
      );

      if (cursor) {
        setTasks((prev) => [...prev, ...flatTasks]);
      } else {
        setTasks(flatTasks);
      }

      setNextCursor(nextCursor);
    } catch (error) {
      console.log("Failed to load completed tasks");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLoadMore = () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    fetchTasks(nextCursor);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons
          name="checkmark-circle"
          size={20}
          color="#2ECC71"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.taskTitle}>{item.title}</Text>
      </View>

      {item.description ? (
        <Text style={styles.taskDescription}>
          {item.description}
        </Text>
      ) : null}

      {item.completedAt ? (
        <Text style={{ marginTop: 6, color: "#2ECC71" }}>
          Completed on{" "}
          {new Date(item.completedAt).toDateString()}
        </Text>
      ) : null}
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
            <Text style={styles.title}>Completed Tasks</Text>
            <Text style={styles.subtitle}>
              Tasks successfully finished
            </Text>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2ECC71"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color="#2ECC71"
                style={{ marginVertical: 20 }}
              />
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#2ECC71"]}
            />
          }
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              No completed tasks yet 💪
            </Text>
          }
        />
      )}
    </View>
  );
};

export default CompletedTaskScreen;