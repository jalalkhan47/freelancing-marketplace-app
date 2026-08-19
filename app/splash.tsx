import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors, FontSizes, Spacing } from '../constants/AppTheme';

export default function SplashScreen() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>F</Text>
        </View>
        <Text style={styles.appName}>Freelance Hub</Text>
        <Text style={styles.tagline}>Find talent. Get work done.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    color: Colors.primary,
  },
  appName: {
    fontSize: FontSizes.heading,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
  },
  tagline: {
    fontSize: FontSizes.body,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Spacing.xs,
    opacity: 0.85,
  },
});