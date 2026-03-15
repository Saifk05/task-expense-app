import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native";
import AppDropdown from "../../../component/AppDropdown";

import styles from "./CategoryScreen.styles";
import ApiService from "../../../services/api.service";
import ConfirmModal from "../../../component/ConfirmModal";
import { showSuccess, showError } from "../../../utils/notification.util";


const CategoryScreen = ({ navigation }: any) => {

  /* ================= STATES ================= */

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [sheetVisible, setSheetVisible] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  
  const [categoryType, setCategoryType] = useState<string | null>(null);  
  const [addCategoryVisible, setAddCategoryVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [createType, setCreateType] =
    useState<"CATEGORY" | "SUBCATEGORY">("CATEGORY");

  const [parentCategoryId, setParentCategoryId] =
    useState<string | null>(null);

  /* DELETE MODE */

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* ================= LOAD CATEGORIES ================= */

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await ApiService.getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.log("Category fetch error", err);
      showError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  /* ================= OPEN CATEGORY ================= */

  const openSheet = (category: any) => {

    if (deleteMode) {
      toggleSelect(category.id);
      return;
    }

    setSelectedCategory(category);
    setParentCategoryId(category.id);
    setSheetVisible(true);
  };

  const closeSheet = () => {
    setSheetVisible(false);
    setSelectedCategory(null);
  };

  const toggleFab = () => {
    setFabOpen(!fabOpen);
  };

  /* ================= SELECT CATEGORY ================= */

  const toggleSelect = (id: string) => {

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  /* ================= DELETE ================= */

  const deleteCategories = async () => {

    try {

      setDeleteLoading(true);

      for (const id of selectedIds) {
        await ApiService.deleteCategory(id);
      }

      showSuccess("Category deleted successfully");
      setConfirmVisible(false);
      setDeleteMode(false);
      setSelectedIds([]);

      loadCategories();

    } catch (err) {

      console.log("Delete error", err);
      showError("Failed to delete category");

    } finally {

      setDeleteLoading(false);

    }
  };

  /* ================= CREATE CATEGORY ================= */

  const handleCreateCategory = async () => {

  if (!newCategoryName.trim()) {
      showError("Category name is required");
    return;  
  }
  try {

    const payload: any = {
      name: newCategoryName
    };

    if (categoryType) {
      payload.type = categoryType;
    }

    await ApiService.createCategory(payload);
    showSuccess("Category created successfully");
    setNewCategoryName("");
    setCategoryType(null);
    setAddCategoryVisible(false);

    loadCategories();

  } catch (err) {
    console.log("Create category error", err);
    showError("Failed to create category");
  }

};

/* ================= CATEGORY CARD ================= */

  const renderCategory = ({ item }: any) => {

    const selected = selectedIds.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.card,
          selected && styles.cardSelected
        ]}
        onPress={() => openSheet(item)}
        onLongPress={() => {
          setDeleteMode(true);
          toggleSelect(item.id);
        }}
      >

        {deleteMode && (
          <View style={styles.checkbox}>
            <Ionicons
              name={selected ? "checkmark-circle" : "ellipse-outline"}
              size={22}
              color={selected ? "#EF4444" : "#9CA3AF"}
            />
          </View>
        )}

        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: item.color || "#EEF4FF" },
          ]}
        >
          <Ionicons
            name={item.icon as any}
            size={22}
            color="#3985F7"
          />
        </View>

        <Text style={styles.cardTitle}>
          {item.name}
        </Text>

        {!deleteMode && (
          <Ionicons
            name="chevron-forward-outline"
            size={18}
            color="#9CA3AF"
            style={styles.arrow}
          />
        )}
      </TouchableOpacity>
    );
  };

  /* ================= SUBCATEGORY ================= */

  const renderSubCategory = ({ item }: any) => (

  <TouchableOpacity
    style={styles.subCard}
    onPress={() => {

        showSuccess(`Creating expense under ${item.name}`);

      closeSheet();   // CLOSE MODAL FIRST

      navigation.navigate("CreateTransaction", {
        categoryId: selectedCategory.id,
        subCategoryId: item.id,
        categoryName: selectedCategory.name,
        subCategoryName: item.name,
        icon: item.icon,
        color: item.color,
      });

    }}
  >

    <View style={styles.subIcon}>
      <Ionicons
        name={item.icon as any}
        size={20}
        color="#3985F7"
      />
    </View>

    <Text style={styles.subText}>
      {item.name}
    </Text>

  </TouchableOpacity>

);

  return (

    <View style={styles.container}>

      {/* ================= HEADER ================= */}

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
            <Ionicons
              name="arrow-back"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>

            <Text style={styles.headerTitle}>
              Categories
            </Text>

            <Text style={styles.headerSubtitle}>
              Choose a category to add expense
            </Text>

          </View>

        </View>

      </LinearGradient>

      {/* ================= DELETE BAR ================= */}


{deleteMode && (
  <View style={styles.deleteBar}>

    <Text style={styles.deleteCount}>
      {selectedIds.length} selected
    </Text>

    <View style={styles.deleteActions}>

      <TouchableOpacity
        disabled={selectedIds.length === 0}
        onPress={() => setConfirmVisible(true)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setDeleteMode(false);
          setSelectedIds([]);
        }}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

    </View>

  </View>
)}

      {/* ================= CATEGORY GRID ================= */}

      {loading ? (

        <View style={{ marginTop: 40 }}>
          <ActivityIndicator size="large" color="#3985F7" />
        </View>

      ) : (

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />

      )}

      {/* ================= SUB CATEGORY MODAL ================= */}

      <Modal
  visible={sheetVisible}
  transparent
  animationType="fade"
  onRequestClose={closeSheet}
