import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";

interface SignInScreenProps {
    onBack?: () => void;
    onSignIn?: (identifier: string, password: string) => void;
    onCreateAccount?: () => void;
    onForgotPassword?: () => void;
}

export default function SignInScreen({
    onBack,
    onSignIn,
    onCreateAccount,
    onForgotPassword,
}: SignInScreenProps) {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSignIn = () => {
        setError("");

        if (!identifier.trim() || !password) {
            setError("Enter your username or email and password.");
            return;
        }

        onSignIn?.(identifier.trim(), password);
    };

    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        >
        {/* Header */}
        <View style={styles.header}>
        <Pressable
        style={styles.backButton}
        onPress={onBack}
        hitSlop={10}
        >
        <ArrowLeft size={22} color="#FFFFFF" />
        </Pressable>
        </View>

        {/* Logo */}
        <View style={styles.logoSection}>
        <View style={styles.logo}>
        <Text style={styles.logoText}>C</Text>
        </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
        <Text style={styles.eyebrow}>WELCOME BACK</Text>

        <Text style={styles.title}>Sign in to Crypto</Text>

        <Text style={styles.subtitle}>
        Access your portfolio and keep up with the market.
        </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
        <View style={styles.inputGroup}>
        <Text style={styles.label}>Username or email</Text>

        <TextInput
        value={identifier}
        onChangeText={setIdentifier}
        placeholder="Enter your username or email"
        placeholderTextColor="#56615A"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        />
        </View>

        <View style={styles.inputGroup}>
        <View style={styles.passwordHeader}>
        <Text style={styles.label}>Password</Text>

        <Pressable onPress={onForgotPassword} hitSlop={8}>
        <Text style={styles.forgotPassword}>
        Forgot password?
        </Text>
        </Pressable>
        </View>

        <View style={styles.passwordContainer}>
        <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#56615A"
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.passwordInput}
        />

        <Pressable
        onPress={() => setShowPassword((value) => !value)}
        hitSlop={10}
        >
        {showPassword ? (
            <EyeOff size={20} color="#7D8981" />
        ) : (
            <Eye size={20} color="#7D8981" />
        )}
        </Pressable>
        </View>
        </View>

        {/* Error */}
        {error ? (
            <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            </View>
        ) : null}

        {/* Sign in */}
        <Pressable
        style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
        ]}
        onPress={handleSignIn}
        >
        <Text style={styles.primaryButtonText}>Sign in</Text>
        </Pressable>
        </View>

        {/* Create account */}
        <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>
        Don't have an account?
        </Text>

        <Pressable onPress={onCreateAccount}>
        <Text style={styles.createAccountLink}>
        Create account
        </Text>
        </Pressable>
        </View>

        <Text style={styles.disclaimer}>
        Your Crypto account is used to access your personal
        portfolio and preferences.
        </Text>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#070B08",
    },

    keyboardView: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingBottom: 28,
    },

    header: {
        height: 64,
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "#0D1510",
        borderWidth: 1,
        borderColor: "#1B271F",
        alignItems: "center",
        justifyContent: "center",
    },

    logoSection: {
        alignItems: "center",
        marginTop: 20,
    },

    logo: {
        width: 58,
        height: 58,
        borderRadius: 19,
        backgroundColor: "#7CFFA0",
        alignItems: "center",
        justifyContent: "center",
    },

    logoText: {
        color: "#07100A",
        fontSize: 30,
        fontWeight: "900",
    },

    titleSection: {
        marginTop: 24,
        marginBottom: 34,
        alignItems: "center",
    },

    eyebrow: {
        color: "#7CFFA0",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.8,
        marginBottom: 10,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "800",
        letterSpacing: -1,
        textAlign: "center",
    },

    subtitle: {
        color: "#89958D",
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
        marginTop: 10,
        maxWidth: 320,
    },

    form: {
        width: "100%",
    },

    inputGroup: {
        marginBottom: 20,
    },

    passwordHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 9,
    },

    label: {
        color: "#D6DDD8",
        fontSize: 13,
        fontWeight: "700",
    },

    forgotPassword: {
        color: "#7CFFA0",
        fontSize: 12,
        fontWeight: "700",
    },

    input: {
        height: 56,
        borderRadius: 15,
        backgroundColor: "#0D1510",
        borderWidth: 1,
        borderColor: "#1B271F",
        color: "#FFFFFF",
        paddingHorizontal: 16,
        fontSize: 14,
    },

    passwordContainer: {
        height: 56,
        borderRadius: 15,
        backgroundColor: "#0D1510",
        borderWidth: 1,
        borderColor: "#1B271F",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
    },

    passwordInput: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 14,
        paddingRight: 12,
    },

    errorContainer: {
        backgroundColor: "#251311",
        borderWidth: 1,
        borderColor: "#48221E",
        borderRadius: 13,
        paddingHorizontal: 14,
        paddingVertical: 11,
        marginBottom: 16,
    },

    errorText: {
        color: "#FF9B91",
        fontSize: 12,
        lineHeight: 18,
    },

    primaryButton: {
        height: 56,
        borderRadius: 17,
        backgroundColor: "#7CFFA0",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },

    primaryButtonText: {
        color: "#07100A",
        fontSize: 16,
        fontWeight: "800",
    },

    buttonPressed: {
        opacity: 0.72,
        transform: [{ scale: 0.985 }],
    },

    createAccountContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },

    createAccountText: {
        color: "#68746C",
        fontSize: 13,
    },

    createAccountLink: {
        color: "#7CFFA0",
        fontSize: 13,
        fontWeight: "800",
        marginLeft: 5,
    },

    disclaimer: {
        color: "#4E5952",
        fontSize: 10,
        lineHeight: 15,
        textAlign: "center",
        marginTop: 24,
    },
});
