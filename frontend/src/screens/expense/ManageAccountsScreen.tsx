import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./ManageAccountsScreen.styles";

interface Account {
  id: string;
  name: string;
  balance: number;
  icon: string;
  bgColor: string;
}

const ManageAccountsScreen = ({ navigation }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const accounts: Account[] = [
    {
      id: "1",
      name: "Banks",
      balance: 3257,
      icon: "business-outline",
      bgColor: "#E0F2FE",
    },
    {
      id: "2",
      name: "Wallets",
      balance: 950,
      icon: "wallet-outline",
      bgColor: "#FEF3C7",
    },
    {
      id: "3",
      name: "Credit Card",
      balance: -1200,
      icon: "card-outline",
      bgColor: "#FEE2E2",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
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
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>Manage Accounts</Text>
            <Text style={styles.headerSubtitle}>
              Track your balances
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* CARDS */}
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: item.bgColor },
            ]}
          >
            <Ionicons
              name={item.icon as any}
              size={26}
              color="#1F2937"
            />

            <Text style={styles.cardBalance}>
              ${item.balance.toLocaleString()}
            </Text>

            <Text style={styles.cardLabel}>
              {item.name}
            </Text>
          </View>
        )}
      />

{/* FLOATING BUTTON */}
<View style={styles.fabContainer}>
  
  {/* Floating Menu */}
  {showMenu && (
    <View style={styles.fabMenu}>
      
      <TouchableOpacity
        style={styles.fabMenuItem}
        onPress={() => {
          setShowMenu(false);
          setShowModal(true); // open your Add Account modal if needed
        }}
      >
        <Ionicons name="add-circle-outline" size={18} color="#1F2937" />
        <Text style={styles.fabMenuText}>Add Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fabMenuItem}
        onPress={() => {
          setShowMenu(false);
          console.log("Delete clicked");
        }}
      >
        <Ionicons name="trash-outline" size={18} color="#EF4444" />
        <Text style={[styles.fabMenuText, { color: "#EF4444" }]}>
          Delete
        </Text>
      </TouchableOpacity>

    </View>
  )}

  {/* FAB */}
  <TouchableOpacity
    style={styles.fab}
    onPress={() => setShowMenu(!showMenu)}
  >
    <Ionicons name="add" size={26} color="#fff" />
  </TouchableOpacity>

</View>

      {/* ADD ACCOUNT MODAL */}
      {/* <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Account</Text>

            <TextInput
              placeholder="Account Name"
              style={styles.input}
              value={accountName}
              onChangeText={setAccountName}
            />

            <TextInput
              placeholder="Initial Balance"
              keyboardType="numeric"
              style={styles.input}
              value={balance}
              onChangeText={setBalance}
            />

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.saveText}>Add Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{ marginTop: 12 }}
            >
              <Text style={{ color: "#EF4444" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default ManageAccountsScreen;