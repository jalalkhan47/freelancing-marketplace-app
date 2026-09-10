export type Job = {
  id: string;
  title: string;
  category: string;
  budget: string;
  budgetType: 'Fixed' | 'Hourly';
  description: string;
  postedBy: string;
  postedAt: string;
  skills: string[];
};

export const JOB_CATEGORIES = ['All', 'Design', 'Development', 'Writing', 'Marketing', 'Video'];

export const JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Need a mobile app UI redesign',
    category: 'Design',
    budget: '$300',
    budgetType: 'Fixed',
    description: 'Looking for a UI/UX designer to redesign our existing fitness tracking app. Need modern, clean screens in Figma with a full design system.',
    postedBy: 'Fitly Inc.',
    postedAt: '2 hours ago',
    skills: ['Figma', 'UI Design', 'Mobile Design'],
  },
  {
    id: 'j2',
    title: 'React Native developer needed for e-commerce app',
    category: 'Development',
    budget: '$25/hr',
    budgetType: 'Hourly',
    description: 'We need an experienced React Native developer to build a shopping cart and checkout flow with Stripe integration.',
    postedBy: 'ShopEase',
    postedAt: '5 hours ago',
    skills: ['React Native', 'Stripe', 'TypeScript'],
  },
  {
    id: 'j3',
    title: 'Blog writer for tech startup',
    category: 'Writing',
    budget: '$50',
    budgetType: 'Fixed',
    description: 'Need 5 SEO-optimized blog posts about AI trends, around 1000 words each, for our company blog.',
    postedBy: 'NovaTech',
    postedAt: '1 day ago',
    skills: ['SEO Writing', 'Tech Writing'],
  },
  {
    id: 'j4',
    title: 'Facebook ads campaign manager',
    category: 'Marketing',
    budget: '$150',
    budgetType: 'Fixed',
    description: 'Looking for someone to set up and manage a 2-week Facebook ad campaign for a new product launch.',
    postedBy: 'BrightBrand',
    postedAt: '2 days ago',
    skills: ['Facebook Ads', 'Analytics'],
  },
  {
    id: 'j5',
    title: 'YouTube video editor needed weekly',
    category: 'Video',
    budget: '$20/hr',
    budgetType: 'Hourly',
    description: 'Ongoing weekly video editing for a YouTube channel — cuts, transitions, captions, thumbnails.',
    postedBy: 'CreatorHub',
    postedAt: '3 days ago',
    skills: ['Premiere Pro', 'Thumbnails'],
  },
];