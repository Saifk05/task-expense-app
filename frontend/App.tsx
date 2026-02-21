import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/utils/notification.util";
import { ModeProvider } from "./src/context/ModeContext";

export default function App() {
  return (
    <ModeProvider>
      <AppNavigator />
      <Toast config={toastConfig} />
    </ModeProvider>
  );
}