import React, { useState } from "react";
import { registerUser } from "../../services/api";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Alert
} from "react-native";

const RegisterScreen = ({ navigation }: any) => {
    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
    
        try {
            setLoading(true);
    
            const response = await registerUser({
                name,
                email,
                password
            });
    
            setSuccessMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigation.navigate("Login");
            }, 1500);
    
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Registration failed";
    
            Alert.alert("Registration Error", message);
    
        } finally {
            setLoading(false);
        }
    };
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
                Join PrepMate and start preparing for interviews.
            </Text>
            <TextInput
    style={styles.input}
    placeholder="Enter your name"
    value={name}
    onChangeText={setName}
/>

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
placeholder="Create password"
secureTextEntry
value={password}
onChangeText={setPassword}
/>
<Pressable
style={styles.registerButton}
onPress={handleRegister}
disabled={loading}
>
<Text style={styles.registerButtonText}>
    {loading ? "Creating Account..." : "Create Account"}
</Text>
</Pressable>
{successMessage !== "" && (
    <Text style={styles.successMessage}>
        {successMessage}
    </Text>
)}
<Pressable onPress={() => navigation.navigate("Login")}>
<Text style={styles.loginText}>
    Already have an account? Login
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
        marginTop: 10,
        textAlign: "center"
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
    registerButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#0D9488",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25
    },
    
    registerButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    loginText: {
        marginTop: 20,
        fontSize: 14,
        color: "#64748B"
    },
    successMessage: {
        color: "#16A34A",
        fontSize: 14,
        marginTop: 15,
        textAlign: "center"
    }
});

export default RegisterScreen;