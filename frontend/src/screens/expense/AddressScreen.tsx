import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./AddressScreen.styles";

const AddressScreen = ({ navigation }: any) => {
  const [searchAddress, setSearchAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSave = () => {
    console.log({
      searchAddress,
      building,
      locality,
      pincode,
      city,
      state,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: 120 }}
>
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
                <Text style={styles.headerTitle}>Address</Text>
                <Text style={styles.headerSubtitle}>
                  Update your location details
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* FORM */}
          <View style={styles.form}>

            <Text style={styles.label}>Search Full Address</Text>
            <TextInput
              value={searchAddress}
              onChangeText={setSearchAddress}
              style={styles.input}
              placeholder="Search full address"
            />

            <Text style={styles.label}>Building / House No</Text>
            <TextInput
              value={building}
              onChangeText={setBuilding}
              style={styles.input}
              placeholder="Enter building name"
            />

            <Text style={styles.label}>Locality</Text>
            <TextInput
              value={locality}
              onChangeText={setLocality}
              style={styles.input}
              placeholder="Enter locality"
            />

            <Text style={styles.label}>Pincode</Text>
            <TextInput
              value={pincode}
              onChangeText={setPincode}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter pincode"
            />

            <Text style={styles.label}>City</Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              style={styles.input}
              placeholder="Enter city"
            />

            {/* <Text style={styles.label}>State</Text>
            <TextInput
              value={state}
              onChangeText={setState}
              style={styles.input}
              placeholder="Enter state"
            /> */}

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>
                Save Address
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddressScreen;