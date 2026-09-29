import React, { useMemo, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    ArrowDownUp,
    ArrowLeft,
    ChevronDown,
    Info,
    Settings2,
} from "lucide-react-native";

type AssetSymbol = "BTC" | "ETH" | "SOL" | "USDT";

interface SwapScreenProps {
    onBack: () => void;
    onSwapComplete?: (
        fromAsset: AssetSymbol,
        toAsset: AssetSymbol,
        fromAmount: string
    ) => void;
}

const ASSETS: {
    symbol: AssetSymbol;
    name: string;
}[] = [
    { symbol: "BTC", name: "Bitcoin" },
{ symbol: "ETH", name: "Ethereum" },
{ symbol: "SOL", name: "Solana" },
{ symbol: "USDT", name: "Tether" },
];

const PRICES: Record<AssetSymbol, number> = {
    BTC: 67500,
    ETH: 2450,
    SOL: 145,
    USDT: 1,
};

const BALANCES: Record<AssetSymbol, number> = {
    BTC: 0.0842,
    ETH: 1.84,
    SOL: 12.5,
    USDT: 1250,
};

function AssetLogo({
    symbol,
}: {
    symbol: AssetSymbol;
}) {
    return (
        <View style={styles.assetLogo}>
        <Text style={styles.assetLogoText}>
        {symbol === "BTC"
            ? "₿"
            : symbol === "ETH"
            ? "Ξ"
            : symbol === "SOL"
            ? "S"
            : "₮"}
            </Text>
            </View>
    );
}

function AssetSelector({
    asset,
    onPress,
}: {
    asset: AssetSymbol;
    onPress: () => void;
}) {
    const assetData = ASSETS.find(
        (item) => item.symbol === asset
    );

    return (
        <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            styles.assetSelector,
            pressed && styles.pressed,
        ]}
        >
        <AssetLogo symbol={asset} />

        <View style={styles.assetInfo}>
        <Text style={styles.assetSymbol}>
        {asset}
        </Text>

        <Text style={styles.assetName}>
        {assetData?.name}
        </Text>
        </View>

        <ChevronDown
        size={20}
        color="#8FA59A"
        />
        </Pressable>
    );
}

