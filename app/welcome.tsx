import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { Colors, FontSizes, Spacing } from '../constants/AppTheme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600' }}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Hire top freelancers,{'\n'}fast and easy</Text>
        <Text style={styles.subtitle}>
          Connect with skilled professionals for any project, big or small.
        </Text>

        <AppButton
          title="Get Started"
          onPress={() => router.push('/register')}
          style={{ marginTop: Spacing.xl }}
        />
        <AppButton
          title="I already have an account"
          variant="outline"
          onPress={() => router.push('/login')}
          style={{ marginTop: Spacing.md }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageWrap: {
    height: '45%',
    backgroundColor: Colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.heading,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: FontSizes.subtitle,
    color: Colors.textLight,
    marginTop: Spacing.md,
    lineHeight: 22,
  },
});