import { Stack } from 'expo-router';
import React from 'react';
import { FavoritesProvider } from '../context/FavoritesContext';
import { UserProvider } from '../context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
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
          <Stack.Screen name="profile" />
          <Stack.Screen name="edit-profile" />
        </Stack>
      </FavoritesProvider>
    </UserProvider>
  );
}