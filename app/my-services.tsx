import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';

export type MyService = {
  id: string;
  title: string;
  price: string;
  category: string;
  imageUri: string;
};

let myServicesStore: MyService[] = [];

export function addMyService(service: MyService) {
  myServicesStore = [service, ...myServicesStore];
}

export function getMyServices() {
  return myServicesStore;
}

export default function MyServicesScreen() {
  const router = useRouter();
  const [services, setServices] = useState<MyService[]>(getMyServices());

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>My Services</Text>
        <Pressable onPress={() => router.push('/create-service' as any)} hitSlop={10}>
          <Ionicons name="add-circle-outline" size={26} color={Colors.primary} />
        </Pressable>
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        onRefresh={() => setServices(getMyServices())}
        refreshing={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="briefcase-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyText}>You haven't created any services yet.</Text>
            <Pressable style={styles.createBtn} onPress={() => router.push('/create-service' as any)}>
              <Text style={styles.createBtnText}>Create Your First Service</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: { fontSize: FontSizes.subtitle, fontWeight: '700', color: Colors.text },
  listContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, flexGrow: 1 },
  emptyWrap: { alignItems: 'center', justifyContent: 'center', marginTop: Spacing.xl * 2 },
  emptyText: {
    color: Colors.textLight,
    fontSize: FontSizes.body,
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  createBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  createBtnText: { color: Colors.white, fontWeight: '700' },
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
  image: { width: 64, height: 64, borderRadius: Radius.md, marginRight: Spacing.md, backgroundColor: Colors.surface },
  info: { flex: 1 },
  title: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.text },
  category: { fontSize: FontSizes.body, color: Colors.textLight, marginTop: 2 },
  price: { fontSize: FontSizes.body, color: Colors.primary, fontWeight: '700', marginTop: 4 },
});