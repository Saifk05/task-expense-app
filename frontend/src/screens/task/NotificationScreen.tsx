import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Swipeable } from "react-native-gesture-handler";
import styles from "./NotificationScreen.styles";
import ApiService from "../../services/api.service";

interface BackendNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  type: string;
  isRead: boolean;
}

interface Props {
  navigation: any;
}

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [notifications, setNotifications] = useState<
    BackendNotification[]
  >([]);
  const [nextCursor, setNextCursor] = useState<string | null>(
    null
  );
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    loadNotifications();
  }, []);

  /* ================= LOAD NOTIFICATIONS ================= */

  const loadNotifications = async (cursor?: string) => {
    if (!hasMore && cursor) return;

    try {
      setLoading(true);

      const res = await ApiService.getNotifications(
        cursor,
        10
      );

      const { notifications, nextCursor, hasMore } =
        res.data;

      setNotifications((prev) =>
        cursor ? [...prev, ...notifications] : notifications
      );

      setNextCursor(nextCursor);
      setHasMore(hasMore);
    } catch (error) {
      console.log("Notification load error", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ICON MAPPING ================= */

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "TASK_UPDATED":
        return {
          icon: "create-outline",
          iconColor: "#3B82F6",
          bg: "#E0F2FE",
        };
      case "TASK_OVERDUE":
        return {
          icon: "alert-circle",
          iconColor: "#EF4444",
          bg: "#FEE2E2",
        };
      case "TASK_COMPLETED":
        return {
          icon: "checkmark-circle",
          iconColor: "#10B981",
          bg: "#D1FAE5",
        };
      default:
        return {
          icon: "notifications",
          iconColor: "#6B7280",
          bg: "#E5E7EB",
        };
    }
  };

  /* ================= ACTIONS ================= */

  const markAsRead = async (id: string) => {
    try {
      await ApiService.markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch (error) {
      console.log("Mark read error", error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await ApiService.deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await ApiService.markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );
    } catch (error) {
      console.log("Mark all error", error);
    }
  };

  /* ================= SWIPE ACTIONS ================= */

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => deleteNotification(id)}
    >
      <Icon name="trash" size={22} color="#FFF" />
    </TouchableOpacity>
  );

  const renderLeftActions = (id: string) => (
    <TouchableOpacity
      style={styles.readAction}
      onPress={() => markAsRead(id)}
    >
      <Icon name="checkmark-done" size={22} color="#FFF" />
    </TouchableOpacity>
  );

  /* ================= RENDER ITEM ================= */

  const renderItem = ({
    item,
  }: {
    item: BackendNotification;
  }) => {
    const styleData = getNotificationStyle(item.type);

    return (
      <Swipeable
        renderRightActions={() =>
          renderRightActions(item.id)
        }
        renderLeftActions={() =>
          renderLeftActions(item.id)
        }
      >
        <Animated.View
          style={[
            styles.card,
            { opacity: fadeAnim },
            item.isRead && styles.readCard,
          ]}
        >
          <View
            style={[
              styles.iconBox,
              { backgroundColor: styleData.bg },
            ]}
          >
            <Icon
              name={styleData.icon}
              size={22}
              color={styleData.iconColor}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.message}>
              {item.message}
            </Text>
            <Text style={styles.time}>
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </Text>
          </View>
        </Animated.View>
      </Swipeable>
    );
  };

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="arrow-back"
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Notifications
          </Text>

          <View style={{ flex: 1 }} />

          <TouchableOpacity onPress={markAllAsRead}>
            <Icon
              name="checkmark-done"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerSubtitle}>
          Manage your updates
        </Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={() =>
          nextCursor && loadNotifications(nextCursor)
        }
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="small"
              color="#3B82F6"
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;