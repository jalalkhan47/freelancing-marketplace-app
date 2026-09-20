export type Message = {
  id: string;
  senderId: 'me' | 'them';
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  avatarUri: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: Message[];
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Sarah Khan',
    avatarUri: 'https://i.pravatar.cc/150?img=47',
    lastMessage: 'Sounds good, I\'ll send the wireframes today.',
    time: '10:24 AM',
    unread: true,
    messages: [
      { id: 'm1', senderId: 'them', text: 'Hi! Just checking in on the project.', time: '10:10 AM' },
      { id: 'm2', senderId: 'me', text: 'Hey Sarah, things are going well!', time: '10:15 AM' },
      { id: 'm3', senderId: 'them', text: 'Sounds good, I\'ll send the wireframes today.', time: '10:24 AM' },
    ],
  },
  {
    id: 'c2',
    name: 'Ahmed Raza',
    avatarUri: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Thanks for the update!',
    time: 'Yesterday',
    unread: false,
    messages: [
      { id: 'm4', senderId: 'me', text: 'Pushed the latest build, please check.', time: 'Yesterday' },
      { id: 'm5', senderId: 'them', text: 'Thanks for the update!', time: 'Yesterday' },
    ],
  },
  {
    id: 'c3',
    name: 'Emily Chen',
    avatarUri: 'https://i.pravatar.cc/150?img=32',
    lastMessage: 'The blog posts are ready for review.',
    time: '2 days ago',
    unread: true,
    messages: [
      { id: 'm6', senderId: 'them', text: 'The blog posts are ready for review.', time: '2 days ago' },
    ],
  },
];