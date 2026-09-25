import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ArrowLeft,
  Check,
  CircleUserRound,
  ChevronRight,
} from "lucide-react-native";

interface ProfileSetupScreenProps {
  username: string;
  onBack?: () => void;
  onContinue?: (profile: {
    username: string;
    currency: "USD" | "EUR";
    avatar: string;
  }) => void;
}

const avatars = [
  {
    id: "green",
    label: "G",
    color: "#7CFFA0",
  },
  {
    id: "blue",
    label: "C",
    color: "#6EA8FF",
  },
  {
    id: "purple",
    label: "P",
    color: "#B18CFF",
  },
  {
    id: "orange",
    label: "X",
    color: "#FFB86B",
  },
  {
    id: "pink",
    label: "K",
    color: "#FF8FB3",
  },
];

export default function ProfileSetupScreen({
  username,
  onBack,
  onContinue,
}: ProfileSetupScreenProps) {
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");
  const [avatar, setAvatar] = useState("green");

  const handleContinue = () => {
    onContinue?.({
      username,
      currency,
      avatar,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
          onPress={onBack}
          hitSlop={10}
        >
          <ArrowLeft size={20} color="#F2F5F3" />
        </Pressable>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <CircleUserRound size={28} color="#7CFFA0" />
          </View>

          <Text style={styles.eyebrow}>PROFILE</Text>

          <Text style={styles.title}>Set up your profile</Text>

          <Text style={styles.subtitle}>
            Choose how you'd like your profile to appear.
          </Text>
        </View>

        {/* Username */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Username</Text>

          <View style={styles.usernameCard}>
            <View style={styles.usernameAvatar}>
              <Text style={styles.usernameAvatarText}>
                {username.charAt(0).toUpperCase() || "C"}
              </Text>
            </View>

            <View style={styles.usernameInfo}>
              <Text style={styles.usernameName}>{username}</Text>
              <Text style={styles.usernameHandle}>@{username}</Text>
            </View>

            <Check size={18} color="#7CFFA0" />
          </View>

          <Text style={styles.helperText}>
            Your username will be visible on your profile.
          </Text>
        </View>

        {/* Avatar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile avatar</Text>

          <View style={styles.avatarContainer}>
            {avatars.map((item) => {
              const selected = avatar === item.id;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => setAvatar(item.id)}
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: item.color,
                    },
                    selected && styles.avatarSelected,
                  ]}
                >
                  <Text style={styles.avatarText}>{item.label}</Text>

                  {selected && (
                    <View style={styles.avatarCheck}>
                      <Check
                        size={11}
                        color="#07100A"
                        strokeWidth={3}
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Currency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display currency</Text>

          <Text style={styles.helperTextTop}>
            Choose the currency used to display portfolio values.
          </Text>

          <View style={styles.currencyList}>
            <Pressable
              style={[
                styles.currencyCard,
                currency === "USD" && styles.currencySelected,
              ]}
              onPress={() => setCurrency("USD")}
            >
              <View
                style={[
                  styles.currencyIcon,
                  currency === "USD" && styles.currencyIconSelected,
                ]}
              >
                <Text
                  style={[
                    styles.currencySymbol,
                    currency === "USD" && styles.currencySymbolSelected,
                  ]}
                >
                  $
                </Text>
              </View>

              <View style={styles.currencyInfo}>
                <Text
                  style={[
                    styles.currencyName,
                    currency === "USD" && styles.currencyNameSelected,
                  ]}
                >
                  US Dollar
                </Text>

                <Text style={styles.currencyCode}>USD</Text>
              </View>

              <View
                style={[
                  styles.radio,
                  currency === "USD" && styles.radioSelected,
                ]}
              >
                {currency === "USD" && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </Pressable>

            <Pressable
              style={[
                styles.currencyCard,
                currency === "EUR" && styles.currencySelected,
              ]}
              onPress={() => setCurrency("EUR")}
            >
              <View
                style={[
                  styles.currencyIcon,
                  currency === "EUR" && styles.currencyIconSelected,
                ]}
              >
                <Text
                  style={[
                    styles.currencySymbol,
                    currency === "EUR" && styles.currencySymbolSelected,
                  ]}
                >
                  €
                </Text>
              </View>

              <View style={styles.currencyInfo}>
                <Text
                  style={[
                    styles.currencyName,
                    currency === "EUR" && styles.currencyNameSelected,
                  ]}
                >
                  Euro
                </Text>

                <Text style={styles.currencyCode}>EUR</Text>
              </View>

              <View
                style={[
                  styles.radio,
                  currency === "EUR" && styles.radioSelected,
                ]}
              >
                {currency === "EUR" && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </Pressable>
          </View>
        </View>


        {/* Continue */}
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>

          <ChevronRight
            size={19}
            color="#07100A"
            strokeWidth={2.5}
          />
        </Pressable>

        <Text style={styles.footerText}>
          Your preferences are saved to your account and can be updated from Settings.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070B08",
  },

  container: {
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 42,
  },

  backButton: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: "#101611",
    borderWidth: 1,
    borderColor: "#1B271F",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },

  pressed: {
    opacity: 0.7,
  },

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#102017",
    borderWidth: 1,
    borderColor: "#1E3326",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  eyebrow: {
    color: "#7CFFA0",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 7,
  },

  title: {
    color: "#F2F5F3",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.7,
    textAlign: "center",
  },

  subtitle: {
    color: "#89948D",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 9,
    maxWidth: 310,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    color: "#F2F5F3",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 11,
  },

  helperText: {
    color: "#66736B",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 8,
  },

  helperTextTop: {
    color: "#66736B",
    fontSize: 11,
    lineHeight: 17,
    marginTop: -4,
    marginBottom: 12,
  },

  usernameCard: {
    minHeight: 68,
    borderRadius: 17,
    backgroundColor: "#0E1511",
    borderWidth: 1,
    borderColor: "#1D2921",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  usernameAvatar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#17301F",
    alignItems: "center",
    justifyContent: "center",
  },

  usernameAvatarText: {
    color: "#7CFFA0",
    fontSize: 17,
    fontWeight: "800",
  },

  usernameInfo: {
    flex: 1,
    marginLeft: 12,
  },

  usernameName: {
    color: "#E2E8E4",
    fontSize: 14,
    fontWeight: "700",
  },

  usernameHandle: {
    color: "#68746C",
    fontSize: 11,
    marginTop: 3,
  },

  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  avatarSelected: {
    borderWidth: 3,
    borderColor: "#F2F5F3",
  },

  avatarText: {
    color: "#07100A",
    fontSize: 18,
    fontWeight: "900",
  },

  avatarCheck: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#7CFFA0",
    borderWidth: 2,
    borderColor: "#070B08",
    alignItems: "center",
    justifyContent: "center",
  },

  currencyList: {
    gap: 10,
  },

  currencyCard: {
    minHeight: 72,
    borderRadius: 17,
    backgroundColor: "#0E1511",
    borderWidth: 1,
    borderColor: "#1D2921",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  currencySelected: {
    backgroundColor: "#101B14",
    borderColor: "#3B5C45",
  },

  currencyIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#171E19",
    alignItems: "center",
    justifyContent: "center",
  },

  currencyIconSelected: {
    backgroundColor: "#17301F",
  },

  currencySymbol: {
    color: "#89948D",
    fontSize: 21,
    fontWeight: "700",
  },

  currencySymbolSelected: {
    color: "#7CFFA0",
  },

  currencyInfo: {
    flex: 1,
    marginLeft: 12,
  },

  currencyName: {
    color: "#DCE3DE",
    fontSize: 14,
    fontWeight: "700",
  },

  currencyNameSelected: {
    color: "#F0F5F1",
  },

  currencyCode: {
    color: "#68746C",
    fontSize: 11,
    marginTop: 3,
  },

  radio: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#354139",
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    borderColor: "#7CFFA0",
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#7CFFA0",
  },

  preferenceCard: {
    minHeight: 78,
    borderRadius: 17,
    backgroundColor: "#0B120E",
    borderWidth: 1,
    borderColor: "#18231C",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#102017",
    alignItems: "center",
    justifyContent: "center",
  },

  preferenceContent: {
    flex: 1,
    marginHorizontal: 12,
  },

  preferenceTitle: {
    color: "#D6DED9",
    fontSize: 12,
    fontWeight: "700",
  },

  preferenceDescription: {
    color: "#657169",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 3,
  },

  continueButton: {
    height: 56,
    borderRadius: 17,
    backgroundColor: "#7CFFA0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  continueText: {
    color: "#07100A",
    fontSize: 15,
    fontWeight: "800",
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.985 }],
  },

  footerText: {
    color: "#4F5B53",
    fontSize: 10,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 13,
  },
});
