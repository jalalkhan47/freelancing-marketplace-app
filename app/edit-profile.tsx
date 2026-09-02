import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { Colors, FontSizes, Spacing } from '../constants/AppTheme';
import { useUser } from '../context/UserContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    setSuccess(false);
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      updateUser({ name: name.trim(), email: email.trim(), bio: bio.trim() });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.back(), 700);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarWrap}>
          <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
        </View>

        <AppInput
          label="Full Name"
          value={name}
          onChangeText={(text: string) => {
            setName(text);
            if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
          }}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <AppInput
          label="Email"
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
          label="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />

        {success ? <Text style={styles.successText}>Profile updated!</Text> : null}

        <AppButton
          title="Save Changes"
          onPress={handleSave}
          loading={loading}
          style={{ marginTop: Spacing.md }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: { fontSize: FontSizes.subtitle, fontWeight: '700', color: Colors.text },
  scroll: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  avatarWrap: { alignItems: 'center', marginBottom: Spacing.lg },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.surface },
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
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});