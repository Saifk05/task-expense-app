import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Swipeable } from "react-native-gesture-handler";
import ConfirmModal from "../../component/ConfirmModal";
import { styles } from "./NotificationScreen.styles";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
}

const NotificationScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Expense Added",
      message: "You added ₹500 to Food",
      read: false,
    },
    {
      id: "2",
      title: "Monthly Report",
      message: "Your report is ready to view",
      read: true,
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const deleteAll = () => {
    setNotifications([]);
    setShowDeleteModal(false);
  };

  const deleteOne = (id: string) => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => deleteOne(id)}
    >
      <Ionicons name="trash" size={20} color="#fff" />
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = (id: string) => (
    <TouchableOpacity
      style={styles.readAction}
      onPress={() => markAsRead(id)}
    >
      <Ionicons name="checkmark" size={20} color="#fff" />
      <Text style={styles.actionText}>Read</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
<LinearGradient
  colors={["#60A5FA", "#1D4ED8"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.header}
>
<View style={styles.headerRow}>

  {/* <TouchableOpacity style={styles.backBtn}>
    <Ionicons name="arrow-back" size={22} color="#fff" />
  </TouchableOpacity> */}
<TouchableOpacity
  style={styles.backBtn}
  onPress={() => navigation.goBack()}
>
  <Ionicons name="arrow-back" size={22} color="#fff" />
</TouchableOpacity>
  <View style={styles.titleContainer}>
    <Text style={styles.headerTitle}>Notifications</Text>
    <Text style={styles.headerSubtitle}>
      Stay updated with activity
    </Text>
  </View>

  <View style={styles.actions}>
    <TouchableOpacity style={styles.markAllBtn}>
      <Ionicons name="checkmark-done" size={18} color="#fff" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.deleteBtn}>
      <Ionicons name="trash" size={18} color="#fff" />
    </TouchableOpacity>
  </View>

</View>
</LinearGradient>

      {/* LIST */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() =>
              renderRightActions(item.id)
            }
            renderLeftActions={() =>
              renderLeftActions(item.id)
            }
          >
            <View
              style={[
                styles.card,
                item.read && styles.readCard,
              ]}
            >
              <Text style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.message}>
                {item.message}
              </Text>
            </View>
          </Swipeable>
        )}
      />

      {/* DELETE CONFIRMATION */}
      <ConfirmModal
        visible={showDeleteModal}
        title="Delete All"
        message="Are you sure you want to delete all notifications?"
        confirmText="Delete"
        danger
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={deleteAll}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;