export type Milestone = {
  id: string;
  title: string;
  amount: string;
  status: 'Pending' | 'In Progress' | 'Completed';
};

export type Order = {
  id: string;
  projectTitle: string;
  clientName: string;
  freelancerName: string;
  budget: string;
  deadline: string;
  status: 'Active' | 'Completed' | 'Cancelled';
  progress: number;
  milestones: Milestone[];
};

export const ORDERS: Order[] = [
  {
    id: 'o1',
    projectTitle: 'Mobile App UI Redesign',
    clientName: 'Fitly Inc.',
    freelancerName: 'Sarah Khan',
    budget: '$300',
    deadline: 'Sep 20, 2026',
    status: 'Active',
    progress: 60,
    milestones: [
      { id: 'm1', title: 'Wireframes', amount: '$100', status: 'Completed' },
      { id: 'm2', title: 'UI Screens', amount: '$150', status: 'In Progress' },
      { id: 'm3', title: 'Final Handoff', amount: '$50', status: 'Pending' },
    ],
  },
  {
    id: 'o2',
    projectTitle: 'E-commerce App Development',
    clientName: 'ShopEase',
    freelancerName: 'Ahmed Raza',
    budget: '$1200',
    deadline: 'Oct 5, 2026',
    status: 'Active',
    progress: 30,
    milestones: [
      { id: 'm4', title: 'Cart & Checkout', amount: '$500', status: 'In Progress' },
      { id: 'm5', title: 'Payment Integration', amount: '$400', status: 'Pending' },
      { id: 'm6', title: 'Testing & Launch', amount: '$300', status: 'Pending' },
    ],
  },
  {
    id: 'o3',
    projectTitle: 'Blog Content Writing',
    clientName: 'NovaTech',
    freelancerName: 'Emily Chen',
    budget: '$50',
    deadline: 'Aug 28, 2026',
    status: 'Completed',
    progress: 100,
    milestones: [
      { id: 'm7', title: '5 Blog Posts', amount: '$50', status: 'Completed' },
    ],
  },
];