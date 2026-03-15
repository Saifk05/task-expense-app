import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  value?: Date;
  onChange?: (date: Date) => void;
}

const AppDatePicker: React.FC<Props> = ({ value, onChange }) => {

  const [visible, setVisible] = useState(false);

  const formattedDate = value
    ? value.toISOString().split("T")[0]
    : undefined;

  const handleSelect = (day: any) => {
    const selectedDate = new Date(day.dateString);
    onChange?.(selectedDate);
    setVisible(false);
  };

  return (
    <View>

      {/* INPUT */}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setVisible(true)}
      >

        <Text style={styles.text}>
          {value ? value.toDateString() : "Select Date"}
        </Text>

        <Ionicons name="calendar-outline" size={20} color="#6B7280" />

      </TouchableOpacity>


      {/* CALENDAR MODAL */}

      <Modal
        visible={visible}
        transparent
        animationType="slide"
      >

        <View style={styles.overlay}>

          <View style={styles.calendarBox}>

            <Calendar
              onDayPress={handleSelect}
              markedDates={
                formattedDate
                  ? {
                      [formattedDate]: {
                        selected: true,
                        selectedColor: "#3985F7",
                      },
                    }
                  : {}
              }
              theme={{
                todayTextColor: "#3985F7",
                arrowColor: "#3985F7",
              }}
            />

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.close}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </View>
  );
};

export default AppDatePicker;

const styles = StyleSheet.create({

  input:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    padding:14,
    borderRadius:10,
    borderWidth:1,
    borderColor:"#E5E7EB",
    backgroundColor:"#fff"
  },

  text:{
    fontSize:14,
    color:"#111827"
  },

  overlay:{
    flex:1,
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.3)",
    padding:20
  },

  calendarBox:{
    backgroundColor:"#fff",
    borderRadius:16,
    padding:10
  },

  close:{
    marginTop:10,
    alignItems:"center"
  },

  closeText:{
    color:"#3985F7",
    fontWeight:"600"
  }

});