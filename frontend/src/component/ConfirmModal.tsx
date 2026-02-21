import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onCancel} disabled={loading}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              disabled={loading}
              style={{ marginLeft: 20 }}
            >
              {loading ? (
                <ActivityIndicator color="#EF4444" />
              ) : (
                <Text
                  style={[
                    styles.confirmText,
                    danger && { color: "#EF4444" },
                  ]}
                >
                  {confirmText}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelText: {
    fontSize: 14,
    color: "#6B7280",
  },
  confirmText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
});