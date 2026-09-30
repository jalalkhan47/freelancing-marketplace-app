import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';
import { useFavorites } from '../context/FavoritesContext';
import { JOBS } from '../data/jobs';
import { CATEGORIES, FREELANCERS, SERVICES } from '../data/marketplace';

type Tab = 'Freelancers' | 'Services' | 'Jobs';
type SortOption = 'Relevance' | 'Price: Low to High' | 'Price: High to Low' | 'Highest Rated' | 'Most Popular';

export default function SearchScreen() {
  const router = useRouter();
  const { isFreelancerFavorite, toggleFavoriteFreelancer, isServiceFavorite, toggleFavoriteService } = useFavorites();

  const [tab, setTab] = useState<Tab>('Freelancers');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortOption>('Relevance');
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | null>(null);
  const [appliedMinRating, setAppliedMinRating] = useState(0);

  const getPriceNumber = (price: string) => parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;

  const results = useMemo(() => {
    let data: any[] = [];
    if (tab === 'Freelancers') data = FREELANCERS;
    if (tab === 'Services') data = SERVICES;
    if (tab === 'Jobs') data = JOBS;

    let filtered = data.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesSearch = (item.name || item.title || '').toLowerCase().includes(search.toLowerCase());
      const priceVal = getPriceNumber(item.price || item.budget || '0');
      const matchesPrice = appliedMaxPrice === null || priceVal <= appliedMaxPrice;
      const matchesRating = tab === 'Jobs' || (item.rating || 0) >= appliedMinRating;
      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });

    if (sort === 'Price: Low to High') {
      filtered = [...filtered].sort((a, b) => getPriceNumber(a.price || a.budget || '0') - getPriceNumber(b.price || b.budget || '0'));
    } else if (sort === 'Price: High to Low') {
      filtered = [...filtered].sort((a, b) => getPriceNumber(b.price || b.budget || '0') - getPriceNumber(a.price || a.budget || '0'));
    } else if (sort === 'Highest Rated') {
      filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'Most Popular') {
      filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  }, [tab, search, category, appliedMaxPrice, appliedMinRating, sort]);

  const activeFilterCount = (appliedMaxPrice !== null ? 1 : 0) + (appliedMinRating > 0 ? 1 : 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          placeholder={`Search ${tab.toLowerCase()}...`}
          placeholderTextColor={Colors.textLight}
          value={search}
          onChangeText={setSearch}
        />
        <Pressable style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
          <Ionicons name="options-outline" size={22} color={Colors.primary} />
          {activeFilterCount > 0 && <View style={styles.filterBadge}><Text style={styles.filterBadgeText}>{activeFilterCount}</Text></View>}
        </Pressable>
      </View>

      <View style={styles.tabsRow}>
        {(['Freelancers', 'Services', 'Jobs'] as Tab[]).map((t) => (
          <Pressable key={t} style={[styles.tabBtn, tab === t && styles.tabBtnActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sortRow}>
        <FlatList
          data={(['Relevance', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Most Popular'] as SortOption[])}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg }}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.sortChip, sort === item && styles.sortChipActive]}
              onPress={() => setSort(item)}
            >
              <Text style={[styles.sortChipText, sort === item && styles.sortChipTextActive]}>{item}</Text>
            </Pressable>
          )}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
        renderItem={({ item }) => {
          if (tab === 'Freelancers') {
            const favorited = isFreelancerFavorite(item.id);
            return (
              <Pressable style={styles.card} onPress={() => router.push({ pathname: '/freelancer/[id]', params: { id: item.id } } as any)}>
                <Image source={{ uri: item.avatarUri }} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.subtitle} numberOfLines={1}>{item.role}</Text>
                  <View style={styles.row}>
                    <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </View>
                <Pressable onPress={() => toggleFavoriteFreelancer(item.id)} hitSlop={10}>
                  <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={22} color={favorited ? Colors.secondary : Colors.textLight} />
                </Pressable>
              </Pressable>
            );
          }
          if (tab === 'Services') {
            const favorited = isServiceFavorite(item.id);
            return (
              <Pressable style={styles.card} onPress={() => router.push({ pathname: '/service/[id]', params: { id: item.id } } as any)}>
                <Image source={{ uri: item.imageUri }} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                  <View style={styles.row}>
                    <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </View>
                <Pressable onPress={() => toggleFavoriteService(item.id)} hitSlop={10}>
                  <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={22} color={favorited ? Colors.secondary : Colors.textLight} />
                </Pressable>
              </Pressable>
            );
          }
          return (
            <Pressable style={styles.card} onPress={() => router.push({ pathname: '/job/[id]', params: { id: item.id } } as any)}>
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.postedBy}</Text>
                <Text style={styles.price}>{item.budget}{item.budgetType === 'Hourly' ? '/hr' : ''}</Text>
              </View>
            </Pressable>
          );
        }}
      />

      <Modal visible={filterVisible} animationType="slide" transparent onRequestClose={() => setFilterVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Filters</Text>

            <Text style={styles.modalLabel}>Category</Text>
            <View style={styles.chipRow}>
              {CATEGORIES.map((c) => (
                <Pressable key={c} style={[styles.catChip, category === c && styles.catChipActive]} onPress={() => setCategory(c)}>
                  <Text style={[styles.catChipText, category === c && styles.catChipTextActive]}>{c}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.modalLabel}>Max Price ($)</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="e.g. 200"
              placeholderTextColor={Colors.textLight}
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />

            <Text style={styles.modalLabel}>Minimum Rating</Text>
            <View style={styles.chipRow}>
              {[0, 4, 4.5, 4.8].map((r) => (
                <Pressable key={r} style={[styles.catChip, minRating === r && styles.catChipActive]} onPress={() => setMinRating(r)}>
                  <Text style={[styles.catChipText, minRating === r && styles.catChipTextActive]}>{r === 0 ? 'Any' : `${r}+`}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalActions}>
              <Pressable style={styles.clearBtn} onPress={() => { setCategory('All'); setMaxPrice(''); setMinRating(0); setAppliedMaxPrice(null); setAppliedMinRating(0); setFilterVisible(false); }}>
                <Text style={styles.clearBtnText}>Clear</Text>
              </Pressable>
              <Pressable style={styles.applyBtn} onPress={() => { setAppliedMaxPrice(maxPrice ? parseInt(maxPrice, 10) : null); setAppliedMinRating(minRating); setFilterVisible(false); }}>
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  headerTitle: { fontSize: FontSizes.subtitle, fontWeight: '700', color: Colors.text },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  search: { flex: 1, height: 48, backgroundColor: Colors.surface, borderRadius: Radius.md, paddingHorizontal: Spacing.md, fontSize: FontSizes.body, borderWidth: 1, borderColor: Colors.border },
  filterBtn: { width: 48, height: 48, marginLeft: Spacing.sm, borderRadius: Radius.md, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  filterBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: Colors.secondary, borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  filterBadgeText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  tabsRow: { flexDirection: 'row', paddingHorizontal: Spacing.lg, marginBottom: Spacing.sm },
  tabBtn: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: Colors.border },
  tabBtnActive: { borderBottomColor: Colors.primary },
  tabText: { color: Colors.textLight, fontWeight: '600' },
  tabTextActive: { color: Colors.primary },
  sortRow: { marginBottom: Spacing.sm },
  sortChip: { paddingVertical: 6, paddingHorizontal: Spacing.sm, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border, marginRight: Spacing.sm },
  sortChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  sortChipText: { color: Colors.text, fontSize: FontSizes.body - 2, fontWeight: '600' },
  sortChipTextActive: { color: Colors.white },
  listContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  emptyText: { textAlign: 'center', color: Colors.textLight, marginTop: Spacing.xl },
  card: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border, alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: Radius.md, marginRight: Spacing.md, backgroundColor: Colors.surface },
  info: { flex: 1 },
  title: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: FontSizes.body - 1, color: Colors.textLight, marginTop: 2 },
  row: { flexDirection: 'row', marginTop: Spacing.sm },
  rating: { fontSize: FontSizes.body, color: Colors.text, fontWeight: '600', marginRight: Spacing.md },
  price: { fontSize: FontSizes.body, color: Colors.primary, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: Colors.white, borderTopLeftRadius: Radius.lg, borderTopRightRadius: Radius.lg, padding: Spacing.lg, maxHeight: '80%' },
  modalTitle: { fontSize: FontSizes.title, fontWeight: '800', color: Colors.text, marginBottom: Spacing.md },
  modalLabel: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.text, marginBottom: Spacing.sm, marginTop: Spacing.md },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  catChip: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border, marginRight: Spacing.sm, marginBottom: Spacing.sm },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catChipText: { color: Colors.text, fontWeight: '600' },
  catChipTextActive: { color: Colors.white },
  priceInput: { height: 48, backgroundColor: Colors.surface, borderRadius: Radius.md, paddingHorizontal: Spacing.md, fontSize: FontSizes.body, borderWidth: 1, borderColor: Colors.border },
  modalActions: { flexDirection: 'row', marginTop: Spacing.lg },
  clearBtn: { flex: 1, height: 48, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm },
  clearBtnText: { color: Colors.text, fontWeight: '700' },
  applyBtn: { flex: 1, height: 48, borderRadius: Radius.md, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  applyBtnText: { color: Colors.white, fontWeight: '700' },
});