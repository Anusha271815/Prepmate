
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getTheme } from "../theme";

import DashboardScreen from "../screens/DashboardScreen";
import HistoryScreen from "../screens/HistoryScreen";
import PracticeScreen from "../screens/PracticeScreen";
import AnalysisScreen from "../screens/AnalysisScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const icons: any = {
        Home: "home-outline",
        History: "time-outline",
        Practice: "mic-outline",
        Analysis: "stats-chart-outline",
        Profile: "person-outline"
    };

    const themeMode = useSelector(
        (state: RootState) => state.theme.mode
    );

    const theme = getTheme(themeMode);
    const colors = theme.colors;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,

                tabBarStyle: {
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 8,
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    borderTopWidth: 1
                },

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600"
                },

                tabBarIcon: ({ color, size }) => (
                    <Ionicons
                        name={icons[route.name]}
                        size={size}
                        color={color}
                    />
                )
            })}
        >
            <Tab.Screen name="Home" component={DashboardScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Practice" component={PracticeScreen} />
            <Tab.Screen name="Analysis" component={AnalysisScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
