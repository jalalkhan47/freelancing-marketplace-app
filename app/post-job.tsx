import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { Colors, FontSizes, Spacing } from '../constants/AppTheme';

export default function PostJobScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; category?: string; budget?: string; description?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Job title is required.';
    if (!category.trim()) newErrors.category = 'Category is required.';
    if (!budget.trim()) {
      newErrors.budget = 'Budget is required.';
    } else if (!/^\$?\d+$/.test(budget.trim())) {
      newErrors.budget = 'Enter a valid budget (e.g. 200).';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    } else if (description.trim().length < 20) {
      newErrors.description = 'Write at least 20 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePost = () => {
    setSuccess(false);
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.back(), 800);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Post a Job</Text>
        <Text style={styles.subtitle}>Find the right freelancer for your project.</Text>

        <View style={{ marginTop: Spacing.xl }}>
          <AppInput
            label="Job Title"
            placeholder="e.g. Need a logo designer"
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
            label="Budget ($)"
            placeholder="e.g. 200"
            keyboardType="numeric"
            value={budget}
            onChangeText={(text: string) => {
              setBudget(text);
              if (errors.budget) setErrors((e) => ({ ...e, budget: undefined }));
            }}
          />
          {errors.budget ? <Text style={styles.errorText}>{errors.budget}</Text> : null}

          <AppInput
            label="Description"
            placeholder="Describe the job in detail..."
            value={description}
            onChangeText={(text: string) => {
              setDescription(text);
              if (errors.description) setErrors((e) => ({ ...e, description: undefined }));
            }}
            multiline
          />
          {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
        </View>

        {success ? <Text style={styles.successText}>Job posted successfully!</Text> : null}

        <AppButton
          title="Post Job"
          onPress={handlePost}
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
    color: '#DC2626', fontSize: FontSizes.body - 2, marginTop: -Spacing.sm, marginBottom: Spacing.sm,
  },
  successText: {
    color: '#16A34A', fontSize: FontSizes.body, fontWeight: '600', textAlign: 'center', marginTop: Spacing.sm,
  },
});