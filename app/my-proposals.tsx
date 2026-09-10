import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';
import { Proposal, useProposals } from '../context/ProposalsContext';

const STATUS_COLORS: Record<Proposal['status'], { bg: string; text: string }> = {
  Pending: { bg: '#FEF3C7', text: '#B45309' },
  Accepted: { bg: '#DCFCE7', text: '#16A34A' },
  Rejected: { bg: '#FEE2E2', text: '#DC2626' },
};

export default function MyProposalsScreen() {
  const router = useRouter();
  const { proposals } = useProposals();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>My Proposals</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={proposals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="document-text-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyText}>You haven't submitted any proposals yet.</Text>
            <Pressable style={styles.findBtn} onPress={() => router.push('/find-jobs' as any)}>
              <Text style={styles.findBtnText}>Find Jobs</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => {
          const colors = STATUS_COLORS[item.status];
          return (
            <View style={styles.card}>
              <View style={styles.cardTopRow}>
                <Text style={styles.jobTitle} numberOfLines={2}>{item.jobTitle}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.statusText, { color: colors.text }]}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.coverLetter} numberOfLines={2}>{item.coverLetter}</Text>
              <View style={styles.row}>
                <Text style={styles.bid}>Bid: {item.bidAmount}</Text>
                <Text style={styles.submittedAt}>{item.submittedAt}</Text>
              </View>
            </View>
          );
        }}
      />
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
  listContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, flexGrow: 1 },
  emptyWrap: { alignItems: 'center', justifyContent: 'center', marginTop: Spacing.xl * 2 },
  emptyText: {
    color: Colors.textLight, fontSize: FontSizes.body, textAlign: 'center',
    marginTop: Spacing.md, marginBottom: Spacing.lg,
  },
  findBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg },
  findBtnText: { color: Colors.white, fontWeight: '700' },
  card: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  jobTitle: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.text, flex: 1, marginRight: Spacing.sm },
  statusBadge: { borderRadius: Radius.md, paddingHorizontal: Spacing.sm, paddingVertical: 4 },
  statusText: { fontSize: FontSizes.body - 2, fontWeight: '700' },
  coverLetter: { fontSize: FontSizes.body - 1, color: Colors.textLight, marginTop: Spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.sm },
  bid: { fontSize: FontSizes.body, color: Colors.primary, fontWeight: '700' },
  submittedAt: { fontSize: FontSizes.body - 2, color: Colors.textLight },
});