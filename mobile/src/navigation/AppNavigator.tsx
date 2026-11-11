
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{
                    headerShown: false
                }}
            >
                {!isAuthenticated && (
    <Stack.Screen
                name="Landing"
                component={LandingScreen}
            />
        )}

        {!isAuthenticated && (
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
        )}

        {!isAuthenticated && (
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />
        )}

        {isAuthenticated && (
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
            />
        )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
