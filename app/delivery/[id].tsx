import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { Colors, FontSizes, Spacing } from '../../constants/AppTheme';
import { useOrders } from '../../context/OrdersContext';

export default function DeliveryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders, submitDelivery } = useOrders();

  const order = orders.find((o) => o.id === id);

  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Project not found.</Text>
      </SafeAreaView>
    );
  }

  const handleSubmit = () => {
    setError('');
    setSuccess(false);

    if (!note.trim()) {
      setError('Please add a delivery note describing your work.');
      return;
    }
    if (note.trim().length < 15) {
      setError('Write at least 15 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      submitDelivery(order.id, note.trim());
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.back(), 900);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Submit Delivery</Text>
        <Text style={styles.subtitle}>{order.projectTitle}</Text>

        <View style={{ marginTop: Spacing.xl }}>
          <AppInput
            label="Delivery Note"
            placeholder="Describe what you're delivering..."
            value={note}
            onChangeText={(text: string) => {
              setNote(text);
              if (error) setError('');
            }}
            multiline
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {success ? <Text style={styles.successText}>Delivery submitted! Progress updated.</Text> : null}

        <AppButton
          title="Submit Delivery"
          onPress={handleSubmit}
          loading={loading}
          style={{ marginTop: Spacing.md }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, paddingBottom: Spacing.xl },
  notFound: { textAlign: 'center', marginTop: Spacing.xl, color: Colors.textLight },
  title: { fontSize: FontSizes.heading, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: FontSizes.body, color: Colors.textLight, marginTop: Spacing.xs },
  errorText: { color: '#DC2626', fontSize: FontSizes.body - 2, marginTop: -Spacing.sm, marginBottom: Spacing.sm },
  successText: { color: '#16A34A', fontSize: FontSizes.body, fontWeight: '600', textAlign: 'center', marginTop: Spacing.sm },
});