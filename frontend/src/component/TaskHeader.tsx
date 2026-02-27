import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TaskHeaderProps {
  title: string;
  subtitle?: string;
  onBackPress: (event: GestureResponderEvent) => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
  title,
  subtitle,
  onBackPress,
}) => {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default TaskHeader;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#20B27A",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#E8FFF5",
    fontSize: 14,
    marginTop: 4,
  },
});