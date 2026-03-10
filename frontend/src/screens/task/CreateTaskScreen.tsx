// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { DatePickerModal } from 'react-native-paper-dates';
// import styles from './CreateTaskScreen.styles';
// import { showSuccess, showError } from '../../utils/notification.util';
// import ApiService from '../../services/api.service';
// import { launchImageLibrary } from 'react-native-image-picker';

// const today = new Date();
// today.setHours(0, 0, 0, 0);

// const formatDate = (date: Date) =>
//   `${date.getDate().toString().padStart(2, '0')} / ${
//     (date.getMonth() + 1).toString().padStart(2, '0')
//   } / ${date.getFullYear()}`;

// const CreateTaskScreen = ({ route, navigation }: any) => {
//   const { category, subCategory } = route.params;

//   const [startDate, setStartDate] = useState<Date | undefined>();
//   const [endDate, setEndDate] = useState<Date | undefined>();
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [attachment, setAttachment] = useState<any>(null);

//   const [openStart, setOpenStart] = useState(false);
//   const [openEnd, setOpenEnd] = useState(false);

//   const handleUpload = async () => {
//   const result = await launchImageLibrary({
//     mediaType: 'photo',
//     quality: 0.8,
//   });

//   if (result.assets && result.assets.length > 0) {
//     setAttachment(result.assets[0]);
//   }
// };

//   const handleCreateTask = async () => {
//     try {
//       if (!startDate || !endDate) {
//         showError('Please select start and end dates');
//         return;
//       }

//       if (!description.trim()) {
//         showError('Description is required');
//         return;
//       }

//       if (endDate < startDate) {
//         showError('End date cannot be before start date');
//         return;
//       }

//       setLoading(true);

//     const payload = {
//     title: description.trim(),
//     description: description.trim(),
//     categoryId: category?.id,
//     subCategoryId: subCategory?.id,
//     startDate: startDate?.toISOString(),
//     dueDate: endDate?.toISOString(),
//     };

//       await ApiService.createTask(payload);

//       showSuccess('Task created successfully');

//       navigation.goBack();
//     } catch (error: any) {
//       console.log('Create Task Error:', error);
//       showError(
//         error?.response?.data?.message ||
//           'Something went wrong. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={22} color="#FFF" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Create Task</Text>
//         </View>
//         <Text style={styles.headerSubtitle}>
//           Add details for your task
//         </Text>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* CATEGORY */}
//         <View style={styles.infoCard}>
//           <Text style={styles.infoLabel}>Category</Text>
//           <Text style={styles.infoValue}>{category?.name}</Text>
//         </View>

//         {/* SUBCATEGORY */}
//         <View style={styles.infoCard}>
//           <Text style={styles.infoLabel}>Subcategory</Text>
//           <Text style={styles.infoValue}>{subCategory?.name}</Text>
//         </View>

//         {/* START DATE */}
//         <TouchableOpacity
//           style={styles.dateCard}
//           activeOpacity={0.85}
//           onPress={() => setOpenStart(true)}
//         >
//           <View>
//             <Text style={styles.dateLabel}>Start Date</Text>
//             <Text style={styles.dateValue}>
//               {startDate ? formatDate(startDate) : 'DD / MM / YYYY'}
//             </Text>
//           </View>
//           <Ionicons
//             name="calendar-outline"
//             size={22}
//             color="#10B981"
//           />
//         </TouchableOpacity>

//         {/* END DATE */}
//         <TouchableOpacity
//           style={styles.dateCard}
//           activeOpacity={0.85}
//           onPress={() => setOpenEnd(true)}
//         >
//           <View>
//             <Text style={styles.dateLabel}>End Date</Text>
//             <Text style={styles.dateValue}>
//               {endDate ? formatDate(endDate) : 'DD / MM / YYYY'}
//             </Text>
//           </View>
//           <Ionicons
//             name="calendar-outline"
//             size={22}
//             color="#10B981"
//           />
//         </TouchableOpacity>

