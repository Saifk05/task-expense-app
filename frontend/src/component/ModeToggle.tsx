import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useMode } from "../context/ModeContext";

const ModeToggle = () => {
  const { mode, setMode } = useMode();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          mode === "expense" && styles.activeExpense,
        ]}
        onPress={() => setMode("expense")}
      >
        <Text
          style={
            mode === "expense"
              ? styles.activeText
              : styles.inactiveText
          }
        >
          Expense
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          mode === "task" && styles.activeTask,
        ]}
        onPress={() => setMode("task")}
      >
        <Text
          style={
            mode === "task"
              ? styles.activeText
              : styles.inactiveText
          }
        >
          Task
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModeToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 30,
    padding: 4,
    marginHorizontal: 20,
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 26,
  },
  activeExpense: {
    backgroundColor: "#3985F7",
  },
  activeTask: {
    backgroundColor: "#10B981",
  },
  inactiveText: {
    color: "#6B7280",
    fontWeight: "500",
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});