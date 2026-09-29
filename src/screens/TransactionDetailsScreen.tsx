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
    ArrowDownLeft,
    ArrowLeft,
    ArrowRightLeft,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    Copy,
    ExternalLink,
    Wallet,
    XCircle,
} from "lucide-react-native";

interface TransactionDetailsScreenProps {
    transactionId: string;
    onBack: () => void;
}

type TransactionType = "buy" | "sell" | "swap" | "deposit" | "withdraw";
type TransactionStatus = "completed" | "pending" | "failed";

interface Transaction {
    id: string;
    type: TransactionType;
    status: TransactionStatus;
    asset: string;
    symbol: string;
    amount: string;
    value: string;
    date: string;
    time: string;
    fee: string;
    paymentMethod: string;
    network: string;
    address: string;
}

const transactionData: Record<string, Transaction> = {
    TXN001: {
        id: "TXN001",
        type: "buy",
        status: "completed",
        asset: "Bitcoin",
        symbol: "BTC",
        amount: "0.024 BTC",
        value: "₦4,320,000",
        date: "September 29, 2026",
        time: "2:45 PM",
        fee: "₦8,500",
        paymentMethod: "Wallet Balance",
        network: "Bitcoin",
        address: "bc1q8...7x9p",
    },

    TXN002: {
        id: "TXN002",
        type: "swap",
        status: "completed",
        asset: "Ethereum",
        symbol: "ETH",
        amount: "0.8 ETH → SOL",
        value: "₦1,180,000",
        date: "September 29, 2026",
        time: "11:18 AM",
        fee: "₦3,200",
        paymentMethod: "Crypto Balance",
        network: "Ethereum",
        address: "0x82...4f91",
    },

    TXN003: {
        id: "TXN003",
        type: "deposit",
        status: "completed",
        asset: "Tether",
        symbol: "USDT",
        amount: "500 USDT",
        value: "₦810,500",
        date: "September 28, 2026",
        time: "4:12 PM",
        fee: "₦0",
        paymentMethod: "External Wallet",
        network: "Tron",
        address: "TX9f...82ka",
    },

    TXN004: {
        id: "TXN004",
        type: "sell",
        status: "pending",
        asset: "Solana",
        symbol: "SOL",
        amount: "12 SOL",
        value: "₦965,000",
        date: "September 22, 2026",
        time: "9:41 AM",
        fee: "₦2,100",
        paymentMethod: "Wallet Balance",
        network: "Solana",
        address: "8Xk...p92",
    },

    TXN005: {
        id: "TXN005",
        type: "withdraw",
        status: "failed",
        asset: "Bitcoin",
        symbol: "BTC",
        amount: "0.006 BTC",
        value: "₦1,052,000",
        date: "September 20, 2026",
        time: "6:24 PM",
        fee: "₦4,700",
        paymentMethod: "External Wallet",
        network: "Bitcoin",
        address: "bc1q2...91kd",
    },
};

