import { ChatListItem, ChatMessage } from './socketUtils';

// Mock data for chat listings
export const mockChatList: ChatListItem[] = [
  {
    profilePicture: null,
    jobId: '1001',
    jobTitle: 'Home Renovation Project',
    userName: 'John Carpenter',
    userId: '2001',
    isOnline: true,
    isBlocked: false,
    lastChatMessage: 'When can you start the project?',
    lastChatDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    newMessageCount: 2
  },
  {
    profilePicture: null,
    jobId: '1002',
    jobTitle: 'Plumbing Repair',
    userName: 'Mike Plumber',
    userId: '2002',
    isOnline: false,
    isBlocked: false,
    lastChatMessage: "I'll be there tomorrow at 9 AM",
    lastChatDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    newMessageCount: 0
  },
  {
    profilePicture: null,
    jobId: '1003',
    jobTitle: 'Yard Cleaning',
    userName: 'Garden Masters',
    userId: '2003',
    isOnline: true,
    isBlocked: false,
    lastChatMessage: 'The quote for your yard is $150',
    lastChatDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    newMessageCount: 1
  },
  {
    profilePicture: null,
    jobId: '1004',
    jobTitle: 'Electrical Wiring',
    userName: 'Electro Experts',
    userId: '2004',
    isOnline: false,
    isBlocked: false,
    lastChatMessage: 'Please send some pictures of the issue',
    lastChatDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    newMessageCount: 0
  },
  {
    profilePicture: null,
    jobId: '1005',
    jobTitle: 'Painting Service',
    userName: 'Color Pros',
    userId: '2005',
    isOnline: true,
    isBlocked: true,
    lastChatMessage: 'This conversation has been blocked',
    lastChatDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    newMessageCount: 0
  }
];

// Mock chat history for a specific conversation
export const getMockChatHistory = (jobId: string, senderId: string, receiverId: string): ChatMessage[] => {
  const baseTime = Date.now() - 1000 * 60 * 60 * 24; // 1 day ago
  
  return [
    {
      messageId: '1',
      jobId,
      jobTitle: 'Mock Job',
      userName: 'User',
      userId: receiverId,
      receiverId: senderId,
      isOnline: true,
      isBlocked: false,
      ChatDate: new Date(baseTime + 1000 * 60).toISOString(), 
      messageType: 'text',
      messageImages: [],
      audioFile: '',
      textMsg: "Hello, I'm interested in your service",
      replyToMessageId: null,
      editedAt: null,
      deleted: false,
      isSystemMessage: false,
      attachments: [],
      status: 'read',
    },
    {
      messageId: '2',
      jobId,
      jobTitle: 'Mock Job',
      userName: 'Provider',
      userId: senderId,
      receiverId: receiverId,
      isOnline: true,
      isBlocked: false,
      ChatDate: new Date(baseTime + 1000 * 60 * 5).toISOString(), 
      messageType: 'text',
      messageImages: [],
      audioFile: '',
      textMsg: 'Hi there! How can I help you?',
      replyToMessageId: null,
      editedAt: null,
      deleted: false,
      isSystemMessage: false,
      attachments: [],
      status: 'read',
    },
    {
      messageId: '3',
      jobId,
      jobTitle: 'Mock Job',
      userName: 'User',
      userId: receiverId,
      receiverId: senderId,
      isOnline: true,
      isBlocked: false,
      ChatDate: new Date(baseTime + 1000 * 60 * 10).toISOString(), 
      messageType: 'text',
      messageImages: [],
      audioFile: '',
      textMsg: 'I need a quote for my project',
      replyToMessageId: null,
      editedAt: null,
      deleted: false,
      isSystemMessage: false,
      attachments: [],
      status: 'read',
    },
    {
      messageId: '4',
      jobId,
      jobTitle: 'Mock Job',
      userName: 'Provider',
      userId: senderId,
      receiverId: receiverId,
      isOnline: true,
      isBlocked: false,
      ChatDate: new Date(baseTime + 1000 * 60 * 15).toISOString(), 
      messageType: 'text',
      messageImages: [],
      audioFile: '',
      textMsg: 'Sure, could you provide more details about what you need?',
      replyToMessageId: '3',
      editedAt: null,
      deleted: false,
      isSystemMessage: false,
      attachments: [],
      status: 'read',
    }
  ];
}; 