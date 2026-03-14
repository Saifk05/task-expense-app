import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./CreateAccountScreen.styles";
import ApiService from "../../../services/api.service";
import AppDropdown from "../../../component/AppDropdown";

const ACCOUNT_TYPES = [
  { label: "Bank Account", value: "BANK" },
  { label: "Cash", value: "CASH" },
  { label: "Credit Card", value: "CREDIT_CARD" },
  { label: "Wallet", value: "WALLET" },
  { label: "Investment", value: "INVESTMENT" },
];

const CreateAccountScreen = ({ navigation }: any) => {

  const [name, setName] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [balance, setBalance] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {

    if (!name.trim()) {
      Alert.alert("Validation", "Account name is required");
      return;
    }

    if (!type) {
      Alert.alert("Validation", "Please select account type");
      return;
    }

    try {

      setLoading(true);

      await ApiService.createAccount({
        name,
        type,
        balance: Number(balance || 0),
      });

      Alert.alert("Success", "Account created successfully");

      navigation.goBack();

    } catch (error) {
      console.log("Create account error:", error);
      Alert.alert("Error", "Failed to create account");
    } finally {
      setLoading(false);
    }

  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Create Account
          </Text>

          <Text style={styles.headerSubtitle}>
            Add a financial account
          </Text>

        </View>


        {/* FORM */}

        <View style={styles.form}>

          {/* ACCOUNT NAME */}

          <Text style={styles.label}>Account Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: HDFC Bank"
            value={name}
            onChangeText={setName}
          />


          {/* ACCOUNT TYPE */}

          <AppDropdown
            label="Account Type"
            value={type}
            options={ACCOUNT_TYPES}
            placeholder="Select account type"
            onChange={setType}
          />


          {/* OPENING BALANCE */}

          <Text style={styles.label}>Opening Balance</Text>

          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={balance}
            onChangeText={setBalance}
          />


          {/* CREATE BUTTON */}

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateAccount}
            disabled={loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? "Creating..." : "Create Account"}
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
};

export default CreateAccountScreen;