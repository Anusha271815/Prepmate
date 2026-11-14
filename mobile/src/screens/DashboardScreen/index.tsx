
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getTheme } from "../../theme";

const DashboardScreen = () => {
    const themeMode = useSelector(
        (state: RootState) => state.theme.mode
    );

    const theme = getTheme(themeMode);
    const colors = theme.colors;

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.background }
            ]}
        >
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                Welcome to PrepMate! 👋
            </Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Your journey to interview success starts here.
            </Text>

            {/* Statistics */}
            <View style={styles.statsContainer}>
                <View
                    style={[
                        styles.statCard,
                        {
                            backgroundColor: colors.surface,
                            borderColor: colors.border
                        }
                    ]}
                >
                    <Text style={[styles.statNumber, { color: colors.primary }]}>
                        0
                    </Text>

                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                        Interviews
                    </Text>
                </View>

                <View
                    style={[
                        styles.statCard,
                        {
                            backgroundColor: colors.surface,
                            borderColor: colors.border
                        }
                    ]}
                >
                    <Text style={[styles.statNumber, { color: colors.primary }]}>
                        0%
                    </Text>

                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                        Average Score
                    </Text>
                </View>
            </View>

            {/* Start Practice */}
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                Ready to practice?
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
                Start a mock interview and improve your skills with
                AI-powered feedback.
            </Text>

            <Pressable
                style={[
                    styles.startButton,
                    { backgroundColor: colors.primary }
                ]}
            >
                <Text style={[styles.startButtonText, { color: colors.white }]}>
                    + Start New Interview
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center"
    },

    subtitle: {
        fontSize: 16,
        marginTop: 10,
        textAlign: "center"
    },

    statsContainer: {
        flexDirection: "row",
        width: "100%",
        gap: 15,
        marginTop: 30
    },

    statCard: {
        flex: 1,
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1
    },

    statNumber: {
        fontSize: 26,
        fontWeight: "bold"
    },

    statLabel: {
        fontSize: 14,
        marginTop: 8
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 35,
        alignSelf: "flex-start"
    },

    description: {
        fontSize: 15,
        marginTop: 10,
        lineHeight: 23
    },

    startButton: {
        width: "100%",
        height: 55,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },

    startButtonText: {
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default DashboardScreen;
