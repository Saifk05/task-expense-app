import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TaskSettings from "../screens/task/SettingsScreen";
import ProfileScreen from "../screens/task/ProfileScreen";
import EditProfileScreen from "../screens/task/EditProfileScreen";

const Stack = createNativeStackNavigator();

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TaskStack: React.FC<Props> = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Settings Screen */}
      <Stack.Screen name="TaskSettings">
        {(props) => (
          <TaskSettings
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Stack.Screen>

      {/* Profile Screen */}
      <Stack.Screen name="Profile">
        {(props) => (
          <ProfileScreen
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Stack.Screen>

      {/* Edit Profile Screen */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default TaskStack;