export type Review = {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
};

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    reviewerName: 'NovaTech',
    rating: 5,
    comment: 'Excellent work, delivered on time and communicated clearly throughout.',
    date: 'Aug 30, 2026',
  },
  {
    id: 'r2',
    reviewerName: 'Fitly Inc.',
    rating: 4,
    comment: 'Good quality design work, would hire again.',
    date: 'Aug 22, 2026',
  },
  {
    id: 'r3',
    reviewerName: 'ShopEase',
    rating: 5,
    comment: 'Very professional and responsive. Highly recommended.',
    date: 'Aug 10, 2026',
  },
];