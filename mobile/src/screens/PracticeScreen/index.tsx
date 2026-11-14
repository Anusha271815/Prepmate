
import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    ScrollView,
    TextInput,
    StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
    createInterview,
    startInterviewSession,
    generateQuestions
} from "../../services/api";
import { RootState } from "../../redux/store";
import { getTheme } from "../../theme";

const PracticeScreen = () => {
    const themeMode = useSelector(
        (state: RootState) => state.theme.mode
    );

    const theme = getTheme(themeMode);
    const colors = theme.colors;

    const [jobRole, setJobRole] = useState("");
    const [isCustomRole, setIsCustomRole] = useState(false);
    const [showJobRoles, setShowJobRoles] = useState(false);

    const [experience, setExperience] = useState("Fresher");
    const [difficulty, setDifficulty] = useState("Medium");
    const [interviewType, setInterviewType] = useState("Technical");

    const jobRoles = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "React Developer",
        "React Native Developer",
        "Angular Developer",
        "Vue.js Developer",
        "Node.js Developer",
        "Java Developer",
        "Python Developer",
        "C++ Developer",
        ".NET Developer",
        "PHP Developer",
        "Software Engineer",
        "Software Developer",
        "Mobile App Developer",
        "Web Developer",
        "Game Developer",
        "DevOps Engineer",
        "Cloud Engineer",
        "AWS Engineer",
        "Data Analyst",
        "Data Scientist",
        "Data Engineer",
        "Machine Learning Engineer",
        "AI Engineer",
        "AI/ML Developer",
        "Cybersecurity Analyst",
        "Security Engineer",
        "Ethical Hacker",
        "Network Engineer",
        "System Administrator",
        "Database Administrator",
        "QA Engineer",
        "Software Tester",
        "Automation Tester",
        "UI/UX Designer",
        "Graphic Designer",
        "Product Designer",
        "Product Manager",
        "Project Manager",
        "Business Analyst",
        "Technical Support Engineer",
        "System Engineer",
        "Embedded Systems Engineer",
        "Blockchain Developer",
        "Other"
    ];

    const renderOptions = (
        options: string[],
        selectedValue: string,
        onSelect: (value: string) => void
    ) => (
        <View style={styles.optionsContainer}>
            {options.map((option) => {
                const isSelected = selectedValue === option;

                return (
                    <Pressable
                        key={option}
                        onPress={() => onSelect(option)}
                        style={[
                            styles.option,
                            {
                                backgroundColor: isSelected
                                    ? colors.primaryLight
                                    : colors.surface,
                                borderColor: isSelected
                                    ? colors.primary
                                    : colors.border
                            }
                        ]}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                {
                                    color: isSelected
                                        ? colors.primary
                                        : colors.textSecondary
                                }
                            ]}
                        >
                            {option}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );

    
const handleStartInterview = async () => {
    if (!jobRole.trim()) {
        alert("Please select or enter a job role.");
        return;
    }

    try {
        // 1. Create interview
        const interviewResponse = await createInterview({
            role: jobRole.trim(),
            experience,
            difficulty,
            interviewType,
            totalQuestions: 10
        });

        const interviewId = interviewResponse.interview._id;

        // 2. Start interview session
        const sessionResponse = await startInterviewSession(interviewId);

        const sessionId = sessionResponse.session._id;

        // 3. Generate questions
        const questionsResponse = await generateQuestions(sessionId);

        console.log("Interview ID:", interviewId);
        console.log("Session ID:", sessionId);
        console.log("Generated Questions:", questionsResponse.questions);

        alert("Interview session started successfully!");

    } catch (error: any) {
        console.error(
            "Interview start error:",
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.message ||
            "Unable to start interview. Please try again."
        );
    }
};


    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: colors.background }
            ]}
            contentContainerStyle={styles.content}
        >
            <Text
                style={[
                    styles.heading,
                    { color: colors.textPrimary }
                ]}
            >
                Mock Interview
            </Text>

            <Text
                style={[
                    styles.subtitle,
                    { color: colors.textSecondary }
                ]}
            >
                Customize your interview and start practicing.
            </Text>

            {/* Job Role */}
            <Text
                style={[
                    styles.label,
                    { color: colors.textPrimary }
                ]}
            >
                Job Role
            </Text>

            <Pressable
                onPress={() => setShowJobRoles(!showJobRoles)}
                style={[
                    styles.dropdown,
                    {
                        backgroundColor: colors.surface,
                        borderColor: colors.border
                    }
                ]}
            >
                <Text
                    style={{
                        color: jobRole
                            ? colors.textPrimary
                            : colors.textSecondary,
                        fontSize: 15
                    }}
                >
                    {jobRole || "Select your job role"}
                </Text>

                <Ionicons
                    name={showJobRoles ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={colors.textSecondary}
                />
            </Pressable>

            {showJobRoles && (
                <ScrollView
                    nestedScrollEnabled
                    style={[
                        styles.dropdownList,
                        {
                            backgroundColor: colors.surface,
                            borderColor: colors.border
                        }
                    ]}
                >
                    {jobRoles.map((role) => (
                        <Pressable
                            key={role}
                            onPress={() => {
                                setIsCustomRole(role === "Other");
                                setJobRole(role === "Other" ? "" : role);
                                setShowJobRoles(false);
                            }}
                            style={[
                                styles.dropdownOption,
                                {
                                    borderBottomColor: colors.border,
                                    backgroundColor:
                                        jobRole === role
                                            ? colors.primaryLight
                                            : colors.surface
                                }
                            ]}
                        >
                            <Text
                                style={{
                                    color:
                                        jobRole === role
                                            ? colors.primary
                                            : colors.textPrimary,
                                    fontSize: 14
                                }}
                            >
                                {role}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            )}

            {/* Custom Job Role */}
            {isCustomRole && (
                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                            color: colors.textPrimary,
                            marginTop: 10
                        }
                    ]}
                    placeholder="Enter your job role"
                    placeholderTextColor={colors.textSecondary}
                    value={jobRole}
                    onChangeText={setJobRole}
                />
            )}

            {/* Experience */}
            <Text
                style={[
                    styles.label,
                    { color: colors.textPrimary }
                ]}
            >
                Experience Level
            </Text>

            {renderOptions(
                ["Fresher", "0-2 Years", "2-5 Years", "5+ Years"],
                experience,
                setExperience
            )}

            {/* Difficulty */}
            <Text
                style={[
                    styles.label,
                    { color: colors.textPrimary }
                ]}
            >
                Interview Difficulty
            </Text>

            {renderOptions(
                ["Easy", "Medium", "Hard"],
                difficulty,
                setDifficulty
            )}

            {/* Interview Type */}
            <Text
                style={[
                    styles.label,
                    { color: colors.textPrimary }
                ]}
            >
                Interview Type
            </Text>

            {renderOptions(
                ["Technical", "HR", "Behavioral", "Mixed"],
                interviewType,
                setInterviewType
            )}

            {/* Start Button */}
            <Pressable
                onPress={handleStartInterview}
                style={[
                    styles.startButton,
                    { backgroundColor: colors.primary }
                ]}
            >
                <Text
                    style={[
                        styles.startButtonText,
                        { color: colors.white }
                    ]}
                >
                    Start Interview
                </Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20,
        paddingBottom: 35
    },
    heading: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 8
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 25
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 20
    },
    dropdown: {
        height: 52,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dropdownList: {
        maxHeight: 230,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5
    },
    dropdownOption: {
        padding: 14,
        borderBottomWidth: 1
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15
    },
    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10
    },
    option: {
        paddingVertical: 11,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 10
    },
    optionText: {
        fontSize: 13,
        fontWeight: "500"
    },
    startButton: {
        height: 52,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    startButtonText: {
        fontSize: 16,
        fontWeight: "700"
    }
});

export default PracticeScreen;
