import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

interface ReasonModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const PRESET_REASONS = [
  "Changed my mind",
  "Task no longer needed",
  "Duplicate task",
  "Other",
];

const ReasonModal: React.FC<ReasonModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState("");

  const handleSubmit = () => {
    if (!selectedReason) return;

    if (selectedReason === "Other") {
      if (!customReason.trim()) return;
      onSubmit(customReason.trim());
    } else {
      onSubmit(selectedReason);
    }

    resetState();
    onClose();
  };

  const resetState = () => {
    setSelectedReason(null);
    setCustomReason("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Why are you cancelling?</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {PRESET_REASONS.map((reason) => {
              const isSelected = selectedReason === reason;

              return (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.reasonOption,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedReason(reason)}
                >
                  <Text
                    style={[
                      styles.reasonText,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {reason}
                  </Text>

                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Text style={styles.checkMark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}

            {/* Show Input Only If "Other" */}
            {selectedReason === "Other" && (
              <TextInput
                value={customReason}
                onChangeText={setCustomReason}
                placeholder="Enter custom reason..."
                style={styles.input}
                multiline
              />
            )}
          </ScrollView>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={handleClose}
              style={[styles.button, styles.cancelBtn]}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.button,
                styles.submitBtn,
                !selectedReason && { opacity: 0.5 },
              ]}
              disabled={!selectedReason}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ReasonModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxHeight: "75%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 18,
  },

  /* Reason Option */
  reasonOption: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  reasonText: {
    fontSize: 15,
    fontWeight: "500",
  },
  selectedText: {
    color: "#EF4444",
  },

  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  /* Input */
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    marginTop: 6,
  },

  /* Actions */
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginLeft: 12,
  },
  cancelBtn: {
    backgroundColor: "#E5E7EB",
  },
  submitBtn: {
    backgroundColor: "#EF4444",
  },
  cancelText: {
    fontWeight: "600",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
});