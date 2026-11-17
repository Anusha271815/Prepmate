import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

import { RootState } from "../../redux/store";
import { getTheme } from "../../theme";
import { getCurrentQuestion } from "../../services/api";
import AvatarPreview from "../../components/common/AvatarPreview.web";

const InterviewScreen = () => {
    const route = useRoute<any>();
    const { sessionId } = route.params;

    const [question, setQuestion] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [loading, setLoading] = useState(true);
    const themeMode = useSelector(
        (state: RootState) => state.theme.mode
    );

    const colors = getTheme(themeMode).colors;
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await getCurrentQuestion(sessionId);
    
                console.log("Current Question Response:", response);
    
                setQuestion(response.question);
                setCurrentIndex(response.currentQuestion);
                setTotalQuestions(response.totalQuestions);
            } catch (error) {
                console.error("Error fetching question:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchQuestion();
    }, [sessionId]);
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }
    return (
        
        <View style={[
            styles.container,
            { backgroundColor: colors.background }
        ]}>
            <Text style={{ color: colors.textPrimary, fontSize: 22 }}>
                AI Interview
            </Text>
    
            <Text style={{ color: colors.textSecondary, marginTop: 15 }}>
                Question {currentIndex + 1} of {totalQuestions}
            </Text>
            <AvatarPreview
                questionText={question?.questionText || ""}
            />
    
            <Text
            style={{
                color: colors.textPrimary,
                fontSize: 20,
                fontWeight: "600",
                textAlign: "center",
                marginTop: 24,
                lineHeight: 30
            }}
        >
            {question?.questionText}
        </Text>
                </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 15,
        marginTop: 10
    }
});

export default InterviewScreen;