//         {/* DESCRIPTION */}
//         <TextInput
//           placeholder="Enter task description..."
//           placeholderTextColor="#9CA3AF"
//           value={description}
//           onChangeText={setDescription}
//           style={styles.textArea}
//           multiline
//         />

//         {/* BUTTON */}
//         <TouchableOpacity
//           style={[
//             styles.createBtn,
//             loading && { opacity: 0.7 },
//           ]}
//           disabled={loading}
//           onPress={handleCreateTask}
//         >
//           {loading ? (
//             <ActivityIndicator color="#FFF" />
//           ) : (
//             <Text style={styles.createBtnText}>
//               Create Task
//             </Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>

//       {/* START DATE MODAL */}
//       <DatePickerModal
//         locale="en-GB"
//         mode="single"
//         visible={openStart}
//         onDismiss={() => setOpenStart(false)}
//         date={startDate}
//         onConfirm={({ date }) => {
//           setOpenStart(false);
//           setStartDate(date);
//         }}
//         validRange={{
//           startDate: today,
//         }}
//       />

//       {/* END DATE MODAL */}
//       <DatePickerModal
//         locale="en-GB"
//         mode="single"
//         visible={openEnd}
//         onDismiss={() => setOpenEnd(false)}
//         date={endDate}
//         onConfirm={({ date }) => {
//           setOpenEnd(false);
//           setEndDate(date);
//         }}
//         validRange={{
//           startDate: startDate || today,
//         }}
//       />

//       {/* ATTACHMENT */}
//         <TouchableOpacity
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             padding: 14,
//             borderRadius: 14,
//             backgroundColor: '#F3F4F6',
//             marginBottom: 16,
//           }}
//           onPress={handleUpload}
//         >
//           <Ionicons name="cloud-upload-outline" size={22} color="#10B981" />

//           <Text style={{ marginLeft: 10, color: '#374151', fontWeight: '500' }}>
//             {attachment ? 'Attachment selected' : 'Upload attachment (optional)'}
//           </Text>
//         </TouchableOpacity>

//         {attachment && (
//   <View
//     style={{
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: 16,
//     }}
//   >
//     <Ionicons name="image-outline" size={20} color="#6B7280" />
//     <Text style={{ marginLeft: 8, color: '#374151' }}>
//       {attachment.fileName || 'Image attached'}
//     </Text>
//   </View>
// )}
//     </SafeAreaView>
//   );
// };

// export default CreateTaskScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DatePickerModal } from 'react-native-paper-dates';
// import { launchImageLibrary } from 'react-native-image-picker';
import styles from './CreateTaskScreen.styles';
import { showSuccess, showError } from '../../utils/notification.util';
import ApiService from '../../services/api.service';

const today = new Date();
today.setHours(0, 0, 0, 0);

const formatDate = (date: Date) =>
  `${date.getDate().toString().padStart(2, '0')} / ${
    (date.getMonth() + 1).toString().padStart(2, '0')
  } / ${date.getFullYear()}`;

