import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ReportsScreen.styles";

const summary = {
  balance: 3257,
  monthlyExpense: 950,
  creditUsed: 620,
  creditLimit: 2000,
};

const categories = [
  { name: "Food", amount: 220, color: "#FCA5A5", icon: "fast-food-outline" },
  { name: "Transport", amount: 120, color: "#93C5FD", icon: "car-outline" },
  { name: "Shopping", amount: 350, color: "#FCD34D", icon: "cart-outline" },
  { name: "Entertainment", amount: 90, color: "#A7F3D0", icon: "game-controller-outline" },
];

const transactions = [
  { title: "Starbucks", amount: -12 },
  { title: "Uber Ride", amount: -20 },
  { title: "Amazon", amount: -45 },
  { title: "Salary", amount: +2500 },
];

// weekly comparison example
const lastWeekFood = 180;
const thisWeekFood = 243;

const percentage = Math.round(
  ((thisWeekFood - lastWeekFood) / lastWeekFood) * 100
);

const ReportsScreen = () => {
  const creditPercent = (summary.creditUsed / summary.creditLimit) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>${summary.balance}</Text>

        <Text style={styles.expenseLabel}>Monthly Expense</Text>
        <Text style={styles.expenseAmount}>${summary.monthlyExpense}</Text>
      </View>

      {/* Credit Card Usage */}
      <View style={styles.creditCard}>
        <View>
          <Text style={styles.creditTitle}>Credit Card Usage</Text>
          <Text style={styles.creditAmount}>
            ${summary.creditUsed} / ${summary.creditLimit}
          </Text>
        </View>

        <View style={styles.creditBar}>
          <View style={[styles.creditFill, { width: `${creditPercent}%` }]} />
        </View>
      </View>

      {/* Weekly Spending */}
      <View style={styles.weeklyCard}>
        <Text style={styles.weeklyTitle}>Weekly Spending</Text>

        <View style={styles.weekRow}>
          <Text>Mon</Text>
          <Text>$45</Text>
        </View>

        <View style={styles.weekRow}>
          <Text>Tue</Text>
          <Text>$32</Text>
        </View>

        <View style={styles.weekRow}>
          <Text>Wed</Text>
          <Text>$18</Text>
        </View>

        <View style={styles.weekRow}>
          <Text>Thu</Text>
          <Text>$62</Text>
        </View>
      </View>

      {/* Insight */}
      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Spending Insight</Text>

        <Text style={styles.insightText}>
          You spent <Text style={styles.highlight}>{percentage}%</Text> more on
          food this week.
        </Text>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Spending Categories</Text>

      {categories.map((item, index) => (
        <View key={index} style={styles.categoryCard}>
          <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon as any} size={18} color="#111" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>

          <Text style={styles.amount}>${item.amount}</Text>
        </View>
      ))}

      {/* Transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      {transactions.map((item, index) => (
        <View key={index} style={styles.transaction}>
          <Text style={styles.transactionTitle}>{item.title}</Text>

          <Text
            style={[
              styles.transactionAmount,
              { color: item.amount < 0 ? "#EF4444" : "#10B981" },
            ]}
          >
            {item.amount > 0
              ? `+$${item.amount}`
              : `-$${Math.abs(item.amount)}`}
          </Text>
        </View>
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default ReportsScreen;