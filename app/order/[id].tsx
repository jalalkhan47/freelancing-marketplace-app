import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../../constants/AppTheme';
import { Milestone, useOrders } from '../../context/OrdersContext';

const MILESTONE_COLORS: Record<Milestone['status'], { bg: string; text: string }> = {
  Pending: { bg: '#F3F4F6', text: '#6B7280' },
  'In Progress': { bg: '#FEF3C7', text: '#B45309' },
  Completed: { bg: '#DCFCE7', text: '#16A34A' },
};

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders } = useOrders();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Project not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Project Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{order.projectTitle}</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Client</Text>
          <Text style={styles.value}>{order.clientName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Freelancer</Text>
          <Text style={styles.value}>{order.freelancerName}</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.section, { flex: 1, marginRight: Spacing.sm }]}>
            <Text style={styles.label}>Budget</Text>
            <Text style={styles.value}>{order.budget}</Text>
          </View>
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.label}>Deadline</Text>
            <Text style={styles.value}>{order.deadline}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Progress</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${order.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{order.progress}% complete</Text>
        </View>

        <Text style={styles.sectionTitle}>Milestones</Text>
        {order.milestones.map((m) => {
          const colors = MILESTONE_COLORS[m.status];
          return (
            <View key={m.id} style={styles.milestoneCard}>
              <View style={styles.milestoneTopRow}>
                <Text style={styles.milestoneTitle}>{m.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.statusText, { color: colors.text }]}>{m.status}</Text>
                </View>
              </View>
              <Text style={styles.milestoneAmount}>{m.amount}</Text>
            </View>
          );
        })}

        {order.status === 'Active' && (
          <Pressable
            style={styles.deliverBtn}
            onPress={() => router.push({ pathname: '/delivery/[id]', params: { id: order.id } } as any)}
          >
            <Ionicons name="cloud-upload-outline" size={18} color={Colors.white} />
            <Text style={styles.deliverBtnText}>Submit Delivery</Text>
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
  title: { fontSize: FontSizes.title, fontWeight: '800', color: Colors.text, marginTop: Spacing.sm, marginBottom: Spacing.md },
  section: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  label: { fontSize: FontSizes.body - 1, color: Colors.textLight, marginBottom: 4 },
  value: { fontSize: FontSizes.body, color: Colors.text, fontWeight: '600' },
  row: { flexDirection: 'row' },
  progressBarBg: { height: 8, backgroundColor: Colors.surface, borderRadius: 4, marginTop: Spacing.sm, overflow: 'hidden' },
  progressBarFill: { height: 8, backgroundColor: Colors.primary, borderRadius: 4 },
  progressText: { fontSize: FontSizes.body - 1, color: Colors.textLight, marginTop: Spacing.sm },
  sectionTitle: { fontSize: FontSizes.subtitle, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm, marginTop: Spacing.sm },
  milestoneCard: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
  },
  milestoneTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  milestoneTitle: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.text },
  statusBadge: { borderRadius: Radius.md, paddingHorizontal: Spacing.sm, paddingVertical: 4 },
  statusText: { fontSize: FontSizes.body - 2, fontWeight: '700' },
  milestoneAmount: { fontSize: FontSizes.body, color: Colors.primary, fontWeight: '700', marginTop: 4 },
  deliverBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primary, borderRadius: Radius.md, height: 50, marginTop: Spacing.lg,
  },
  deliverBtnText: { color: Colors.white, fontWeight: '700', fontSize: FontSizes.body, marginLeft: Spacing.sm },
});