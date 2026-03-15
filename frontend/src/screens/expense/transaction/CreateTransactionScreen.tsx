import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { showSuccess, showError, showWarning } from "../../../utils/notification.util";

import styles from "./CreateTransactionScreen.styles";
import ApiService from "../../../services/api.service";
import AppDropdown from "../../../component/AppDropdown";
import AppDatePicker from "../../../component/AppDatePicker";

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

  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const [useQuantity, setUseQuantity] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("");

  const [date, setDate] = useState(new Date());
  const [categoryType, setCategoryType] = useState<string | null>(null);

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

  const totalAmount = useQuantity
    ? Number(quantity || 0) * Number(unitPrice || 0)
    : Number(unitPrice || 0);

  const handleSave = async () => {

    if (!unitPrice || Number(unitPrice) <= 0) {
      showWarning("Validation", "Enter amount");
      return;
    }

    if (!selectedAccount) {
      showWarning("Validation", "Select account");
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
        quantity: useQuantity ? Number(quantity) : 1,
        unitPrice: Number(unitPrice),
        totalAmount: totalAmount,
        transactionDate: date.toISOString(),
      };

      await ApiService.createTransaction(payload);

      showSuccess("Success", "Transaction added");

      navigation.goBack();

    } catch (error: any) {

      const message =
        error?.response?.data?.message || "Failed to create transaction";

      if (message === "INSUFFICIENT_BALANCE") {
        showError("Transaction Failed", "Insufficient account balance");
      } else {
        showError("Error", message);
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <SafeAreaView style={styles.container}>

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

          <AppDropdown
            label="Category Type"
            value={categoryType}
            onChange={setCategoryType}
            options={categoryTypeOptions}
            placeholder="Select type"
          />

          <AppDropdown
            label="Select Account"
            value={selectedAccount}
            onChange={setSelectedAccount}
            options={accountOptions}
            placeholder="Choose account"
          />

          <Text style={styles.label}>Date</Text>

          <AppDatePicker
            value={date}
            onChange={setDate}
          />

          <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 10
            }}
            >
  <Text style={styles.label}>Quantity</Text>

  <TouchableOpacity
    onPress={() => setUseQuantity(!useQuantity)}
    style={{
      width: 34,
      height: 34,
      borderRadius: 10,
      backgroundColor: "#3985F7",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Ionicons
      name={useQuantity ? "remove" : "add"}
      size={18}
      color="#fff"
    />
  </TouchableOpacity>
</View>

          {useQuantity && (

            <>

              {/* <Text style={styles.label}>
                Quantity
              </Text> */}

              <TextInput
                style={styles.amountInput}
                keyboardType="number-pad"
                placeholder="1"
                value={quantity}
                onChangeText={(text) => {

                  const cleaned = text.replace(/[^0-9]/g, "");
                  setQuantity(cleaned);

                }}
              />

              <Text style={styles.label}>
                Total Amount
              </Text>

              <View style={styles.amountInput}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  ₹ {totalAmount || 0}
                </Text>
              </View>

            </>

          )}

             
          <Text style={styles.label}>
            Amount
          </Text>

          <TextInput
            style={styles.amountInput}
            keyboardType="number-pad"
            placeholder="₹ 0"
            value={unitPrice}
            onChangeText={(text) => {

              const cleaned = text.replace(/[^0-9.]/g, "");

              const parts = cleaned.split(".");
              if (parts.length > 2) return;

              setUnitPrice(cleaned);

            }}
          />

          <Text style={styles.label}>
            Description
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Add Description"
            value={note}
            onChangeText={setNote}
          />

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