>

  <View style={styles.modalOverlay}>

    {/* OUTSIDE AREA */}
    <TouchableOpacity
      style={{ flex: 1 }}
      activeOpacity={1}
      onPress={closeSheet}
    />

    {/* BOTTOM SHEET */}
    <View style={styles.modalContainer}>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={closeSheet}
      >
        <Ionicons name="close" size={24} color="#111" />
      </TouchableOpacity>

      {/* HEADER */}
      <View style={styles.sheetHeader}>

        <View
          style={[
            styles.sheetIcon,
            {
              backgroundColor:
                selectedCategory?.color || "#EEF4FF",
            },
          ]}
        >
          <Ionicons
            name={selectedCategory?.icon as any}
            size={24}
            color="#3985F7"
          />
        </View>

        <Text style={styles.sheetTitle}>
          {selectedCategory?.name}
        </Text>

        <View style={styles.typeChip}>
          <Text style={styles.typeText}>
            {selectedCategory?.type}
          </Text>
        </View>

      </View>

      {/* SUB CATEGORIES */}

      <FlatList
        data={selectedCategory?.children || []}
        keyExtractor={(item) => item.id}
        renderItem={renderSubCategory}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        contentContainerStyle={{ marginTop: 20 }}
      />

      {/* QUICK ADD */}

      <TouchableOpacity
        style={styles.quickAdd}
        onPress={() =>
          navigation.navigate("AddExpense", {
            category: selectedCategory,
          })
        }
      >
        <Ionicons name="add-circle" size={22} color="#fff" />
        <Text style={styles.quickAddText}>
          Quick Add Expense
        </Text>
      </TouchableOpacity>

    </View>

  </View>

</Modal>

      {/* ================= ADD CATEGORY SHEET ================= */}

      <Modal
  visible={addCategoryVisible}
  animationType="slide"
  transparent
  onRequestClose={() => setAddCategoryVisible(false)}
>

<View style={styles.modalOverlay}>

  {/* CLICKABLE OUTSIDE AREA */}
  <TouchableOpacity
    style={{ flex: 1 }}
    activeOpacity={1}
    onPress={() => setAddCategoryVisible(false)}
  />

  {/* BOTTOM SHEET */}
  <View style={styles.modalContainer}>

    <Text style={styles.sheetTitle}>
      Create Category
    </Text>

    {/* CATEGORY NAME */}

    <Text style={styles.label}>
      Category Name
    </Text>

    <TextInput
      placeholder="Enter category name"
      value={newCategoryName}
      onChangeText={setNewCategoryName}
      style={styles.input}
    />

    {/* OPTIONAL TYPE DROPDOWN */}

    <Text style={styles.label}>
      Category Type (Optional)
    </Text>

    <AppDropdown
      // label="Category Type (Optional)"
      value={categoryType}
      onChange={setCategoryType}
      options={[
        { label: "Auto Detect", value: null },
        { label: "Need", value: "NEED" },
        { label: "Want", value: "WANT" },
        { label: "Saving", value: "SAVING" },
        { label: "Investment", value: "INVESTMENT" },
        { label: "Income", value: "INCOME" },
      ]}
    />

    {/* CREATE BUTTON */}

    <TouchableOpacity
      style={styles.quickAdd}
      onPress={handleCreateCategory}
    >
      <Text style={styles.quickAddText}>
        Create
      </Text>
    </TouchableOpacity>

    {/* CANCEL */}

    <TouchableOpacity
      onPress={() => setAddCategoryVisible(false)}
      style={{ marginTop: 10 }}
    >
      <Text style={{ textAlign: "center", color: "#6B7280" }}>
        Cancel
      </Text>
    </TouchableOpacity>

  </View>

</View>

</Modal>

      {/* ================= FAB MENU ================= */}

      {fabOpen && (

        <View style={styles.fabMenu}>

          <TouchableOpacity
            style={styles.fabOption}
            onPress={() => {
              setFabOpen(false);
              setAddCategoryVisible(true);
            }}
          >
            <Text style={styles.fabText}>
              Add Category
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fabOption}
            onPress={() => {
              setFabOpen(false);
              setDeleteMode(true);
            }}
          >
            <Text style={styles.fabText}>
              Delete Category
            </Text>
          </TouchableOpacity>

        </View>

      )}

      {/* ================= FAB ================= */}

      <TouchableOpacity
        style={styles.fab}
        onPress={toggleFab}
      >

        <Ionicons
          name={fabOpen ? "close" : "add"}
          size={26}
          color="#fff"
        />

      </TouchableOpacity>

      {/* ================= CONFIRM MODAL ================= */}

      <ConfirmModal
        visible={confirmVisible}
        title="Delete Categories"
        message={`Are you sure you want to delete ${selectedIds.length} categories?`}
        confirmText="Delete"
        danger
        loading={deleteLoading}
        onConfirm={deleteCategories}
        onCancel={() => setConfirmVisible(false)}
      />

    </View>

  );
};

export default CategoryScreen;