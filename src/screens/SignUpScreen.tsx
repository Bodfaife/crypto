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
import { ArrowLeft, Eye, EyeOff, Check } from "lucide-react-native";

interface SignUpScreenProps {
  onBack?: () => void;
  onSignUp?: (username: string, email: string, password: string) => void;
  onSignIn?: () => void;
}

export default function SignUpScreen({
  onBack,
  onSignUp,
  onSignIn,
}: SignUpScreenProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const passwordsMatch =
  password.length > 0 &&
  confirmPassword.length > 0 &&
  password === confirmPassword;

  const handleCreateAccount = () => {
    setError("");

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (
      !cleanUsername ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in every field.");
      return;
    }

    if (!cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!hasMinLength || !hasNumber) {
      setError("Your password does not meet the requirements.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    // Send the validated account information to App.tsx.
    // App.tsx will move the user to Profile Setup.
    onSignUp?.(cleanUsername, cleanEmail, password);
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

    <View style={styles.headerSpacer} />
    </View>

    {/* Title */}
    <View style={styles.titleSection}>
    <Text style={styles.eyebrow}>GET STARTED</Text>

    <Text style={styles.title}>Create your account</Text>

    <Text style={styles.subtitle}>
    Start tracking your crypto portfolio in a few simple steps.
    </Text>
    </View>

    {/* Form */}
    <View style={styles.form}>
    {/* Username */}
    <View style={styles.inputGroup}>
    <Text style={styles.label}>Username</Text>

    <TextInput
    value={username}
    onChangeText={setUsername}
    placeholder="Choose a username"
    placeholderTextColor="#56615A"
    autoCapitalize="none"
    autoCorrect={false}
    style={styles.input}
    />
    </View>

    {/* Email */}
    <View style={styles.inputGroup}>
    <Text style={styles.label}>Email</Text>

    <TextInput
    value={email}
    onChangeText={setEmail}
    placeholder="you@example.com"
    placeholderTextColor="#56615A"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    style={styles.input}
    />
    </View>

    {/* Password */}
    <View style={styles.inputGroup}>
    <Text style={styles.label}>Password</Text>

    <View style={styles.passwordContainer}>
    <TextInput
    value={password}
    onChangeText={setPassword}
    placeholder="Create a password"
    placeholderTextColor="#56615A"
    secureTextEntry={!showPassword}
    autoCapitalize="none"
    autoCorrect={false}
    style={styles.passwordInput}
    />

    <Pressable
    onPress={() =>
      setShowPassword((value) => !value)
    }
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

    {/* Password requirements */}
    <View style={styles.requirements}>
    <PasswordRequirement
    met={hasMinLength}
    text="At least 8 characters"
    />

    <PasswordRequirement
    met={hasNumber}
    text="Contains a number"
    />
    </View>

    {/* Confirm password */}
    <View style={styles.inputGroup}>
    <Text style={styles.label}>Confirm password</Text>

    <View style={styles.passwordContainer}>
    <TextInput
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    placeholder="Repeat your password"
    placeholderTextColor="#56615A"
    secureTextEntry={!showConfirmPassword}
    autoCapitalize="none"
    autoCorrect={false}
    style={styles.passwordInput}
    />

    <Pressable
    onPress={() =>
      setShowConfirmPassword((value) => !value)
    }
    hitSlop={10}
    >
    {showConfirmPassword ? (
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

    {/* Create account */}
    <Pressable
    style={({ pressed }) => [
      styles.primaryButton,
      pressed && styles.buttonPressed,
    ]}
    onPress={handleCreateAccount}
    >
    <Text style={styles.primaryButtonText}>
    Create account
    </Text>
    </Pressable>
    </View>

    {/* Sign in */}
    <View style={styles.signInContainer}>
    <Text style={styles.signInText}>
    Already have an account?
    </Text>

    <Pressable onPress={onSignIn}>
    <Text style={styles.signInLink}>Sign in</Text>
    </Pressable>
    </View>

    {/* Disclaimer */}
    <Text style={styles.disclaimer}>
    By creating an account, you agree to use Crypto as a
    portfolio tracking application.
    </Text>
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function PasswordRequirement({
  met,
  text,
}: {
  met: boolean;
  text: string;
}) {
  return (
    <View style={styles.requirement}>
    <View
    style={[
      styles.checkCircle,
      met && styles.checkCircleMet,
    ]}
    >
    {met ? (
      <Check size={12} color="#07100A" strokeWidth={3} />
    ) : null}
    </View>

    <Text
    style={[
      styles.requirementText,
      met && styles.requirementTextMet,
    ]}
    >
    {text}
    </Text>
    </View>
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
    height: 120,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: "#0D1510",
    borderWidth: 1,
    borderColor: "#1B271F",
    alignItems: "center",
    justifyContent: "center",
  },

  headerSpacer: {
    flex: 1,
  },

  titleSection: {
    marginTop: 18,
    marginBottom: 30,
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
    fontSize: 31,
    fontWeight: "800",
    letterSpacing: -1,
  },

  subtitle: {
    color: "#89958D",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    maxWidth: 330,
  },

  form: {
    width: "100%",
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    color: "#D6DDD8",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 9,
  },

  input: {
    height: 54,
    borderRadius: 15,
    backgroundColor: "#0D1510",
    borderWidth: 1,
    borderColor: "#1B271F",
    color: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 14,
  },

  passwordContainer: {
    height: 54,
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

  requirements: {
    marginTop: -6,
    marginBottom: 20,
    gap: 8,
  },

  requirement: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#344139",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  checkCircleMet: {
    backgroundColor: "#7CFFA0",
    borderColor: "#7CFFA0",
  },

  requirementText: {
    color: "#667169",
    fontSize: 12,
  },

  requirementTextMet: {
    color: "#8F9B93",
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

  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 26,
  },

  signInText: {
    color: "#68746C",
    fontSize: 13,
  },

  signInLink: {
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
    marginTop: 10,
  },
});
