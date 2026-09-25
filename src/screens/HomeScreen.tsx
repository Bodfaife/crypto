import React, { useMemo, useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    ArrowDownLeft,
    ArrowUpRight,
    Bell,
    ChevronRight,
    Eye,
    EyeOff,
    Repeat2,
    Search,
    TrendingUp,
    Wallet,
} from "lucide-react-native";

interface HomeScreenProps {
    username: string;
    currency?: "USD" | "EUR";
    avatar?: string;
    onNotifications?: () => void;
    onProfile?: () => void;
    onMarkets?: () => void;
    onActivity?: () => void;
    onSend?: () => void;
    onReceive?: () => void;
    onSwap?: () => void;
    onAssetPress?: (symbol: string) => void;
}

const assets = [
    {
        symbol: "BTC",
        name: "Bitcoin",
        price: 108742.38,
        change: 2.84,
        amount: "0.03842",
        value: 4178.27,
        icon: "₿",
        iconBackground: "#2A2115",
        iconColor: "#F7931A",
    },
{
    symbol: "ETH",
    name: "Ethereum",
    price: 3984.62,
    change: 1.67,
    amount: "1.284",
    value: 5116.65,
    icon: "Ξ",
    iconBackground: "#171C2A",
    iconColor: "#8EA2FF",
},
{
    symbol: "SOL",
    name: "Solana",
    price: 221.47,
    change: -0.82,
    amount: "8.42",
    value: 1864.79,
    icon: "S",
    iconBackground: "#17251F",
    iconColor: "#7CFFA0",
},
{
    symbol: "USDT",
    name: "Tether",
    price: 1,
    change: 0.01,
    amount: "2380.50",
    value: 2380.5,
    icon: "₮",
    iconBackground: "#15251F",
    iconColor: "#50AF95",
},
];

const activity = [
    {
        type: "received",
        title: "Received Bitcoin",
        subtitle: "BTC",
        amount: "+0.0042 BTC",
        value: "+$456.72",
        time: "Today, 10:42 AM",
    },
{
    type: "swap",
    title: "Swapped assets",
    subtitle: "ETH → USDT",
    amount: "0.25 ETH",
    value: "$996.16",
    time: "Yesterday, 4:18 PM",
},
{
    type: "sent",
    title: "Sent Solana",
    subtitle: "SOL",
    amount: "-2.00 SOL",
    value: "-$442.94",
    time: "Sep 22, 2:31 PM",
},
];

const chartPoints = [
    42, 48, 45, 51, 49, 58, 55, 62, 59, 68, 64, 72, 69, 78, 74, 82, 79, 88,
];

