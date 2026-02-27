import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TaskAnalyticsScreen from "../screens/task/TaskAnalyticsScreen";
import PendingTaskScreen from "../screens/task/PendingTaskScreen";
import OverdueTaskScreen from "../screens/task/OverdueTaskScreen";
import InprogressTaskScreen from "../screens/task/InprogressTaskScreen";
import CompletedTaskScreen from "../screens/task/CompletedTaskScreen";
import CancelledTaskScreen from "../screens/task/CancelledTaskScreen";

const Stack = createNativeStackNavigator();

const AnalyticsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskAnalytics" component={TaskAnalyticsScreen} />
      <Stack.Screen name="OverdueTask" component={OverdueTaskScreen} />
      <Stack.Screen name="PendingTask" component={PendingTaskScreen} />
      <Stack.Screen name="InprogressTask" component={InprogressTaskScreen} />
      <Stack.Screen name="CompletedTask" component={CompletedTaskScreen} />
      <Stack.Screen name="CancelledTask" component={CancelledTaskScreen} />
    </Stack.Navigator>
  );
};

export default AnalyticsStack;