const CreateTaskScreen = ({ route, navigation }: any) => {
  const { category, subCategory } = route.params;

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // const [attachment, setAttachment] = useState<any>(null);

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  // IMAGE PICKER
  // const handleUpload = async () => {
  //   const result = await launchImageLibrary({
  //     mediaType: 'photo',
  //     quality: 0.8,
  //   });

  //   if (result.assets && result.assets.length > 0) {
  //     setAttachment(result.assets[0]);
  //   }
  // };

  const handleCreateTask = async () => {
    try {
      if (!startDate || !endDate) {
        showError('Please select start and end dates');
        return;
      }

      if (!description.trim()) {
        showError('Description is required');
        return;
      }

      if (endDate < startDate) {
        showError('End date cannot be before start date');
        return;
      }

      setLoading(true);

      const payload = {
        title: description.trim(),
        description: description.trim(),
        categoryId: category?.id,
        subCategoryId: subCategory?.id,
        startDate: startDate?.toISOString(),
        dueDate: endDate?.toISOString(),
        // attachment: attachment?.uri || null,
      };

      await ApiService.createTask(payload);

      showSuccess('Task created successfully');
      navigation.goBack();
    } catch (error: any) {
      console.log('Create Task Error:', error);
      showError(
        error?.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Task</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Add details for your task
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* CATEGORY */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Category</Text>
          <Text style={styles.infoValue}>{category?.name}</Text>
        </View>

        {/* SUBCATEGORY */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Subcategory</Text>
          <Text style={styles.infoValue}>{subCategory?.name}</Text>
        </View>

        {/* START DATE */}
        <TouchableOpacity
          style={styles.dateCard}
          activeOpacity={0.85}
          onPress={() => setOpenStart(true)}
        >
          <View>
            <Text style={styles.dateLabel}>Start Date</Text>
            <Text style={styles.dateValue}>
              {startDate ? formatDate(startDate) : 'DD / MM / YYYY'}
            </Text>
          </View>
          <Ionicons
            name="calendar-outline"
            size={22}
            color="#10B981"
          />
        </TouchableOpacity>

        {/* END DATE */}
        <TouchableOpacity
          style={styles.dateCard}
          activeOpacity={0.85}
          onPress={() => setOpenEnd(true)}
        >
          <View>
            <Text style={styles.dateLabel}>End Date</Text>
            <Text style={styles.dateValue}>
              {endDate ? formatDate(endDate) : 'DD / MM / YYYY'}
            </Text>
          </View>
          <Ionicons
            name="calendar-outline"
            size={22}
            color="#10B981"
          />
        </TouchableOpacity>

        {/* DESCRIPTION */}
        <TextInput
          placeholder="Enter task description..."
          placeholderTextColor="#9CA3AF"
          value={description}
          onChangeText={setDescription}
          style={styles.textArea}
          multiline
        />

        {/* ATTACHMENT UPLOAD */}
        {/* <TouchableOpacity
          style={styles.uploadCard}
          onPress={handleUpload}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={22}
            color="#10B981"
          /> */}

          {/* <Text style={styles.uploadText}>
            {attachment
              ? 'Change attachment'
              : 'Upload attachment (optional)'}
          </Text>
        </TouchableOpacity> */}

        {/* IMAGE PREVIEW */}
        {/* {attachment && (
          <View style={styles.previewCard}>

            <Image
              source={{ uri: attachment.uri }}
              style={styles.previewImage}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => setAttachment(null)}
            >
              <Ionicons name="close" size={18} color="#FFF" />
            </TouchableOpacity>

            <Text style={styles.previewName}>
              {attachment.fileName || 'Image'}
            </Text>

          </View>
        )} */}

        {/* CREATE BUTTON */}
        <TouchableOpacity
          style={[
            styles.createBtn,
            loading && { opacity: 0.7 },
          ]}
          disabled={loading}
          onPress={handleCreateTask}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.createBtnText}>
              Create Task
            </Text>
          )}
        </TouchableOpacity>

      </ScrollView>

      {/* START DATE MODAL */}
      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={openStart}
        onDismiss={() => setOpenStart(false)}
        date={startDate}
        onConfirm={({ date }) => {
          setOpenStart(false);
          setStartDate(date);
        }}
        validRange={{
          startDate: today,
        }}
      />

      {/* END DATE MODAL */}
      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={openEnd}
        onDismiss={() => setOpenEnd(false)}
        date={endDate}
        onConfirm={({ date }) => {
          setOpenEnd(false);
          setEndDate(date);
        }}
        validRange={{
          startDate: startDate || today,
        }}
      />
    </SafeAreaView>
  );
};

export default CreateTaskScreen;