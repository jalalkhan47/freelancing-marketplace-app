export type Freelancer = {
  id: string;
  name: string;
  role: string;
  category: string;
  rating: number;
  price: string;
  avatarUri: string;
  bio: string;
  skills: string[];
  completedJobs: number;
};

export type Service = {
  id: string;
  freelancerId: string;
  title: string;
  category: string;
  price: string;
  rating: number;
  imageUri: string;
  description: string;
};

export const CATEGORIES = ['All', 'Design', 'Development', 'Writing', 'Marketing', 'Video'];

export const FREELANCERS: Freelancer[] = [
  {
    id: '1',
    name: 'Sarah Khan',
    role: 'UI/UX Designer',
    category: 'Design',
    rating: 4.9,
    price: '$25/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=47',
    bio: 'Passionate UI/UX designer with 5+ years of experience creating clean, user-friendly mobile and web interfaces.',
    skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
    completedJobs: 87,
  },
  {
    id: '2',
    name: 'Ahmed Raza',
    role: 'Full Stack Developer',
    category: 'Development',
    rating: 4.8,
    price: '$30/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=12',
    bio: 'Full stack developer specializing in React Native and Node.js. I build scalable apps from scratch.',
    skills: ['React Native', 'Node.js', 'MongoDB', 'TypeScript'],
    completedJobs: 62,
  },
  {
    id: '3',
    name: 'Emily Chen',
    role: 'Content Writer',
    category: 'Writing',
    rating: 4.7,
    price: '$18/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=32',
    bio: 'Content writer with a knack for storytelling. I write blogs, product copy, and SEO content.',
    skills: ['SEO Writing', 'Copywriting', 'Blogging'],
    completedJobs: 104,
  },
  {
    id: '4',
    name: 'Bilal Ahmed',
    role: 'Digital Marketer',
    category: 'Marketing',
    rating: 4.6,
    price: '$20/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=15',
    bio: 'Digital marketing strategist helping brands grow through paid ads and social media campaigns.',
    skills: ['Facebook Ads', 'Google Ads', 'Analytics'],
    completedJobs: 45,
  },
  {
    id: '5',
    name: 'Sophia Lee',
    role: 'Video Editor',
    category: 'Video',
    rating: 5.0,
    price: '$28/hr',
    avatarUri: 'https://i.pravatar.cc/150?img=48',
    bio: 'Professional video editor for YouTube, ads, and short-form content. Fast turnaround guaranteed.',
    skills: ['Premiere Pro', 'After Effects', 'Color Grading'],
    completedJobs: 71,
  },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    freelancerId: '1',
    title: 'I will design a modern mobile app UI',
    category: 'Design',
    price: '$150',
    rating: 4.9,
    imageUri: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600',
    description: 'I will create a clean, modern UI design for your mobile app in Figma, including a full design system and prototype.',
  },
  {
    id: 's2',
    freelancerId: '2',
    title: 'I will build a React Native mobile app',
    category: 'Development',
    price: '$400',
    rating: 4.8,
    imageUri: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600',
    description: 'Full React Native app development with backend integration, authentication, and deployment support.',
  },
  {
    id: 's3',
    freelancerId: '3',
    title: 'I will write SEO-optimized blog articles',
    category: 'Writing',
    price: '$40',
    rating: 4.7,
    imageUri: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600',
    description: 'High-quality, SEO-friendly blog posts tailored to your niche, researched and written from scratch.',
  },
  {
    id: 's4',
    freelancerId: '4',
    title: 'I will manage your Facebook ad campaigns',
    category: 'Marketing',
    price: '$120',
    rating: 4.6,
    imageUri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    description: 'End-to-end Facebook & Instagram ad campaign setup, targeting, and optimization for better ROI.',
  },
  {
    id: 's5',
    freelancerId: '5',
    title: 'I will edit your YouTube videos professionally',
    category: 'Video',
    price: '$60',
    rating: 5.0,
    imageUri: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600',
    description: 'Professional video editing with transitions, color grading, and sound design for YouTube content.',
  },
];