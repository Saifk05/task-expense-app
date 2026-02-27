import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ActivityIndicator,
} from "react-native";

interface OptionItem {
  label: string;
  value: string;
}

interface CommonPopupProps {
  visible: boolean;
  title: string;
  type: "selection" | "toggle";

  // selection
  options?: OptionItem[];
  selectedValue?: string;
  onSelect?: (value: string) => void;

  // toggle
  toggleLabel?: string;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  loading?: boolean;

  onClose: () => void;
}

const CommonPopup: React.FC<CommonPopupProps> = ({
  visible,
  title,
  type,
  options,
  selectedValue,
  onSelect,
  toggleLabel,
  toggleValue = false,
  onToggle,
  loading = false,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          {/* ================= SELECTION TYPE ================= */}
          {type === "selection" &&
            options?.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.option}
                onPress={() => {
                  onSelect?.(item.value);
                  onClose();
                }}
              >
                <Text style={styles.optionText}>{item.label}</Text>

                {selectedValue === item.value && (
                  <Text style={styles.selected}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

          {/* ================= TOGGLE TYPE ================= */}
          {type === "toggle" && (
            <View style={styles.toggleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionText}>
                  {toggleLabel || "Toggle Option"}
                </Text>
                <Text style={styles.subText}>
                  Add extra security to your account
                </Text>
              </View>

              {loading ? (
                <ActivityIndicator size="small" color="#10B981" />
              ) : (
                <Switch
                  value={toggleValue}
                  onValueChange={onToggle}
                  disabled={loading}
                  trackColor={{ false: "#D1D5DB", true: "#10B981" }}
                  thumbColor="#FFFFFF"
                />
              )}
            </View>
          )}

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommonPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "500",
  },
  subText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  selected: {
    fontSize: 16,
    color: "#10B981",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  closeBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  closeText: {
    color: "#EF4444",
    fontWeight: "600",
  },
});