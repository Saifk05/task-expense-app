import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./CreateCategoryScreen.styles";

const CreateCategoryScreen = ({ navigation }: any) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCreate = () => {
    if (!categoryName.trim()) {
      Alert.alert("Validation", "Please enter category name");
      return;
    }

    console.log("Create Category:", categoryName);

    // Later connect API here

    Alert.alert("Success", "Category created");

    navigation.goBack();
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

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Create Category</Text>
            <Text style={styles.headerSubtitle}>
              Add a new expense category
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* FORM */}

      <View style={styles.form}>
        <Text style={styles.label}>Category Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter category name"
          value={categoryName}
          onChangeText={setCategoryName}
        />

        <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.createText}>Create Category</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateCategoryScreen;