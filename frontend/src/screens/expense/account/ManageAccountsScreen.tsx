import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Animated,  
  ScrollView,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { toWords } from "number-to-words";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import styles from "./ManageAccountsScreen.styles";
import ApiService from "../../../services/api.service";
import AppLoader from "../../../component/AppLoader";

const ManageAccountsScreen = ({ navigation }: any) => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({
    totalActiveAccounts: 0,
    totalInactiveAccounts: 0,
    totalBalance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [showActive, setShowActive] = useState(true);
  const [fabOpen, setFabOpen] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedAccountData, setSelectedAccountData] = useState<any>(null);
  const [editBalance, setEditBalance] = useState("");
  const [editActive, setEditActive] = useState(true);
  const slideAnim = useState(new Animated.Value(300))[0];

    useFocusEffect(
      useCallback(() => {
        loadAccounts();
      }, [])
    );

  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     // tabBarStyle: sheetVisible ? { display: "none" } : undefined,
  //   });
  // }, [sheetVisible]);

   useEffect(() => {
  navigation.getParent()?.setOptions({
    tabBarStyle: sheetVisible
      ? { position: "absolute", height: 0 }
      : {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 20,
          backgroundColor: "#FFFFFF",
          elevation: 10,
        },
  });
}, [sheetVisible]);

  const loadAccounts = async () => {
    try {
      setLoading(true);

      const response = await ApiService.getAccounts();

      const accountsData =
        response?.data?.data?.accounts ||
        response?.data?.accounts ||
        [];

      const summaryData =
        response?.data?.data?.summary ||
        response?.data?.summary ||
        {};

      setAccounts(accountsData);
      setSummary(summaryData);
    } catch (error) {
      console.log("Error loading accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeSheet = () => {
  Animated.timing(slideAnim, {
    toValue: 300,
    duration: 250,
    useNativeDriver: true,
  }).start(() => {
    setSheetVisible(false);
  });
};

  const toggleFab = () => {
    setFabOpen(!fabOpen);
  };

  const filteredAccounts = accounts.filter((acc: any) => {
    if (showActive) return acc.isActive === true;
    return acc.isActive === false;
  });

  const totalBalance = Number(summary?.totalBalance || 0);

  const formatMoney = (value: number | string) => {
    const num = Number(value || 0);
    return num.toLocaleString("en-IN");
  };


  const getBalanceInWords = () => {
  if (!editBalance) return "";

  try {
    const num = Number(editBalance);
    if (isNaN(num)) return "";

    return toWords(num) + " rupees";
  } catch {
    return "";
  }
};
  const getAccountIcon = (type: string) => {
    switch (type) {
      case "BANK":
        return "business-outline";
      case "CASH":
        return "cash-outline";
      case "CREDIT_CARD":
        return "card-outline";
      case "WALLET":
        return "wallet-outline";
      case "INVESTMENT":
        return "trending-up-outline";
      default:
        return "wallet-outline";
    }
  };

  return (
    <View style={styles.container}>
      <AppLoader visible={loading} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 80  }}
        >
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>

            <View style={{ marginLeft: 12 }}>
              <Text style={styles.headerTitle}>Manage Accounts</Text>
              <Text style={styles.headerSubtitle}>
                Track your financial sources
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.balanceCard}>
            <Text style={styles.cardLabel}>Total Balance</Text>

            <Text style={styles.balanceValue}>
              ₹ {formatMoney(totalBalance)}
            </Text>

            <Text style={styles.balanceHint}>
              Across all accounts
            </Text>
          </View>

          <View style={styles.accountCardSummary}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardLabel}>Accounts</Text>

              <Switch
                value={showActive}
                onValueChange={setShowActive}
                trackColor={{ false: "#D1D5DB", true: "#D1D5DB" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D1D5DB"
              />
            </View>

            <Text style={styles.accountNumber}>
              {showActive
                ? summary?.totalActiveAccounts
                : summary?.totalInactiveAccounts}
            </Text>

            <Text style={styles.accountStatus}>
              {showActive
                ? "Active Accounts"
                : "Inactive Accounts"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          {showActive
            ? "Active Accounts"
            : "Inactive Accounts"}
        </Text>

        {filteredAccounts.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Ionicons
              name="wallet-outline"
              size={42}
              color="#94A3B8"
            />

            <Text style={{ marginTop: 10, color: "#64748B" }}>
              No accounts found
            </Text>
          </View>
        ) : (
          filteredAccounts.map((acc: any) => (
            <TouchableOpacity
              key={acc.id}
              style={styles.accountCard}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: "#EEF2FF" },
                ]}
              >
                <Ionicons
                  name={getAccountIcon(acc.type) as any}
                  size={20}
                  color="#1E3A8A"
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.accountName}>
                  {acc.name}
                </Text>

                <Text style={styles.accountType}>
                  {acc.type?.replace("_", " ")}
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.accountBalance}>
                  ₹ {formatMoney(acc.balance)}
                </Text>

                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => {
                    setSelectedAccountData(acc);
                    setEditBalance(String(acc.balance || ""));
                    setEditActive(acc.isActive);
                    setSheetVisible(true);

                      Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                      }).start();
                  }}
                >
                  <Ionicons name="eye-outline" size={14} color="#3985F7" />
                  <Text style={styles.viewText}>View</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {fabOpen && (
        <View style={styles.fabMenu}>
          <TouchableOpacity
            style={styles.fabOption}
            onPress={() => {
              setFabOpen(false);
              navigation.navigate("AddAccount");
            }}
          >
            <Ionicons
              name="wallet-outline"
              size={18}
              color="#111827"
            />

            <Text style={styles.fabText}>
              Add Account
            </Text>
          </TouchableOpacity>
        </View>
      )}


      {sheetVisible && (
        <TouchableWithoutFeedback onPress={closeSheet}>
          <View style={styles.sheetOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1, justifyContent: "flex-end" }}
            >
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    styles.bottomSheet,
                    { transform: [{ translateY: slideAnim }] }
                  ]}
                >
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.dragHandle} />

                    <Text style={styles.sheetTitle}>
                      {selectedAccountData?.name}
                    </Text>

                    <Text style={styles.sheetSubtitle}>
                      {selectedAccountData?.type?.replace("_", " ")}
                    </Text>

                    <Text style={styles.sheetLabel}>
                      Balance
                    </Text>

                    <TextInput
                      style={styles.sheetInput}
                      keyboardType="number-pad"
                      value={editBalance}
                      onChangeText={(t) => {
                        const clean = t.replace(/[^0-9.-]/g, "");
                        setEditBalance(clean);
                      }}
                    />

                    <View style={styles.sheetToggleRow}>
                      <Text style={styles.sheetLabel}>
                        Active Account
                      </Text>

                      <Switch
                        value={editActive}
                        onValueChange={setEditActive}
                        trackColor={{ false: "#E5E7EB", true: "#4ADE80" }}
                        thumbColor="#FFFFFF"
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.sheetUpdateButton}
                      onPress={async () => {
                        try {
                          await ApiService.updateAccount(
                            selectedAccountData.id,
                            {
                              balance: Number(editBalance),
                              isActive: editActive,
                            }
                          );

                          closeSheet();
                          loadAccounts();
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      <Text style={styles.sheetUpdateText}>
                        Save Changes
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={closeSheet}>
                      <Text style={styles.sheetCancel}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                </Animated.View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      )}
      {!sheetVisible && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={toggleFab}
        >
          <Ionicons
            name={fabOpen ? "close" : "add"}
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ManageAccountsScreen;