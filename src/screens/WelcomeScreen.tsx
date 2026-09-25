import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Bitcoin, ArrowUpRight, ShieldCheck } from 'lucide-react-native';

interface WelcomeScreenProps {
  onCreateAccount?: () => void;
  onSignIn?: () => void;
}

export default function WelcomeScreen({
  onCreateAccount,
  onSignIn,
}: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoGlow} />
          <View style={styles.logo}>
            <Bitcoin size={42} color="#0A0A0A" strokeWidth={2.5} />
          </View>
        </View>

        {/* Branding */}
        <View style={styles.brandSection}>
          <Text style={styles.brand}>Crypto</Text>

          <Text style={styles.tagline}>
            Your crypto portfolio,{'\n'}
            <Text style={styles.taglineAccent}>simplified.</Text>
          </Text>

          <Text style={styles.description}>
            Track your assets, follow live prices and stay on top
            of your crypto portfolio.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <ArrowUpRight size={18} color="#7CFFA0" />
            </View>
            <Text style={styles.featureText}>Live market prices</Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <ShieldCheck size={18} color="#7CFFA0" />
            </View>
            <Text style={styles.featureText}>Simple & secure</Text>
          </View>
        </View>

        {/* Bottom actions */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onCreateAccount}
          >
            <Text style={styles.primaryButtonText}>Create account</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onSignIn}
          >
            <Text style={styles.secondaryButtonText}>Sign in</Text>
          </Pressable>

          <Text style={styles.disclaimer}>
            Crypto is a portfolio tracking app.{'\n'}
            No real funds or blockchain transactions are processed.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B08',
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
  },

  logoGlow: {
    position: 'absolute',
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: '#163B25',
    opacity: 0.45,
  },

  logo: {
    width: 82,
    height: 82,
    borderRadius: 26,
    backgroundColor: '#7CFFA0',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-6deg' }],
  },

  brandSection: {
    alignItems: 'center',
    marginTop: 8,
  },

  brand: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1.5,
  },

  tagline: {
    color: '#F2F5F3',
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 14,
    letterSpacing: -0.5,
  },

  taglineAccent: {
    color: '#7CFFA0',
  },

  description: {
    color: '#89958D',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 310,
    marginTop: 14,
  },

  features: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D1510',
    borderWidth: 1,
    borderColor: '#18241C',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: '#14251A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  featureText: {
    color: '#C8D1CB',
    fontSize: 12,
    fontWeight: '600',
  },

  actions: {
    marginTop: 20,
  },

  primaryButton: {
    height: 56,
    borderRadius: 17,
    backgroundColor: '#7CFFA0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#07100A',
    fontSize: 16,
    fontWeight: '800',
  },

  secondaryButton: {
    height: 56,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#26332A',
    backgroundColor: '#0C120E',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.985 }],
  },

  disclaimer: {
    color: '#5E6962',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 16,
  },
});
