import React from "react";
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    ArrowLeft,
    ChevronRight,
    CircleHelp,
    Copy,
    CreditCard,
    DollarSign,
    LockKeyhole,
    LogOut,
    Mail,
    Pencil,
    Settings,
    ShieldCheck,
    UserRound,
    Bell,
} from "lucide-react-native";

interface ProfileScreenProps {
    username: string;
    email?: string;
    onBack?: () => void;
    onEditProfile?: () => void;
    onSettings?: () => void;
    onNotifications?: () => void;
    onSecurity?: () => void;
    onPaymentMethods?: () => void;
    onHelp?: () => void;
    onSignOut?: () => void;
}

interface ProfileRowProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    danger?: boolean;
}

function ProfileRow({
    icon,
    title,
    subtitle,
    onPress,
    danger = false,
}: ProfileRowProps) {
    return (
        <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            styles.optionRow,
            pressed && styles.optionPressed,
        ]}
        >
        <View
        style={[
            styles.optionIcon,
            danger && styles.dangerIcon,
        ]}
        >
        {icon}
        </View>

        <View style={styles.optionContent}>
        <Text
        style={[
            styles.optionTitle,
            danger && styles.dangerText,
        ]}
        >
        {title}
        </Text>

        {subtitle ? (
            <Text style={styles.optionSubtitle}>
            {subtitle}
            </Text>
        ) : null}
        </View>

        {!danger && (
            <ChevronRight
            size={19}
            color="#71877B"
            />
        )}
        </Pressable>
    );
}

