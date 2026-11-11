
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { getTheme } from "../../theme";

const LandingScreen = ({ navigation }: any) => {

    // Get active theme from Redux
    const mode = useSelector(
        (state: RootState) => state.theme.mode
    );

    const theme = getTheme(mode);
    const colors = theme.colors;

    const styles = createStyles(colors);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={mode === "dark" ? "light-content" : "dark-content"}
            />

            <View style={styles.content}>

                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoBox}>
                        <Text style={styles.logoText}>P</Text>
                    </View>

                    <Text style={styles.appName}>PrepMate</Text>
                </View>

                {/* Hero Section */}
                <View style={styles.hero}>

                    <Text style={styles.tag}>
                        YOUR AI INTERVIEW PARTNER
                    </Text>

                    <Text style={styles.heading}>
                        Ace the Interview.{"\n"}
                        <Text style={styles.highlight}>
                            Build Your Confidence.
                        </Text>
                    </Text>

                    <Text style={styles.description}>
                        Practice smarter with AI-powered mock interviews
                        and get ready to achieve your career goals.
                    </Text>

                </View>

                {/* Features */}
                <View style={styles.featureCard}>

                    <Text style={styles.featureTitle}>
                        Your next interview starts here
                    </Text>

                    <Text style={styles.featureText}>
                        🎙️  Realistic voice interviews
                    </Text>

                    <Text style={styles.featureText}>
                        ✨  AI-powered feedback
                    </Text>

                    <Text style={styles.featureText}>
                        📊  Track your progress
                    </Text>

                </View>

                {/* Navigation Buttons */}
                <View style={styles.buttonContainer}>

                    <Pressable
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.primaryButtonText}>
                            Get Started
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.secondaryButtonText}>
                            Already have an account? Login
                        </Text>
                    </Pressable>

                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Practice. Improve. Succeed.
                </Text>

            </View>
        </SafeAreaView>
    );
};


// Centralized theme-based styles
const createStyles = (colors: typeof import("../../theme").lightTheme.colors) =>
    StyleSheet.create({

        container: {
            flex: 1,
            backgroundColor: colors.background
        },

        content: {
            flex: 1,
            paddingHorizontal: 25,
            paddingVertical: 20,
            justifyContent: "space-between"
        },

        logoContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10
        },

        logoBox: {
            width: 44,
            height: 44,
            backgroundColor: colors.primary,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center"
        },

        logoText: {
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: "bold"
        },

        appName: {
            color: colors.textPrimary,
            fontSize: 23,
            fontWeight: "bold"
        },

        hero: {
            marginTop: 35
        },

        tag: {
            color: colors.primary,
            fontSize: 12,
            fontWeight: "bold",
            letterSpacing: 2,
            marginBottom: 18
        },

        heading: {
            color: colors.textPrimary,
            fontSize: 34,
            fontWeight: "bold",
            lineHeight: 44
        },

        highlight: {
            color: colors.primary
        },

        description: {
            color: colors.textSecondary,
            fontSize: 15,
            lineHeight: 25,
            marginTop: 18
        },

        featureCard: {
            backgroundColor: colors.surface,
            borderRadius: 18,
            padding: 22,
            marginVertical: 25,
            borderWidth: 1,
            borderColor: colors.border
        },

        featureTitle: {
            color: colors.textPrimary,
            fontSize: 17,
            fontWeight: "bold",
            marginBottom: 18
        },

        featureText: {
            color: colors.textSecondary,
            fontSize: 14,
            marginBottom: 13
        },

        buttonContainer: {
            gap: 14
        },

        primaryButton: {
            backgroundColor: colors.primary,
            padding: 17,
            borderRadius: 14,
            alignItems: "center"
        },

        primaryButtonText: {
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "bold"
        },

        secondaryButton: {
            padding: 14,
            alignItems: "center"
        },

        secondaryButtonText: {
            color: colors.textPrimary,
            fontSize: 14,
            fontWeight: "600"
        },

        footer: {
            color: colors.textSecondary,
            textAlign: "center",
            fontSize: 12,
            marginTop: 15
        }
    });

    export default LandingScreen;
