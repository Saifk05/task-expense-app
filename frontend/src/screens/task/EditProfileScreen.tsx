import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import styles from "./EditProfileScreen.styles";
import { ApiService } from "../../services/api.service";
import AppLoader from "../../component/AppLoader";

const EditProfileScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const isBusy = loading || saving || uploadingImage;

  useEffect(() => {
    fetchUser();
  }, []);

  // ================= FETCH PROFILE =================
  const fetchUser = async () => {
    try {
      setLoading(true);

      const response = await ApiService.getCurrentUser();
      const user = response.data;

      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoneNumber(user.phoneNumber || "");
      setGender(user.gender || "");
      setEmail(user.email || "");
      setProfilePicture(user.profilePictureUrl || null);

      if (user.dateOfBirth) {
        setDateOfBirth(new Date(user.dateOfBirth));
      }
    } catch (error) {
      console.log("Fetch user failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE PROFILE =================
  const handleSave = async () => {
    try {
      setSaving(true);

      await ApiService.updateProfile({
        firstName,
        lastName,
        phoneNumber,
        gender: gender || null,
        dateOfBirth: dateOfBirth
          ? dateOfBirth.toISOString()
          : null,
      });
    } catch (error) {
      console.log("Update failed:", error);
    } finally {
      setSaving(false);
    }
  };

  // ================= IMAGE PICK & UPLOAD =================
  const handlePickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

      if (result.canceled) return;

      const image = result.assets[0];
      const formData = new FormData();

      if (Platform.OS === "web") {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        formData.append("image", blob, "profile.jpg");
      } else {
        formData.append("image", {
          uri: image.uri,
          name: "profile.jpg",
          type: "image/jpeg",
        } as any);
      }

      setUploadingImage(true);

      const response =
        await ApiService.uploadProfileImage(formData);

      setProfilePicture(
        response.data.profilePictureUrl
      );
    } catch (error) {
      console.log("Image upload failed:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        // style={{ overflow: "visible" }} 
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Edit Profile
            </Text>
          </View>

          <Text style={styles.headerSubtitle}>
            Update your personal information
          </Text>
        </View>

        {/* PROFILE IMAGE */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri:
                  profilePicture ||
                  "https://i.pravatar.cc/150?img=12",
              }}
              style={styles.avatar}
            />

            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={handlePickImage}
            >
              <Ionicons
                name="camera"
                size={16}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          {/* GENDER */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) =>
                setGender(itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="MALE" />
              <Picker.Item label="Female" value="FEMALE" />
              <Picker.Item label="Other" value="OTHER" />
            </Picker>
          </View>

          {/* DATE OF BIRTH */}
          <Text style={styles.label}>Date of Birth</Text>

          {Platform.OS === "web" ? (
            <input
              type="date"
              value={
                dateOfBirth
                  ? dateOfBirth.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setDateOfBirth(
                  e.target.value
                    ? new Date(e.target.value)
                    : null
                )
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
                <Text>
                  {dateOfBirth
                    ? dateOfBirth
                        .toISOString()
                        .split("T")[0]
                    : "Select Date"}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={dateOfBirth || new Date()}
                  mode="date"
                  display="calendar"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDateOfBirth(selectedDate);
                    }
                  }}
                />
              )}
            </>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: "#E5E7EB" },
            ]}
            value={email}
            editable={false}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* GLOBAL LOADER */}
      <AppLoader visible={isBusy} />
    </View>
  );
};

export default EditProfileScreen;