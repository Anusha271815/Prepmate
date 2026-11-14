
import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainTabNavigator from "./MainTabNavigator";
import SettingsScreen from "../screens/SettingsScreen";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getTheme } from "../theme";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    const themeMode = useSelector(
        (state: RootState) => state.theme.mode
    );

    const theme = getTheme(themeMode);
    const colors = theme.colors;

    const navigationTheme = {
        ...(themeMode === "dark" ? DarkTheme : DefaultTheme),
        colors: {
            ...(themeMode === "dark" ? DarkTheme.colors : DefaultTheme.colors),
            primary: colors.primary,
            background: colors.background,
            card: colors.surface,
            text: colors.textPrimary,
            border: colors.border
        }
    };

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: colors.background
                    }
                }}
            >
                {!isAuthenticated && (
                    <>
                        <Stack.Screen
                            name="Landing"
                            component={LandingScreen}
                        />

                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                        />

                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                    </>
                )}

                {isAuthenticated && (
                    <>
                        <Stack.Screen
                            name="MainTabs"
                            component={MainTabNavigator}
                        />

                        <Stack.Screen
                            name="Settings"
                            component={SettingsScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