export default function SwapScreen({
    onBack,
    onSwapComplete,
}: SwapScreenProps) {
    const [fromAsset, setFromAsset] =
    useState<AssetSymbol>("BTC");

    const [toAsset, setToAsset] =
    useState<AssetSymbol>("USDT");

    const [fromAmount, setFromAmount] =
    useState("");

    const [showFromAssets, setShowFromAssets] =
    useState(false);

    const [showToAssets, setShowToAssets] =
    useState(false);

    const exchangeRate = useMemo(() => {
        return PRICES[fromAsset] / PRICES[toAsset];
    }, [fromAsset, toAsset]);

    const receiveAmount = useMemo(() => {
        const amount = Number(fromAmount);

        if (!amount || amount <= 0) {
            return "0";
        }

        return (amount * exchangeRate).toFixed(
            toAsset === "USDT" ? 2 : 6
        );
    }, [fromAmount, exchangeRate, toAsset]);

    const availableBalance = BALANCES[fromAsset];

    const isValidAmount =
    Number(fromAmount) > 0 &&
    Number(fromAmount) <= availableBalance;

    const handleSwapAssets = () => {
        const previousFrom = fromAsset;

        setFromAsset(toAsset);
        setToAsset(previousFrom);
        setFromAmount("");
    };

    const handleMax = () => {
        setFromAmount(
            availableBalance.toString()
        );
    };

    const handleConfirmSwap = () => {
        if (!isValidAmount) {
            return;
        }

        onSwapComplete?.(
            fromAsset,
            toAsset,
            fromAmount
        );
    };

    const selectFromAsset = (
        asset: AssetSymbol
    ) => {
        if (asset === toAsset) {
            setToAsset(fromAsset);
        }

        setFromAsset(asset);
        setShowFromAssets(false);
        setFromAmount("");
    };

    const selectToAsset = (
        asset: AssetSymbol
    ) => {
        if (asset === fromAsset) {
            setFromAsset(toAsset);
        }

        setToAsset(asset);
        setShowToAssets(false);
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
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
        Swap
        </Text>

        <Pressable
        style={styles.settingsButton}
        >
        <Settings2
        size={20}
        color="#FFFFFF"
        />
        </Pressable>
        </View>

        {/* From */}
        <View style={styles.card}>
        <View style={styles.cardHeader}>
        <Text style={styles.cardLabel}>
        You pay
        </Text>

        <Text style={styles.balance}>
        Balance:{" "}
        {availableBalance} {fromAsset}
        </Text>
        </View>

        <View style={styles.amountRow}>
        <TextInput
        value={fromAmount}
        onChangeText={(value) => {
            const cleaned =
            value.replace(/[^0-9.]/g, "");

            setFromAmount(cleaned);
        }}
        placeholder="0"
        placeholderTextColor="#52655A"
        keyboardType="decimal-pad"
        style={styles.amountInput}
        />

        <AssetSelector
        asset={fromAsset}
        onPress={() =>
            setShowFromAssets(
                !showFromAssets
            )
        }
        />
        </View>

        <View style={styles.bottomRow}>
        <Text style={styles.usdValue}>
        $
        {fromAmount
            ? (
                Number(fromAmount) *
                PRICES[fromAsset]
            ).toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }
            )
            : "0.00"}
            </Text>

            <Pressable
            onPress={handleMax}
            style={styles.maxButton}
            >
            <Text style={styles.maxText}>
            MAX
            </Text>
            </Pressable>
            </View>
            </View>

            {/* From asset selector */}
            {showFromAssets && (
                <View style={styles.dropdown}>
                {ASSETS.map((asset) => (
                    <Pressable
                    key={asset.symbol}
                    onPress={() =>
                        selectFromAsset(
                            asset.symbol
                        )
                    }
                    style={styles.dropdownItem}
                    >
                    <AssetLogo
                    symbol={asset.symbol}
                    />

                    <View style={styles.dropdownText}>
                    <Text style={styles.dropdownSymbol}>
                    {asset.symbol}
                    </Text>

                    <Text style={styles.dropdownName}>
                    {asset.name}
                    </Text>
                    </View>

                    {asset.symbol ===
                        fromAsset && (
                            <Text style={styles.selectedMark}>
                            ✓
                            </Text>
                        )}
                        </Pressable>
                ))}
                </View>
            )}

            {/* Swap direction button */}
            <View style={styles.swapButtonContainer}>
            <Pressable
            onPress={handleSwapAssets}
            style={({ pressed }) => [
                styles.swapButton,
                pressed && styles.swapButtonPressed,
            ]}
            >
            <ArrowDownUp
            size={20}
            color="#07100A"
            />
            </Pressable>
            </View>

            {/* To */}
            <View style={styles.card}>
            <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>
            You receive
            </Text>

            <Text style={styles.balance}>
            Balance: {BALANCES[toAsset]}{" "}
            {toAsset}
            </Text>
            </View>

            <View style={styles.amountRow}>
            <Text
            style={[
                styles.amountInput,
                styles.receiveAmount,
            ]}
            >
            {receiveAmount}
            </Text>

            <AssetSelector
            asset={toAsset}
            onPress={() =>
                setShowToAssets(
                    !showToAssets
                )
            }
            />
            </View>

            <Text style={styles.usdValue}>
            $
            {Number(receiveAmount)
                ? (
                    Number(receiveAmount) *
                    PRICES[toAsset]
                ).toLocaleString(
                    "en-US",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }
                )
                : "0.00"}
                </Text>
                </View>

                {/* To asset selector */}
                {showToAssets && (
                    <View style={styles.dropdown}>
                    {ASSETS.map((asset) => (
                        <Pressable
                        key={asset.symbol}
                        onPress={() =>
                            selectToAsset(
                                asset.symbol
                            )
                        }
                        style={styles.dropdownItem}
                        >
                        <AssetLogo
                        symbol={asset.symbol}
                        />

                        <View style={styles.dropdownText}>
                        <Text style={styles.dropdownSymbol}>
                        {asset.symbol}
                        </Text>

                        <Text style={styles.dropdownName}>
                        {asset.name}
                        </Text>
                        </View>

                        {asset.symbol ===
                            toAsset && (
                                <Text style={styles.selectedMark}>
                                ✓
                                </Text>
                            )}
                            </Pressable>
                    ))}
                    </View>
                )}

                {/* Rate */}
                <View style={styles.rateCard}>
                <View style={styles.rateRow}>
                <Text style={styles.rateLabel}>
                Exchange rate
                </Text>

                <Text style={styles.rateValue}>
                1 {fromAsset} ≈{" "}
                {exchangeRate.toLocaleString(
                    "en-US",
                    {
                        maximumFractionDigits: 6,
                    }
                )}{" "}
                {toAsset}
                </Text>
                </View>

                <View style={styles.rateRow}>
                <Text style={styles.rateLabel}>
                Network fee
                </Text>

                <Text style={styles.rateValue}>
                $0.00
                </Text>
                </View>

                <View style={styles.rateRow}>
                <Text style={styles.rateLabel}>
                Slippage
                </Text>

                <Text style={styles.rateValue}>
                0.5%
                </Text>
                </View>
                </View>

                {/* Info */}
                <View style={styles.infoBox}>
                <Info
                size={17}
                color="#7CFFA0"
                />

                <Text style={styles.infoText}>
                The final amount may vary slightly
                depending on the market price when
                your swap is processed.
                </Text>
                </View>

                {/* Confirm */}
                <Pressable
                onPress={handleConfirmSwap}
                disabled={!isValidAmount}
                style={({ pressed }) => [
                    styles.confirmButton,
                    !isValidAmount &&
                    styles.confirmButtonDisabled,
                    pressed &&
                    isValidAmount &&
                    styles.confirmButtonPressed,
                ]}
                >
                <Text
                style={[
                    styles.confirmText,
                    !isValidAmount &&
                    styles.confirmTextDisabled,
                ]}
                >
                {Number(fromAmount) >
                    availableBalance
                    ? "Insufficient Balance"
                    : "Review Swap"}
                    </Text>
                    </Pressable>

                    <View style={{ height: 30 }} />
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

    card: {
        marginHorizontal: 20,
        marginTop: 12,
        padding: 18,
        borderRadius: 20,
        backgroundColor: "#102017",
        borderWidth: 1,
        borderColor: "#1E3527",
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cardLabel: {
        color: "#8FA59A",
        fontSize: 13,
        fontWeight: "600",
    },

    balance: {
        color: "#52655A",
        fontSize: 11,
    },

    amountRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
    },

    amountInput: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "700",
        padding: 0,
        marginRight: 10,
    },

    receiveAmount: {
        paddingVertical: 4,
    },

    assetSelector: {
        minWidth: 116,
        height: 48,
        borderRadius: 14,
        backgroundColor: "#163124",
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    assetLogo: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#1D4430",
        alignItems: "center",
        justifyContent: "center",
    },

    assetLogoText: {
        color: "#7CFFA0",
        fontSize: 16,
        fontWeight: "800",
    },

    assetInfo: {
        flex: 1,
        marginLeft: 8,
    },

    assetSymbol: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
    },

    assetName: {
        color: "#71877B",
        fontSize: 9,
        marginTop: 2,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    usdValue: {
        color: "#71877B",
        fontSize: 12,
    },

    maxButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: "#163124",
    },

    maxText: {
        color: "#7CFFA0",
        fontSize: 10,
        fontWeight: "800",
    },

    swapButtonContainer: {
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5,
    },

    swapButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#7CFFA0",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        borderColor: "#08110A",
    },

    swapButtonPressed: {
        transform: [{ scale: 0.94 }],
    },

    dropdown: {
        marginHorizontal: 20,
        marginTop: 8,
        borderRadius: 16,
        backgroundColor: "#102017",
        borderWidth: 1,
        borderColor: "#1E3527",
        overflow: "hidden",
        zIndex: 10,
    },

    dropdownItem: {
        minHeight: 60,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#1B3024",
    },

    dropdownText: {
        flex: 1,
        marginLeft: 10,
    },

    dropdownSymbol: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    dropdownName: {
        color: "#71877B",
        fontSize: 11,
        marginTop: 2,
    },

    selectedMark: {
        color: "#7CFFA0",
        fontSize: 18,
        fontWeight: "800",
    },

    pressed: {
        opacity: 0.75,
    },

    rateCard: {
        marginHorizontal: 20,
        marginTop: 18,
        padding: 16,
        borderRadius: 18,
        backgroundColor: "#0D1911",
        borderWidth: 1,
        borderColor: "#1B3024",
    },

    rateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },

    rateLabel: {
        color: "#71877B",
        fontSize: 12,
    },

    rateValue: {
        color: "#D7E5DC",
        fontSize: 12,
        fontWeight: "600",
    },

    infoBox: {
        marginHorizontal: 20,
        marginTop: 14,
        padding: 13,
        borderRadius: 14,
        backgroundColor: "#102017",
        flexDirection: "row",
        alignItems: "flex-start",
    },

    infoText: {
        flex: 1,
        color: "#71877B",
        fontSize: 11,
        lineHeight: 17,
        marginLeft: 9,
    },

    confirmButton: {
        marginHorizontal: 20,
        marginTop: 18,
        height: 56,
        borderRadius: 17,
        backgroundColor: "#7CFFA0",
        alignItems: "center",
        justifyContent: "center",
    },

    confirmButtonDisabled: {
        backgroundColor: "#1A2A20",
    },

    confirmButtonPressed: {
        opacity: 0.8,
    },

    confirmText: {
        color: "#07100A",
        fontSize: 15,
        fontWeight: "800",
    },

    confirmTextDisabled: {
        color: "#52655A",
    },
});
