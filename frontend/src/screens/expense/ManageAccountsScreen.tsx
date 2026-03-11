import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ManageAccountsScreen.styles";

const accounts = [
  {
    id: 1,
    name: "Credit Card",
    type: "Visa •••• 4432",
    balance: 620,
    icon: "card-outline",
    color: "#FCA5A5",
  },
  {
    id: 2,
    name: "Bank Account",
    type: "HDFC Savings",
    balance: 2100,
    icon: "business-outline",
    color: "#93C5FD",
  },
  {
    id: 3,
    name: "Cash Wallet",
    type: "Personal Wallet",
    balance: 537,
    icon: "wallet-outline",
    color: "#A7F3D0",
  },
  {
    id: 4,
    name: "UPI Wallet",
    type: "Google Pay",
    balance: 120,
    icon: "phone-portrait-outline",
    color: "#FCD34D",
  },
];

const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

const ManageAccountsScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        {/* HEADER */}
<View style={styles.header}>

  <View style={styles.headerRow}>

    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={20} color="#fff" />
    </TouchableOpacity>

    <View style={styles.headerText}>
      <Text style={styles.headerTitle}>Manage Accounts</Text>
      <Text style={styles.headerSubtitle}>
        Manage your financial sources
      </Text>
    </View>

  </View>

</View>

        {/* BALANCE CARD */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>${totalBalance}</Text>
        </View>

        {/* ACCOUNTS */}
        <Text style={styles.sectionTitle}>Your Accounts</Text>

        {accounts.map((acc) => (
          <View key={acc.id} style={styles.accountCard}>
            <View style={[styles.iconCircle, { backgroundColor: acc.color }]}>
              <Ionicons name={acc.icon as any} size={20} color="#111827" />
            </View>

            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{acc.name}</Text>
              <Text style={styles.accountType}>{acc.type}</Text>
            </View>

            <Text style={styles.accountBalance}>${acc.balance}</Text>
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ADD ACCOUNT BUTTON */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ManageAccountsScreen;