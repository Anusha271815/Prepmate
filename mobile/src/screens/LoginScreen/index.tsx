
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable
} from "react-native";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { loginUser } from "../../services/api";

const LoginScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        setSuccessMessage("");
        setErrorMessage("");

        if (!email.trim() || !password.trim()) {
            setErrorMessage("Please enter email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await loginUser({
                email: email.trim(),
                password
            });
            dispatch(setCredentials({
                user: response.user,
                token: response.token
            }));
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: "Dashboard" }]
            // });
            console.log("Login API Response:", response);

            setSuccessMessage("Login successful!");

        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                "Invalid email or password.";

            setErrorMessage(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>

            <Text style={styles.subtitle}>
                Login to continue with PrepMate
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Pressable
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.loginButtonText}>
                    {loading ? "Logging in..." : "Login"}
                </Text>
            </Pressable>

            {successMessage !== "" && (
                <Text style={styles.successMessage}>
                    {successMessage}
                </Text>
            )}

            {errorMessage !== "" && (
                <Text style={styles.errorMessage}>
                    {errorMessage}
                </Text>
            )}

            <Pressable
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={styles.registerText}>
                    Don't have an account? Register
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
        fontSize: 28,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 16,
        marginTop: 10
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginTop: 18,
        fontSize: 16
    },
    loginButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#0D9488",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    registerText: {
        marginTop: 20,
        fontSize: 14,
        color: "#64748B"
    },
    successMessage: {
        color: "#16A34A",
        fontSize: 14,
        marginTop: 15,
        textAlign: "center"
    },
    errorMessage: {
        color: "#DC2626",
        fontSize: 14,
        marginTop: 15,
        textAlign: "center"
    }
});

export default LoginScreen;
