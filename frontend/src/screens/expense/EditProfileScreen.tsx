import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./EditProfileScreen.styles";

const EditProfileScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Morgan");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("alex@email.com");
  const [phone, setPhone] = useState("+1 9876543210");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    console.log("Profile Updated");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* HEADER */}
          <LinearGradient
            colors={["#60A5FA", "#1D4ED8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
              >
                <Ionicons name="arrow-back" size={22} color="#fff" />
              </TouchableOpacity>

              <View>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <Text style={styles.headerSubtitle}>
                  Update your information
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* PROFILE IMAGE */}
          <View style={styles.profileWrapper}>
            <View style={styles.avatarContainer}>
              <Image
                source={require("../../../assets/picture.jpg")}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraBtn}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            
            {/* Row 1 */}
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  style={styles.input}
                />
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  style={styles.input}
                />
              </View>
            </View>

            {/* Row 2 */}
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Gender</Text>
                <TextInput
                  value={gender}
                  onChangeText={setGender}
                  style={styles.input}
                />
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>Date of Birth</Text>

                {Platform.OS === "web" ? (
                  <input
                    type="date"
                    value={date.toISOString().split("T")[0]}
                    onChange={(e) =>
                      setDate(new Date(e.target.value))
                    }
                    style={{
                      height: 48,
                      borderRadius: 12,
                      border: "1px solid #D1D5DB",
                      padding: "0 12px",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text>{date.toDateString()}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        maximumDate={new Date()}
                        onChange={(event, selectedDate) => {
                          setShowDatePicker(false);
                          if (selectedDate) {
                            setDate(selectedDate);
                          }
                        }}
                      />
                    )}
                  </>
                )}
              </View>
            </View>

            {/* Row 3 */}
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.input}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>Email ID</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* SAVE BUTTON */}
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;