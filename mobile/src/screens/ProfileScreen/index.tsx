
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { getTheme } from "../../theme";

const ProfileScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();

    const themeMode = useSelector(
        (state: RootState) => state.theme.mode
    );

    const theme = getTheme(themeMode);
    const colors = theme.colors;

    const user = useSelector(
        (state: RootState) => state.auth.user
    );

    const menuItems = [
        { title: "Personal Information", icon: "person-outline" },
        { title: "Settings", icon: "settings-outline", screen: "Settings" },
        { title: "Resume & ATS", icon: "document-text-outline" },
        { title: "Career Goals", icon: "flag-outline" },
        { title: "AI Career Assistant", icon: "sparkles-outline" },
        { title: "Achievements", icon: "trophy-outline" },
        { title: "Help & Support", icon: "help-circle-outline" },
        { title: "About PrepMate", icon: "information-circle-outline" }
    ];

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: colors.background }
            ]}
        >
            <Text style={[styles.heading, { color: colors.textPrimary }]}>
                My Profile
            </Text>

            {/* Profile Information */}
            <View
                style={[
                    styles.profileCard,
                    {
                        backgroundColor: colors.surface,
                        borderColor: colors.border
                    }
                ]}
            >
                <View
                    style={[
                        styles.avatar,
                        { backgroundColor: colors.primaryLight }
                    ]}
                >
                    <Ionicons
                        name="person"
                        size={38}
                        color={colors.primary}
                    />
                </View>

                <Text style={[styles.name, { color: colors.textPrimary }]}>
                    {user?.name || "User"}
                </Text>

                <Text style={[styles.email, { color: colors.textSecondary }]}>
                    {user?.email || ""}
                </Text>

                <Text style={[styles.role, { color: colors.primary }]}>
                    {user?.role || "user"}
                </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                Account Settings
            </Text>

            {/* Menu Items */}
            {menuItems.map((item, index) => (
                <Pressable
                    key={index}
                    style={[
                        styles.menuItem,
                        {
                            backgroundColor: colors.surface,
                            borderColor: colors.border
                        }
                    ]}
                    onPress={() => {
                        if (item.screen) {
                            navigation.navigate(item.screen);
                        }
                    }}
                >
                    <Ionicons
                        name={item.icon as any}
                        size={22}
                        color={colors.primary}
                    />

                    <Text style={[styles.menuText, { color: colors.textPrimary }]}>
                        {item.title}
                    </Text>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={colors.textSecondary}
                    />
                </Pressable>
            ))}

            {/* Logout */}
            <Pressable
                style={[
                    styles.logoutButton,
                    { borderColor: colors.error }
                ]}
                onPress={handleLogout}
            >
                <Ionicons
                    name="log-out-outline"
                    size={21}
                    color={colors.error}
                />

                <Text style={[styles.logoutText, { color: colors.error }]}>
                    Logout
                </Text>
            </Pressable>

            <Text style={[styles.footer, { color: colors.textSecondary }]}>
                PrepMate · Ace the Interview
            </Text>
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
        marginBottom: 20
    },

    profileCard: {
        borderRadius: 15,
        padding: 25,
        alignItems: "center",
        marginBottom: 25,
        borderWidth: 1
    },

    avatar: {
        width: 75,
        height: 75,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12
    },

    name: {
        fontSize: 21,
        fontWeight: "bold"
    },

    email: {
        fontSize: 14,
        marginTop: 5
    },

    role: {
        marginTop: 8,
        fontWeight: "600",
        textTransform: "capitalize"
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 12
    },

    menuItem: {
        padding: 17,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1
    },

    menuText: {
        flex: 1,
        marginLeft: 14,
        fontSize: 15
    },

    logoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 20
    },

    logoutText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8
    },

    footer: {
        textAlign: "center",
        marginBottom: 20
    }
});

export default ProfileScreen;
