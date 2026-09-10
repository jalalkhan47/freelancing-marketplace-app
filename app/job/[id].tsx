import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../../constants/AppTheme';
import { useProposals } from '../../context/ProposalsContext';
import { JOBS } from '../../data/jobs';

export default function JobDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { hasAppliedToJob } = useProposals();

  const job = JOBS.find((j) => j.id === id);

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Job not found.</Text>
      </SafeAreaView>
    );
  }

  const applied = hasAppliedToJob(job.id);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.postedBy}>{job.postedBy} · {job.postedAt}</Text>

        <View style={styles.row}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{job.budget}{job.budgetType === 'Hourly' ? '/hr' : ''}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{job.category}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{job.budgetType}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{job.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Skills Required</Text>
          <View style={styles.skillsRow}>
            {job.skills.map((skill) => (
              <View key={skill} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {applied ? (
          <View style={styles.appliedBox}>
            <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
            <Text style={styles.appliedText}>You've already applied to this job</Text>
          </View>
        ) : (
          <Pressable
            style={styles.applyBtn}
            onPress={() => router.push({ pathname: '/submit-proposal/[id]', params: { id: job.id } } as any)}
          >
            <Text style={styles.applyBtnText}>Submit Proposal</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
  },
  headerTitle: { fontSize: FontSizes.subtitle, fontWeight: '700', color: Colors.text },
  scroll: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  notFound: { textAlign: 'center', marginTop: Spacing.xl, color: Colors.textLight },
  title: { fontSize: FontSizes.title, fontWeight: '800', color: Colors.text, marginTop: Spacing.sm },
  postedBy: { fontSize: FontSizes.body, color: Colors.textLight, marginTop: 4, marginBottom: Spacing.md },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  pill: {
    backgroundColor: Colors.surface, borderRadius: Radius.md, paddingHorizontal: Spacing.sm,
    paddingVertical: 6, marginRight: Spacing.sm, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
  },
  pillText: { color: Colors.text, fontWeight: '600', fontSize: FontSizes.body - 1 },
  section: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md,
    marginTop: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  sectionLabel: { fontSize: FontSizes.body - 1, color: Colors.textLight, marginBottom: Spacing.xs, fontWeight: '600' },
  description: { fontSize: FontSizes.body, color: Colors.text, lineHeight: 20 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  skillChip: {
    backgroundColor: Colors.surface, borderRadius: Radius.md, paddingVertical: 6, paddingHorizontal: Spacing.sm,
    marginRight: Spacing.sm, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
  },
  skillText: { color: Colors.text, fontWeight: '600', fontSize: FontSizes.body - 1 },
  applyBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md, height: 50,
    alignItems: 'center', justifyContent: 'center', marginTop: Spacing.lg,
  },
  applyBtnText: { color: Colors.white, fontWeight: '700', fontSize: FontSizes.body },
  appliedBox: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#DCFCE7', borderRadius: Radius.md, height: 50, marginTop: Spacing.lg,
  },
  appliedText: { color: '#16A34A', fontWeight: '700', marginLeft: Spacing.sm },
});