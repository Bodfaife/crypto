import React, { useState } from "react";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileSetupScreen from "./src/screens/ProfileSetupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MarketsScreen from "./src/screens/MarketsScreen";
import AssetDetailsScreen from "./src/screens/AssetDetailsScreen";

type Screen = "welcome" | "signup" | "signin" | "profileSetup" | "home" | "markets" | "asset";

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedAsset, setSelectedAsset] =
  useState<"BTC" | "ETH" | "SOL" | "USDT">("BTC");

  const [signupUsername, setSignupUsername] = useState("");

  if (screen === "signup") {
    return (
      <SignUpScreen
      onBack={() => setScreen("welcome")}
      onSignIn={() => setScreen("signin")}
      onSignUp={(username, email, password) => {
        console.log("Account created:", {
          username,
          email,
          password,
        });

        setSignupUsername(username);
        setScreen("profileSetup");
      }}
      />
    );
  }

  if (screen === "profileSetup") {
    return (
      <ProfileSetupScreen
      username={signupUsername}
      onBack={() => setScreen("signup")}
      onContinue={(profile) => {
        console.log("Profile completed:", profile);
        setScreen("home");
      }}
      />
    );
  }

  if (screen === "home") {
    return (
      <HomeScreen
      username={signupUsername}
      currency="USD"
      onMarkets={() => setScreen("markets")}
      onProfile={() => setScreen("profile")}
      onAssetPress={(symbol) => {
        setSelectedAsset(
          symbol as "BTC" | "ETH" | "SOL" | "USDT"
        );
        setScreen("asset");
      }}
      onActivity={() => setScreen("activity")}
      onSwap={() => {
        console.log("Swap pressed");
      }}
      />
    );
  }

  if (screen === "navbar") {
    return (
  <BottomNavigation
  activeTab="markets"
  onHome={onHome}
  onMarkets={() => {}}
  onSwap={onSwap}
  onActivity={onActivity}
  onProfile={onProfile}
  />
    );
  }

  if (screen === "markets") {
    return (
      <MarketsScreen
      currency="USD"
      onHome={() => setScreen("home")}
      onAssetPress={(symbol) => {
        setSelectedAsset(
          symbol as "BTC" | "ETH" | "SOL" | "USDT"
        );
        setScreen("asset");
      }}
      onActivity={() => console.log("Activity")}
      onProfile={() => console.log("Profile")}
      onSwap={() => console.log("Swap")}
      />
    );
  }

  if (screen === "asset") {
    return (
      <AssetDetailsScreen
      symbol={selectedAsset}
      currency="USD"
      onBack={() => setScreen("markets")}
      onBuy={() => console.log("Buy")}
      onSell={() => console.log("Sell")}
      onSwap={() => console.log("Swap")}
      />
    );
  }

  if (screen === "signin") {
    return (
      <SignInScreen
      onBack={() => setScreen("welcome")}
      onCreateAccount={() => setScreen("signup")}
      onSignIn={(identifier, password) => {
        console.log("Sign in:", {
          identifier,
          password,
        });
      }}
      onForgotPassword={() => {
        console.log("Forgot password pressed");
      }}
      />
    );
  }

  return (
    <WelcomeScreen
    onCreateAccount={() => setScreen("signup")}
    onSignIn={() => setScreen("signin")}
    />
  );
}
