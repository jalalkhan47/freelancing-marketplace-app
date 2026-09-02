import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { Colors, FontSizes, Spacing } from '../constants/AppTheme';
import { addMyService } from './my-services';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600',
];

export default function CreateServiceScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; category?: string; price?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Service title is required.';
    if (!category.trim()) newErrors.category = 'Category is required.';
    if (!price.trim()) {
      newErrors.price = 'Price is required.';
    } else if (!/^\$?\d+$/.test(price.trim())) {
      newErrors.price = 'Enter a valid price (e.g. 50 or $50).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    setSuccess(false);
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      addMyService({
        id: 'my' + Date.now(),
        title: title.trim(),
        category: category.trim(),
        price: price.trim().startsWith('$') ? price.trim() : `$${price.trim()}`,
        imageUri: SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)],
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.back(), 800);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create a Service</Text>
        <Text style={styles.subtitle}>List a new service for clients to find.</Text>

        <View style={{ marginTop: Spacing.xl }}>
          <AppInput
            label="Service Title"
            placeholder="e.g. I will design a mobile app UI"
            value={title}
            onChangeText={(text: string) => {
              setTitle(text);
              if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
            }}
          />
          {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

          <AppInput
            label="Category"
            placeholder="e.g. Design"
            value={category}
            onChangeText={(text: string) => {
              setCategory(text);
              if (errors.category) setErrors((e) => ({ ...e, category: undefined }));
            }}
          />
          {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}

          <AppInput
            label="Price"
            placeholder="e.g. 100"
            keyboardType="numeric"
            value={price}
            onChangeText={(text: string) => {
              setPrice(text);
              if (errors.price) setErrors((e) => ({ ...e, price: undefined }));
            }}
          />
          {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}

          <AppInput
            label="Description"
            placeholder="Describe your service..."
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {success ? <Text style={styles.successText}>Service created!</Text> : null}

        <AppButton
          title="Create Service"
          onPress={handleCreate}
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
  title: { fontSize: FontSizes.heading, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: FontSizes.body, color: Colors.textLight, marginTop: Spacing.xs },
  errorText: {
    color: '#DC2626',
    fontSize: FontSizes.body - 2,
    marginTop: -Spacing.sm,
    marginBottom: Spacing.sm,
  },
  successText: {
    color: '#16A34A',
    fontSize: FontSizes.body,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});