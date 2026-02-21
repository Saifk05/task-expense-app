import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Login: "",           // 👈 Root path
      Register: "register",
    },
  },
};

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // 🔥 Check token on app start
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        setIsLoggedIn(!!token);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // 🔥 Show Splash ONLY while checking auth
  if (isLoggedIn === null) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? (
        <MainTabs setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;