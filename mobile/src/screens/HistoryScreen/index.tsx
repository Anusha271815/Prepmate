
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getTheme } from "../../theme";

const HistoryScreen = () => {
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
                Interview History
            </Text>

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Your past interviews and performance reports will appear here.
            </Text>
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
        fontSize: 22,
        fontWeight: "bold"
    },

    subtitle: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 10,
        lineHeight: 21
    }
});

export default HistoryScreen;
