export type NotificationType = 'message' | 'proposal_accepted' | 'project_completed' | 'review_received';

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'message',
    title: 'New message from Sarah Khan',
    body: 'Sounds good, I\'ll send the wireframes today.',
    time: '10:24 AM',
    read: false,
  },
  {
    id: 'n2',
    type: 'proposal_accepted',
    title: 'Proposal Accepted',
    body: 'Your proposal for "React Native developer needed" was accepted.',
    time: 'Yesterday',
    read: false,
  },
  {
    id: 'n3',
    type: 'project_completed',
    title: 'Project Completed',
    body: '"Blog Content Writing" has been marked as completed.',
    time: '2 days ago',
    read: true,
  },
  {
    id: 'n4',
    type: 'review_received',
    title: 'New Review Received',
    body: 'NovaTech left you a 5-star review.',
    time: '2 days ago',
    read: true,
  },
];