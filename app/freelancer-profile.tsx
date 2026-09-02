import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';
import { useUser } from '../context/UserContext';

export default function FreelancerProfileScreen() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Freelancer Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
          <Text style={styles.rate}>{user.hourlyRate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>About</Text>
          <Text style={styles.value}>{user.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Skills</Text>
          <View style={styles.skillsRow}>
            {user.skills.map((skill) => (
              <View key={skill} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.myServicesBtn} onPress={() => router.push('/my-services' as any)}>
          <Ionicons name="briefcase-outline" size={18} color={Colors.white} />
          <Text style={styles.myServicesBtnText}>My Services</Text>
        </Pressable>

        <Pressable style={styles.editBtn} onPress={() => router.push('/edit-profile' as any)}>
          <Ionicons name="pencil" size={18} color={Colors.primary} />
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
  rate: { fontSize: FontSizes.body, color: Colors.primary, fontWeight: '700', marginTop: 4 },
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
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: Spacing.xs },
  skillChip: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  skillText: { color: Colors.text, fontWeight: '600', fontSize: FontSizes.body - 1 },
  myServicesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 50,
    marginTop: Spacing.md,
  },
  myServicesBtnText: { color: Colors.white, fontWeight: '700', fontSize: FontSizes.body, marginLeft: Spacing.sm },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    height: 50,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  editBtnText: { color: Colors.primary, fontWeight: '700', fontSize: FontSizes.body, marginLeft: Spacing.sm },
});