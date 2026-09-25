import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  BarChart3,
  Repeat2,
  Clock3,
  TrendingUp,
  UserRound,
} from "lucide-react-native";

export type NavigationTab =
  | "home"
  | "markets"
  | "swap"
  | "activity"
  | "profile";

interface BottomNavigationProps {
  activeTab: NavigationTab;
  onHome?: () => void;
  onMarkets?: () => void;
  onSwap?: () => void;
  onActivity?: () => void;
  onProfile?: () => void;
}

export default function BottomNavigation({
  activeTab,
  onHome,
  onMarkets,
  onSwap,
  onActivity,
  onProfile,
}: BottomNavigationProps) {
  const activeColor = "#7CFFA0";
  const inactiveColor = "#68716B";

  return (
    <View style={styles.bottomNav}>
      <Pressable
        style={styles.navItem}
        onPress={onHome}
        accessibilityRole="button"
        accessibilityLabel="Home"
      >
        <BarChart3
          size={21}
          color={activeTab === "home" ? activeColor : inactiveColor}
          strokeWidth={2}
        />

        <Text
          style={[
            styles.navText,
            activeTab === "home" && styles.activeNavText,
          ]}
        >
          Home
        </Text>
      </Pressable>

      <Pressable
        style={styles.navItem}
        onPress={onMarkets}
        accessibilityRole="button"
        accessibilityLabel="Markets"
      >
      <TrendingUp
      size={21}
      color={activeTab === "markets" ? activeColor : inactiveColor}
      strokeWidth={2}
      />

        <Text
          style={[
            styles.navText,
            activeTab === "markets" && styles.activeNavText,
          ]}
        >
          Markets
        </Text>
      </Pressable>

      <Pressable
        style={styles.swapButton}
        onPress={onSwap}
        accessibilityRole="button"
        accessibilityLabel="Swap"
      >
      <Repeat2
      size={23}
      color="#071009"
      strokeWidth={2.4}
      />
      </Pressable>

      <Pressable
        style={styles.navItem}
        onPress={onActivity}
        accessibilityRole="button"
        accessibilityLabel="Activity"
      >
        <Clock3
          size={21}
          color={activeTab === "activity" ? activeColor : inactiveColor}
          strokeWidth={2}
        />

        <Text
          style={[
            styles.navText,
            activeTab === "activity" && styles.activeNavText,
          ]}
        >
          Activity
        </Text>
      </Pressable>

      <Pressable
        style={styles.navItem}
        onPress={onProfile}
        accessibilityRole="button"
        accessibilityLabel="Profile"
      >
        <UserRound
          size={21}
          color={activeTab === "profile" ? activeColor : inactiveColor}
          strokeWidth={2}
        />

        <Text
          style={[
            styles.navText,
            activeTab === "profile" && styles.activeNavText,
          ]}
        >
          Profile
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 15,
    height: 70,
    borderRadius: 23,
    backgroundColor: "#101711",
    borderWidth: 1,
    borderColor: "#1D2A21",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 7,
  },

  navItem: {
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  navText: {
    color: "#68716B",
    fontSize: 9.5,
    fontWeight: "600",
  },

  activeNavText: {
    color: "#7CFFA0",
  },

  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: "#7CFFA0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    borderWidth: 4,
    borderColor: "#070B08",
  },
});
