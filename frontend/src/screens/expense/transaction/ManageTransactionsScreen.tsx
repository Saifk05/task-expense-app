import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  TextInput
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./ManageTransactionsScreen.styles";
import ApiService from "../../../services/api.service";

const ManageTransactionsScreen = ({ navigation }: any) => {

  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "EXPENSE" | "INCOME">("ALL");

  const [expenseTotal, setExpenseTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filterType, transactions]);

  const loadTransactions = async () => {

    try {

      const res = await ApiService.getTransactions({
        limit: 20
      });

      const data = res?.data?.data || [];

      setTransactions(data);
      setFilteredTransactions(data);

      calculateSummary(data);

    } catch (err) {

      console.log("Transaction fetch error", err);

    } finally {

      setLoading(false);

    }
  };

  const calculateSummary = (data: any[]) => {

    let expense = 0;
    let income = 0;

    data.forEach((t) => {

      const amount = Number(t.totalAmount);

      if (t.type === "EXPENSE") {
        expense += amount;
      } else {
        income += amount;
      }

    });

    setExpenseTotal(expense);
    setIncomeTotal(income);

  };

  const applyFilters = () => {

    let filtered = [...transactions];

    if (filterType !== "ALL") {
      filtered = filtered.filter(
        (t) => t.type === filterType
      );
    }

    if (search.trim() !== "") {

      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category?.name?.toLowerCase().includes(search.toLowerCase())
      );

    }

    setFilteredTransactions(filtered);

  };

  const onRefresh = async () => {

    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);

  };

  const renderItem = ({ item }: any) => {

    const isExpense = item.type === "EXPENSE";

    return (

      <View style={styles.card}>

        <View style={styles.row}>

          <View style={styles.leftSection}>

            <View style={styles.iconWrapper}>
              <Ionicons
                name="receipt-outline"
                size={18}
                color="#3985F7"
              />
            </View>

            <View>

              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.category}>
                {item.category?.name || "Uncategorized"}
              </Text>

            </View>

          </View>

          <View style={styles.rightSection}>

            <Text
              style={[
                styles.amount,
                { color: isExpense ? "#EF4444" : "#10B981" }
              ]}
            >
              {isExpense ? "-" : "+"} ₹{Number(item.totalAmount).toLocaleString()}
            </Text>

            <Text style={styles.date}>
              {new Date(item.transactionDate).toDateString()}
            </Text>

          </View>

        </View>

      </View>

    );

  };

  if (loading) {

    return (

      <SafeAreaView style={styles.container}>

        <ActivityIndicator size="large" color="#3985F7" />

      </SafeAreaView>

    );

  }

  return (

    <SafeAreaView style={styles.container}>

      {/* HEADER */}

      <LinearGradient
        colors={["#3B82F6", "#60A5FA"]}
        style={styles.header}
      >

        <View style={styles.headerTop}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Transactions
          </Text>

        </View>

        <Text style={styles.headerSubtitle}>
          Track all your expenses and income
        </Text>

      </LinearGradient>

      {/* SUMMARY */}

      <View style={styles.summaryContainer}>

        <View style={styles.summaryRow}>

          <View style={styles.summaryCard}>
            <Ionicons name="arrow-down" size={18} color="#EF4444" />
            <Text style={styles.summaryValue}>
              ₹{expenseTotal.toLocaleString()}
            </Text>
            <Text style={styles.summaryLabel}>Expense</Text>
          </View>

          <View style={styles.summaryCard}>
            <Ionicons name="arrow-up" size={18} color="#10B981" />
            <Text style={styles.summaryValue}>
              ₹{incomeTotal.toLocaleString()}
            </Text>
            <Text style={styles.summaryLabel}>Income</Text>
          </View>

        </View>

      </View>

      {/* SEARCH */}

      <View style={styles.searchContainer}>

        <Ionicons name="search" size={18} color="#6B7280" />

        <TextInput
          placeholder="Search transactions"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

      </View>

      {/* FILTER */}

      <View style={styles.filterRow}>

        {["ALL", "EXPENSE", "INCOME"].map((type) => (

          <TouchableOpacity
            key={type}
            onPress={() => setFilterType(type as any)}
            style={[
              styles.filterChip,
              filterType === type && styles.filterChipActive
            ]}
          >

            <Text
              style={[
                styles.filterText,
                filterType === type && styles.filterTextActive
              ]}
            >
              {type}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* LIST */}

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={() => (

          <View style={styles.emptyContainer}>
            <Ionicons name="wallet-outline" size={40} color="#9CA3AF" />
            <Text style={styles.emptyText}>
              No transactions yet
            </Text>
          </View>

        )}
      />

      {/* FAB

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateTransaction")}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity> */}

    </SafeAreaView>

  );

};

export default ManageTransactionsScreen;