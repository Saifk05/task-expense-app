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
import styles from "./CancelledTaskScreen.styles";
import ApiService from "../../services/api.service";
import NotFoundAnimation from "../../component/NotFoundAnimation";

type Props = NativeStackScreenProps<any>;

interface Task {
  id: string;
  title: string;
  description?: string;
  cancelledReason?: string;
  categoryName?: string;

}

const CancelledTaskScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async (cursor?: string) => {
    try {
      const response = await ApiService.getCancelledTasks(
        cursor,
        10
      );

      const { grouped, nextCursor } = response.data;

        const flatTasks = grouped.flatMap((group: any) =>
        group.tasks.map((task: any) => ({
            ...task,
            categoryName: group.categoryName,
        }))
        );

      if (cursor) {
        setTasks((prev) => [...prev, ...flatTasks]);
      } else {
        setTasks(flatTasks);
      }

      setNextCursor(nextCursor);
    } catch (error) {
      console.log("Failed to load cancelled tasks");
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
    {/* Category Badge */}
    {item.categoryName && (
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>
          {item.categoryName}
        </Text>
      </View>
    )}

    <View style={styles.cardHeader}>
      <Ionicons
        name="checkmark-done-circle"
        size={20}
        color="#20B27A"
      />
      <Text style={styles.taskTitle}>{item.title}</Text>
    </View>

    {item.description ? (
      <Text style={styles.taskDescription}>
        {item.description}
      </Text>
    ) : null}

    {item.cancelledReason ? (
      <>
        <Text style={styles.reasonLabel}>Reason</Text>
        <Text style={styles.reasonText}>
          {item.cancelledReason}
        </Text>
      </>
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
            <Text style={styles.title}>Cancelled Tasks</Text>
            <Text style={styles.subtitle}>
              Tasks that were cancelled
            </Text>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#7F8C8D"
          style={{ marginTop: 40 }}
        />
      ) : (
        // <FlatList
        //   data={tasks}
        //   keyExtractor={(item) => item.id}
        //   renderItem={renderItem}
        // //   contentContainerStyle={styles.listContainer}

        // contentContainerStyle={[
        // styles.listContainer,
        // tasks.length === 0 && { flex: 1, justifyContent: "center" },
        // ]}
        //   showsVerticalScrollIndicator={false}
        //   onEndReached={handleLoadMore}
        //   onEndReachedThreshold={0.5}
        //   ListFooterComponent={
        //     loadingMore ? (
        //       <ActivityIndicator
        //         size="small"
        //         color="#7F8C8D"
        //         style={{ marginVertical: 20 }}
        //       />
        //     ) : null
        //   }
        //   refreshControl={
        //     <RefreshControl
        //       refreshing={refreshing}
        //       onRefresh={handleRefresh}
        //       colors={["#7F8C8D"]}
        //     />
        //   }
        // //   ListEmptyComponent={
        // //     <Text style={{ textAlign: "center", marginTop: 40 }}>
        // //       No cancelled tasks 🙂
        // //     </Text>
        // //   }

        // ListEmptyComponent={
        // <NotFoundAnimation
        //     title="No Cancelled Tasks"
        //     subtitle="Nothing was cancelled 🎉"
        // />
        // }
        // />

        <FlatList
  data={tasks}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
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
        color="#7F8C8D"
        style={{ marginVertical: 20 }}
      />
    ) : null
  }
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      colors={["#7F8C8D"]}
    />
  }
  ListEmptyComponent={
    <NotFoundAnimation
      title="No Cancelled Tasks"
      subtitle="Nothing was cancelled 🎉"
    />
  }
/>
      )}
    </View>
  );
};

export default CancelledTaskScreen;