import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileSetupScreen from "./src/screens/ProfileSetupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MarketsScreen from "./src/screens/MarketsScreen";
import AssetDetailsScreen from "./src/screens/AssetDetailsScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import TransactionDetailsScreen from "./src/screens/TransactionDetailsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import SwapScreen from "./src/screens/SwapScreen";

type Screen =
| "welcome"
| "signup"
| "signin"
| "profileSetup"
| "home"
| "markets"
| "asset"
| "activity"
| "transaction"
| "profile"
| "settings"
| "swap";

type Currency = "USD" | "EUR";

type SwapReturnScreen =
| "home"
| "markets"
| "asset";

type Preferences = {
  currency: Currency;
  notificationsEnabled: boolean;
  biometricEnabled: boolean;
  hideBalance: boolean;
  darkMode: boolean;
};

const PREFERENCES_KEY =
"@crypto_app_preferences";

const DEFAULT_PREFERENCES: Preferences = {
  currency: "USD",
  notificationsEnabled: true,
  biometricEnabled: false,
  hideBalance: false,
  darkMode: true,
};

export default function App() {
  const [screen, setScreen] =
  useState<Screen>("welcome");

  const [preferences, setPreferences] =
  useState<Preferences>(
    DEFAULT_PREFERENCES
  );

  const [preferencesLoaded, setPreferencesLoaded] =
  useState(false);

  const [swapReturnScreen, setSwapReturnScreen] =
  useState<SwapReturnScreen>("home");

  const [selectedAsset, setSelectedAsset] =
  useState<
  "BTC" | "ETH" | "SOL" | "USDT"
  >("BTC");

  const [selectedTransaction, setSelectedTransaction] =
  useState("TXN001");

  const [signupUsername, setSignupUsername] =
  useState("");

  /*
   * LOAD SAVED PREFERENCES
   */
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const saved =
        await AsyncStorage.getItem(
          PREFERENCES_KEY
        );

        if (saved) {
          const parsed =
          JSON.parse(saved);

          setPreferences({
            ...DEFAULT_PREFERENCES,
            ...parsed,
          });
        }
      } catch (error) {
        console.error(
          "Failed to load preferences:",
          error
        );
      } finally {
        setPreferencesLoaded(true);
      }
    };

    loadPreferences();
  }, []);

  /*
   * SAVE PREFERENCES
   */
  useEffect(() => {
    if (!preferencesLoaded) {
      return;
    }

    const savePreferences = async () => {
      try {
        await AsyncStorage.setItem(
          PREFERENCES_KEY,
          JSON.stringify(preferences)
        );
      } catch (error) {
        console.error(
          "Failed to save preferences:",
          error
        );
      }
    };

    savePreferences();
  }, [
    preferences,
    preferencesLoaded,
  ]);

  /*
   * Don't render the app until saved
   * preferences have been loaded.
   */
  if (!preferencesLoaded) {
    return null;
  }

  /*
   * SIGN UP
   */
  if (screen === "signup") {
    return (
      <SignUpScreen
      onBack={() =>
        setScreen("welcome")
      }
      onSignIn={() =>
        setScreen("signin")
      }
      onSignUp={(
        username,
        email,
        password
      ) => {
        console.log(
          "Account created:",
          {
            username,
            email,
            password,
          }
        );

        setSignupUsername(username);
        setScreen("profileSetup");
      }}
      />
    );
  }

  /*
   * PROFILE SETUP
   */
  if (screen === "profileSetup") {
    return (
      <ProfileSetupScreen
      username={signupUsername}
      onBack={() =>
        setScreen("signup")
      }
      onContinue={(profile) => {
        console.log(
          "Profile completed:",
          profile
        );

        setPreferences(
          (previous) => ({
            ...previous,
            currency:
            profile.currency ===
            "Euro"
            ? "EUR"
            : "USD",
          })
        );

        setScreen("home");
      }}
      />
    );
  }

  /*
   * HOME
   */
  if (screen === "home") {
    return (
      <HomeScreen
      username={signupUsername}
      currency={preferences.currency}
      onMarkets={() =>
        setScreen("markets")
      }
      onProfile={() =>
        setScreen("profile")
      }
      onAssetPress={(symbol) => {
        setSelectedAsset(
          symbol as
          | "BTC"
          | "ETH"
          | "SOL"
          | "USDT"
        );

        setScreen("asset");
      }}
      onActivity={() =>
        setScreen("activity")
      }
      onSwap={() => {
        setSwapReturnScreen("home");
        setScreen("swap");
      }}
      />
    );
  }

  /*
   * MARKETS
   */
  if (screen === "markets") {
    return (
      <MarketsScreen
      currency={preferences.currency}
      onHome={() =>
        setScreen("home")
      }
      onAssetPress={(symbol) => {
        setSelectedAsset(
          symbol as
          | "BTC"
          | "ETH"
          | "SOL"
          | "USDT"
        );

        setScreen("asset");
      }}
      onActivity={() =>
        setScreen("activity")
      }
      onProfile={() =>
        setScreen("profile")
      }
      onSwap={() => {
        setSwapReturnScreen("markets");
        setScreen("swap");
      }}
      />
    );
  }

  /*
   * ASSET DETAILS
   */
  if (screen === "asset") {
    return (
      <AssetDetailsScreen
      symbol={selectedAsset}
      currency={preferences.currency}
      onBack={() =>
        setScreen("markets")
      }
      onBuy={() =>
        console.log("Buy pressed")
      }
      onSell={() =>
        console.log("Sell pressed")
      }
      onSwap={() => {
        setSwapReturnScreen("asset");
        setScreen("swap");
      }}
      />
    );
  }

  /*
   * SWAP
   */
  if (screen === "swap") {
    return (
      <SwapScreen
      onBack={() =>
        setScreen(swapReturnScreen)
      }
      onSwapComplete={(
        fromAsset,
        toAsset,
        fromAmount
      ) => {
        console.log(
          "Swap reviewed:",
          {
            fromAsset,
            toAsset,
            fromAmount,
          }
        );
      }}
      />
    );
  }

  /*
   * ACTIVITY
   */
  if (screen === "activity") {
    return (
      <ActivityScreen
      onBack={() =>
        setScreen("home")
      }
      onOpenTransaction={(id) => {
        setSelectedTransaction(id);
        setScreen("transaction");
      }}
      />
    );
  }

  /*
   * TRANSACTION DETAILS
   */
  if (screen === "transaction") {
    return (
      <TransactionDetailsScreen
      transactionId={
        selectedTransaction
      }
      onBack={() =>
        setScreen("activity")
      }
      />
    );
  }

  /*
   * PROFILE
   */
  if (screen === "profile") {
    return (
      <ProfileScreen
      username={signupUsername}
      onBack={() =>
        setScreen("home")
      }
      onEditProfile={() =>
        console.log(
          "Edit profile pressed"
        )
      }
      onSettings={() =>
        setScreen("settings")
      }
      onNotifications={() =>
        console.log(
          "Notifications pressed"
        )
      }
      onSecurity={() =>
        console.log(
          "Security pressed"
        )
      }
      onPaymentMethods={() =>
        console.log(
          "Payment methods pressed"
        )
      }
      onHelp={() =>
        console.log(
          "Help & Support pressed"
        )
      }
      onSignOut={async () => {
        setSignupUsername("");
        setPreferences(
          DEFAULT_PREFERENCES
        );

        await AsyncStorage.removeItem(
          PREFERENCES_KEY
        );

        setScreen("welcome");
      }}
      />
    );
  }

  /*
   * SETTINGS
   */
  if (screen === "settings") {
    return (
      <SettingsScreen
      onBack={() =>
        setScreen("profile")
      }

      currency={
        preferences.currency
      }

      onCurrencyChange={(value) => {
        setPreferences(
          (previous) => ({
            ...previous,
            currency: value,
          })
        );
      }}

      notificationsEnabled={
        preferences.notificationsEnabled
      }

      onNotificationsChange={(
        value
      ) => {
        setPreferences(
          (previous) => ({
            ...previous,
            notificationsEnabled:
            value,
          })
        );
      }}

      biometricEnabled={
        preferences.biometricEnabled
      }

      onBiometricChange={(value) => {
        setPreferences(
          (previous) => ({
            ...previous,
            biometricEnabled:
            value,
          })
        );
      }}

      hideBalance={
        preferences.hideBalance
      }

      onHideBalanceChange={(value) => {
        setPreferences(
          (previous) => ({
            ...previous,
            hideBalance: value,
          })
        );
      }}

      darkMode={
        preferences.darkMode
      }

      onDarkModeChange={(value) => {
        setPreferences(
          (previous) => ({
            ...previous,
            darkMode: value,
          })
        );
      }}

      onNotifications={() =>
        console.log(
          "Notifications pressed"
        )
      }

      onSecurity={() =>
        console.log(
          "Security pressed"
        )
      }

      onHelp={() =>
        console.log(
          "Help & Support pressed"
        )
      }

      onPrivacy={() =>
        console.log(
          "Privacy & permissions pressed"
        )
      }
      />
    );
  }

  /*
   * SIGN IN
   */
  if (screen === "signin") {
    return (
      <SignInScreen
      onBack={() =>
        setScreen("welcome")
      }
      onCreateAccount={() =>
        setScreen("signup")
      }
      onSignIn={(
        identifier,
        password
      ) => {
        console.log("Sign in:", {
          identifier,
          password,
        });

        setScreen("home");
      }}
      onForgotPassword={() =>
        console.log(
          "Forgot password pressed"
        )
      }
      />
    );
  }

  /*
   * WELCOME
   */
  return (
    <WelcomeScreen
    onCreateAccount={() =>
      setScreen("signup")
    }
    onSignIn={() =>
      setScreen("signin")
    }
    />
  );
}