export default function TransactionDetailsScreen({
    transactionId,
    onBack,
}: TransactionDetailsScreenProps) {
    const transaction =
    transactionData[transactionId] || transactionData.TXN001;

    const getTypeLabel = () => {
        switch (transaction.type) {
            case "buy":
                return "Buy";
            case "sell":
                return "Sell";
            case "swap":
                return "Swap";
            case "deposit":
                return "Deposit";
            case "withdraw":
                return "Withdrawal";
        }
    };

    const getTypeIcon = () => {
        switch (transaction.type) {
            case "buy":
            case "deposit":
                return <ArrowDownLeft size={24} color="#7CFFA0" />;

            case "sell":
            case "withdraw":
                return <ArrowUpRight size={24} color="#FF7A7A" />;

            case "swap":
                return <ArrowRightLeft size={24} color="#5EEAD4" />;
        }
    };

    const getStatusContent = () => {
        switch (transaction.status) {
            case "completed":
                return {
                    icon: <CheckCircle2 size={18} color="#22C55E" />,
                    text: "Completed",
                    color: "#22C55E",
                    background: "#102C1D",
                };

            case "pending":
                return {
                    icon: <Clock3 size={18} color="#F59E0B" />,
                    text: "Pending",
                    color: "#F59E0B",
                    background: "#302713",
                };

            case "failed":
                return {
                    icon: <XCircle size={18} color="#EF4444" />,
                    text: "Failed",
                    color: "#EF4444",
                    background: "#301719",
                };
        }
    };

    const status = getStatusContent();

    const copyTransactionId = () => {
        Alert.alert("Transaction ID", "Transaction ID copied.");
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        >
        {/* Header */}
        <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
        <ArrowLeft size={22} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.headerTitle}>Transaction Details</Text>

        <View style={styles.headerSpacer} />
        </View>

        {/* Main transaction card */}
        <View style={styles.heroCard}>
        <View style={styles.typeIcon}>{getTypeIcon()}</View>

        <Text style={styles.typeLabel}>{getTypeLabel()}</Text>

        <Text style={styles.amount}>{transaction.amount}</Text>

        <Text style={styles.fiatValue}>{transaction.value}</Text>

        {/* Status */}
        <View
        style={[
            styles.statusBadge,
            { backgroundColor: status.background },
        ]}
        >
        {status.icon}

        <Text
        style={[
            styles.statusText,
            { color: status.color },
        ]}
        >
        {status.text}
        </Text>
        </View>
        </View>

        {/* Asset */}
        <View style={styles.assetCard}>
        <View style={styles.assetIcon}>
        <Text style={styles.assetIconText}>
        {transaction.symbol === "BTC"
            ? "₿"
            : transaction.symbol === "ETH"
            ? "Ξ"
            : transaction.symbol === "SOL"
            ? "S"
            : "₮"}
            </Text>
            </View>

            <View style={styles.assetInfo}>
            <Text style={styles.assetName}>{transaction.asset}</Text>
            <Text style={styles.assetSymbol}>
            {transaction.symbol}
            </Text>
            </View>

            <Text style={styles.assetAmount}>
            {transaction.amount}
            </Text>
            </View>

            {/* Details */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transaction Information</Text>

            <View style={styles.detailsCard}>
            <DetailRow
            label="Date"
            value={transaction.date}
            />

            <DetailRow
            label="Time"
            value={transaction.time}
            />

            <DetailRow
            label="Network"
            value={transaction.network}
            />

            <DetailRow
            label="Payment method"
            value={transaction.paymentMethod}
            />

            <DetailRow
            label="Network fee"
            value={transaction.fee}
            />

            <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>

            <Pressable
            style={styles.transactionIdRow}
            onPress={copyTransactionId}
            >
            <Text style={styles.transactionId}>
            {transaction.id}
            </Text>

            <Copy size={15} color="#7CFFA0" />
            </Pressable>
            </View>
            </View>
            </View>

            {/* Address */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Wallet Address</Text>

            <View style={styles.addressCard}>
            <View style={styles.addressTextContainer}>
            <Wallet size={18} color="#7CFFA0" />

            <Text style={styles.address}>
            {transaction.address}
            </Text>
            </View>

            <Pressable onPress={copyTransactionId}>
            <Copy size={17} color="#7CFFA0" />
            </Pressable>
            </View>
            </View>

            {/* Explorer */}
            {transaction.status !== "failed" && (
                <Pressable
                style={styles.explorerButton}
                onPress={() =>
                    Alert.alert(
                        "Blockchain Explorer",
                        "Explorer integration will be connected when the live transaction API is added."
                    )
                }
                >
                <ExternalLink size={18} color="#08110A" />

                <Text style={styles.explorerText}>
                View on Blockchain Explorer
                </Text>
                </Pressable>
            )}

            <View style={{ height: 40 }} />
            </ScrollView>
            </SafeAreaView>
    );
}

function DetailRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>

        <Text style={styles.detailValue}>{value}</Text>
        </View>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: 20,
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
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },

    headerSpacer: {
        width: 40,
    },

    heroCard: {
        marginHorizontal: 20,
        backgroundColor: "#102017",
        borderRadius: 24,
        paddingVertical: 28,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#1E3527",
    },

    typeIcon: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "#163124",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    typeLabel: {
        color: "#8FA59A",
        fontSize: 14,
        fontWeight: "600",
    },

    amount: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "800",
        marginTop: 8,
    },

    fiatValue: {
        color: "#8FA59A",
        fontSize: 15,
        marginTop: 5,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 13,
        paddingVertical: 7,
        borderRadius: 999,
        marginTop: 18,
    },

    statusText: {
        fontSize: 13,
        fontWeight: "700",
        marginLeft: 6,
    },

    assetCard: {
        marginHorizontal: 20,
        marginTop: 16,
        backgroundColor: "#102017",
        borderRadius: 18,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#1E3527",
    },

    assetIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#163124",
        alignItems: "center",
        justifyContent: "center",
    },

    assetIconText: {
        color: "#7CFFA0",
        fontSize: 23,
        fontWeight: "800",
    },

    assetInfo: {
        flex: 1,
        marginLeft: 13,
    },

    assetName: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    assetSymbol: {
        color: "#8FA59A",
        fontSize: 13,
        marginTop: 3,
    },

    assetAmount: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    section: {
        marginHorizontal: 20,
        marginTop: 24,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 12,
    },

    detailsCard: {
        backgroundColor: "#102017",
        borderRadius: 18,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#1E3527",
    },

    detailRow: {
        minHeight: 52,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#1B3024",
    },

    detailLabel: {
        color: "#8FA59A",
        fontSize: 13,
    },

    detailValue: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
        maxWidth: "58%",
        textAlign: "right",
    },

    transactionIdRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    transactionId: {
        color: "#7CFFA0",
        fontSize: 13,
        fontWeight: "600",
    },

    addressCard: {
        backgroundColor: "#102017",
        borderRadius: 18,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#1E3527",
    },

    addressTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    address: {
        color: "#D5E4DC",
        fontSize: 13,
        marginLeft: 10,
    },

    explorerButton: {
        marginHorizontal: 20,
        marginTop: 24,
        height: 52,
        borderRadius: 16,
        backgroundColor: "#7CFFA0",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    explorerText: {
        color: "#08110A",
        fontSize: 14,
        fontWeight: "800",
        marginLeft: 8,
    },
});
