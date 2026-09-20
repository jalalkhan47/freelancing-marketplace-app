import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import { Colors, FontSizes, Radius, Spacing } from '../../constants/AppTheme';
import { useOrders } from '../../context/OrdersContext';
import { useReviews } from '../../context/ReviewsContext';

export default function ReviewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders } = useOrders();
  const { reviews, addReview } = useReviews();

  const order = orders.find((o) => o.id === id);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    setSuccess(false);

    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a review.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      addReview(rating, comment.trim());
      setLoading(false);
      setSuccess(true);
      setComment('');
      setRating(0);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Leave a Review</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {order && <Text style={styles.projectTitle}>{order.projectTitle}</Text>}

        <Text style={styles.label}>Rating</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => { setRating(star); if (error) setError(''); }} hitSlop={6}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={36}
                color="#EAB308"
                style={{ marginRight: Spacing.sm }}
              />
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Your Review</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Share your experience..."
          placeholderTextColor={Colors.textLight}
          value={comment}
          onChangeText={(text) => { setComment(text); if (error) setError(''); }}
          multiline
          numberOfLines={4}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>Review submitted, thank you!</Text> : null}

        <AppButton title="Submit Review" onPress={handleSubmit} loading={loading} style={{ marginTop: Spacing.md }} />

        <Text style={styles.sectionTitle}>Reviews</Text>
        {reviews.map((r) => (
          <View key={r.id} style={styles.reviewCard}>
            <View style={styles.reviewTopRow}>
              <Text style={styles.reviewerName}>{r.reviewerName}</Text>
              <Text style={styles.reviewDate}>{r.date}</Text>
            </View>
            <View style={styles.reviewStars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons key={s} name={s <= r.rating ? 'star' : 'star-outline'} size={14} color="#EAB308" />
              ))}
            </View>
            <Text style={styles.reviewComment}>{r.comment}</Text>
          </View>
        ))}
      </ScrollView>
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
  scroll: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  projectTitle: { fontSize: FontSizes.body, color: Colors.textLight, marginBottom: Spacing.md },
  label: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.text, marginBottom: Spacing.sm, marginTop: Spacing.sm },
  starsRow: { flexDirection: 'row', marginBottom: Spacing.sm },
  textArea: {
    backgroundColor: Colors.white, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.md, fontSize: FontSizes.body, minHeight: 90, textAlignVertical: 'top',
  },
  errorText: { color: '#DC2626', fontSize: FontSizes.body - 2, marginTop: Spacing.sm },
  successText: { color: '#16A34A', fontSize: FontSizes.body, fontWeight: '600', marginTop: Spacing.sm },
  sectionTitle: { fontSize: FontSizes.subtitle, fontWeight: '700', color: Colors.text, marginTop: Spacing.xl, marginBottom: Spacing.md },
  reviewCard: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  reviewTopRow: { flexDirection: 'row', justifyContent: 'space-between' },
  reviewerName: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.text },
  reviewDate: { fontSize: FontSizes.body - 2, color: Colors.textLight },
  reviewStars: { flexDirection: 'row', marginTop: 4, marginBottom: Spacing.sm },
  reviewComment: { fontSize: FontSizes.body - 1, color: Colors.text },
});