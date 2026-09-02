import { Stack } from 'expo-router';
import React from 'react';
import { FavoritesProvider } from '../context/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="freelancer/[id]" />
        <Stack.Screen name="service/[id]" />
      </Stack>
    </FavoritesProvider>
  );
}