import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../constants/AppTheme';
import { AppNotification, useNotifications } from '../context/NotificationsContext';

const TYPE_ICON: Record<AppNotification['type'], { name: any; color: string }> = {
  message: { name: 'chatbubble-outline', color: Colors.primary },
  proposal_accepted: { name: 'checkmark-circle-outline', color: '#16A34A' },
  project_completed: { name: 'trophy-outline', color: '#B45309' },
  review_received: { name: 'star-outline', color: '#EAB308' },
};

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markAsRead } = useNotifications();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications yet.</Text>}
        renderItem={({ item }) => {
          const icon = TYPE_ICON[item.type];
          return (
            <Pressable
              style={[styles.card, !item.read && styles.cardUnread]}
              onPress={() => markAsRead(item.id)}
            >
              <View style={[styles.iconWrap, { backgroundColor: icon.color + '20' }]}>
                <Ionicons name={icon.name} size={20} color={icon.color} />
              </View>
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              {!item.read && <View style={styles.unreadDot} />}
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
  listContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  emptyText: { textAlign: 'center', color: Colors.textLight, marginTop: Spacing.xl },
  card: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  cardUnread: { borderColor: Colors.primary, backgroundColor: '#EFF6FF' },
  iconWrap: {
    width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  info: { flex: 1 },
  title: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.text },
  body: { fontSize: FontSizes.body - 1, color: Colors.textLight, marginTop: 2 },
  time: { fontSize: FontSizes.body - 2, color: Colors.textLight, marginTop: 4 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginLeft: Spacing.sm, marginTop: 4 },
});