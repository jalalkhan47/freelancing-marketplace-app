import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { Colors, FontSizes, Spacing } from '../../constants/AppTheme';
import { useProposals } from '../../context/ProposalsContext';
import { JOBS } from '../../data/jobs';

export default function SubmitProposalScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addProposal } = useProposals();

  const job = JOBS.find((j) => j.id === id);

  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ coverLetter?: string; bidAmount?: string }>({});

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Job not found.</Text>
      </SafeAreaView>
    );
  }

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required.';
    } else if (coverLetter.trim().length < 20) {
      newErrors.coverLetter = 'Write at least 20 characters.';
    }
    if (!bidAmount.trim()) {
      newErrors.bidAmount = 'Bid amount is required.';
    } else if (!/^\$?\d+$/.test(bidAmount.trim())) {
      newErrors.bidAmount = 'Enter a valid amount (e.g. 100).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setSuccess(false);
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      addProposal({
        jobId: job.id,
        jobTitle: job.title,
        coverLetter: coverLetter.trim(),
        bidAmount: bidAmount.trim().startsWith('$') ? bidAmount.trim() : `$${bidAmount.trim()}`,
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.replace('/my-proposals' as any), 800);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Submit a Proposal</Text>
        <Text style={styles.subtitle}>{job.title}</Text>

        <View style={{ marginTop: Spacing.xl }}>
          <AppInput
            label="Cover Letter"
            placeholder="Explain why you're a great fit for this job..."
            value={coverLetter}
            onChangeText={(text: string) => {
              setCoverLetter(text);
              if (errors.coverLetter) setErrors((e) => ({ ...e, coverLetter: undefined }));
            }}
            multiline
          />
          {errors.coverLetter ? <Text style={styles.errorText}>{errors.coverLetter}</Text> : null}

          <AppInput
            label="Your Bid ($)"
            placeholder="e.g. 250"
            keyboardType="numeric"
            value={bidAmount}
            onChangeText={(text: string) => {
              setBidAmount(text);
              if (errors.bidAmount) setErrors((e) => ({ ...e, bidAmount: undefined }));
            }}
          />
          {errors.bidAmount ? <Text style={styles.errorText}>{errors.bidAmount}</Text> : null}
        </View>

        {success ? <Text style={styles.successText}>Proposal submitted!</Text> : null}

        <AppButton
          title="Submit Proposal"
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
  errorText: {
    color: '#DC2626', fontSize: FontSizes.body - 2, marginTop: -Spacing.sm, marginBottom: Spacing.sm,
  },
  successText: {
    color: '#16A34A', fontSize: FontSizes.body, fontWeight: '600', textAlign: 'center', marginTop: Spacing.sm,
  },
});