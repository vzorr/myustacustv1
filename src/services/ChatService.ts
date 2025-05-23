import { Message, ChatRoom, MessageType, MessageStatus, AttachmentType } from '../types/chat';
import { socketService } from './SocketService';
import { chatApiService } from './ChatApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MessageCallback = (message: Message) => void;
type StatusCallback = (messageId: string, status: MessageStatus) => void;
type TypingCallback = (userId: string, isTyping: boolean) => void;
type ConnectionCallback = (connected: boolean) => void;
type ErrorCallback = (error: any) => void;

class ChatService {
  private currentUserId: string | null = null;
  private currentUserRole: string | null = null;
  private currentConversationId: string | null = null;
  private messages: Map<string, Message[]> = new Map();
  private isInitialized = false;
  private token: string | null = null;

  // Initialize service
  async initialize(userId: string, userRole: string, token: string): Promise<void> {
    if (this.isInitialized && this.currentUserId === userId) return;

    this.currentUserId = userId;
    this.currentUserRole = userRole;
    this.token = token;
    
    chatApiService.setToken(token);
    await socketService.connect(token);
    
    this.isInitialized = true;
    
    // Store initialization data for recovery
    await AsyncStorage.setItem('chat_init', JSON.stringify({
      userId,
      userRole,
      token,
      timestamp: Date.now()
    }));
  }

  // Check if user can initiate chat (customer only)
  async canInitiateChat(jobId: string, ustaId: string): Promise<boolean> {
    if (this.currentUserRole !== 'customer') {
      return false;
    }
    return await chatApiService.canInitiateChat(jobId, ustaId);
  }

  // Initialize a new chat (customer only)
  async initializeChat(jobId: string, ustaId: string): Promise<string> {
    if (this.currentUserRole !== 'customer') {
      throw new Error('Only customers can initiate chats');
    }
    
    const result = await chatApiService.initializeChat(jobId, ustaId);
    return result.conversationId;
  }

  // Cleanup
  // async cleanup(): Promise<void> {
  //   if (this.currentConversationId) {
  //     this.leaveConversation();
  //   }
  //   socketService.disconnect();
  //   this.messages.clear();
  //   this.isInitialized = false;
  //   this.currentUserId = null;
  //   this.currentUserRole = null;
  //   this.token = null;
    
  //   await AsyncStorage.removeItem('chat_init');
  // }

  // Conversation management
  // async joinConversation(conversationId: string): Promise<void> {
  //   if (this.currentConversationId === conversationId) return;

  //   if (this.currentConversationId) {
  //     this.leaveConversation();
  //   }

  //   this.currentConversationId = conversationId;
  //   socketService.joinConversation(conversationId);
    
  //   // Load initial messages
  //   await this.loadMessages(conversationId);
    
  //   // Store current conversation
  //   await AsyncStorage.setItem('current_conversation', conversationId);
  // }

  // leaveConversation(): void {
  //   if (!this.currentConversationId) return;
    
  //   socketService.leaveConversation(this.currentConversationId);
  //   this.currentConversationId = null;
    
  //   AsyncStorage.removeItem('current_conversation');
  // }

  // Messages
  async loadMessages(conversationId: string, page: number = 1): Promise<Message[]> {
    try {
      const result = await chatApiService.getMessages(conversationId, page);
      
      if (page === 1) {
        this.messages.set(conversationId, result.messages);
      } else {
        const existing = this.messages.get(conversationId) || [];
        // Avoid duplicates
        const newMessages = result.messages.filter(
          msg => !existing.find(e => e.id === msg.id)
        );
        this.messages.set(conversationId, [...existing, ...newMessages]);
      }
      
      return this.messages.get(conversationId) || [];
    } catch (error) {
      console.error('Error loading messages:', error);
      throw error;
    }
  }

  async sendMessage(
    conversationId: string, 
    content: string, 
    receiverId: string, 
    replyTo?: string
  ): Promise<void> {
    if (!this.currentUserId) throw new Error('User not initialized');

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const message: Message = {
      id: tempId,
      senderId: this.currentUserId,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      type: MessageType.TEXT,
      status: MessageStatus.SENDING,
      replyTo,
      roomId: conversationId,
      jobId: undefined // Will be set by backend
    };

    // Add to local messages immediately for optimistic UI
    const roomMessages = this.messages.get(conversationId) || [];
    roomMessages.unshift(message);
    this.messages.set(conversationId, roomMessages);

    try {
      socketService.sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
      message.status = MessageStatus.FAILED;
      this.updateMessageInStore(conversationId, message);
      throw error;
    }
  }

