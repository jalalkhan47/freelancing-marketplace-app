import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Review, REVIEWS } from '../data/reviews';

type ReviewsContextType = {
  reviews: Review[];
  addReview: (rating: number, comment: string) => void;
};

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  const addReview = (rating: number, comment: string) => {
    const newReview: Review = {
      id: 'rev' + Date.now(),
      reviewerName: 'You',
      rating,
      comment,
      date: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
}