export default function HomeScreen({
    username,
    currency = "USD",
    onNotifications,
    onProfile,
    onMarkets,
    onActivity,
    onSend,
    onReceive,
    onSwap,
    onAssetPress,
}: HomeScreenProps) {
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [chartPeriod, setChartPeriod] = useState("1W");

    const totalBalance = useMemo(
        () => assets.reduce((sum, asset) => sum + asset.value, 0),
                                 []
    );

    const totalChange = 3.72;

    const currencySymbol = currency === "EUR" ? "€" : "$";

    const formattedBalance = totalBalance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const firstLetter = username.charAt(0).toUpperCase() || "C";

    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        >
        {/* Header */}
        <View style={styles.header}>
        <View>
        <Text style={styles.greeting}>Welcome back</Text>

        <Text style={styles.username}>
        @{username}
        </Text>
        </View>

        <View style={styles.headerActions}>
        <Pressable
        style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
        ]}
        onPress={onNotifications}
        hitSlop={8}
        >
        <Bell
        size={20}
        color="#DCE4DE"
        />

        <View style={styles.notificationDot} />
        </Pressable>

        <Pressable
        style={({ pressed }) => [
            styles.profileAvatar,
            pressed && styles.pressed,
        ]}
        onPress={onProfile}
        hitSlop={8}
        >
        <Text style={styles.profileAvatarText}>
        {firstLetter}
        </Text>
        </Pressable>
        </View>
        </View>

        {/* Portfolio Card */}
        <View style={styles.portfolioCard}>
        <View style={styles.portfolioTopRow}>
        <View>
        <Text style={styles.portfolioLabel}>
        Total portfolio
        </Text>

        <View style={styles.balanceRow}>
        <Text style={styles.balance}>
        {balanceVisible
            ? `${currencySymbol}${formattedBalance}`
            : "••••••••"}
            </Text>

            <Pressable
            onPress={() =>
                setBalanceVisible(
                    (visible) => !visible
                )
            }
            hitSlop={10}
            >
            {balanceVisible ? (
                <Eye
                size={19}
                color="#738078"
                />
            ) : (
                <EyeOff
                size={19}
                color="#738078"
                />
            )}
            </Pressable>
            </View>
            </View>

            <View style={styles.balanceBadge}>
            <Wallet
            size={15}
            color="#7CFFA0"
            />
            </View>
            </View>

            <View style={styles.changeRow}>
            <View style={styles.changeBadge}>
            <TrendingUp
            size={14}
            color="#7CFFA0"
            />

            <Text style={styles.changeText}>
            +{totalChange.toFixed(2)}%
            </Text>
            </View>

            <Text style={styles.changePeriod}>
            Past 24 hours
            </Text>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
            <View style={styles.chartLines}>
            <View style={styles.chartLine} />
            <View style={styles.chartLine} />
            <View style={styles.chartLine} />
            <View style={styles.chartLine} />
            </View>

            <View style={styles.chart}>
            {chartPoints.map((point, index) => {
                const previous =
                chartPoints[index - 1];

                const difference =
                index === 0
                ? 0
                : point - previous;

                return (
                    <View
                    key={index}
                    style={[
                        styles.chartPoint,
                        {
                            height: `${Math.max(
                                point,
                                35
                            )}%`,
                            marginTop:
                            difference < 0
                            ? Math.abs(
                                difference
                            ) * 0.4
                            : 0,
                        },
                    ]}
                    >
                    <View style={styles.chartDot} />
                    </View>
                );
            })}
            </View>
            </View>

            {/* Chart Periods */}
            <View style={styles.periodRow}>
            {["1D", "1W", "1M", "3M", "1Y"].map(
                (period) => {
                    const selected =
                    chartPeriod === period;

                    return (
                        <Pressable
                        key={period}
                        style={[
                            styles.periodButton,
                            selected &&
                            styles.periodButtonSelected,
                        ]}
                        onPress={() =>
                            setChartPeriod(period)
                        }
                        >
                        <Text
                        style={[
                            styles.periodText,
                            selected &&
                            styles.periodTextSelected,
                        ]}
                        >
                        {period}
                        </Text>
                        </Pressable>
                    );
                }
            )}
            </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
            Quick actions
            </Text>
            </View>

            <View style={styles.actionsRow}>
            <QuickAction
            icon={
                <ArrowUpRight
                size={20}
                color="#7CFFA0"
                />
            }
            label="Send"
            onPress={onSend}
            />

            <QuickAction
            icon={
                <ArrowDownLeft
                size={20}
                color="#7CFFA0"
                />
            }
            label="Receive"
            onPress={onReceive}
            />

            <QuickAction
            icon={
                <Repeat2
                size={20}
                color="#7CFFA0"
                />
            }
            label="Swap"
            onPress={onSwap}
            />

            <QuickAction
            icon={
                <Search
                size={20}
                color="#7CFFA0"
                />
            }
            label="Explore"
            onPress={onMarkets}
            />
            </View>

            {/* Your Assets */}
            <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
            Your assets
            </Text>

            <Pressable
            onPress={onMarkets}
            hitSlop={8}
            >
            <Text style={styles.viewAll}>
            View all
            </Text>
            </Pressable>
            </View>

            <View style={styles.assetList}>
            {assets.map((asset) => (
                <Pressable
                key={asset.symbol}
                style={({ pressed }) => [
                    styles.assetCard,
                    pressed && styles.cardPressed,
                ]}
                onPress={() =>
                    onAssetPress?.(asset.symbol)
                }
                >
                <View
                style={[
                    styles.assetIcon,
                    {
                        backgroundColor:
                        asset.iconBackground,
                    },
                ]}
                >
                <Text
                style={[
                    styles.assetIconText,
                    {
                        color: asset.iconColor,
                    },
                ]}
                >
                {asset.icon}
                </Text>
                </View>

                <View style={styles.assetInfo}>
                <Text style={styles.assetSymbol}>
                {asset.symbol}
                </Text>

                <Text style={styles.assetName}>
                {asset.name}
                </Text>
                </View>

                <View style={styles.assetValues}>
                <Text style={styles.assetValue}>
                {currencySymbol}
                {asset.value.toLocaleString(
                    "en-US",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }
                )}
                </Text>

                <View style={styles.assetBottomRow}>
                <Text style={styles.assetAmount}>
                {asset.amount} {asset.symbol}
                </Text>

                <Text
                style={[
                    styles.assetChange,
                    asset.change < 0 &&
                    styles.negativeChange,
                ]}
                >
                {asset.change >= 0 ? "+" : ""}
                {asset.change.toFixed(2)}%
                </Text>
                </View>
                </View>

                <ChevronRight
                size={17}
                color="#465149"
                />
                </Pressable>
            ))}
            </View>

            {/* Recent Activity */}
            <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
            Recent activity
            </Text>

            <Pressable
            onPress={onActivity}
            hitSlop={8}
            >
            <Text style={styles.viewAll}>
            View all
            </Text>
            </Pressable>
            </View>

            <View style={styles.activityCard}>
            {activity.map((item, index) => (
                <Pressable
                key={`${item.title}-${index}`}
                style={({ pressed }) => [
                    styles.activityRow,
                    pressed && styles.cardPressed,
                    index !== activity.length - 1 &&
                    styles.activityBorder,
                ]}
                onPress={onActivity}
                >
                <View
                style={[
                    styles.activityIcon,
                    item.type === "received" &&
                    styles.receivedIcon,
                    item.type === "sent" &&
                    styles.sentIcon,
                    item.type === "swap" &&
                    styles.swapIcon,
                ]}
                >
                {item.type === "received" ? (
                    <ArrowDownLeft
                    size={17}
                    color="#7CFFA0"
                    />
                ) : item.type === "sent" ? (
                    <ArrowUpRight
                    size={17}
                    color="#D3DDD6"
                    />
                ) : (
                    <Repeat2
                    size={17}
                    color="#AEBAB2"
                    />
                )}
                </View>

                <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>
                {item.title}
                </Text>

                <Text
                style={styles.activitySubtitle}
                >
                {item.subtitle} · {item.time}
                </Text>
                </View>

                <View style={styles.activityValues}>
                <Text
                style={[
                    styles.activityAmount,
                    item.type === "received" &&
                    styles.positiveAmount,
                ]}
                >
                {item.amount}
                </Text>

                <Text style={styles.activityValue}>
                {item.value}
                </Text>
                </View>
                </Pressable>
            ))}
            </View>

            <View style={styles.bottomSpace} />
            </ScrollView>

            {/* Shared Navigation */}
            <BottomNavigation
            activeTab="home"
            onHome={() => {}}
            onMarkets={onMarkets}
            onSwap={onSwap}
            onActivity={onActivity}
            onProfile={onProfile}
            />
            </View>
            </SafeAreaView>
    );
}

