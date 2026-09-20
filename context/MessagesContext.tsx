import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Conversation, CONVERSATIONS, Message } from '../data/messages';

type MessagesContextType = {
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
};

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);

  const sendMessage = (conversationId: string, text: string) => {
    const newMessage: Message = {
      id: 'msg' + Date.now(),
      senderId: 'me',
      text,
      time: 'Just now',
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, newMessage], lastMessage: text, time: 'Just now' }
          : c
      )
    );
  };

  const markAsRead = (conversationId: string) => {
    setConversations((prev) => prev.map((c) => (c.id === conversationId ? { ...c, unread: false } : c)));
  };

  return (
    <MessagesContext.Provider value={{ conversations, sendMessage, markAsRead }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
}