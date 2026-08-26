import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../../constants/AppTheme';
import { useFavorites } from '../../context/FavoritesContext';
import { FREELANCERS, SERVICES } from '../../data/marketplace';

export default function FreelancerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFreelancerFavorite, toggleFavoriteFreelancer } = useFavorites();

  const freelancer = FREELANCERS.find((f) => f.id === id);
  const freelancerServices = SERVICES.filter((s) => s.freelancerId === id);

  if (!freelancer) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Freelancer not found.</Text>
      </SafeAreaView>
    );
  }

  const favorited = isFreelancerFavorite(freelancer.id);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Pressable onPress={() => toggleFavoriteFreelancer(freelancer.id)} style={styles.iconBtn}>
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={22}
            color={favorited ? Colors.secondary : Colors.text}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: freelancer.avatarUri }} style={styles.avatar} />
          <Text style={styles.name}>{freelancer.name}</Text>
          <Text style={styles.role}>{freelancer.role}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>⭐ {freelancer.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{freelancer.completedJobs}</Text>
              <Text style={styles.statLabel}>Jobs Done</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{freelancer.price}</Text>
              <Text style={styles.statLabel}>Rate</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{freelancer.bio}</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsWrap}>
          {freelancer.skills.map((skill) => (
            <View key={skill} style={styles.skillChip}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Services</Text>
        <FlatList
          data={freelancerServices}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              style={styles.serviceCard}
                 onPress={() => router.push({ pathname: '/service/[id]', params: { id: item.id } } as any)}
            >
              <Image source={{ uri: item.imageUri }} style={styles.serviceImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.servicePrice}>{item.price}</Text>
              </View>
            </Pressable>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: FontSizes.heading,
    fontWeight: '800',
    color: Colors.text,
  },
  role: {
    fontSize: FontSizes.subtitle,
    color: Colors.textLight,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    width: '100%',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.subtitle,
    fontWeight: '700',
    color: Colors.text,
  },
  statLabel: {
    fontSize: FontSizes.small,
    color: Colors.textLight,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: FontSizes.title,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  bio: {
    fontSize: FontSizes.body,
    color: Colors.textLight,
    lineHeight: 20,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  skillText: {
    fontSize: FontSizes.body,
    color: Colors.text,
    fontWeight: '600',
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  serviceImage: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
    marginRight: Spacing.md,
    backgroundColor: Colors.surface,
  },
  serviceTitle: {
    fontSize: FontSizes.body,
    fontWeight: '600',
    color: Colors.text,
  },
  servicePrice: {
    fontSize: FontSizes.body,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 4,
  },
});