import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const DashboardScreen = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <View style={styles.container}>
    <Text style={styles.title}>Welcome to PrepMate! 👋</Text>

    <Text style={styles.subtitle}>
        Your journey to interview success starts here.
    </Text>

    <View style={styles.statsContainer}>
        <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Interviews</Text>
        </View>

        <View style={styles.statCard}>
            <Text style={styles.statNumber}>0%</Text>
            <Text style={styles.statLabel}>Average Score</Text>
        </View>
    </View>

    <Text style={styles.sectionTitle}>Ready to practice?</Text>

    <Text style={styles.description}>
        Start a mock interview and improve your skills with AI-powered feedback.
    </Text>
    <Pressable style={styles.startButton}>
    <Text style={styles.startButtonText}>
        + Start New Interview
    </Text>
</Pressable>
<Pressable
    style={styles.logoutButton}
    onPress={handleLogout}
>
    <Text style={styles.logoutButtonText}>Logout</Text>
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
        fontWeight: "bold"
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
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0"
    },
    statNumber: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#0D9488"
    },
    statLabel: {
        fontSize: 14,
        color: "#64748B",
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
        color: "#64748B",
        marginTop: 10,
        lineHeight: 23
    },
    startButton: {
        width: "100%",
        height: 55,
        backgroundColor: "#0D9488",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    startButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    logoutButton: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#DC2626",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    logoutButtonText: {
        color: "#DC2626",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default DashboardScreen;