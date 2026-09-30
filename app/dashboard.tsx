import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';
import { useFavorites } from '../context/FavoritesContext';
import { useMessages } from '../context/MessagesContext';
import { useOrders } from '../context/OrdersContext';
import { useProposals } from '../context/ProposalsContext';
import { useReviews } from '../context/ReviewsContext';
import { useUser } from '../context/UserContext';
import { JOBS } from '../data/jobs';

type Mode = 'Freelancer' | 'Client';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { orders } = useOrders();
  const { proposals } = useProposals();
  const { reviews } = useReviews();
  const { favoriteFreelancers, favoriteServices } = useFavorites();
  const { conversations } = useMessages();

  const [mode, setMode] = useState<Mode>('Freelancer');

  const activeOrders = orders.filter((o) => o.status === 'Active').length;
  const completedOrders = orders.filter((o) => o.status === 'Completed').length;
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '—';
  const unreadMessages = conversations.filter((c) => c.unread).length;
  const totalFavorites = favoriteFreelancers.length + favoriteServices.length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.modeRow}>
        <Pressable style={[styles.modeBtn, mode === 'Freelancer' && styles.modeBtnActive]} onPress={() => setMode('Freelancer')}>
          <Text style={[styles.modeText, mode === 'Freelancer' && styles.modeTextActive]}>Freelancer</Text>
        </Pressable>
        <Pressable style={[styles.modeBtn, mode === 'Client' && styles.modeBtnActive]} onPress={() => setMode('Client')}>
          <Text style={[styles.modeText, mode === 'Client' && styles.modeTextActive]}>Client</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.welcomeText}>Welcome back, {user.name.split(' ')[0]} 👋</Text>

        {mode === 'Freelancer' ? (
          <View style={styles.statsGrid}>
            <StatCard icon="briefcase-outline" label="Active Projects" value={activeOrders} color={Colors.primary} />
            <StatCard icon="checkmark-done-outline" label="Completed" value={completedOrders} color="#16A34A" />
            <StatCard icon="document-text-outline" label="Proposals Sent" value={proposals.length} color="#B45309" />
            <StatCard icon="star-outline" label="Avg Rating" value={avgRating} color="#EAB308" />
          </View>
        ) : (
          <View style={styles.statsGrid}>
            <StatCard icon="list-outline" label="Jobs Posted" value={JOBS.length} color={Colors.primary} />
            <StatCard icon="briefcase-outline" label="Active Projects" value={activeOrders} color="#16A34A" />
            <StatCard icon="heart-outline" label="Favorites" value={totalFavorites} color={Colors.secondary} />
            <StatCard icon="chatbubble-outline" label="Unread Messages" value={unreadMessages} color="#2563EB" />
          </View>
        )}

        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.linksGrid}>
          {mode === 'Freelancer' ? (
            <>
              <DashLink icon="briefcase-outline" label="My Services" onPress={() => router.push('/my-services' as any)} />
              <DashLink icon="checkmark-done-outline" label="My Orders" onPress={() => router.push('/my-orders' as any)} />
              <DashLink icon="document-text-outline" label="My Proposals" onPress={() => router.push('/my-proposals' as any)} />
              <DashLink icon="person-outline" label="Freelancer Profile" onPress={() => router.push('/freelancer-profile' as any)} />
            </>
          ) : (
            <>
              <DashLink icon="add-circle-outline" label="Post a Job" onPress={() => router.push('/post-job' as any)} />
              <DashLink icon="briefcase-outline" label="My Orders" onPress={() => router.push('/my-orders' as any)} />
              <DashLink icon="heart-outline" label="Favorites" onPress={() => router.push('/services' as any)} />
              <DashLink icon="search-outline" label="Search" onPress={() => router.push('/search' as any)} />
            </>
          )}
          <DashLink icon="chatbubbles-outline" label="Messages" onPress={() => router.push('/messages' as any)} />
          <DashLink icon="notifications-outline" label="Notifications" onPress={() => router.push('/notifications' as any)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconWrap, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function DashLink({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.linkCard} onPress={onPress}>
      <Ionicons name={icon} size={24} color={Colors.primary} />
      <Text style={styles.linkLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  headerTitle: { fontSize: FontSizes.subtitle, fontWeight: '700', color: Colors.text },
  modeRow: { flexDirection: 'row', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  modeBtn: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: Colors.border },
  modeBtnActive: { borderBottomColor: Colors.primary },
  modeText: { color: Colors.textLight, fontWeight: '600' },
  modeTextActive: { color: Colors.primary },
  scroll: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  welcomeText: { fontSize: FontSizes.title, fontWeight: '800', color: Colors.text, marginBottom: Spacing.lg },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: {
    width: '48%', backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  statIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  statValue: { fontSize: FontSizes.title, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: FontSizes.body - 2, color: Colors.textLight, marginTop: 2 },
  sectionTitle: { fontSize: FontSizes.subtitle, fontWeight: '700', color: Colors.text, marginTop: Spacing.md, marginBottom: Spacing.md },
  linksGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  linkCard: {
    width: '48%', backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border, alignItems: 'center',
  },
  linkLabel: { fontSize: FontSizes.body - 1, color: Colors.text, fontWeight: '600', marginTop: Spacing.sm, textAlign: 'center' },
});