import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Modal,
  Animated,
  Dimensions,
  ActivityIndicator,
  TextInput,
  // Alert,
} from 'react-native';
import { ScrollView } from 'react-native';
import {
  showSuccess,
  showError,
  showWarning,
} from '../../utils/notification.util';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './TaskCategoryScreen.styles';
import ApiService from '../../services/api.service';
import ConfirmModal from '../../component/ConfirmModal';


const isWeb = Platform.OS === 'web';
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TaskCategoryScreen = ({ navigation }: any) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const createSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['65%'], []);
  const createSnapPoints = useMemo(() => ['55%'], []);

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [fabOpen, setFabOpen] = useState(false);

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([]);

  const [categoryName, setCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState<string[]>(['']);

  const [webViewVisible, setWebViewVisible] = useState(false);
  const [webCreateVisible, setWebCreateVisible] = useState(false);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const slideViewAnim = useRef(new Animated.Value(0)).current;
  const slideCreateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getTaskCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= CATEGORY VIEW =================

  const openSheet = (category: any) => {
    setSelectedCategory(category);

    if (isWeb) {
      setWebViewVisible(true);
      Animated.timing(slideViewAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      bottomSheetModalRef.current?.present();
    }
  };

  const closeWebView = () => {
    Animated.timing(slideViewAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setWebViewVisible(false));
  };

  // ================= CREATE CATEGORY =================

  const openCreateSheet = () => {
    if (isWeb) {
      setWebCreateVisible(true);
      Animated.timing(slideCreateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      createSheetRef.current?.present();
    }
  };

  const closeWebCreate = () => {
    Animated.timing(slideCreateAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setWebCreateVisible(false));
  };

  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, '']);
  };

  const handleSubCategoryChange = (text: string, index: number) => {
    const updated = [...subCategories];
    updated[index] = text;
    setSubCategories(updated);
  };

  const handleRemoveSubCategory = (index: number) => {
    if (subCategories.length === 1) return;
    const updated = subCategories.filter((_, i) => i !== index);
    setSubCategories(updated);
  };


  const toggleCategorySelection = (id: string) => {
  if (selectedToDelete.includes(id)) {
    setSelectedToDelete(selectedToDelete.filter((item) => item !== id));
  } else {
    setSelectedToDelete([...selectedToDelete, id]);
  }
};

const handleDeleteCategories = async () => {
  try {
    setDeleteLoading(true);

    for (const id of selectedToDelete) {
      await ApiService.deleteTaskCategory(id);
    }

    showSuccess('Category deleted successfully');

    setSelectedToDelete([]);
    setDeleteMode(false);

    fetchCategories(); // refresh list
  } catch (error) {
    console.log(error);
    showError('Failed to delete category');
  } finally {
    setDeleteLoading(false);
    setConfirmVisible(false);
  }
};

// const handleDeleteCategories = async () => {
//   try {
//     setDeleteLoading(true);