  async sendAttachment(
    conversationId: string, 
    file: any, 
    type: AttachmentType, 
    receiverId: string
  ): Promise<void> {
    if (!this.currentUserId) throw new Error('User not initialized');

    try {
      // Upload file first
      const attachment = await chatApiService.uploadFile(file, type);
      
      const message: Message = {
        id: `temp-${Date.now()}-${Math.random()}`,
        senderId: this.currentUserId,
        receiverId,
        content: attachment.name || '',
        timestamp: new Date().toISOString(),
        type:  MessageType.TEXT,
        status: MessageStatus.SENDING,
        attachments: [attachment],
        roomId: conversationId,
        jobId: undefined
      };

      // Add to local messages
      const roomMessages = this.messages.get(conversationId) || [];
      roomMessages.unshift(message);
      this.messages.set(conversationId, roomMessages);

      socketService.sendMessage(message);

    } catch (error) {
      console.error('Failed to send attachment:', error);
      throw error;
    }
  }

  async markAsRead(conversationId: string, messageIds?: string[]): Promise<void> {
    try {
      await chatApiService.markAsRead(conversationId, messageIds);
      if (messageIds) {
        // socketService.markAsRead(messageIds, conversationId);
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  }

  // Get messages for a conversation
  getMessages(conversationId: string): Message[] {
    return this.messages.get(conversationId) || [];
  }

  // Chat rooms
  async getChatRooms(page: number = 1): Promise<ChatRoom[]> {
    try {
      const result = await chatApiService.getChatRooms(page);
      return result.rooms;
    } catch (error) {
      console.error('Error getting chat rooms:', error);
      throw error;
    }
  }

  // Typing indicators
  sendTypingStatus(conversationId: string, receiverId: string, isTyping: boolean): void {
    socketService.sendTypingStatus(conversationId, receiverId, isTyping);
  }

  // Event listeners
  onMessage(callback: MessageCallback): () => void {
    return socketService.on('message_received', (message: Message) => {
      // Add to local store
      const roomMessages = this.messages.get(message.roomId) || [];
      
      // Check if message already exists (avoid duplicates)
      const exists = roomMessages.find(m => m.id === message.id);
      if (!exists) {
        roomMessages.unshift(message);
        this.messages.set(message.roomId, roomMessages);
      }
      
      callback(message);
    });
  }

  onMessageSent(callback: (messageId: string, conversationId: string) => void): () => void {
    return socketService.on('message_sent', callback);
  }

  onMessageRead(callback: StatusCallback): () => void {
    return socketService.on('message_read', (messageId: string) => {
      this.updateMessageStatus(messageId, MessageStatus.READ);
      callback(messageId, MessageStatus.READ);
    });
  }

  onMessageUpdated(callback: (messageId: string, content: any) => void): () => void {
    return socketService.on('message_updated', callback);
  }

  onMessageDeleted(callback: (messageId: string) => void): () => void {
    return socketService.on('message_deleted', callback);
  }

  onTyping(callback: TypingCallback): () => void {
    return socketService.on('typing', callback);
  }

  onUserStatusChange(callback: (userId: string, isOnline: boolean) => void): () => void {
    return socketService.on('user_status', callback);
  }

  onConnectionChange(callback: ConnectionCallback): () => void {
    return socketService.on('connection_change', callback);
  }

  onError(callback: ErrorCallback): () => void {
    return socketService.on('socket_error', callback);
  }

  onAddedToConversation(callback: (conversation: any) => void): () => void {
    return socketService.on('added_to_conversation', callback);
  }

  isConnected(): boolean {
    return socketService.isConnected();
  }

  // Recovery methods
  async recoverSession(): Promise<boolean> {
    try {
      const initData = await AsyncStorage.getItem('chat_init');
      if (!initData) return false;

      const { userId, userRole, token, timestamp } = JSON.parse(initData);
      
      // Check if session is still valid (24 hours)
      if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
        await AsyncStorage.removeItem('chat_init');
        return false;
      }

      await this.initialize(userId, userRole, token);
      
      // Recover current conversation if any
      const currentConv = await AsyncStorage.getItem('current_conversation');
      if (currentConv) {
        // await this.joinConversation(currentConv);
      }

      return true;
    } catch (error) {
      console.error('Error recovering session:', error);
      return false;
    }
  }

  // Private helpers
  private updateMessageInStore(conversationId: string, updatedMessage: Message): void {
    const roomMessages = this.messages.get(conversationId);
    if (!roomMessages) return;

    const index = roomMessages.findIndex(m => m.id === updatedMessage.id);
    if (index !== -1) {
      roomMessages[index] = updatedMessage;
      this.messages.set(conversationId, roomMessages);
    }
  }

  private updateMessageStatus(messageId: string, status: MessageStatus): void {
    for (const [conversationId, messages] of this.messages.entries()) {
      const message = messages.find(m => m.id === messageId);
      if (message) {
        message.status = status;
        this.updateMessageInStore(conversationId, message);
        break;
      }
    }
  }
}

export const chatService = new ChatService();