export default function ProfileScreen({
    username,
    email,
    onBack,
    onEditProfile,
    onSettings,
    onNotifications,
    onSecurity,
    onPaymentMethods,
    onHelp,
    onSignOut,
}: ProfileScreenProps) {
    const firstLetter =
    username?.trim()?.charAt(0)?.toUpperCase() || "U";

    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out of your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: onSignOut,
                },
            ]
        );
    };

    const handleCopyEmail = () => {
        Alert.alert(
            "Email",
            "Email address copied."
        );
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        >
        {/* Header */}
        <View style={styles.header}>
        {onBack ? (
            <Pressable
            onPress={onBack}
            style={styles.backButton}
            >
            <ArrowLeft
            size={22}
            color="#FFFFFF"
            />
            </Pressable>
        ) : (
            <View style={styles.headerSpacer} />
        )}

        <Text style={styles.headerTitle}>
        Profile
        </Text>

        <Pressable
        onPress={onSettings}
        style={styles.settingsButton}
        >
        <Settings
        size={21}
        color="#FFFFFF"
        />
        </Pressable>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
        <Text style={styles.avatarText}>
        {firstLetter}
        </Text>
        </View>

        <Pressable
        onPress={onEditProfile}
        style={styles.editAvatarButton}
        >
        <Pencil
        size={14}
        color="#07100A"
        />
        </Pressable>
        </View>

        <Text style={styles.username}>
        {username || "Username"}
        </Text>

        {email ? (
            <Pressable
            onPress={handleCopyEmail}
            style={styles.emailRow}
            >
            <Mail
            size={15}
            color="#8FA59A"
            />

            <Text style={styles.email}>
            {email}
            </Text>

            <Copy
            size={13}
            color="#7CFFA0"
            />
            </Pressable>
        ) : null}

        <View style={styles.verifiedBadge}>
        <ShieldCheck
        size={14}
        color="#7CFFA0"
        />

        <Text style={styles.verifiedText}>
        Verified account
        </Text>
        </View>
        </View>

        {/* Account */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>
        Account
        </Text>

        <View style={styles.optionsCard}>
        <ProfileRow
        icon={
            <UserRound
            size={19}
            color="#7CFFA0"
            />
        }
        title="Personal information"
        subtitle="Name, username and email"
        onPress={onEditProfile}
        />

        <ProfileRow
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

        <ProfileRow
        icon={
            <CreditCard
            size={19}
            color="#7CFFA0"
            />
        }
        title="Payment methods"
        subtitle="Manage your payment methods"
        onPress={onPaymentMethods}
        />
        </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>
        Preferences
        </Text>

        <View style={styles.optionsCard}>
        <ProfileRow
        icon={
            <DollarSign
            size={19}
            color="#7CFFA0"
            />
        }
        title="Currency"
        subtitle="USD"
        onPress={() =>
            Alert.alert(
                "Currency",
                "Currency selection will be available here."
            )
        }
        />

        <ProfileRow
        icon={
            <Bell
            size={19}
            color="#7CFFA0"
            />
        }
        title="Notifications"
        subtitle="Manage your alerts and updates"
        onPress={onNotifications}
        />

        <ProfileRow
        icon={
            <Settings
            size={19}
            color="#7CFFA0"
            />
        }
        title="Settings"
        subtitle="App preferences and configuration"
        onPress={onSettings}
        />
        </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>
        Support
        </Text>

        <View style={styles.optionsCard}>
        <ProfileRow
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
        </View>
        </View>

        {/* Sign Out */}
        <Pressable
        onPress={handleSignOut}
        style={({ pressed }) => [
            styles.signOutButton,
            pressed && styles.signOutPressed,
        ]}
        >
        <View style={styles.signOutIcon}>
        <LogOut
        size={19}
        color="#FF7A7A"
        />
        </View>

        <Text style={styles.signOutText}>
        Sign Out
        </Text>
        </Pressable>

        {/* App version */}
        <Text style={styles.version}>
        Crypto • Version 1.0.0
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

    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#102017",
        alignItems: "center",
        justifyContent: "center",
    },

    profileCard: {
        marginHorizontal: 20,
        marginTop: 8,
        paddingVertical: 28,
        paddingHorizontal: 20,
        borderRadius: 24,
        backgroundColor: "#102017",
        borderWidth: 1,
        borderColor: "#1E3527",
        alignItems: "center",
    },

    avatarContainer: {
        position: "relative",
        marginBottom: 14,
    },

    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: "#163124",
        borderWidth: 2,
        borderColor: "#10B981",
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: "#7CFFA0",
        fontSize: 34,
        fontWeight: "800",
    },

    editAvatarButton: {
        position: "absolute",
        right: -2,
        bottom: -2,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#7CFFA0",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#102017",
    },

    username: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "800",
    },

    emailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
    },

    email: {
        color: "#8FA59A",
        fontSize: 13,
        marginHorizontal: 7,
    },

    verifiedBadge: {
        marginTop: 15,
        paddingHorizontal: 11,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: "#163124",
        flexDirection: "row",
        alignItems: "center",
    },

    verifiedText: {
        color: "#7CFFA0",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 5,
    },

    section: {
        marginHorizontal: 20,
        marginTop: 25,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 11,
    },

    optionsCard: {
        backgroundColor: "#102017",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#1E3527",
        overflow: "hidden",
    },

    optionRow: {
        minHeight: 68,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#1B3024",
    },

    optionPressed: {
        backgroundColor: "#13271C",
    },

    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#163124",
        alignItems: "center",
        justifyContent: "center",
    },

    dangerIcon: {
        backgroundColor: "#301719",
    },

    optionContent: {
        flex: 1,
        marginLeft: 12,
        marginRight: 10,
    },

    optionTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },

    optionSubtitle: {
        color: "#71877B",
        fontSize: 12,
        marginTop: 3,
    },

    dangerText: {
        color: "#FF7A7A",
    },

    signOutButton: {
        marginHorizontal: 20,
        marginTop: 28,
        height: 55,
        borderRadius: 17,
        backgroundColor: "#211316",
        borderWidth: 1,
        borderColor: "#402024",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    signOutPressed: {
        opacity: 0.7,
    },

    signOutIcon: {
        marginRight: 8,
    },

    signOutText: {
        color: "#FF7A7A",
        fontSize: 15,
        fontWeight: "700",
    },

    version: {
        color: "#52655A",
        fontSize: 11,
        textAlign: "center",
        marginTop: 20,
    },
});
