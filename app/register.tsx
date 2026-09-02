import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { Colors, FontSizes, Spacing } from '../constants/AppTheme';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [formError, setFormError] = useState('');

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
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
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Join thousands of clients and freelancers.</Text>

        <View style={{ marginTop: Spacing.xl }}>
          <AppInput
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={(text: string) => {
              setName(text);
              if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
            }}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

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

          <AppInput
            label="Confirm Password"
            placeholder="••••••••"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text: string) => {
              setConfirmPassword(text);
              if (errors.confirmPassword) setErrors((e) => ({ ...e, confirmPassword: undefined }));
            }}
          />
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
        </View>

        {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null}
        {success ? <Text style={styles.successText}>Account created! Redirecting...</Text> : null}

        <AppButton
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          style={{ marginTop: Spacing.md }}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
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