import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ModeType = "expense" | "task";

interface ModeContextType {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  isLoaded: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: any) => {
  const [mode, setModeState] = useState<ModeType>("expense");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved mode on app start
  useEffect(() => {
    const loadMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem("APP_MODE");
        if (savedMode === "expense" || savedMode === "task") {
          setModeState(savedMode);
        }
      } catch (error) {
        console.log("Error loading mode:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadMode();
  }, []);

  const setMode = async (newMode: ModeType) => {
    try {
      await AsyncStorage.setItem("APP_MODE", newMode);
      setModeState(newMode);
    } catch (error) {
      console.log("Error saving mode:", error);
    }
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, isLoaded }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error("useMode must be used inside ModeProvider");
  return context;
};