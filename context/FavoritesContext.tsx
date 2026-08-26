import React, { createContext, ReactNode, useContext, useState } from 'react';

type FavoritesContextType = {
  favoriteFreelancers: string[];
  favoriteServices: string[];
  toggleFavoriteFreelancer: (id: string) => void;
  toggleFavoriteService: (id: string) => void;
  isFreelancerFavorite: (id: string) => boolean;
  isServiceFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteFreelancers, setFavoriteFreelancers] = useState<string[]>([]);
  const [favoriteServices, setFavoriteServices] = useState<string[]>([]);

  const toggleFavoriteFreelancer = (id: string) => {
    setFavoriteFreelancers((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleFavoriteService = (id: string) => {
    setFavoriteServices((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFreelancerFavorite = (id: string) => favoriteFreelancers.includes(id);
  const isServiceFavorite = (id: string) => favoriteServices.includes(id);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteFreelancers,
        favoriteServices,
        toggleFavoriteFreelancer,
        toggleFavoriteService,
        isFreelancerFavorite,
        isServiceFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}