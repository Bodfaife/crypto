import React, { useMemo, useState } from "react";
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
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Repeat2,
  Wallet,
  ChevronRight,
} from "lucide-react-native";

interface AssetDetailsScreenProps {
  symbol: "BTC" | "ETH" | "SOL" | "USDT";
  currency?: "USD" | "EUR";
  onBack?: () => void;
  onBuy?: () => void;
  onSell?: () => void;
  onSwap?: () => void;
}

const assetData = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    iconColor: "#F7931A",
    price: 108742.38,
    change: 3.72,
    holdings: 0.03842,
    holdingsValue: 4178.27,
    marketCap: "$2.16T",
    volume: "$48.7B",
    supply: "19.93M BTC",
  },
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    iconColor: "#8EA2FF",
    price: 3984.62,
    change: 2.84,
    holdings: 1.284,
    holdingsValue: 5116.65,
    marketCap: "$480.1B",
    volume: "$26.4B",
    supply: "120.7M ETH",
  },
  SOL: {
    name: "Solana",
    symbol: "SOL",
    icon: "S",
    iconColor: "#7CFFA0",
    price: 221.47,
    change: 5.31,
    holdings: 8.42,
    holdingsValue: 1864.79,
    marketCap: "$106.8B",
    volume: "$7.9B",
    supply: "482M SOL",
  },
  USDT: {
    name: "Tether",
    symbol: "USDT",
    icon: "₮",
    iconColor: "#50AF95",
    price: 1.0,
    change: 0.02,
    holdings: 2380.5,
    holdingsValue: 2380.5,
    marketCap: "$142.3B",
    volume: "$62.1B",
    supply: "142.3B USDT",
  },
};

const chartData = {
  "1H": [42, 45, 44, 47, 46, 49, 48, 51, 50, 52],
  "24H": [40, 43, 46, 44, 49, 52, 55, 58, 56, 61],
  "7D": [28, 34, 31, 39, 42, 48, 45, 54, 57, 64],
  "1M": [22, 27, 35, 41, 46, 52, 59, 63, 68, 74],
  "1Y": [12, 18, 26, 38, 49, 58, 66, 74, 82, 92],
};

const transactions = [
  {
    type: "Buy",
    amount: "+0.012 BTC",
    value: "$1,305.14",
    date: "Today",
  },
  {
    type: "Swap",
    amount: "+0.008 BTC",
    value: "$869.94",
    date: "Yesterday",
  },
  {
    type: "Receive",
    amount: "+0.018 BTC",
    value: "$1,956.33",
    date: "Sep 22",
  },
];

