export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  FILE = 'file',
  SYSTEM = 'system'
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

export interface Attachment {
  id: string;
  type: AttachmentType;
  url: string;
  name?: string;
  size?: number;
  thumbnailUrl?: string;
}

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
  jobId?: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
  role?: 'customer' | 'usta' | 'administrator';
}

export interface ChatRoom {
  id: string;
  jobId: string;
  jobTitle: string;
  otherUser: ChatUser;
  lastMessage?: Message;
  unreadCount: number;
  isBlocked: boolean;
  updatedAt: string;
  participants: ChatUser[];
}

export interface ChatPermissions {
  canInitiate: boolean;
  canSendMessage: boolean;
  canDeleteMessage: boolean;
  canEditMessage: boolean;
}