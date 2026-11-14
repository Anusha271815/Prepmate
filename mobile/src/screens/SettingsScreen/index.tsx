
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    Pressable,
    ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { getTheme } from "../../theme";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
    const dispatch = useDispatch();

    const themeMode = useSelector(
        (state: RootState) => state.theme.mode
    );

    const theme = getTheme(themeMode);
    const colors = theme.colors;
    const isDarkMode = themeMode === "dark";

    const [notifications, setNotifications] = useState(true);
    const navigation = useNavigation();

    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: colors.background }
            ]}
        >
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color={colors.textPrimary}
                    />
                </Pressable>

                <Text style={[styles.heading, { color: colors.textPrimary }]}>
                    Settings
                </Text>
            </View>

            {/* Appearance */}
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                Appearance
            </Text>

            <View
                style={[
                    styles.settingItem,
                    {
                        backgroundColor: colors.surface,
                        borderColor: colors.border
                    }
                ]}
            >
                <View style={styles.settingInfo}>
                    <Ionicons
                        name="moon-outline"
                        size={23}
                        color={colors.primary}
                    />

                    <View style={styles.textContainer}>
                        <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
                            Dark Mode
                        </Text>

                        <Text style={[styles.description, { color: colors.textSecondary }]}>
                            Switch between light and dark themes
                        </Text>
                    </View>
                </View>

                <Switch
                    value={isDarkMode}
                    onValueChange={(value) => {
                        dispatch(toggleTheme());
                    }}
                    trackColor={{
                        false: "#CBD5E1",
                        true: colors.primary
                    }}
                />
            </View>

            {/* Notifications */}
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                Notifications
            </Text>

            <View
                style={[
                    styles.settingItem,
                    {
                        backgroundColor: colors.surface,
                        borderColor: colors.border
                    }
                ]}
            >
                <View style={styles.settingInfo}>
                    <Ionicons
                        name="notifications-outline"
                        size={23}
                        color={colors.primary}
                    />

                    <View style={styles.textContainer}>
                        <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
                            Push Notifications
                        </Text>

                        <Text style={[styles.description, { color: colors.textSecondary }]}>
                            Receive practice reminders and updates
                        </Text>
                    </View>
                </View>

                <Switch
                    value={notifications}
                    onValueChange={setNotifications}
                    trackColor={{
                        false: "#CBD5E1",
                        true: colors.primary
                    }}
                />
            </View>

            {/* Account & Security */}
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                Account & Security
            </Text>

            <Pressable
                style={[
                    styles.settingItem,
                    {
                        backgroundColor: colors.surface,
                        borderColor: colors.border
                    }
                ]}
            >
                <View style={styles.settingInfo}>
                    <Ionicons
                        name="lock-closed-outline"
                        size={23}
                        color={colors.primary}
                    />

                    <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
                        Change Password
                    </Text>
                </View>

                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textSecondary}
                />
            </Pressable>

            {/* About */}
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                About
            </Text>

            <View
                style={[
                    styles.settingItem,
                    {
                        backgroundColor: colors.surface,
                        borderColor: colors.border
                    }
                ]}
            >
                <View style={styles.settingInfo}>
                    <Ionicons
                        name="information-circle-outline"
                        size={23}
                        color={colors.primary}
                    />

                    <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
                        PrepMate v1.0.0
                    </Text>
                </View>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    heading: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 25
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10
    },

    settingItem: {
        borderRadius: 12,
        padding: 17,
        marginBottom: 10,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    settingInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },

    textContainer: {
        marginLeft: 13,
        flex: 1
    },

    settingTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 13
    },

    description: {
        fontSize: 12,
        marginTop: 4
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginBottom: 25
    },
});

export default SettingsScreen;
