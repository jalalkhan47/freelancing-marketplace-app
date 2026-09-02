import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { Colors, FontSizes, Spacing } from '../constants/AppTheme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState('');

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    setFormError('');
    setSuccess(false);

    if (!validate()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 700);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Welcome back 👋</Text>
        <Text style={styles.subtitle}>Login to continue finding great talent.</Text>

        <View style={{ marginTop: Spacing.xl }}>
          <AppInput
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
            }}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          <AppInput
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={(text: string) => {
              setPassword(text);
              if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
            }}
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          <Text style={styles.forgotLink} onPress={() => router.push('/forgot-password')}>
            Forgot Password?
          </Text>
        </View>

        {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null}
        {success ? <Text style={styles.successText}>Logged in! Redirecting...</Text> : null}

        <AppButton
          title="Log In"
          onPress={handleLogin}
          loading={loading}
          style={{ marginTop: Spacing.md }}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Text style={styles.footerLink} onPress={() => router.push('/register')}>
            Sign Up
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
  formErrorText: {
    color: '#DC2626',
    fontSize: FontSizes.body,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  successText: {
    color: '#16A34A',
    fontSize: FontSizes.body,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  forgotLink: {
    color: Colors.primary,
    fontSize: FontSizes.body,
    fontWeight: '600',
    textAlign: 'right',
    marginTop: Spacing.xs,
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