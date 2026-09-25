import React, { useMemo, useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
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
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    ChevronRight,
    Search,
    Star,
    TrendingUp,
} from "lucide-react-native";

interface MarketsScreenProps {
    currency?: "USD" | "EUR";
    onBack?: () => void;
    onAssetPress?: (symbol: string) => void;
    onProfile?: () => void;
    onHome?: () => void;
    onActivity?: () => void;
    onSwap?: () => void;
}

type Asset = {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    marketCap: string;
    volume: string;
    icon: string;
    iconBackground: string;
};

const assets: Asset[] = [
    {
        symbol: "BTC",
        name: "Bitcoin",
        price: 108742.38,
        change24h: 3.72,
        marketCap: "$2.16T",
        volume: "$48.7B",
        icon: "₿",
        iconBackground: "#F7931A",
    },
{
    symbol: "ETH",
    name: "Ethereum",
    price: 3984.62,
    change24h: 2.84,
    marketCap: "$480.1B",
    volume: "$26.4B",
    icon: "Ξ",
    iconBackground: "#627EEA",
},
{
    symbol: "SOL",
    name: "Solana",
    price: 221.47,
    change24h: 5.31,
    marketCap: "$106.8B",
    volume: "$7.9B",
    icon: "S",
    iconBackground: "#9945FF",
},
{
    symbol: "USDT",
    name: "Tether",
    price: 1,
    change24h: 0.02,
    marketCap: "$142.3B",
    volume: "$62.1B",
    icon: "₮",
    iconBackground: "#26A17B",
},
{
    symbol: "BNB",
    name: "BNB",
    price: 681.24,
    change24h: 1.92,
    marketCap: "$99.4B",
    volume: "$1.8B",
    icon: "B",
    iconBackground: "#F3BA2F",
},
{
    symbol: "XRP",
    name: "XRP",
    price: 2.41,
    change24h: -1.26,
    marketCap: "$141.7B",
    volume: "$4.3B",
    icon: "X",
    iconBackground: "#23292F",
},
{
    symbol: "ADA",
    name: "Cardano",
    price: 0.84,
    change24h: -0.73,
    marketCap: "$29.6B",
    volume: "$724.8M",
    icon: "A",
    iconBackground: "#3468D4",
},
{
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.184,
    change24h: 2.18,
    marketCap: "$27.1B",
    volume: "$1.2B",
    icon: "Ð",
    iconBackground: "#C2A633",
},
];

const formatPrice = (price: number, currency: "USD" | "EUR") => {
    const converted = currency === "EUR" ? price * 0.86 : price;

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: converted < 1 ? 3 : 2,
        maximumFractionDigits: converted < 1 ? 3 : 2,
    }).format(converted);
};

