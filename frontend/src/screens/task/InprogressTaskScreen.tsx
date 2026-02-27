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
import styles from "./InprogressTaskScreen.styles";
import ApiService from "../../services/api.service";
import NotFoundAnimation from "../../component/NotFoundAnimation";


type Props = NativeStackScreenProps<any>;

interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: string;
}

const InprogressTaskScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async (cursor?: string) => {
    try {
      const response = await ApiService.getInProgressTasks(
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
      console.log("Failed to load in-progress tasks");
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
      <Text style={styles.taskTitle}>{item.title}</Text>

      {item.description ? (
        <Text style={styles.taskDescription}>
          {item.description}
        </Text>
      ) : null}

      {item.priority ? (
        <Text style={{ marginTop: 6, color: "#20B27A" }}>
          Priority: {item.priority}
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
            <Text style={styles.title}>In Progress Tasks</Text>
            <Text style={styles.subtitle}>
              Tasks currently being worked on
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
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        //   contentContainerStyle={styles.listContainer}
        contentContainerStyle={[
        styles.listContainer,
        tasks.length === 0 && { flex: 1, justifyContent: "center" },
        ]}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color="#20B27A"
                style={{ marginVertical: 20 }}
              />
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#20B27A"]}
            />
          }
        //   ListEmptyComponent={
        //     <Text style={{ textAlign: "center", marginTop: 40 }}>
        //       No in-progress tasks 🚀
        //     </Text>
        //   }

        ListEmptyComponent={
        <NotFoundAnimation
                title="No In-Progress Tasks"
                subtitle="Nothing is being worked on 🚀"
            />
            }
        />
      )}
    </View>
  );
};

export default InprogressTaskScreen;