export default function AssetDetailsScreen({
  symbol,
  currency = "USD",
  onBack,
  onBuy,
  onSell,
  onSwap,
}: AssetDetailsScreenProps) {
  const [period, setPeriod] =
    useState<keyof typeof chartData>("24H");

  const asset = assetData[symbol];

  const currencySymbol = currency === "EUR" ? "€" : "$";

  const price = useMemo(() => {
    const value =
      currency === "EUR"
        ? asset.price * 0.86
        : asset.price;

    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [asset.price, currency]);

  const holdingValue = useMemo(() => {
    const value =
      currency === "EUR"
        ? asset.holdingsValue * 0.86
        : asset.holdingsValue;

    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [asset.holdingsValue, currency]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={onBack}
          >
            <ArrowLeft size={20} color="#F2F5F3" />
          </Pressable>

          <Pressable style={styles.headerButton}>
            <Bell size={19} color="#F2F5F3" />
          </Pressable>
        </View>

        {/* Coin */}
        <View style={styles.coinSection}>
          <View style={styles.coinIcon}>
            <Text
              style={[
                styles.coinIconText,
                { color: asset.iconColor },
              ]}
            >
              {asset.icon}
            </Text>
          </View>

          <Text style={styles.coinName}>{asset.name}</Text>
          <Text style={styles.coinSymbol}>{asset.symbol}</Text>

          <Text style={styles.price}>
            {currencySymbol}
            {price}
          </Text>

          <View style={styles.changeBadge}>
            <ArrowUpRight size={14} color="#7CFFA0" />
            <Text style={styles.changeText}>
              +{asset.change.toFixed(2)}%
            </Text>
            <Text style={styles.changePeriod}>
              last 24 hours
            </Text>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chart}>
            {chartData[period].map((value, index) => (
              <View
                key={index}
                style={[
                  styles.bar,
                  { height: value * 1.3 },
                ]}
              />
            ))}
          </View>

          <View style={styles.periodRow}>
            {(
              ["1H", "24H", "7D", "1M", "1Y"] as const
            ).map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.periodButton,
                  period === item &&
                    styles.periodButtonActive,
                ]}
                onPress={() => setPeriod(item)}
              >
                <Text
                  style={[
                    styles.periodText,
                    period === item &&
                      styles.periodTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionRow}>
          <ActionButton
            icon={<Wallet size={18} color="#07100A" />}
            label="Buy"
            onPress={onBuy}
          />

          <ActionButton
            icon={
              <ArrowDownRight
                size={18}
                color="#07100A"
              />
            }
            label="Sell"
            onPress={onSell}
          />

          <ActionButton
            icon={<Repeat2 size={18} color="#07100A" />}
            label="Swap"
            onPress={onSwap}
          />
        </View>

        {/* Holdings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Your holdings
          </Text>

          <View style={styles.holdingCard}>
            <View>
              <Text style={styles.label}>Balance</Text>
              <Text style={styles.balanceAmount}>
                {asset.holdings} {asset.symbol}
              </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.label}>Value</Text>
              <Text style={styles.balanceValue}>
                {currencySymbol}
                {holdingValue}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Market statistics
          </Text>

          <View style={styles.statsGrid}>
            <StatCard
              title="Market Cap"
              value={asset.marketCap}
            />
            <StatCard
              title="24h Volume"
              value={asset.volume}
            />
            <StatCard
              title="Supply"
              value={asset.supply}
            />
            <StatCard title="Rank" value="#1" />
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Recent activity
            </Text>

            <Text style={styles.viewAll}>View all</Text>
          </View>

          {transactions.map((tx, index) => (
            <Pressable
              key={index}
              style={styles.transaction}
            >
              <View style={styles.transactionIcon}>
                {tx.type === "Buy" ? (
                  <Wallet
                    size={17}
                    color="#7CFFA0"
                  />
                ) : tx.type === "Sell" ? (
                  <ArrowDownRight
                    size={17}
                    color="#FF7070"
                  />
                ) : (
                  <Repeat2
                    size={17}
                    color="#7CFFA0"
                  />
                )}
              </View>

              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>
                  {tx.type}
                </Text>
                <Text style={styles.transactionDate}>
                  {tx.date}
                </Text>
              </View>

              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>
                  {tx.amount}
                </Text>
                <Text style={styles.transactionValue}>
                  {tx.value}
                </Text>
              </View>

              <ChevronRight
                size={16}
                color="#4D5650"
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionButton({
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
      style={styles.actionButton}
      onPress={onPress}
    >
      <View style={styles.actionIcon}>{icon}</View>
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
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
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#101711",
    borderWidth: 1,
    borderColor: "#1C2920",
    alignItems: "center",
    justifyContent: "center",
  },

  coinSection: {
    alignItems: "center",
    marginBottom: 28,
  },

  coinIcon: {
    width: 74,
    height: 74,
    borderRadius: 22,
    backgroundColor: "#111A14",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  coinIconText: {
    fontSize: 34,
    fontWeight: "800",
  },

  coinName: {
    color: "#F2F5F3",
    fontSize: 28,
    fontWeight: "800",
  },

  coinSymbol: {
    color: "#67726B",
    fontSize: 13,
    marginTop: 4,
  },

  price: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
    marginTop: 18,
    letterSpacing: -1,
  },

  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#122118",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 30,
  },

  changeText: {
    color: "#7CFFA0",
    fontWeight: "700",
    marginLeft: 4,
  },

  changePeriod: {
    color: "#647068",
    fontSize: 11,
    marginLeft: 8,
  },

  chartCard: {
    backgroundColor: "#0E1510",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#1A271E",
    padding: 18,
    marginBottom: 24,
  },

  chart: {
    height: 170,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  bar: {
    width: 10,
    borderRadius: 10,
    backgroundColor: "#7CFFA0",
  },

  periodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  periodButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },

  periodButtonActive: {
    backgroundColor: "#17301F",
  },

  periodText: {
    color: "#67726B",
    fontSize: 11,
    fontWeight: "700",
  },

  periodTextActive: {
    color: "#7CFFA0",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  actionButton: {
    width: "31%",
    alignItems: "center",
  },

  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#7CFFA0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  actionText: {
    color: "#DCE4DE",
    fontSize: 12,
    fontWeight: "700",
  },

  section: {
    marginBottom: 28,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#F2F5F3",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },

  holdingCard: {
    backgroundColor: "#0E1510",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1A271E",
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: "#66726A",
    fontSize: 11,
    marginBottom: 6,
  },

  balanceAmount: {
    color: "#F2F5F3",
    fontSize: 18,
    fontWeight: "700",
  },

  balanceValue: {
    color: "#7CFFA0",
    fontSize: 18,
    fontWeight: "700",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#0E1510",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1A271E",
    padding: 16,
  },

  statTitle: {
    color: "#66726A",
    fontSize: 11,
    marginBottom: 8,
  },

  statValue: {
    color: "#F2F5F3",
    fontSize: 15,
    fontWeight: "700",
  },

  viewAll: {
    color: "#7CFFA0",
    fontSize: 12,
    fontWeight: "700",
  },

  transaction: {
    backgroundColor: "#0E1510",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1A271E",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  transactionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#15211A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  transactionInfo: {
    flex: 1,
  },

  transactionTitle: {
    color: "#F2F5F3",
    fontSize: 14,
    fontWeight: "700",
  },

  transactionDate: {
    color: "#67726B",
    fontSize: 11,
    marginTop: 4,
  },

  transactionRight: {
    alignItems: "flex-end",
    marginRight: 8,
  },

  transactionAmount: {
    color: "#F2F5F3",
    fontSize: 12,
    fontWeight: "700",
  },

  transactionValue: {
    color: "#7CFFA0",
    fontSize: 11,
    marginTop: 4,
  },
});
