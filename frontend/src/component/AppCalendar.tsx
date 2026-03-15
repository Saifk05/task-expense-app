import React from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

interface AppCalendarProps {
  value?: string;
  onChange?: (date: string) => void;
}

const AppCalendar: React.FC<AppCalendarProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          if (onChange) {
            onChange(day.dateString);
          }
        }}
        markedDates={{
          [value || ""]: {
            selected: true,
            selectedColor: "#4F46E5",
          },
        }}
        theme={{
          todayTextColor: "#4F46E5",
          arrowColor: "#4F46E5",
          selectedDayBackgroundColor: "#4F46E5",
        }}
      />
    </View>
  );
};

export default AppCalendar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },
});