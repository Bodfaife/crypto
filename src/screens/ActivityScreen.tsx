import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
} from "react-native";
import {
    ArrowLeft,
    ArrowDownLeft,
    ArrowUpRight,
    ArrowRightLeft,
    Wallet,
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react-native";

interface ActivityScreenProps {
    onBack: () => void;
    onOpenTransaction: (id: string) => void;
}

type Filter =
| "all"
| "buy"
| "sell"
| "swap"
| "deposit"
| "withdraw";

interface Transaction {
    id: string;
    type: Exclude<Filter, "all">;
    asset: string;
    symbol: string;
    amount: string;
    value: string;
    date: string;
    status: "completed" | "pending" | "failed";
}

const transactions: Transaction[] = [
    {
        id: "TXN001",
        type: "buy",
        asset: "Bitcoin",
        symbol: "BTC",
        amount: "+0.024 BTC",
        value: "$2,609.82",
        date: "January 18, 2026 • 2:45 PM",
        status: "completed",
    },
{
    id: "TXN002",
    type: "swap",
    asset: "Ethereum",
    symbol: "ETH",
    amount: "0.8 ETH → SOL",
    value: "$3,187.70",
    date: "March 11, 2026 • 11:18 AM",
    status: "completed",
},
{
    id: "TXN003",
    type: "deposit",
    asset: "USDT",
    symbol: "USDT",
    amount: "+500 USDT",
    value: "$500.00",
    date: "December 7, 2025 • 4:12 PM",
    status: "completed",
},
{
    id: "TXN004",
    type: "sell",
    asset: "Solana",
    symbol: "SOL",
    amount: "-12 SOL",
    value: "$2,657.64",
    date: "August 24, 2025 • 9:41 AM",
    status: "pending",
},
{
    id: "TXN005",
    type: "withdraw",
    asset: "Bitcoin",
    symbol: "BTC",
    amount: "-0.006 BTC",
    value: "$652.45",
    date: "May 16, 2025 • 6:24 PM",
    status: "failed",
},
];

export default function ActivityScreen({
    onBack,
    onOpenTransaction,
}: ActivityScreenProps) {
    const [filter, setFilter] = useState<Filter>("all");

    const filtered = useMemo(() => {
        if (filter === "all") {
            return transactions;
        }

        return transactions.filter(
            (transaction) => transaction.type === filter
        );
    }, [filter]);

    const totalIn = transactions.filter(
        (transaction) =>
        transaction.type === "buy" ||
        transaction.type === "deposit"
    ).length;

    const totalOut = transactions.filter(
        (transaction) =>
        transaction.type === "sell" ||
        transaction.type === "withdraw"
    ).length;

    const totalSwaps = transactions.filter(
        (transaction) => transaction.type === "swap"
    ).length;

    const getAssetSymbol = (symbol: string) => {
        switch (symbol) {
            case "BTC":
                return "₿";
            case "ETH":
                return "Ξ";
            case "SOL":
                return "S";
            case "USDT":
                return "₮";
            default:
                return symbol.charAt(0);
        }
    };

    const getAssetColor = (symbol: string) => {
        switch (symbol) {
            case "BTC":
                return "#F7931A";
            case "ETH":
                return "#8B93FF";
            case "SOL":
                return "#A78BFA";
            case "USDT":
                return "#26A17B";
            default:
                return "#7CFFA0";
        }
    };

    const renderIcon = (type: Transaction["type"]) => {
        switch (type) {
            case "buy":
                return (
                    <ArrowDownLeft
                    size={20}
                    color="#7CFFA0"
                    />
                );

            case "sell":
                return (
                    <ArrowUpRight
                    size={20}
                    color="#FF7A7A"
                    />
                );

            case "swap":
                return (
                    <ArrowRightLeft
                    size={20}
                    color="#5EEAD4"
                    />
                );

            case "deposit":
                return (
                    <Wallet
                    size={20}
                    color="#7CFFA0"
                    />
                );

            case "withdraw":
                return (
                    <ArrowUpRight
                    size={20}
                    color="#F59E0B"
                    />
                );
        }
    };

    const renderStatus = (
        status: Transaction["status"]
    ) => {
        switch (status) {
            case "completed":
                return (
                    <View style={styles.statusRow}>
                    <CheckCircle2
                    size={14}
                    color="#22C55E"
                    />

                    <Text
                    style={[
                        styles.status,
                        { color: "#22C55E" },
                    ]}
                    >
                    Completed
                    </Text>
                    </View>
                );

            case "pending":
                return (
                    <View style={styles.statusRow}>
                    <Clock3
                    size={14}
                    color="#F59E0B"
                    />

                    <Text
                    style={[
                        styles.status,
                        { color: "#F59E0B" },
                    ]}
                    >
                    Pending
                    </Text>
                    </View>
                );

            case "failed":
                return (
                    <View style={styles.statusRow}>
                    <XCircle
                    size={14}
                    color="#EF4444"
                    />

                    <Text
                    style={[
                        styles.status,
                        { color: "#EF4444" },
                    ]}
                    >
                    Failed
                    </Text>
                    </View>
                );
        }
    };

    const Chip = ({
        value,
        label,
    }: {
        value: Filter;
        label: string;
    }) => (
        <Pressable
        onPress={() => setFilter(value)}
        style={[
            styles.chip,
            filter === value &&
            styles.chipActive,
        ]}
        >
        <Text
        style={[
            styles.chipText,
            filter === value &&
            styles.chipTextActive,
        ]}
        >
        {label}
        </Text>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        >
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
        Activity
        </Text>

        <View
        style={styles.headerSpacer}
        />
        </View>

        <View style={styles.summary}>
        <View style={styles.summaryCard}>
        <ArrowDownLeft
        size={20}
        color="#7CFFA0"
        />

        <Text style={styles.summaryNumber}>
        {totalIn}
        </Text>

        <Text style={styles.summaryLabel}>
        Money In
        </Text>
        </View>

        <View style={styles.summaryCard}>
        <ArrowUpRight
        size={20}
        color="#FF7A7A"
        />

        <Text style={styles.summaryNumber}>
        {totalOut}
        </Text>

        <Text style={styles.summaryLabel}>
        Money Out
        </Text>
        </View>

        <View style={styles.summaryCard}>
        <ArrowRightLeft
        size={20}
        color="#5EEAD4"
        />

        <Text style={styles.summaryNumber}>
        {totalSwaps}
        </Text>

        <Text style={styles.summaryLabel}>
        Swaps
        </Text>
        </View>
        </View>

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
            styles.filterRow
        }
        >
        <Chip value="all" label="All" />
        <Chip value="buy" label="Buy" />
        <Chip value="sell" label="Sell" />
        <Chip value="swap" label="Swap" />
        <Chip
        value="deposit"
        label="Deposit"
        />
        <Chip
        value="withdraw"
        label="Withdraw"
        />
        </ScrollView>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>
        Recent Transactions
        </Text>

        {filtered.length === 0 ? (
            <View style={styles.emptyState}>
            <View
            style={styles.emptyIcon}
            >
            <Wallet
            size={24}
            color="#7CFFA0"
            />
            </View>

            <Text
            style={
                styles.emptyTitle
            }
            >
            No transactions
            </Text>

            <Text
            style={
                styles.emptyText
            }
            >
            There are no transactions
            in this category yet.
            </Text>
            </View>
        ) : (
            filtered.map((item) => (
                <Pressable
                key={item.id}
                style={({
                    pressed,
                }) => [
                    styles.card,
                    pressed &&
                    styles.cardPressed,
                ]}
                onPress={() =>
                    onOpenTransaction(
                        item.id
                    )
                }
                >
                <View
                style={styles.left}
                >
                <View
                style={
                    styles.iconCircle
                }
                >
                {renderIcon(
                    item.type
                )}
                </View>

                <View
                style={
                    styles.transactionInfo
                }
                >
                <View
                style={
                    styles.assetRow
                }
                >
                <Text
                style={
                    styles.asset
                }
                numberOfLines={
                    1
                }
                >
                {item.asset}
                </Text>

                <View
                style={
                    styles.symbolPill
                }
                >
                <Text
                style={[
                    styles.assetSymbolIcon,
                    {
                        color: getAssetColor(
                            item.symbol
                        ),
                    },
                ]}
                >
                {getAssetSymbol(
                    item.symbol
                )}
                </Text>

                <Text
                style={
                    styles.symbol
                }
                >
                {
                    item.symbol
                }
                </Text>
                </View>
                </View>

                <Text
                style={
                    styles.date
                }
                >
                {item.date}
                </Text>

                {renderStatus(
                    item.status
                )}
                </View>
                </View>

                <View
                style={styles.right}
                >
                <Text
                style={
                    styles.amount
                }
                >
                {item.amount}
                </Text>

                <Text
                style={
                    styles.value
                }
                >
                {item.value}
                </Text>
                </View>
                </Pressable>
            ))
        )}
        </View>

        <View style={{ height: 100 }} />
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#08110A",
    },

    scrollContent: {
        paddingBottom: 30,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: 18,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#102017",
        alignItems: "center",
        justifyContent: "center",
    },

    headerTitle: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "700",
    },

    headerSpacer: {
        width: 40,
    },

    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 22,
    },

    summaryCard: {
        width: "31%",
        backgroundColor: "#102017",
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#1E3527",
    },

    summaryNumber: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
        marginTop: 8,
    },

    summaryLabel: {
        color: "#8FA59A",
        fontSize: 12,
        marginTop: 4,
    },

    filterRow: {
        paddingHorizontal: 20,
        paddingBottom: 18,
    },

    chip: {
        backgroundColor: "#102017",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 999,
        marginRight: 10,
    },

    chipActive: {
        backgroundColor: "#10B981",
    },

    chipText: {
        color: "#9DB2A8",
        fontWeight: "600",
    },

    chipTextActive: {
        color: "#04110A",
    },

    section: {
        paddingHorizontal: 20,
    },

    sectionTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 14,
    },

    card: {
        backgroundColor: "#102017",
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#1E3527",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cardPressed: {
        opacity: 0.72,
        transform: [{ scale: 0.99 }],
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        minWidth: 0,
    },

    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#163124",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },

    transactionInfo: {
        flex: 1,
        minWidth: 0,
    },

    assetRow: {
        flexDirection: "row",
        alignItems: "center",
        minWidth: 0,
    },

    asset: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
        marginRight: 8,
        flexShrink: 1,
    },

    symbolPill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#183427",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
    },

    assetSymbolIcon: {
        fontSize: 11,
        fontWeight: "800",
    },

    symbol: {
        color: "#D1FAE5",
        fontSize: 11,
        fontWeight: "700",
        marginLeft: 4,
    },

    date: {
        color: "#8FA59A",
        marginTop: 4,
        fontSize: 13,
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    status: {
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 4,
    },

    right: {
        alignItems: "flex-end",
        marginLeft: 12,
        flexShrink: 0,
    },

    amount: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 14,
    },

    value: {
        color: "#8FA59A",
        fontSize: 12,
        marginTop: 4,
    },

    emptyState: {
        backgroundColor: "#102017",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#1E3527",
        paddingHorizontal: 24,
        paddingVertical: 36,
        alignItems: "center",
    },

    emptyIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#163124",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    emptyTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    emptyText: {
        color: "#8FA59A",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 19,
        marginTop: 6,
        maxWidth: 260,
    },
});
