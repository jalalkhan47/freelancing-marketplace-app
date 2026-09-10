import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryChip from '../components/CategoryChip';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';
import { useProposals } from '../context/ProposalsContext';
import { JOB_CATEGORIES, JOBS } from '../data/jobs';

export default function FindJobsScreen() {
  const router = useRouter();
  const { hasAppliedToJob } = useProposals();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [budgetType, setBudgetType] = useState<'All' | 'Fixed' | 'Hourly'>('All');
  const [appliedBudgetType, setAppliedBudgetType] = useState<'All' | 'Fixed' | 'Hourly'>('All');

  const filtered = JOBS.filter((j) => {
    const matchesCategory = selectedCategory === 'All' || j.category === selectedCategory;
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase());
    const matchesBudget = appliedBudgetType === 'All' || j.budgetType === appliedBudgetType;
    return matchesCategory && matchesSearch && matchesBudget;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Find Jobs</Text>
        <Pressable onPress={() => router.push('/post-job' as any)} hitSlop={10}>
          <Ionicons name="add-circle-outline" size={26} color={Colors.primary} />
        </Pressable>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          placeholder="Search jobs..."
          placeholderTextColor={Colors.textLight}
          value={search}
          onChangeText={setSearch}
        />
        <Pressable style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
          <Ionicons name="options-outline" size={22} color={Colors.primary} />
          {appliedBudgetType !== 'All' && <View style={styles.filterBadge} />}
        </Pressable>
      </View>

      <View style={styles.categoriesWrap}>
        <FlatList
          data={JOB_CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg }}
          renderItem={({ item }) => (
            <CategoryChip
              label={item}
              selected={selectedCategory === item}
              onPress={() => setSelectedCategory(item)}
            />
          )}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No jobs match your search.</Text>}
        renderItem={({ item }) => {
          const applied = hasAppliedToJob(item.id);
          return (
            <Pressable
              style={styles.card}
              onPress={() => router.push({ pathname: '/job/[id]', params: { id: item.id } } as any)}
            >
              <View style={styles.cardTopRow}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                {applied && (
                  <View style={styles.appliedBadge}>
                    <Text style={styles.appliedBadgeText}>Applied</Text>
                  </View>
                )}
              </View>
              <Text style={styles.postedBy}>{item.postedBy} · {item.postedAt}</Text>
              <View style={styles.row}>
                <Text style={styles.budget}>{item.budget} {item.budgetType === 'Hourly' ? '/hr' : ''}</Text>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>{item.category}</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />

      <Modal visible={filterVisible} animationType="slide" transparent onRequestClose={() => setFilterVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Filter Jobs</Text>
            <Text style={styles.modalLabel}>Budget Type</Text>
            <View style={styles.chipRow}>
              {(['All', 'Fixed', 'Hourly'] as const).map((type) => (
                <Pressable
                  key={type}
                  style={[styles.typeChip, budgetType === type && styles.typeChipActive]}
                  onPress={() => setBudgetType(type)}
                >
                  <Text style={[styles.typeChipText, budgetType === type && styles.typeChipTextActive]}>{type}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.modalActions}>
              <Pressable
                style={styles.clearBtn}
                onPress={() => {
                  setBudgetType('All');
                  setAppliedBudgetType('All');
                  setFilterVisible(false);
                }}
              >
                <Text style={styles.clearBtnText}>Clear</Text>
              </Pressable>
              <Pressable
                style={styles.applyBtn}
                onPress={() => {
                  setAppliedBudgetType(budgetType);
                  setFilterVisible(false);
                }}
              >
                <Text style={styles.applyBtnText}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  search: {
    flex: 1, height: 48, backgroundColor: Colors.surface, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, fontSize: FontSizes.body, borderWidth: 1, borderColor: Colors.border,
  },
  filterBtn: {
    width: 48, height: 48, marginLeft: Spacing.sm, borderRadius: Radius.md,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  filterBadge: {
    position: 'absolute', top: 8, right: 8, width: 8, height: 8,
    borderRadius: 4, backgroundColor: Colors.secondary,
  },
  categoriesWrap: { marginBottom: Spacing.md },
  listContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  emptyText: { textAlign: 'center', color: Colors.textLight, marginTop: Spacing.xl, fontSize: FontSizes.body },
  card: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.text, flex: 1, marginRight: Spacing.sm },
  appliedBadge: { backgroundColor: '#DCFCE7', borderRadius: Radius.md, paddingHorizontal: 8, paddingVertical: 2 },
  appliedBadgeText: { color: '#16A34A', fontSize: FontSizes.body - 3, fontWeight: '700' },
  postedBy: { fontSize: FontSizes.body - 1, color: Colors.textLight, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.sm },
  budget: { fontSize: FontSizes.body, color: Colors.primary, fontWeight: '700' },
  categoryTag: { backgroundColor: Colors.surface, borderRadius: Radius.md, paddingHorizontal: Spacing.sm, paddingVertical: 4 },
  categoryTagText: { fontSize: FontSizes.body - 2, color: Colors.text, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: Colors.white, borderTopLeftRadius: Radius.lg, borderTopRightRadius: Radius.lg, padding: Spacing.lg },
  modalTitle: { fontSize: FontSizes.title, fontWeight: '800', color: Colors.text, marginBottom: Spacing.md },
  modalLabel: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.text, marginBottom: Spacing.sm },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  typeChip: {
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border, marginRight: Spacing.sm, marginBottom: Spacing.sm,
  },
  typeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  typeChipText: { color: Colors.text, fontWeight: '600' },
  typeChipTextActive: { color: Colors.white },
  modalActions: { flexDirection: 'row', marginTop: Spacing.lg },
  clearBtn: {
    flex: 1, height: 48, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm,
  },
  clearBtnText: { color: Colors.text, fontWeight: '700' },
  applyBtn: { flex: 1, height: 48, borderRadius: Radius.md, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  applyBtnText: { color: Colors.white, fontWeight: '700' },
});