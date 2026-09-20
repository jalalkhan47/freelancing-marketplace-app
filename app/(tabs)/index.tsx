import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryChip from '../../components/CategoryChip';
import { Colors, FontSizes, Radius, Spacing } from '../../constants/AppTheme';
import { useFavorites } from '../../context/FavoritesContext';
import { useNotifications } from '../../context/NotificationsContext';
import { CATEGORIES, FREELANCERS } from '../../data/marketplace';

export default function MarketplaceScreen() {
  const router = useRouter();
  const { isFreelancerFavorite, toggleFavoriteFreelancer } = useFavorites();
  const { unreadCount } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = FREELANCERS.filter((f) => {
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greeting}>Hi Jalal 👋</Text>
            <Text style={styles.headline}>Find the perfect freelancer</Text>
          </View>
          <View style={styles.headerIcons}>
            <Pressable onPress={() => router.push('/messages' as any)} hitSlop={10} style={styles.headerIconBtn}>
              <Ionicons name="chatbubble-ellipses-outline" size={26} color={Colors.primary} />
            </Pressable>
            <Pressable onPress={() => router.push('/notifications' as any)} hitSlop={10} style={styles.headerIconBtn}>
              <Ionicons name="notifications-outline" size={26} color={Colors.primary} />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </Pressable>
            <Pressable onPress={() => router.push('/profile' as any)} hitSlop={10}>
              <Ionicons name="person-circle-outline" size={32} color={Colors.primary} />
            </Pressable>
          </View>
        </View>

        <TextInput
          style={styles.search}
          placeholder="Search by name..."
          placeholderTextColor={Colors.textLight}
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.linksRow}>
          <Pressable
            style={styles.linkBtn}
            onPress={() => router.push('/services' as any)}
          >
            <Text style={styles.linkText}>Browse Services</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
          </Pressable>

          <Pressable
            style={styles.linkBtn}
            onPress={() => router.push('/find-jobs' as any)}
          >
            <Text style={styles.linkText}>Find Jobs</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.categoriesWrap}>
        <FlatList
          data={CATEGORIES}
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
        ListHeaderComponent={<Text style={styles.sectionTitle}>Top Freelancers</Text>}
        renderItem={({ item }) => {
          const favorited = isFreelancerFavorite(item.id);
          return (
            <Pressable
              style={styles.card}
              onPress={() => router.push({ pathname: '/freelancer/[id]', params: { id: item.id } } as any)}
            >
              <Image source={{ uri: item.avatarUri }} style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.role} numberOfLines={1}>{item.role}</Text>
                <View style={styles.row}>
                  <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => toggleFavoriteFreelancer(item.id)}
                hitSlop={10}
                style={styles.favBtn}
              >
                <Ionicons
                  name={favorited ? 'heart' : 'heart-outline'}
                  size={22}
                  color={favorited ? Colors.secondary : Colors.textLight}
                />
              </Pressable>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: FontSizes.body,
    color: Colors.textLight,
  },
  headline: {
    fontSize: FontSizes.title,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 2,
    marginBottom: Spacing.md,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    marginRight: Spacing.md,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.secondary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  search: {
    height: 48,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.body,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  linkText: {
    fontSize: FontSizes.body,
    color: Colors.primary,
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
  categoriesWrap: {
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.title,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    marginRight: Spacing.md,
    backgroundColor: Colors.surface,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FontSizes.subtitle,
    fontWeight: '700',
    color: Colors.text,
  },
  role: {
    fontSize: FontSizes.body,
    color: Colors.textLight,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
  },
  rating: {
    fontSize: FontSizes.body,
    color: Colors.text,
    fontWeight: '600',
    marginRight: Spacing.md,
  },
  price: {
    fontSize: FontSizes.body,
    color: Colors.primary,
    fontWeight: '700',
  },
  favBtn: {
    padding: Spacing.xs,
  },
});