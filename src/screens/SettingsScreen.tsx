import React from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    CircleHelp,
    Eye,
    Fingerprint,
    Globe,
    Info,
    LockKeyhole,
    Moon,
    ShieldCheck,
    Smartphone,
} from "lucide-react-native";

type Currency = "USD" | "EUR";

interface SettingsScreenProps {
    onBack: () => void;

    currency: Currency;
    onCurrencyChange: (value: Currency) => void;

    notificationsEnabled: boolean;
    onNotificationsChange: (value: boolean) => void;

    biometricEnabled: boolean;
    onBiometricChange: (value: boolean) => void;

    hideBalance: boolean;
    onHideBalanceChange: (value: boolean) => void;

    darkMode: boolean;
    onDarkModeChange: (value: boolean) => void;

    onCurrency?: () => void;
    onNotifications?: () => void;
    onSecurity?: () => void;
    onHelp?: () => void;
    onPrivacy?: () => void;
}

interface SettingRowProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    right?: React.ReactNode;
}

function SettingRow({
    icon,
    title,
    subtitle,
    onPress,
    right,
}: SettingRowProps) {
    return (
        <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            styles.row,
            pressed && styles.rowPressed,
        ]}
        >
        <View style={styles.iconBox}>
        {icon}
        </View>

        <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>
        {title}
        </Text>

        {subtitle ? (
            <Text style={styles.rowSubtitle}>
            {subtitle}
            </Text>
        ) : null}
        </View>

        {right ?? (
            <ChevronRight
            size={19}
            color="#71877B"
            />
        )}
        </Pressable>
    );
}

export default function SettingsScreen({
    onBack,

    currency,
    onCurrencyChange,

    notificationsEnabled,
    onNotificationsChange,

    biometricEnabled,
    onBiometricChange,

    hideBalance,
    onHideBalanceChange,

    darkMode,
    onDarkModeChange,

    onCurrency: onCurrencyPress,
    onNotifications: onNotificationsPress,
    onSecurity,
    onHelp,
    onPrivacy,
}: SettingsScreenProps) {
    const currencyLabel =
    currency === "EUR"
    ? "Euro (€)"
    : "US Dollar ($)";

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        >
        {/* Header */}
        <View style={styles.header}>
        <Pressable
        onPress={onBack}
        style={styles.backButton}
        >
        <ArrowLeft
        size={22}
        color="#FFFFFF"
        />
        </Pressable>

        <Text style={styles.headerTitle}>
        Settings
        </Text>

        <View
        style={styles.headerSpacer}
        />
        </View>

        {/* Preferences */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>
        Preferences
        </Text>

        <View style={styles.card}>
        <SettingRow
        icon={
            <Globe
            size={19}
            color="#7CFFA0"
            />
        }
        title="Currency"
        subtitle={currencyLabel}
        onPress={
            onCurrencyPress
        }
        />

        <SettingRow
        icon={
            <Bell
            size={19}
            color="#7CFFA0"
            />
        }
        title="Notifications"
        subtitle={
            notificationsEnabled
            ? "Enabled"
            : "Disabled"
        }
        onPress={
            onNotificationsPress
        }
        right={
            <Switch
            value={
                notificationsEnabled
            }
            onValueChange={
                onNotificationsChange
            }
            trackColor={{
                false: "#26372D",
                true: "#176B49",
            }}
            thumbColor={
                notificationsEnabled
                ? "#7CFFA0"
                : "#71877B"
            }
            />
        }
        />

        <SettingRow
        icon={
            <Moon
            size={19}
            color="#7CFFA0"
            />
        }
        title="Appearance"
        subtitle={
            darkMode
            ? "Dark mode"
            : "Light mode"
        }
        right={
            <Switch
            value={darkMode}
            onValueChange={
                onDarkModeChange
            }
            trackColor={{
                false: "#26372D",
                true: "#176B49",
            }}
            thumbColor={
                darkMode
                ? "#7CFFA0"
                : "#71877B"
            }
            />
        }
        />
        </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>
        Security
        </Text>

        <View style={styles.card}>
        <SettingRow
        icon={
            <LockKeyhole
            size={19}
            color="#7CFFA0"
            />
        }
        title="Security"
        subtitle="Password and account protection"
        onPress={onSecurity}
        />

        <SettingRow
        icon={
            <Fingerprint
            size={19}
            color="#7CFFA0"
            />
        }
        title="Biometric login"
        subtitle={
            biometricEnabled
            ? "Enabled"
            : "Use fingerprint or Face ID"
        }
        right={
            <Switch
            value={
                biometricEnabled
            }
            onValueChange={
                onBiometricChange
            }
            trackColor={{
                false: "#26372D",
                true: "#176B49",
            }}
            thumbColor={
                biometricEnabled
                ? "#7CFFA0"
                : "#71877B"
            }
            />
        }
        />

        <SettingRow
        icon={
            <Smartphone
            size={19}
            color="#7CFFA0"
            />
        }
        title="Connected devices"
        subtitle="Manage devices signed into your account"
        />
        </View>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>
        Privacy
        </Text>

        <View style={styles.card}>
        <SettingRow
        icon={
            <Eye
            size={19}
            color="#7CFFA0"
            />
        }
        title="Hide balance"
        subtitle={
            hideBalance
            ? "Balances are hidden"
            : "Show your balances"
        }
        right={
            <Switch
            value={
                hideBalance
            }
            onValueChange={
                onHideBalanceChange
            }
            trackColor={{
                false: "#26372D",
                true: "#176B49",
            }}
            thumbColor={
                hideBalance
                ? "#7CFFA0"
                : "#71877B"
            }
            />
        }
        />

        <SettingRow
        icon={
            <ShieldCheck
            size={19}
            color="#7CFFA0"
            />
        }
        title="Privacy & permissions"
        subtitle="Review app permissions"
        onPress={onPrivacy}
        />
        </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>
        Support
        </Text>

        <View style={styles.card}>
        <SettingRow
        icon={
            <CircleHelp
            size={19}
            color="#7CFFA0"
            />
        }
        title="Help & Support"
        subtitle="Get help with your account"
        onPress={onHelp}
        />

        <SettingRow
        icon={
            <Info
            size={19}
            color="#7CFFA0"
            />
        }
        title="About Kreep"
        subtitle="Version 1.0.0"
        />
        </View>
        </View>

        <Text style={styles.footer}>
        Kreep
        </Text>

        <Text style={styles.footerVersion}>
        Version 1.0.0
        </Text>

        <View style={{ height: 40 }} />
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#08110A",
    },

    content: {
        paddingBottom: 30,
    },

    header: {
        height: 70,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    headerTitle: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "700",
    },

    headerSpacer: {
        width: 40,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#102017",
        alignItems: "center",
        justifyContent: "center",
    },

    section: {
        marginHorizontal: 20,
        marginTop: 24,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 11,
    },

    card: {
        backgroundColor: "#102017",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#1E3527",
        overflow: "hidden",
    },

    row: {
        minHeight: 70,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#1B3024",
    },

    rowPressed: {
        backgroundColor: "#13271C",
    },

    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#163124",
        alignItems: "center",
        justifyContent: "center",
    },

    rowContent: {
        flex: 1,
        marginLeft: 12,
        marginRight: 10,
    },

    rowTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },

    rowSubtitle: {
        color: "#71877B",
        fontSize: 12,
        marginTop: 3,
    },

    footer: {
        color: "#52655A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 30,
    },

    footerVersion: {
        color: "#3F5147",
        fontSize: 11,
        textAlign: "center",
        marginTop: 4,
    },
});
