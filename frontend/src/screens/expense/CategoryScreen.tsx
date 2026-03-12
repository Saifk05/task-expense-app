import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CategoryScreen.styles";

const CategoryScreen = ({ navigation }: any) => {
  const categories = [
    { name: "Food", icon: "fast-food-outline" },
    { name: "Transport", icon: "car-outline" },
    { name: "Shopping", icon: "cart-outline" },
    { name: "Bills", icon: "receipt-outline" },
    { name: "Entertainment", icon: "game-controller-outline" },
    { name: "Health", icon: "medkit-outline" },
  ];

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      {/* Category List */}
      <ScrollView contentContainerStyle={styles.list}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <Ionicons name={cat.icon as any} size={22} color="#10B981" />
            <Text style={styles.categoryText}>{cat.name}</Text>

            <Ionicons name="chevron-forward-outline" size={20} color="#888" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Category */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={22} color="#fff" />
        <Text style={styles.addText}>Add Category</Text>
      </TouchableOpacity>

    </View>
  );
};

export default CategoryScreen;