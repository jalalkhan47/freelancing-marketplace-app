import React, { createContext, ReactNode, useContext, useState } from 'react';

export type UserProfile = {
  name: string;
  email: string;
  bio: string;
  role: string;
  avatarUri: string;
};

type UserContextType = {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
};

const defaultUser: UserProfile = {
  name: 'Jalal Khan',
  email: 'jalal@example.com',
  bio: 'Aspiring freelancer and developer.',
  role: 'Freelancer',
  avatarUri: 'https://i.pravatar.cc/150?img=68',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}