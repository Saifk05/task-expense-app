import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  /* LOAD ACCOUNTS */

  useEffect(() => {
    loadAccounts();
  }, []);

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

  /* TOGGLE FAB */

  const toggleFab = () => {
    setFabOpen(!fabOpen);
  };

  /* FILTER ACCOUNTS */

  const filteredAccounts = accounts.filter((acc: any) => {
    if (showActive) return acc.isActive === true;
    return acc.isActive === false;
  });

  /* TOTAL BALANCE */

  const totalBalance = Number(summary?.totalBalance || 0);

  /* FORMAT MONEY */

  const formatMoney = (value: number | string) => {
    const num = Number(value || 0);
    return num.toLocaleString("en-IN");
  };

  /* ACCOUNT ICON */

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

      {/* GLOBAL LOADER */}
      <AppLoader visible={loading} />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}

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

        {/* SUMMARY */}

        <View style={styles.summaryRow}>

          {/* TOTAL BALANCE */}

          <View style={styles.balanceCard}>
            <Text style={styles.cardLabel}>Total Balance</Text>

            <Text style={styles.balanceValue}>
              ₹ {formatMoney(totalBalance)}
            </Text>

            <Text style={styles.balanceHint}>
              Across all accounts
            </Text>
          </View>

          {/* ACCOUNT COUNT */}

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

        {/* LIST HEADER */}

        <Text style={styles.sectionTitle}>
          {showActive
            ? "Active Accounts"
            : "Inactive Accounts"}
        </Text>

        {/* EMPTY STATE */}

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

              {/* ICON */}

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

              {/* ACCOUNT INFO */}

              <View style={{ flex: 1 }}>
                <Text style={styles.accountName}>
                  {acc.name}
                </Text>

                <Text style={styles.accountType}>
                  {acc.type?.replace("_", " ")}
                </Text>
              </View>

              {/* BALANCE */}

              <Text style={styles.accountBalance}>
                ₹ {formatMoney(acc.balance)}
              </Text>

            </TouchableOpacity>

          ))

        )}

        <View style={{ height: 120 }} />

      </ScrollView>

      {/* FAB MENU */}

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

      {/* FLOATING BUTTON */}

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

    </View>
  );
};

export default ManageAccountsScreen;