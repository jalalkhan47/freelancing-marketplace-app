import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../../constants/AppTheme';
import { useMessages } from '../../context/MessagesContext';

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { conversations, sendMessage, markAsRead } = useMessages();
  const [text, setText] = useState('');

  const conversation = conversations.find((c) => c.id === id);

  useEffect(() => {
    if (conversation && conversation.unread) {
      markAsRead(conversation.id);
    }
  }, [conversation?.id]);

  if (!conversation) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Conversation not found.</Text>
      </SafeAreaView>
    );
  }

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(conversation.id, text.trim());
    setText('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Image source={{ uri: conversation.avatarUri }} style={styles.headerAvatar} />
        <Text style={styles.headerTitle} numberOfLines={1}>{conversation.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={conversation.messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.bubbleRow, item.senderId === 'me' ? styles.bubbleRowMe : styles.bubbleRowThem]}>
              <View style={[styles.bubble, item.senderId === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={[styles.bubbleText, item.senderId === 'me' && styles.bubbleTextMe]}>{item.text}</Text>
              </View>
              <Text style={styles.bubbleTime}>{item.time}</Text>
            </View>
          )}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.textLight}
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={20} color={Colors.white} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: { textAlign: 'center', marginTop: Spacing.xl, color: Colors.textLight },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, marginLeft: Spacing.sm, backgroundColor: Colors.surface },
  headerTitle: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.text, flex: 1, marginLeft: Spacing.sm },
  listContent: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  bubbleRow: { marginBottom: Spacing.md, maxWidth: '80%' },
  bubbleRowMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubbleRowThem: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { borderRadius: Radius.lg, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  bubbleMe: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: FontSizes.body, color: Colors.text },
  bubbleTextMe: { color: Colors.white },
  bubbleTime: { fontSize: FontSizes.body - 3, color: Colors.textLight, marginTop: 4 },
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.background,
  },
  input: {
    flex: 1, maxHeight: 100, backgroundColor: Colors.white, borderRadius: Radius.lg, borderWidth: 1,
    borderColor: Colors.border, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    fontSize: FontSizes.body, marginRight: Spacing.sm,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
});