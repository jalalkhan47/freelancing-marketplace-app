import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';
import { useUser } from '../context/UserContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bio</Text>
          <Text style={styles.value}>{user.bio}</Text>
        </View>

        <Pressable style={styles.freelancerBtn} onPress={() => router.push('/freelancer-profile' as any)}>
          <Ionicons name="briefcase-outline" size={18} color={Colors.white} />
          <Text style={styles.editBtnText}>View Freelancer Profile</Text>
        </Pressable>

        <Pressable style={styles.proposalsBtn} onPress={() => router.push('/my-proposals' as any)}>
          <Ionicons name="document-text-outline" size={18} color={Colors.primary} />
          <Text style={styles.proposalsBtnText}>My Proposals</Text>
        </Pressable>

        <Pressable style={styles.proposalsBtn} onPress={() => router.push('/my-orders' as any)}>
          <Ionicons name="briefcase-outline" size={18} color={Colors.primary} />
          <Text style={styles.proposalsBtnText}>My Orders</Text>
        </Pressable>

        <Pressable style={styles.editBtn} onPress={() => router.push('/edit-profile' as any)}>
          <Ionicons name="pencil" size={18} color={Colors.white} />
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </Pressable>
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
  avatarWrap: { alignItems: 'center', marginTop: Spacing.md, marginBottom: Spacing.xl },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.surface, marginBottom: Spacing.md },
  name: { fontSize: FontSizes.title, fontWeight: '800', color: Colors.text },
  role: { fontSize: FontSizes.body, color: Colors.textLight, marginTop: 2 },
  section: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: { fontSize: FontSizes.body - 1, color: Colors.textLight, marginBottom: 4 },
  value: { fontSize: FontSizes.body, color: Colors.text, fontWeight: '600' },
  freelancerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: Radius.md,
    height: 50,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  proposalsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    height: 50,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  proposalsBtnText: { color: Colors.primary, fontWeight: '700', fontSize: FontSizes.body, marginLeft: Spacing.sm },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 50,
    marginTop: Spacing.md,
  },
  editBtnText: { color: Colors.white, fontWeight: '700', fontSize: FontSizes.body, marginLeft: Spacing.sm },
});