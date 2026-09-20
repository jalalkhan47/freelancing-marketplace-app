import { Stack } from 'expo-router';
import React from 'react';
import { FavoritesProvider } from '../context/FavoritesContext';
import { MessagesProvider } from '../context/MessagesContext';
import { NotificationsProvider } from '../context/NotificationsContext';
import { OrdersProvider } from '../context/OrdersContext';
import { ProposalsProvider } from '../context/ProposalsContext';
import { ReviewsProvider } from '../context/ReviewsContext';
import { UserProvider } from '../context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <FavoritesProvider>
        <ProposalsProvider>
          <OrdersProvider>
            <MessagesProvider>
              <NotificationsProvider>
                <ReviewsProvider>
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
                    <Stack.Screen name="my-orders" />
                    <Stack.Screen name="order/[id]" />
                    <Stack.Screen name="delivery/[id]" />
                    <Stack.Screen name="messages" />
                    <Stack.Screen name="chat/[id]" />
                    <Stack.Screen name="notifications" />
                    <Stack.Screen name="review/[id]" />
                  </Stack>
                </ReviewsProvider>
              </NotificationsProvider>
            </MessagesProvider>
          </OrdersProvider>
        </ProposalsProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}