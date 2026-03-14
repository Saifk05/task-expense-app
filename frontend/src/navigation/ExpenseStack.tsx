import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExpenseSettings from "../screens/expense/SettingsScreen";
import ExpenseProfileScreen from "../screens/expense/ProfileScreen";
import ExpenseEditProfileScreen from "../screens/expense/EditProfileScreen";
import AddressScreen from "../screens/expense/AddressScreen";
import ChangePasswordScreen from "../screens/expense/ChangePasswordScreen";
import NotificationScreen from "../screens/expense/NotificationScreen";
import ManageAccountsScreen from "../screens/expense/account/ManageAccountsScreen";
import CategoryScreen from "../screens/expense/category/CategoryScreen";
import CreateCategoryScreen from "../screens/expense/category/CreateCategoryScreen"
import CreateAccountScreen from "../screens/expense/account/CreateAccountScreen";


const Stack = createNativeStackNavigator();

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ExpenseStack: React.FC<Props> = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* Settings Screen */}
      <Stack.Screen name="ExpenseSettings">
        {(props) => (
          <ExpenseSettings
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Stack.Screen>

      {/* Profile Screen */}
      <Stack.Screen
        name="Profile"
        component={ExpenseProfileScreen}
      />

      {/* Edit Profile Screen */}
      <Stack.Screen
        name="EditProfile"
        component={ExpenseEditProfileScreen}
      />

      {/* Address Screen */}
      <Stack.Screen
        name="Address"
        component={AddressScreen}
      />

      {/* Change Password Screen */}
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />

      {/* Notification Screen */}
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
      />

      {/* Manage Accounts Screen */}
      <Stack.Screen
        name="ManageAccounts"
        component={ManageAccountsScreen}
      />

      {/*Manage Categories Screen */}
      <Stack.Screen
        name="Categories"
        component={CategoryScreen}
      />

      <Stack.Screen
        name="AddCategory"
        component={CreateCategoryScreen}
      />

       <Stack.Screen
        name="AddAccount"
        component={CreateAccountScreen}
      />

    </Stack.Navigator>
  );
};

export default ExpenseStack;