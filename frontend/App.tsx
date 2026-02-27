import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/utils/notification.util";
import { ModeProvider } from "./src/context/ModeContext";

import { Provider as PaperProvider } from "react-native-paper";
import {
  enGB,
  registerTranslation,
} from "react-native-paper-dates";

// Register date locale (DD/MM/YYYY format)
registerTranslation("en-GB", enGB);

export default function App() {
  return (
    <PaperProvider>
      <ModeProvider>
        <AppNavigator />
        <Toast config={toastConfig} />
      </ModeProvider>
    </PaperProvider>
  );
}