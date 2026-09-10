import { Stack } from 'expo-router';
import React from 'react';
import { FavoritesProvider } from '../context/FavoritesContext';
import { ProposalsProvider } from '../context/ProposalsContext';
import { UserProvider } from '../context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <FavoritesProvider>
        <ProposalsProvider>
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
            <Stack.Screen name="freelancer-profile" />
            <Stack.Screen name="my-services" />
            <Stack.Screen name="create-service" />
            <Stack.Screen name="find-jobs" />
            <Stack.Screen name="job/[id]" />
            <Stack.Screen name="post-job" />
            <Stack.Screen name="submit-proposal/[id]" />
            <Stack.Screen name="my-proposals" />
          </Stack>
        </ProposalsProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}