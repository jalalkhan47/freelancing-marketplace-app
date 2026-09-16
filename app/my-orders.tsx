import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';
import { Order, useOrders } from '../context/OrdersContext';

const STATUS_COLORS: Record<Order['status'], { bg: string; text: string }> = {
  Active: { bg: '#DBEAFE', text: '#2563EB' },
  Completed: { bg: '#DCFCE7', text: '#16A34A' },
  Cancelled: { bg: '#FEE2E2', text: '#DC2626' },
};

export default function MyOrdersScreen() {
  const router = useRouter();
  const { orders } = useOrders();
  const [tab, setTab] = useState<'Active' | 'Completed'>('Active');

  const filtered = orders.filter((o) => (tab === 'Active' ? o.status === 'Active' : o.status === 'Completed'));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabsRow}>
        <Pressable style={[styles.tabBtn, tab === 'Active' && styles.tabBtnActive]} onPress={() => setTab('Active')}>
          <Text style={[styles.tabText, tab === 'Active' && styles.tabTextActive]}>Active Projects</Text>
        </Pressable>
        <Pressable style={[styles.tabBtn, tab === 'Completed' && styles.tabBtnActive]} onPress={() => setTab('Completed')}>
          <Text style={[styles.tabText, tab === 'Completed' && styles.tabTextActive]}>Completed</Text>
        </Pressable>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No {tab.toLowerCase()} projects.</Text>}
        renderItem={({ item }) => {
          const colors = STATUS_COLORS[item.status];
          return (
            <Pressable
              style={styles.card}
              onPress={() => router.push({ pathname: '/order/[id]', params: { id: item.id } } as any)}
            >
              <View style={styles.cardTopRow}>
                <Text style={styles.title} numberOfLines={2}>{item.projectTitle}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.statusText, { color: colors.text }]}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.client}>Client: {item.clientName}</Text>
              <View style={styles.row}>
                <Text style={styles.budget}>{item.budget}</Text>
                <Text style={styles.deadline}>Due {item.deadline}</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${item.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{item.progress}% complete</Text>
            </Pressable>
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
  tabsRow: { flexDirection: 'row', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  tabBtn: {
    flex: 1, paddingVertical: Spacing.sm, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: Colors.border,
  },
  tabBtnActive: { borderBottomColor: Colors.primary },
  tabText: { color: Colors.textLight, fontWeight: '600' },
  tabTextActive: { color: Colors.primary },
  listContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  emptyText: { textAlign: 'center', color: Colors.textLight, marginTop: Spacing.xl },
  card: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.text, flex: 1, marginRight: Spacing.sm },
  statusBadge: { borderRadius: Radius.md, paddingHorizontal: Spacing.sm, paddingVertical: 4 },
  statusText: { fontSize: FontSizes.body - 2, fontWeight: '700' },
  client: { fontSize: FontSizes.body - 1, color: Colors.textLight, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.sm },
  budget: { fontSize: FontSizes.body, color: Colors.primary, fontWeight: '700' },
  deadline: { fontSize: FontSizes.body - 2, color: Colors.textLight },
  progressBarBg: { height: 6, backgroundColor: Colors.surface, borderRadius: 3, marginTop: Spacing.sm, overflow: 'hidden' },
  progressBarFill: { height: 6, backgroundColor: Colors.primary, borderRadius: 3 },
  progressText: { fontSize: FontSizes.body - 2, color: Colors.textLight, marginTop: 4 },
});