function QuickAction({
    icon,
    label,
    onPress,
}: {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
}) {
    return (
        <Pressable
        style={({ pressed }) => [
            styles.quickAction,
            pressed && styles.quickActionPressed,
        ]}
        onPress={onPress}
        >
        <View style={styles.quickActionIcon}>
        {icon}
        </View>

        <Text style={styles.quickActionLabel}>
        {label}
        </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#070B08",
    },

    screen: {
        flex: 1,
        backgroundColor: "#070B08",
    },

    content: {
        paddingHorizontal: 28,
        paddingTop: 32,
        paddingBottom: 110,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 22,
    },

    greeting: {
        color: "#66736B",
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 3,
    },

    username: {
        color: "#F0F5F1",
        fontSize: 20,
        fontWeight: "800",
        letterSpacing: -0.4,
    },

    headerActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#101611",
        borderWidth: 1,
        borderColor: "#1B271F",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    notificationDot: {
        position: "absolute",
        top: 9,
        right: 9,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#7CFFA0",
    },

    profileAvatar: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#7CFFA0",
        alignItems: "center",
        justifyContent: "center",
    },

    profileAvatarText: {
        color: "#07100A",
        fontSize: 16,
        fontWeight: "900",
    },

    pressed: {
        opacity: 0.7,
    },

    portfolioCard: {
        borderRadius: 24,
        backgroundColor: "#0D1510",
        borderWidth: 1,
        borderColor: "#1C2A20",
        padding: 20,
        marginBottom: 28,
        overflow: "hidden",
    },

    portfolioTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    portfolioLabel: {
        color: "#748078",
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 7,
    },

    balanceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
    },

    balance: {
        color: "#F3F7F4",
        fontSize: 30,
        fontWeight: "800",
        letterSpacing: -1,
    },

    balanceBadge: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: "#14241A",
        borderWidth: 1,
        borderColor: "#203629",
        alignItems: "center",
        justifyContent: "center",
    },

    changeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        gap: 9,
    },

    changeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: "#14271A",
    },

    changeText: {
        color: "#7CFFA0",
        fontSize: 11,
        fontWeight: "800",
    },

    changePeriod: {
        color: "#5E6A62",
        fontSize: 11,
    },

    chartContainer: {
        height: 125,
        marginTop: 22,
        position: "relative",
    },

    chartLines: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "space-between",
    },

    chartLine: {
        height: 1,
        backgroundColor: "#17231B",
        width: "100%",
    },

    chart: {
        height: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 3,
    },

    chartPoint: {
        width: 4,
        minHeight: 18,
        backgroundColor: "#7CFFA0",
        borderRadius: 4,
        opacity: 0.82,
        justifyContent: "flex-start",
    },

    chartDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#B7FFC8",
    },

    periodRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#17231B",
    },

    periodButton: {
        minWidth: 42,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: "center",
    },

    periodButtonSelected: {
        backgroundColor: "#17301F",
    },

    periodText: {
        color: "#637067",
        fontSize: 10,
        fontWeight: "700",
    },

    periodTextSelected: {
        color: "#7CFFA0",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    sectionTitle: {
        color: "#EEF3EF",
        fontSize: 16,
        fontWeight: "800",
    },

    viewAll: {
        color: "#7CFFA0",
        fontSize: 11,
        fontWeight: "700",
    },

    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 28,
    },

    quickAction: {
        width: "23%",
        alignItems: "center",
    },

    quickActionPressed: {
        opacity: 0.65,
        transform: [{ scale: 0.96 }],
    },

    quickActionIcon: {
        width: 52,
        height: 52,
        borderRadius: 17,
        backgroundColor: "#101B14",
        borderWidth: 1,
        borderColor: "#1D3023",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 7,
    },

    quickActionLabel: {
        color: "#8C9890",
        fontSize: 10,
        fontWeight: "600",
    },

    assetList: {
        gap: 9,
        marginBottom: 28,
    },

    assetCard: {
        minHeight: 74,
        borderRadius: 17,
        backgroundColor: "#0D1510",
        borderWidth: 1,
        borderColor: "#19261E",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },

    cardPressed: {
        opacity: 0.7,
    },

    assetIcon: {
        width: 43,
        height: 43,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    assetIconText: {
        fontSize: 21,
        fontWeight: "800",
    },

    assetInfo: {
        flex: 1,
        marginLeft: 11,
    },

    assetSymbol: {
        color: "#E6ECE8",
        fontSize: 13,
        fontWeight: "800",
    },

    assetName: {
        color: "#69766E",
        fontSize: 10,
        marginTop: 3,
    },

    assetValues: {
        alignItems: "flex-end",
        marginRight: 9,
    },

    assetValue: {
        color: "#E7ECE9",
        fontSize: 13,
        fontWeight: "700",
    },

    assetBottomRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        gap: 7,
    },

    assetAmount: {
        color: "#59655E",
        fontSize: 9,
    },

    assetChange: {
        color: "#7CFFA0",
        fontSize: 9,
        fontWeight: "700",
    },

    negativeChange: {
        color: "#D88989",
    },

    activityCard: {
        backgroundColor: "#0D1510",
        borderWidth: 1,
        borderColor: "#19261E",
        borderRadius: 18,
        overflow: "hidden",
    },

    activityRow: {
        minHeight: 76,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },

    activityBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#19261E",
    },

    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },

    receivedIcon: {
        backgroundColor: "#14271A",
    },

    sentIcon: {
        backgroundColor: "#171C19",
    },

    swapIcon: {
        backgroundColor: "#181B1A",
    },

    activityInfo: {
        flex: 1,
        marginLeft: 11,
    },

    activityTitle: {
        color: "#DCE3DE",
        fontSize: 12,
        fontWeight: "700",
    },

    activitySubtitle: {
        color: "#66736B",
        fontSize: 9,
        marginTop: 4,
    },

    activityValues: {
        alignItems: "flex-end",
    },

    activityAmount: {
        color: "#CDD6D0",
        fontSize: 10,
        fontWeight: "700",
    },

    positiveAmount: {
        color: "#7CFFA0",
    },

    activityValue: {
        color: "#5C6860",
        fontSize: 9,
        marginTop: 4,
    },

    bottomSpace: {
        height: 10,
    },
});
