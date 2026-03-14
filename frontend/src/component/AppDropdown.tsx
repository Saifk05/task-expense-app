import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Option {
  label: string;
  value: string | null;
}

interface Props {
  label?: string;
  value: string | null;
  options: Option[];
  placeholder?: string;
  onChange: (value: string | null) => void;
}

const AppDropdown: React.FC<Props> = ({
  label,
  value,
  options,
  placeholder = "Select",
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const selected = options.find(o => o.value === value);

  return (
    <View style={{ marginBottom: 16 }}>

      {/* LABEL */}
      {label && (
        <Text style={{ fontWeight: "600", marginBottom: 6 }}>
          {label}
        </Text>
      )}

      {/* DROPDOWN BUTTON */}
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={{
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 10,
          padding: 14,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F9FAFB",
        }}
      >
        <Text style={{ color: "#111827" }}>
          {selected?.label || placeholder}
        </Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>

      {/* DROPDOWN LIST */}
      {open && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 10,
            marginTop: 6,
            maxHeight: 220,
            backgroundColor: "#FFF",
            overflow: "hidden",
          }}
        >
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
                style={{
                  padding: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: "#F3F4F6",
                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

    </View>
  );
};

export default AppDropdown;