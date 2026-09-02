import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { Colors, FontSizes, Spacing } from '../constants/AppTheme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleReset = () => {
    setError('');
    setSuccess(false);

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!isValidEmail(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Forgot your password?</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send you a link to reset your password.
        </Text>

        <View style={{ marginTop: Spacing.xl }}>
          <AppInput
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              if (error) setError('');
              if (success) setSuccess(false);
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {success ? (
          <Text style={styles.successText}>
            If an account exists for that email, a reset link has been sent.
          </Text>
        ) : null}

        <AppButton
          title="Send Reset Link"
          onPress={handleReset}
          loading={loading}
          style={{ marginTop: Spacing.md }}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Remembered your password? </Text>
          <Text style={styles.footerLink} onPress={() => router.push('/login')}>
            Log In
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.heading,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSizes.body,
    color: Colors.textLight,
    marginTop: Spacing.xs,
  },
  errorText: {
    color: '#DC2626',
    fontSize: FontSizes.body - 2,
    marginTop: -Spacing.sm,
    marginBottom: Spacing.sm,
  },
  successText: {
    color: '#16A34A',
    fontSize: FontSizes.body,
    fontWeight: '600',
    marginTop: Spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  footerText: {
    color: Colors.textLight,
    fontSize: FontSizes.body,
  },
  footerLink: {
    color: Colors.primary,
    fontSize: FontSizes.body,
    fontWeight: '700',
  },
});