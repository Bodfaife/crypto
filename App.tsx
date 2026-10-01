import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";

import { supabase } from "./src/lib/supabase";

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

const PREFERENCES_KEY = "@kreep_app_preferences";

const DEFAULT_PREFERENCES: Preferences = {
  currency: "USD",
  notificationsEnabled: true,
  biometricEnabled: false,
  hideBalance: false,
  darkMode: true,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");

  const [session, setSession] =
  useState<Session | null>(null);

  const [authLoading, setAuthLoading] =
  useState(true);

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

  const [signupEmail, setSignupEmail] =
  useState("");

  /*
   * LOAD LOCAL PREFERENCES
   */
  useEffect(() => {
    const loadLocalPreferences = async () => {
      try {
        const saved =
        await AsyncStorage.getItem(
          PREFERENCES_KEY
        );

        if (saved) {
          const parsed = JSON.parse(saved);

          setPreferences({
            ...DEFAULT_PREFERENCES,
            ...parsed,
          });
        }
      } catch (error) {
        console.error(
          "Failed to load local preferences:",
          error
        );
      } finally {
        setPreferencesLoaded(true);
      }
    };

    loadLocalPreferences();
  }, []);

  /*
   * SAVE LOCAL PREFERENCES
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
          "Failed to save local preferences:",
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
   * LOAD USER PROFILE + SETTINGS
   */
  const loadUserData = async (
    userId: string
  ) => {
    try {
      const [
        profileResult,
        settingsResult,
      ] = await Promise.all([
        supabase
        .from("profiles")
        .select(
          "username, email, currency"
        )
        .eq("id", userId)
        .maybeSingle(),

                            supabase
                            .from("user_settings")
                            .select(
                              `
                              notifications_enabled,
                              biometric_enabled,
                              hide_balance,
                              dark_mode
                              `
                            )
                            .eq("user_id", userId)
                            .maybeSingle(),
      ]);

      if (profileResult.error) {
        console.error(
          "Failed to load profile:",
          profileResult.error
        );
      }

      if (settingsResult.error) {
        console.error(
          "Failed to load settings:",
          settingsResult.error
        );
      }

      const profile =
      profileResult.data;

      const settings =
      settingsResult.data;

      /*
       * Load profile information.
       */
      if (profile) {
        setSignupUsername(
          profile.username ?? ""
        );

        setSignupEmail(
          profile.email ?? ""
        );
      }

      /*
       * Load preferences.
       */
      setPreferences(
        (previous) => ({
          ...previous,

          ...(profile?.currency
          ? {
            currency:
            profile.currency === "EUR"
            ? "EUR"
            : "USD",
          }
          : {}),

          ...(settings
          ? {
            notificationsEnabled:
            settings.notifications_enabled,

            biometricEnabled:
            settings.biometric_enabled,

            hideBalance:
            settings.hide_balance,

            darkMode:
            settings.dark_mode,
          }
          : {}),
        })
      );
    } catch (error) {
      console.error(
        "Failed to load user data:",
        error
      );
    }
  };

  /*
   * RESTORE SUPABASE SESSION
   */
  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        const {
          data,
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "Failed to restore session:",
            error
          );
        }

        if (!mounted) {
          return;
        }

        setSession(data.session);

        if (data.session) {
          await loadUserData(
            data.session.user.id
          );
        }
      } catch (error) {
        console.error(
          "Session restore error:",
          error
        );
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    restoreSession();

    /*
     * Listen for authentication changes.
     */
    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!mounted) {
          return;
        }

        setSession(newSession);

        if (newSession) {
          await loadUserData(
            newSession.user.id
          );
        } else {
          setSignupUsername("");
          setSignupEmail("");
        }
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  /*
   * UPDATE SUPABASE SETTINGS
   */
  const updateUserSettings = async (
    updatedPreferences: Preferences
  ) => {
    if (!session?.user?.id) {
      return;
    }

    try {
      const {
        error,
      } = await supabase
      .from("user_settings")
      .upsert(
        {
          user_id:
          session.user.id,

          notifications_enabled:
          updatedPreferences.notificationsEnabled,

          biometric_enabled:
          updatedPreferences.biometricEnabled,

          hide_balance:
          updatedPreferences.hideBalance,

          dark_mode:
          updatedPreferences.darkMode,

          updated_at:
          new Date().toISOString(),
        },
        {
          onConflict:
          "user_id",
        }
      );

      if (error) {
        console.error(
          "Failed to update settings:",
          error
        );
      }
    } catch (error) {
      console.error(
        "Settings update error:",
        error
      );
    }
  };

  /*
   * UPDATE CURRENCY IN SUPABASE
   */
  const updateUserCurrency = async (
    currency: Currency
  ) => {
    if (!session?.user?.id) {
      return;
    }

    try {
      const {
        error,
      } = await supabase
      .from("profiles")
      .update({
        currency,
        updated_at:
        new Date().toISOString(),
      })
      .eq(
        "id",
        session.user.id
      );

      if (error) {
        console.error(
          "Failed to update currency:",
          error
        );
      }
    } catch (error) {
      console.error(
        "Currency update error:",
        error
      );
    }
  };

  /*
   * CHANGE PREFERENCES
   */
  const changePreferences = (
    updater: (
      previous: Preferences
    ) => Preferences
  ) => {
    setPreferences(
      (previous) => {
        const next =
        updater(previous);

        updateUserSettings(next);

        if (
          next.currency !==
          previous.currency
        ) {
          updateUserCurrency(
            next.currency
          );
        }

        return next;
      }
    );
  };

  /*
   * WAIT FOR LOCAL STORAGE + AUTH
   */
  if (
    !preferencesLoaded ||
    authLoading
  ) {
    return (
      <SafeAreaView
      style={
        styles.loadingContainer
      }
      >
      <View
      style={
        styles.loadingContent
      }
      >
      <Text
      style={styles.logo}
      >
      Kreep
      </Text>

      <ActivityIndicator
      size="small"
      color="#7CFFA0"
      style={{
        marginTop: 18,
      }}
      />
      </View>
      </SafeAreaView>
    );
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

      onSignUp={async (
        username,
        email,
        password
      ) => {
        try {
          const {
            data,
            error,
          } =
          await supabase.auth.signUp(
            {
              email,
              password,
              options: {
                data: {
                  username,
                },
              },
            }
          );

          if (error) {
            Alert.alert(
              "Sign Up Failed",
              error.message
            );
            return;
          }

          if (!data.user) {
            Alert.alert(
              "Sign Up Failed",
              "We couldn't create your account."
            );
            return;
          }

          setSignupUsername(
            username
          );

          setSignupEmail(
            email
          );

          /*
           * Email confirmation enabled.
           */
          if (!data.session) {
            Alert.alert(
              "Check your email",
              "Your account was created. Please verify your email, then sign in.",
              [
                {
                  text: "OK",
                  onPress: () =>
                  setScreen(
                    "signin"
                  ),
                },
              ]
            );

            return;
          }

          /*
           * Email confirmation disabled.
           */
          setSession(
            data.session
          );

          setScreen(
            "profileSetup"
          );
        } catch (error) {
          console.error(
            "Sign up error:",
            error
          );

          Alert.alert(
            "Sign Up Failed",
            "Something went wrong while creating your account."
          );
        }
      }}
      />
    );
  }

  /*
   * PROFILE SETUP
   */
  if (
    screen === "profileSetup"
  ) {
    return (
      <ProfileSetupScreen
      username={
        signupUsername
      }

      onBack={() =>
        setScreen("signup")
      }

      onContinue={async (
        profile
      ) => {
        if (
          !session?.user?.id
        ) {
          Alert.alert(
            "Session Error",
            "Your account session could not be found. Please sign in again."
          );

          setScreen("signin");
          return;
        }

        try {
          const currency: Currency =
          profile.currency ===
          "Euro"
          ? "EUR"
          : "USD";

          /*
           * Save profile.
           */
          const {
            error:
            profileError,
          } = await supabase
          .from("profiles")
          .upsert(
            {
              id:
              session.user.id,

              username:
              signupUsername,

              email:
              signupEmail ||
              session.user
              .email ||
              null,

              currency,

              updated_at:
              new Date().toISOString(),
            },
            {
              onConflict:
              "id",
            }
          );

          if (profileError) {
            console.error(
              "Profile save error:",
              profileError
            );

            Alert.alert(
              "Profile Error",
              profileError.message
            );

            return;
          }

          /*
           * Create default settings.
           */
          const {
            error:
            settingsError,
          } = await supabase
          .from(
            "user_settings"
          )
          .upsert(
            {
              user_id:
              session.user.id,

              notifications_enabled:
              true,

              biometric_enabled:
              false,

              hide_balance:
              false,

              dark_mode:
              true,

              updated_at:
              new Date().toISOString(),
            },
            {
              onConflict:
              "user_id",
            }
          );

          if (settingsError) {
            console.error(
              "Settings save error:",
              settingsError
            );

            Alert.alert(
              "Settings Error",
              settingsError.message
            );

            return;
          }

          /*
           * Update local state.
           */
          setPreferences(
            (previous) => ({
              ...previous,
              currency,
            })
          );

          setScreen("home");
        } catch (error) {
          console.error(
            "Profile setup error:",
            error
          );

          Alert.alert(
            "Error",
            "We couldn't save your profile."
          );
        }
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
      username={
        signupUsername
      }

      currency={
        preferences.currency
      }

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
        setSwapReturnScreen(
          "home"
        );

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
      currency={
        preferences.currency
      }

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
        setSwapReturnScreen(
          "markets"
        );

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
      currency={
        preferences.currency
      }

      onBack={() =>
        setScreen("markets")
      }

      onBuy={() =>
        console.log(
          "Buy pressed"
        )
      }

      onSell={() =>
        console.log(
          "Sell pressed"
        )
      }

      onSwap={() => {
        setSwapReturnScreen(
          "asset"
        );

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
        setScreen(
          swapReturnScreen
        )
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

      onOpenTransaction={(
        id
      ) => {
        setSelectedTransaction(
          id
        );

        setScreen(
          "transaction"
        );
      }}
      />
    );
  }

  /*
   * TRANSACTION DETAILS
   */
  if (
    screen === "transaction"
  ) {
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
      username={
        signupUsername
      }

      email={
        signupEmail
      }

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
        try {
          const {
            error,
          } =
          await supabase.auth.signOut();

          if (error) {
            Alert.alert(
              "Sign Out Failed",
              error.message
            );

            return;
          }

          setSignupUsername("");
          setSignupEmail("");
          setSession(null);

          setPreferences(
            DEFAULT_PREFERENCES
          );

          setScreen(
            "welcome"
          );
        } catch (error) {
          console.error(
            "Sign out error:",
            error
          );

          Alert.alert(
            "Sign Out Failed",
            "Something went wrong while signing out."
          );
        }
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

      onCurrencyChange={(
        value
      ) => {
        changePreferences(
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
        changePreferences(
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

      onBiometricChange={(
        value
      ) => {
        changePreferences(
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

      onHideBalanceChange={(
        value
      ) => {
        changePreferences(
          (previous) => ({
            ...previous,
            hideBalance:
            value,
          })
        );
      }}

      darkMode={
        preferences.darkMode
      }

      onDarkModeChange={(
        value
      ) => {
        changePreferences(
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

      onSignIn={async (
        identifier,
        password
      ) => {
        try {
          const {
            data,
            error,
          } =
          await supabase.auth.signInWithPassword(
            {
              email:
              identifier.trim(),
                                                 password,
            }
          );

          if (error) {
            Alert.alert(
              "Sign In Failed",
              error.message
            );

            return;
          }

          if (!data.session) {
            Alert.alert(
              "Sign In Failed",
              "No active session was created."
            );

            return;
          }

          setSession(
            data.session
          );

          await loadUserData(
            data.session.user.id
          );

          setScreen("home");
        } catch (error) {
          console.error(
            "Sign in error:",
            error
          );

          Alert.alert(
            "Sign In Failed",
            "Something went wrong while signing in."
          );
        }
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#08110A",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingContent: {
    alignItems: "center",
  },

  logo: {
    color: "#7CFFA0",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -1,
  },
});