export default function MarketsScreen({
    currency = "USD",
    onAssetPress,
    onProfile,
    onHome,
    onActivity,
    onSwap,
}: MarketsScreenProps) {
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<"All" | "Favorites">("All");

    const filteredAssets = useMemo(() => {
        const query = search.trim().toLowerCase();

        return assets.filter((asset) => {
            const matchesSearch =
            !query ||
            asset.name.toLowerCase().includes(query) ||
            asset.symbol.toLowerCase().includes(query);

            const matchesFavorites =
            activeTab === "All" || favorites.includes(asset.symbol);

            return matchesSearch && matchesFavorites;
        });
    }, [search, activeTab, favorites]);

    const toggleFavorite = (symbol: string) => {
        setFavorites((current) =>
        current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol]
        );
    };

    const trending = [...assets]
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 3);

    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        >
        {/* Header */}
        <View style={styles.header}>
        <View>
        <Text style={styles.eyebrow}>MARKET</Text>
        <Text style={styles.title}>Markets</Text>
        </View>

        <Pressable style={styles.chartButton}>
        <BarChart3
        size={20}
        color="#7CFFA0"
        strokeWidth={2}
        />
        </Pressable>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
        <Search
        size={19}
        color="#7B847E"
        strokeWidth={2}
        />

        <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search cryptocurrencies"
        placeholderTextColor="#626A65"
        style={styles.searchInput}
        autoCapitalize="none"
        autoCorrect={false}
        />
        </View>

        {/* Trending */}
        <View style={styles.sectionHeader}>
        <View>
        <Text style={styles.sectionTitle}>Trending</Text>
        <Text style={styles.sectionSubtitle}>
        Assets gaining momentum
        </Text>
        </View>

        <TrendingUp
        size={19}
        color="#7CFFA0"
        strokeWidth={2}
        />
        </View>

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trendingRow}
        >
        {trending.map((asset) => {
            const positive = asset.change24h >= 0;
            const isFavorite = favorites.includes(asset.symbol);

            return (
                <Pressable
                key={asset.symbol}
                style={styles.trendingCard}
                onPress={() => onAssetPress?.(asset.symbol)}
                >
                <View style={styles.trendingTop}>
                <View
                style={[
                    styles.coinIcon,
                    {
                        backgroundColor:
                        asset.iconBackground,
                    },
                ]}
                >
                <Text style={styles.coinIconText}>
                {asset.icon}
                </Text>
                </View>

                <Pressable
                hitSlop={8}
                onPress={(event) => {
                    event.stopPropagation();
                    toggleFavorite(asset.symbol);
                }}
                >
                <Star
                size={17}
                color={
                    isFavorite
                    ? "#7CFFA0"
                    : "#626A65"
                }
                fill={
                    isFavorite
                    ? "#7CFFA0"
                    : "transparent"
                }
                />
                </Pressable>
                </View>

                <Text style={styles.trendingSymbol}>
                {asset.symbol}
                </Text>

                <Text style={styles.trendingName}>
                {asset.name}
                </Text>

                <Text style={styles.trendingPrice}>
                {formatPrice(asset.price, currency)}
                </Text>

                <View style={styles.changeRow}>
                {positive ? (
                    <ArrowUpRight
                    size={14}
                    color="#7CFFA0"
                    />
                ) : (
                    <ArrowDownRight
                    size={14}
                    color="#FF7272"
                    />
                )}

                <Text
                style={[
                    styles.changeText,
                    positive
                    ? styles.positiveText
                    : styles.negativeText,
                ]}
                >
                {positive ? "+" : ""}
                {asset.change24h.toFixed(2)}%
                </Text>
                </View>
                </Pressable>
            );
        })}
        </ScrollView>

        {/* All Assets */}
        <View style={styles.sectionHeader}>
        <View>
        <Text style={styles.sectionTitle}>
        All assets
        </Text>

        <Text style={styles.sectionSubtitle}>
        Explore the crypto market
        </Text>
        </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
        {(["All", "Favorites"] as const).map((tab) => {
            const active = activeTab === tab;

            return (
                <Pressable
                key={tab}
                style={[
                    styles.tab,
                    active && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
                >
                <Text
                style={[
                    styles.tabText,
                    active && styles.activeTabText,
                ]}
                >
                {tab}
                </Text>

                {tab === "Favorites" &&
                    favorites.length > 0 && (
                        <View style={styles.favoriteCount}>
                        <Text
                        style={styles.favoriteCountText}
                        >
                        {favorites.length}
                        </Text>
                        </View>
                    )}
                    </Pressable>
            );
        })}
        </View>

        {/* Asset List */}
        <View style={styles.assetList}>
        {filteredAssets.map((asset) => {
            const positive = asset.change24h >= 0;
            const isFavorite = favorites.includes(
                asset.symbol
            );

            return (
                <Pressable
                key={asset.symbol}
                style={({ pressed }) => [
                    styles.assetRow,
                    pressed && styles.assetRowPressed,
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
                <Text style={styles.assetIconText}>
                {asset.icon}
                </Text>
                </View>

                <View style={styles.assetMain}>
                <View style={styles.assetNameRow}>
                <Text style={styles.assetSymbol}>
                {asset.symbol}
                </Text>

                <Text style={styles.assetName}>
                {asset.name}
                </Text>
                </View>

                <Text style={styles.assetMeta}>
                MCap {asset.marketCap} · Vol{" "}
                {asset.volume}
                </Text>
                </View>

                <View style={styles.assetRight}>
                <Text style={styles.assetPrice}>
                {formatPrice(
                    asset.price,
                    currency
                )}
                </Text>

                <Text
                style={[
                    styles.assetChange,
                    positive
                    ? styles.positiveText
                    : styles.negativeText,
                ]}
                >
                {positive ? "+" : ""}
                {asset.change24h.toFixed(2)}%
                </Text>
                </View>

                <Pressable
                hitSlop={10}
                style={styles.starButton}
                onPress={(event) => {
                    event.stopPropagation();
                    toggleFavorite(asset.symbol);
                }}
                >
                <Star
                size={17}
                color={
                    isFavorite
                    ? "#7CFFA0"
                    : "#555D58"
                }
                fill={
                    isFavorite
                    ? "#7CFFA0"
                    : "transparent"
                }
                />
                </Pressable>

                <ChevronRight
                size={17}
                color="#4D554F"
                strokeWidth={2}
                />
                </Pressable>
            );
        })}

        {filteredAssets.length === 0 && (
            <View style={styles.emptyState}>
            <Search
            size={24}
            color="#59615B"
            />

            <Text style={styles.emptyTitle}>
            No assets found
            </Text>

            <Text style={styles.emptySubtitle}>
            Try searching for another
            cryptocurrency.
            </Text>
            </View>
        )}
        </View>
        </ScrollView>

        {/* Shared App Navigation */}
        <BottomNavigation
        activeTab="markets"
        onHome={onHome}
        onMarkets={() => {}}
        onSwap={onSwap}
        onActivity={onActivity}
        onProfile={onProfile}
        />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#070B08",
    },

    container: {
        flex: 1,
        backgroundColor: "#070B08",
        paddingHorizontal: 28,
        paddingTop: 32,
    },

    scrollContent: {
        paddingBottom: 118,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 22,
    },

    eyebrow: {
        color: "#69736C",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.8,
        marginBottom: 5,
    },

    title: {
        color: "#F2F7F3",
        fontSize: 30,
        fontWeight: "700",
        letterSpacing: -0.8,
    },

    chartButton: {
        width: 44,
        height: 44,
        borderRadius: 15,
        backgroundColor: "#101812",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#1C2920",
    },

    searchBox: {
        height: 52,
        borderRadius: 17,
        backgroundColor: "#101611",
        borderWidth: 1,
        borderColor: "#1C2820",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 30,
    },

    searchInput: {
        flex: 1,
        marginLeft: 11,
        color: "#F1F5F2",
        fontSize: 14,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },

    sectionTitle: {
        color: "#EEF5EF",
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: -0.3,
    },

    sectionSubtitle: {
        color: "#69736C",
        fontSize: 12,
        marginTop: 4,
    },

    trendingRow: {
        gap: 12,
        paddingBottom: 30,
    },

    trendingCard: {
        width: 166,
        minHeight: 182,
        borderRadius: 20,
        backgroundColor: "#0E1510",
        borderWidth: 1,
        borderColor: "#1A271E",
        padding: 15,
    },

    trendingTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    coinIcon: {
        width: 35,
        height: 35,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    coinIconText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "800",
    },

    trendingSymbol: {
        color: "#EDF4EF",
        fontSize: 15,
        fontWeight: "700",
    },

    trendingName: {
        color: "#69736C",
        fontSize: 11,
        marginTop: 2,
        marginBottom: 12,
    },

    trendingPrice: {
        color: "#F1F5F2",
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 6,
    },

    changeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },

    changeText: {
        fontSize: 12,
        fontWeight: "700",
    },

    positiveText: {
        color: "#7CFFA0",
    },

    negativeText: {
        color: "#FF7272",
    },

    tabs: {
        flexDirection: "row",
        backgroundColor: "#0C120E",
        borderRadius: 14,
        padding: 4,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#172119",
    },

    tab: {
        flex: 1,
        minHeight: 38,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 6,
    },

    activeTab: {
        backgroundColor: "#16241A",
    },

    tabText: {
        color: "#68716B",
        fontSize: 13,
        fontWeight: "600",
    },

    activeTabText: {
        color: "#7CFFA0",
    },

    favoriteCount: {
        minWidth: 18,
        height: 18,
        paddingHorizontal: 5,
        borderRadius: 9,
        backgroundColor: "#213426",
        alignItems: "center",
        justifyContent: "center",
    },

    favoriteCountText: {
        color: "#7CFFA0",
        fontSize: 9,
        fontWeight: "800",
    },

    assetList: {
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#172119",
        backgroundColor: "#0B110D",
    },

    assetRow: {
        minHeight: 82,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#162018",
    },

    assetRowPressed: {
        backgroundColor: "#111A14",
    },

    assetIcon: {
        width: 40,
        height: 40,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    assetIconText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "800",
    },

    assetMain: {
        flex: 1,
        minWidth: 0,
    },

    assetNameRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    assetSymbol: {
        color: "#EDF4EF",
        fontSize: 14,
        fontWeight: "700",
    },

    assetName: {
        color: "#626B65",
        fontSize: 11,
        marginLeft: 7,
        flexShrink: 1,
    },

    assetMeta: {
        color: "#4F5952",
        fontSize: 9.5,
        marginTop: 5,
    },

    assetRight: {
        alignItems: "flex-end",
        marginLeft: 7,
    },

    assetPrice: {
        color: "#EAF0EC",
        fontSize: 12.5,
        fontWeight: "700",
    },

    assetChange: {
        fontSize: 10.5,
        fontWeight: "600",
        marginTop: 5,
    },

    starButton: {
        marginLeft: 10,
        marginRight: 7,
    },

    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 50,
    },

    emptyTitle: {
        color: "#DCE5DF",
        fontSize: 15,
        fontWeight: "700",
        marginTop: 12,
    },

    emptySubtitle: {
        color: "#606962",
        fontSize: 12,
        marginTop: 5,
        textAlign: "center",
    },
});
