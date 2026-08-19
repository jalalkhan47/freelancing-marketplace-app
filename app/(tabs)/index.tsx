import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryChip from '../../components/CategoryChip';
import FreelancerCard from '../../components/FreelancerCard';
import { Colors, FontSizes, Radius, Spacing } from '../../constants/AppTheme';

const CATEGORIES = ['All', 'Design', 'Development', 'Writing', 'Marketing', 'Video'];

const FREELANCERS = [
  {
    id: '1',
    name: 'Sarah Khan',
    role: 'UI/UX Designer',
    rating: 4.9,
    price: '$25/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: '2',
    name: 'Ahmed Raza',
    role: 'Full Stack Developer',
    rating: 4.8,
    price: '$30/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '3',
    name: 'Emily Chen',
    role: 'Content Writer',
    rating: 4.7,
    price: '$18/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: '4',
    name: 'Bilal Ahmed',
    role: 'Digital Marketer',
    rating: 4.6,
    price: '$20/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: '5',
    name: 'Sophia Lee',
    role: 'Video Editor',
    rating: 5.0,
    price: '$28/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=48',
  },
];

export default function MarketplaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = FREELANCERS.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi Jalal 👋</Text>
        <Text style={styles.headline}>Find the perfect freelancer</Text>

        <TextInput
          style={styles.search}
          placeholder="Search by name..."
          placeholderTextColor={Colors.textLight}
          value={search}
          onChangeText={setSearch}
        />
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
        renderItem={({ item }) => (
          <FreelancerCard
            name={item.name}
            role={item.role}
            rating={item.rating}
            price={item.price}
            avatarUri={item.avatarUri}
            onPress={() => {}}
          />
        )}
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
  search: {
    height: 48,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.body,
    borderWidth: 1,
    borderColor: Colors.border,
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
});