//     // Simulate delay (remove later when API added)
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     const updated = categories.filter(
//       (cat) => !selectedToDelete.includes(cat.id)
//     );

//     setCategories(updated);
//     setSelectedToDelete([]);
//     setDeleteMode(false);

//     showSuccess('Category deleted successfully');
//   } catch (error) {
//     showError('Failed to delete category');
//   } finally {
//     setDeleteLoading(false);
//     setConfirmVisible(false);
//   }
// };

  // const handleCreateCategory = async () => {
  //   if (!categoryName.trim()) {
  //     Alert.alert('Error', 'Category name required');
  //     return;
  //   }

  //   const validSubs = subCategories.filter((s) => s.trim() !== '');

  //   if (validSubs.length === 0) {
  //     Alert.alert('Error', 'At least one subcategory required');
  //     return;
  //   }

  //   try {
  //     const parent = await ApiService.createTaskCategory({
  //       name: categoryName,
  //     });

  //     for (const sub of validSubs) {
  //       await ApiService.createTaskCategory({
  //         name: sub,
  //         parentId: parent.data.id,
  //       });
  //     }

  //     setCategoryName('');
  //     setSubCategories(['']);

  //     if (isWeb) {
  //       closeWebCreate();
  //     } else {
  //       createSheetRef.current?.close();
  //     }

  //     fetchCategories();
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to create category');
  //   }
  // };

  // ================= RENDER =================

  const handleCreateCategory = async () => {
  const trimmedName = categoryName.trim();

  // Validate category name
  if (!trimmedName) {
    showError('Category name required');
    return;
  }

  // Clean and validate subcategories
  const cleanedSubs = subCategories
    .map((s) => s.trim())
    .filter((s) => s !== '');

  if (cleanedSubs.length === 0) {
    showError('At least one subcategory required');
    return;
  }

  // Check duplicate subcategories
  const hasDuplicateSubs =
    new Set(cleanedSubs.map((s) => s.toLowerCase())).size !==
    cleanedSubs.length;

  if (hasDuplicateSubs) {
    showWarning('Duplicate subcategories are not allowed');
    return;
  }

  try {
    const parent = await ApiService.createTaskCategory({
      name: trimmedName,
    });

    for (const sub of cleanedSubs) {
      await ApiService.createTaskCategory({
        name: sub,
        parentId: parent.data.id,
      });
    }

    // Reset form
    setCategoryName('');
    setSubCategories(['']);

    // Close sheet
    if (isWeb) {
      closeWebCreate();
    } else {
      createSheetRef.current?.close();
    }

    showSuccess('Category created successfully');

    fetchCategories();
  // } catch (error) {
  //   showError('Failed to create category');
  }
  catch (error: any) {
  const message =
    error?.response?.data?.message ||
    'Failed to create category';

  showError(message);
}
};

const renderCategory = ({ item }: any) => {
  const isSelected = selectedToDelete.includes(item.id);

  return (
    <TouchableOpacity
      style={[
        styles.gridCard,
        { backgroundColor: item.color || '#E5E7EB' },
      ]}
      onPress={() => {
        if (deleteMode) {
          toggleCategorySelection(item.id);
        } else {
          openSheet(item);
        }
      }}
      activeOpacity={0.85}
    >
      {deleteMode && (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          <Ionicons
            name={isSelected ? 'checkbox' : 'square-outline'}
            size={22}
            color={isSelected ? '#EF4444' : '#6B7280'}
          />
        </View>
      )}

      <Ionicons
        name={item.icon || 'grid-outline'}
        size={28}
        color="#111827"
      />
      <Text style={styles.gridText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

  // const renderCategory = ({ item }: any) => (
  //   <TouchableOpacity
  //     style={[styles.gridCard, { backgroundColor: item.color || '#E5E7EB' }]}
  //     onPress={() => openSheet(item)}
  //     activeOpacity={0.85}
  //   >
  //     <Ionicons
  //       name={item.icon || 'grid-outline'}
  //       size={28}
  //       color="#111827"
  //     />
  //     <Text style={styles.gridText}>{item.name}</Text>
  //   </TouchableOpacity>
  // );

  // const renderSubCategory = ({ item }: any) => (
  //   <TouchableOpacity
  //     style={styles.subCard}
  //     onPress={() =>
  //       navigation.navigate('CreateTask', {
  //         categoryId: selectedCategory.id,
  //         subCategoryId: item.id,
  //       })
  //     }
  //   >
  //     <Text style={styles.subText}>{item.name}</Text>
  //   </TouchableOpacity>
  // );

  // const renderCreateContent = () => (
  //   <View style={styles.sheetContainer}>
  //     <Text style={styles.sheetTitle}>Create Category</Text>

  //     <TextInput
  //       placeholder="Category Name"
  //       value={categoryName}
  //       onChangeText={setCategoryName}
  //       style={styles.input}
  //     />

  //     <Text style={{ fontWeight: '600', marginBottom: 8 }}>
  //       Subcategories
  //     </Text>

  //     {subCategories.map((item, index) => (
  //       <View
  //         key={index}
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           marginBottom: 10,
  //         }}
  //       >
  //         <TextInput
  //           placeholder={`Subcategory ${index + 1}`}
  //           value={item}
  //           onChangeText={(text) =>
  //             handleSubCategoryChange(text, index)
  //           }
  //           style={[styles.input, { flex: 1, marginBottom: 0 }]}
  //         />

  //         {subCategories.length > 1 && (
  //           <TouchableOpacity
  //             onPress={() => handleRemoveSubCategory(index)}
  //             style={{ marginLeft: 8 }}
  //           >
  //             <Ionicons
  //               name="close-circle"
  //               size={22}
  //               color="#EF4444"
  //             />
  //           </TouchableOpacity>
  //         )}
  //       </View>
  //     ))}

  //     <TouchableOpacity
  //       onPress={handleAddSubCategory}
  //       style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
  //     >
  //       <Ionicons
  //         name="add-circle"
  //         size={22}
  //         color="#10B981"
  //       />
  //       <Text style={{ marginLeft: 6, color: '#10B981' }}>
  //         Add Subcategory
  //       </Text>
  //     </TouchableOpacity>

  //     <TouchableOpacity
  //       style={styles.createBtn}
  //       onPress={handleCreateCategory}
  //     >
  //       <Text style={{ color: '#FFF', fontWeight: '600' }}>
  //         Create
  //       </Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  const renderSubCategory = ({ item }: any) => (
  <TouchableOpacity
    style={styles.subCard}
    onPress={() => {
      // Close bottom sheet first
      if (!isWeb) {
        bottomSheetModalRef.current?.close();
      } else {
        closeWebView();
      }

      // Small delay so animation finishes smoothly
      setTimeout(() => {
        // navigation.navigate('CreateTask', {
        //   category: selectedCategory,
        //   subCategory: item,
        // });
        navigation.push('CreateTask', {
          category: selectedCategory,
          subCategory: item.id,
        });
      }, 200);
    }}
  >
    <Text style={styles.subText}>{item.name}</Text>
  </TouchableOpacity>
);

  const renderCreateContent = () => (
  <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{ paddingBottom: 40 }}
    showsVerticalScrollIndicator={false}
  >
    <View style={styles.sheetContainer}>
      <Text style={styles.sheetTitle}>Create Category</Text>

      <TextInput
        placeholder="Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
        style={styles.input}
      />

      <Text style={{ fontWeight: '600', marginBottom: 8 }}>
        Subcategories
      </Text>

      {subCategories.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder={`Subcategory ${index + 1}`}
            value={item}
            onChangeText={(text) =>
              handleSubCategoryChange(text, index)
            }
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
          />

          {subCategories.length > 1 && (
            <TouchableOpacity
              onPress={() => handleRemoveSubCategory(index)}
              style={{ marginLeft: 8 }}
            >
              <Ionicons
                name="close-circle"
                size={22}
                color="#EF4444"
              />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity
        onPress={handleAddSubCategory}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Ionicons
          name="add-circle"
          size={22}
          color="#10B981"
        />
        <Text style={{ marginLeft: 6, color: '#10B981' }}>
          Add Subcategory
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createBtn}
        onPress={handleCreateCategory}
      >
        <Text style={{ color: '#FFF', fontWeight: '600' }}>
          Create
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

  return (
    <BottomSheetModalProvider>


      <SafeAreaView style={styles.wrapper}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Task Categories</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Select a category to continue
          </Text>
        </View>

{/* CATEGORY GRID */}
{loading ? (
  <ActivityIndicator style={{ marginTop: 40 }} />
) : (
  <FlatList
    contentContainerStyle={styles.gridContainer}
    data={categories}
    keyExtractor={(item) => item.id}
    renderItem={renderCategory}
    numColumns={2}
    columnWrapperStyle={{ justifyContent: 'space-between' }}
  />
)}

{/* DELETE BUTTON */}
{deleteMode && (
  <View
    style={{
      position: 'absolute',
      bottom: 110,
      left: 20,
      right: 20,
    }}
  >
    <TouchableOpacity
      style={{
        backgroundColor: '#EF4444',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
      }}
      onPress={() => {
        if (selectedToDelete.length === 0) {
          showWarning('Select at least one category to delete');
          return;
        }
        setConfirmVisible(true);
      }}
    >
      <Text style={{ color: '#FFF', fontWeight: '600' }}>
        Delete Selected ({selectedToDelete.length})
      </Text>
    </TouchableOpacity>
  </View>
)}
        

        {/* {loading ? (
          <ActivityIndicator style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            contentContainerStyle={styles.gridContainer}
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategory}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        )} */}

        {/* FAB */}
        <View style={styles.fabContainer}>
          {/* {fabOpen && (
            <TouchableOpacity
              style={styles.fabOption}
              onPress={() => {
                setFabOpen(false);
                openCreateSheet();
              }}
            >
              <Text style={{ fontWeight: '600' }}>
                Add Category
              </Text>
            </TouchableOpacity>
          )} */}

          {fabOpen && (
  <>
    {/* Add Category */}
    <TouchableOpacity
      style={styles.fabOption}
      onPress={() => {
        setFabOpen(false);
        openCreateSheet();
      }}
    >
      <Text style={{ fontWeight: '600' }}>
        Add Category
      </Text>
    </TouchableOpacity>

    {/* Delete Category */}
    <TouchableOpacity
      style={[
        styles.fabOption,
        { backgroundColor: deleteMode ? '#FEE2E2' : '#FFF' },
      ]}
      onPress={() => {
        setFabOpen(false);
        setDeleteMode(!deleteMode);
        setSelectedToDelete([]);
      }}
    >
      <Text
        style={{
          fontWeight: '600',
          color: deleteMode ? '#EF4444' : '#111827',
        }}
      >
        {deleteMode ? 'Cancel Delete' : 'Delete Category'}
      </Text>
    </TouchableOpacity>
  </>
)}


          <TouchableOpacity
            style={styles.fab}
            onPress={() => setFabOpen(!fabOpen)}
          >
            <Ionicons name="add" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* MOBILE SHEETS */}
        {!isWeb && (
          <>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
            >
              <View style={styles.sheetContainer}>
                <Text style={styles.sheetTitle}>
                  {selectedCategory?.name}
                </Text>
                <FlatList
                  data={selectedCategory?.children || []}
                  keyExtractor={(item) => item.id}
                  renderItem={renderSubCategory}
                />
              </View>
            </BottomSheetModal>

            <BottomSheetModal
              ref={createSheetRef}
              index={0}
              snapPoints={createSnapPoints}
            >
              {renderCreateContent()}
            </BottomSheetModal>
          </>
        )}

        {/* WEB VIEW MODAL */}
        {isWeb && webViewVisible && (
          <Modal transparent>
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={closeWebView} />
              <Animated.View
                style={{
                  height: SCREEN_HEIGHT * 0.65,
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: 20,
                  transform: [{
                    translateY: slideViewAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [SCREEN_HEIGHT, 0],
                    }),
                  }],
                }}
              >
                <Text style={styles.sheetTitle}>
                  {selectedCategory?.name}
                </Text>
                <FlatList
                  data={selectedCategory?.children || []}
                  keyExtractor={(item) => item.id}
                  renderItem={renderSubCategory}
                />
              </Animated.View>
            </View>
          </Modal>
        )}

        {/* WEB CREATE MODAL */}
        {isWeb && webCreateVisible && (
          <Modal transparent>
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={closeWebCreate} />
              <Animated.View
                style={{
                  height: SCREEN_HEIGHT * 0.55,
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: 20,
                  transform: [{
                    translateY: slideCreateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [SCREEN_HEIGHT, 0],
                    }),
                  }],
                }}
              >
                {renderCreateContent()}
              </Animated.View>
            </View>
          </Modal>
        )}
<ConfirmModal
  visible={confirmVisible}
  title="Delete Categories"
  message={`Are you sure you want to delete ${selectedToDelete.length} selected categor${selectedToDelete.length > 1 ? 'ies' : 'y'}?`}
  confirmText="Delete"
  cancelText="Cancel"
  danger
  loading={deleteLoading}
  onCancel={() => setConfirmVisible(false)}
  onConfirm={handleDeleteCategories}
/>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default TaskCategoryScreen;