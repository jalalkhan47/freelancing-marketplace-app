import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import { Colors, FontSizes, Radius, Spacing } from '../../constants/AppTheme';
import { useFavorites } from '../../context/FavoritesContext';
import { FREELANCERS, SERVICES } from '../../data/marketplace';

export default function ServiceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isServiceFavorite, toggleFavoriteService } = useFavorites();

  const service = SERVICES.find((s) => s.id === id);
  const freelancer = FREELANCERS.find((f) => f.id === service?.freelancerId);

  if (!service || !freelancer) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Service not found.</Text>
      </SafeAreaView>
    );
  }

  const favorited = isServiceFavorite(service.id);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Pressable onPress={() => toggleFavoriteService(service.id)} style={styles.iconBtn}>
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={22}
            color={favorited ? Colors.secondary : Colors.text}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={{ uri: service.imageUri }} style={styles.image} />

        <View style={styles.content}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>{service.category}</Text>
          </View>

          <Text style={styles.title}>{service.title}</Text>

          <View style={styles.row}>
            <Text style={styles.rating}>⭐ {service.rating.toFixed(1)}</Text>
            <Text style={styles.price}>{service.price}</Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{service.description}</Text>

          <Text style={styles.sectionTitle}>About the Freelancer</Text>
          <Pressable
            style={styles.freelancerRow}
            
        
            onPress={() => router.push({ pathname: '/freelancer/[id]', params: { id: freelancer.id } } as any)}
          >
            <Image source={{ uri: freelancer.avatarUri }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.freelancerName}>{freelancer.name}</Text>
              <Text style={styles.freelancerRole}>{freelancer.role}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </Pressable>

          <AppButton
            title="Contact Freelancer"
            onPress={() => {}}
            style={{ marginTop: Spacing.xl }}
          />
        </View>
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
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: Spacing.md,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scroll: {
    paddingBottom: Spacing.xl,
  },
  image: {
    width: '100%',
    height: 260,
    backgroundColor: Colors.surface,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surface,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.pill,
    marginBottom: Spacing.sm,
  },
  categoryText: {
    fontSize: FontSizes.small,
    color: Colors.primary,
    fontWeight: '700',
  },
  title: {
    fontSize: FontSizes.title,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 26,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  rating: {
    fontSize: FontSizes.subtitle,
    fontWeight: '600',
    color: Colors.text,
  },
  price: {
    fontSize: FontSizes.title,
    fontWeight: '800',
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: FontSizes.subtitle,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: FontSizes.body,
    color: Colors.textLight,
    lineHeight: 20,
  },
  freelancerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: Spacing.md,
  },
  freelancerName: {
    fontSize: FontSizes.body,
    fontWeight: '700',
    color: Colors.text,
  },
  freelancerRole: {
    fontSize: FontSizes.small,
    color: Colors.textLight,
  },
});