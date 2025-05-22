export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: MessageType;
  status: MessageStatus;
  replyTo?: string;
  attachments?: Attachment[];
  roomId: string;
}

export interface Attachment {
  id: string;
  type: AttachmentType;
  url: string;
  name?: string;
  size?: number;
  duration?: number;
}

export interface ChatRoom {
  id: string;
  jobId: string;
  jobTitle: string;
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  };
  lastMessage?: Message;
  unreadCount: number;
  isBlocked: boolean;
  updatedAt: string;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  FILE = 'file'
}

export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed'
}

export enum AttachmentType {
  IMAGE = 'image',
  AUDIO = 'audio',
  FILE = 'file'
}