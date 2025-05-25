// types/chat.ts - Complete updated chat types based on latest ChatService

// Enums
export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  FILE = 'file',
  ATTACHMENT = 'attachment',
}

export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

export enum AttachmentType {
  IMAGE = 'image',
  AUDIO = 'audio',
  FILE = 'file',
}

// Interfaces
export interface Attachment {
  id: string;
  type: AttachmentType;
  url: string;
  name: string;
  size: number;
  thumbnail?: string;
  mimeType?: string;
  duration?: number; // For audio files
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: MessageType | string;
  status: MessageStatus;
  replyTo?: string;
  attachments?: Attachment[];
  conversationId: string;
  jobId?: string;
  isEdited?: boolean;
  editedAt?: string;
  clientTempId: string;
 
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
  role?: string; // 'customer' | 'usta'
}

export interface ChatConversation {
  id: string;
  jobId: string;
  jobTitle: string;
  otherUser: ChatUser;
  lastMessage?: Message;
  unreadCount: number;
  isBlocked: boolean;
  updatedAt: string;
  participants: ChatUser[];
  createdAt?: string;
  isPinned?: boolean;
  isMuted?: boolean;
}

// API Response Types
export interface ConversationListResponse {
  conversations: ChatConversation[];
  hasMore: boolean;
  total: number;
  page?: number;
  limit?: number;
}

export interface MessageListResponse {
  messages: Message[];
  hasMore: boolean;
  total: number;
  page?: number;
  limit?: number;
}

export interface InitializeChatResponse {
  conversationId: string;
  canInitiate: boolean;
  message?: string;
}

export interface UploadFileResponse {
  success: boolean;
  file: {
    id: string;
    url: string;
    name: string;
    size: number;
    mimeType: string;
  };
  message?: string;
}

// Socket Event Types
export interface SocketMessage {
  messageId: string;
  clientTempId: string;
  jobId: string;
  conversationId: string;
  userId: string;
  receiverId: string;
  textMsg: string;
  messageType: string;
  timestamp: string;
  attachments: Attachment[];
  replyToMessageId?: string;
}

export interface TypingEvent {
  conversationId: string;
  userId: string;
  receiverId: string;
  isTyping: boolean;
}

export interface UserStatusEvent {
  userId: string;
  isOnline: boolean;
  lastSeen?: string;
}

// Session Types
export interface ChatSession {
  userId: string;
  userRole: string;
  token: string;
  timestamp: number;
}

export interface LastActiveConversation {
  conversationId: string;
  timestamp: number;
}

// Hook Types
export interface UseChatProps {
  jobId: string;
  receiverId: string;
  conversationId?: string;
}

export interface UseChatReturn {
  conversationId: string;
  messages: Message[];
  loading: boolean;
  connected: boolean;
  sending: boolean;
  error: string | null;
  typing: { [userId: string]: boolean };
  sendMessage: (text: string, replyTo?: string) => Promise<void>;
  sendAttachment: (file: any, type: AttachmentType) => Promise<void>;
  sendTypingStatus: (isTyping: boolean) => void;
  loadMore: () => Promise<void>;
  markAsRead: () => Promise<void>;
}

export interface UseConversationsReturn {
  conversations: ChatConversation[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  hasMore: boolean;
  searchTerm: string;
  totalUnread: number;
  unreadConversations: ChatConversation[];
  refresh: () => void;
  loadMore: () => void;
  search: (term: string) => void;
  markConversationAsRead: (conversationId: string) => Promise<void>;
}

// Service Method Types
export interface ChatServiceInterface {
  // Initialization
  initialize(userId: string, userRole: string, token: string): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  recoverSession(): Promise<boolean>;

  // Conversation Management
  startConversation(jobId: string, ustaId: string): Promise<string>;
  getMyConversations(page?: number): Promise<ConversationListResponse>;
  getUnreadConversations(): Promise<ChatConversation[]>;
  getTotalUnreadCount(): Promise<number>;
  searchConversations(searchTerm: string): Promise<ChatConversation[]>;
  canInitiateChat(jobId: string, ustaId: string): Promise<boolean>;

  // Message Management
  loadMessages(conversationId: string, page?: number): Promise<Message[]>;
  sendTextMessage(conversationId: string, text: string, receiverId: string, replyTo?: string): Promise<void>;
  sendAttachment(conversationId: string, file: any, type: AttachmentType, receiverId: string): Promise<void>;
  markMessagesAsRead(conversationId: string, messageIds?: string[]): Promise<void>;
  getLocalMessages(conversationId: string): Message[];

  // Real-time Features
  sendTypingIndicator(conversationId: string, receiverId: string, isTyping: boolean): void;
  
  // Event Listeners
  onNewMessage(callback: (message: Message) => void): () => void;
  onMessageSent(callback: (messageId: string, conversationId: string) => void): () => void;
  onMessageRead(callback: (messageId: string, status: MessageStatus) => void): () => void;
  onMessageUpdated(callback: (messageId: string, content: any) => void): () => void;
  onMessageDeleted(callback: (messageId: string) => void): () => void;
  onTyping(callback: (userId: string, isTyping: boolean) => void): () => void;
  onUserStatusChange(callback: (userId: string, isOnline: boolean) => void): () => void;
  onConnectionChange(callback: (connected: boolean) => void): () => void;
  onError(callback: (error: any) => void): () => void;
  onAddedToConversation(callback: (conversation: any) => void): () => void;
}

// Component Props Types
export interface ChatInboxProps {
  jobId: string;
  jobTitle: string;
  userName: string;
  isOnline: boolean;
  isBlocked: boolean;
  messages: Message[];
  sending: boolean;
  connected: boolean;
  typing: { [userId: string]: boolean };
  conversationId?: string;
  currentUserId?: string;
  onSendMessage: (content: string, replyTo?: string) => void;
  onSendAttachment: (file: any, type: AttachmentType) => void;
  onLoadMore: () => void;
  onTyping: (isTyping: boolean) => void;
  navigation: any;
}

export interface ChatListProps {
  conversations: ChatConversation[];
  loading: boolean;
  refreshing: boolean;
  totalUnread: number;
  searchText: string;
  onConversationPress: (conversation: ChatConversation) => void;
  onRefresh: () => void;
  onLoadMore: () => void;
  onSearch: (text: string) => void;
  navigation: any;
}

export interface MessageItemProps {
  message: Message;
  onReply: (message: Message) => void;
  onProfilePress: () => void;
  currentUserId?: string;
}

// Navigation Types
export interface ChatData {
  otherUserId: string;
  jobId: string;
  jobTitle: string;
  userName: string;
  isOnline: boolean;
  isBlocked: boolean;
  conversationId?: string;
}

// File/Attachment Types
export interface FilePickerResult {
  uri: string;
  type: string;
  name: string;
  size: number;
}

export interface AudioRecordingResult {
  uri: string;
  duration: number;
  size: number;
  name: string;
}

// Error Types
export interface ChatError {
  code: string;
  message: string;
  details?: any;
}

// Notification Types
export interface ChatNotification {
  conversationId: string;
  messageId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'message' | 'typing' | 'status';
}