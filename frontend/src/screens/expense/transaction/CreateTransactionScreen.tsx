import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import styles from "./CreateTransactionScreen.styles";
import ApiService from "../../../services/api.service";
import AppDropdown from "../../../component/AppDropdown";

import { CreateTransactionPayload } from "../../../services/types/transaction.types";

const CreateTransactionScreen = ({ route, navigation }: any) => {

  const {
    categoryId,
    subCategoryId,
    categoryName,
    subCategoryName,
    icon,
    color
  } = route.params || {};

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const [date, setDate] = useState(new Date());
  const [categoryType, setCategoryType] = useState<string | null>(null);

  /* ================= LOAD ACCOUNTS ================= */

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {

      const res = await ApiService.getAccounts();
      const accounts = res?.data?.accounts || [];

      const activeAccounts = accounts.filter(
        (acc: any) => acc.isActive === true
      );

      setAccounts(activeAccounts);

      if (activeAccounts.length > 0) {
        setSelectedAccount(activeAccounts[0].id);
      }

    } catch (err) {

      console.log("Account fetch error", err);

    }
  };

  /* ================= DROPDOWN OPTIONS ================= */

  const accountOptions = accounts.map((acc: any) => ({
    label: acc.name,
    value: acc.id
  }));

  const categoryTypeOptions = [
    { label: "Auto Detect", value: null },
    { label: "Need", value: "NEED" },
    { label: "Want", value: "WANT" },
    { label: "Saving", value: "SAVING" },
    { label: "Investment", value: "INVESTMENT" },
    { label: "Income", value: "INCOME" },
  ];

  /* ================= OPEN CALENDAR ================= */

  const openCalendar = () => {

    DateTimePickerAndroid.open({
      value: date,
      mode: "date",
      display: "default",
      is24Hour: true,
      onChange: (event, selectedDate) => {

        if (event.type === "dismissed") return;

        if (selectedDate) {
          setDate(selectedDate);
        }

      }
    });

  };

  /* ================= SAVE TRANSACTION ================= */

  const handleSave = async () => {

    if (!amount || Number(amount) <= 0) {
      Alert.alert("Validation", "Enter amount");
      return;
    }

    if (!selectedAccount) {
      Alert.alert("Validation", "Select account");
      return;
    }

    try {

      setLoading(true);

      const payload: CreateTransactionPayload = {
        accountId: selectedAccount,
        categoryId: (subCategoryId || categoryId) as string,
        title: (subCategoryName || categoryName || "Transaction") as string,
        description: note || "",
        type: "EXPENSE",
        quantity: 1,
        unitPrice: Number(amount),
        totalAmount: Number(amount),
        transactionDate: date.toISOString(),
      };

      console.log("Transaction payload:", payload);

      await ApiService.createTransaction(payload);

      Alert.alert("Success", "Transaction added");

      navigation.goBack();

    } catch (error) {

      console.log("Transaction error:", error);

      Alert.alert("Error", "Failed to create transaction");

    } finally {

      setLoading(false);

    }

  };

  return (

    <SafeAreaView style={styles.container}>

      {/* HEADER */}

      <LinearGradient
        colors={["#3985F7", "#5AA9FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >

        <View style={styles.headerRow}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              Add Expense
            </Text>

            <Text style={styles.headerSubtitle}>
              Create a new transaction
            </Text>
          </View>

        </View>

      </LinearGradient>

      {/* CONTENT */}

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
            flexGrow: 1
          }}
        >

          {/* CATEGORY */}

          <View style={styles.categoryCard}>

            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: color || "#EEF4FF" }
              ]}
            >
              <Ionicons
                name={(icon || "folder-outline") as any}
                size={22}
                color="#3985F7"
              />
            </View>

            <View>

              <Text style={styles.categoryText}>
                {categoryName}
              </Text>

              {subCategoryName && (
                <Text style={styles.subCategoryText}>
                  {subCategoryName}
                </Text>
              )}

            </View>

          </View>

          {/* CATEGORY TYPE */}

          <AppDropdown
            label="Category Type"
            value={categoryType}
            onChange={setCategoryType}
            options={categoryTypeOptions}
            placeholder="Select type"
          />

          {/* ACCOUNT */}

          <AppDropdown
            label="Select Account"
            value={selectedAccount}
            onChange={setSelectedAccount}
            options={accountOptions}
            placeholder="Choose account"
          />

          {/* DATE */}

          <Text style={styles.label}>Date</Text>

          <TouchableOpacity
            style={[
              styles.input,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }
            ]}
            onPress={openCalendar}
          >

            <Text>{date.toDateString()}</Text>

            <Ionicons
              name="calendar-outline"
              size={18}
              color="#6B7280"
            />

          </TouchableOpacity>

          {/* AMOUNT */}

          <Text style={styles.label}>
            Amount
          </Text>

          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            placeholder="₹ 0"
            value={amount}
            onChangeText={setAmount}
          />

          {/* NOTE */}

          <Text style={styles.label}>
            Note
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Add note"
            value={note}
            onChangeText={setNote}
          />

          {/* SAVE BUTTON */}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >

            <Ionicons name="checkmark-circle" size={20} color="#fff" />

            <Text style={styles.saveText}>
              {loading ? "Saving..." : "Save Transaction"}
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

};

export default CreateTransactionScreen;