import { Message, ChatRoom, MessageType, MessageStatus, AttachmentType } from '../types/chat';
import { socketService } from './SocketService';
import { chatApiService } from './ChatApiService';

type MessageCallback = (message: Message) => void;
type StatusCallback = (messageId: string, status: MessageStatus) => void;
type TypingCallback = (userId: string, isTyping: boolean) => void;
type ConnectionCallback = (connected: boolean) => void;

class ChatService {
  private currentUserId: string | null = null;
  private currentRoomId: string | null = null;
  private messages: Map<string, Message[]> = new Map();
  private isInitialized = false;

  // Initialize service
  async initialize(userId: string, token: string): Promise<void> {
    if (this.isInitialized && this.currentUserId === userId) return;

    this.currentUserId = userId;
    chatApiService.setToken(token);
    
    await socketService.connect(userId);
    this.isInitialized = true;
  }

  // Cleanup
  cleanup(): void {
    if (this.currentRoomId) {
      this.leaveRoom();
    }
    socketService.disconnect();
    this.messages.clear();
    this.isInitialized = false;
    this.currentUserId = null;
  }

  // Room management
  async joinRoom(roomId: string, receiverId: string): Promise<void> {
    if (this.currentRoomId === roomId) return;

    if (this.currentRoomId) {
      this.leaveRoom();
    }

    this.currentRoomId = roomId;
    socketService.joinRoom(roomId, receiverId);
    
    // Load initial messages
    await this.loadMessages(roomId);
  }

  leaveRoom(): void {
    if (!this.currentRoomId || !this.currentUserId) return;
    
    // We don't have receiverId here, but socket service should handle it
    socketService.leaveRoom(this.currentRoomId, '');
    this.currentRoomId = null;
  }

  // Messages
  async loadMessages(roomId: string, page: number = 1): Promise<Message[]> {
    try {
      const result = await chatApiService.getMessages(roomId, page);
      
      if (page === 1) {
        this.messages.set(roomId, result.messages);
      } else {
        const existing = this.messages.get(roomId) || [];
        this.messages.set(roomId, [...existing, ...result.messages]);
      }
      
      return this.messages.get(roomId) || [];
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  }

  async sendMessage(roomId: string, content: string, receiverId: string, replyTo?: string): Promise<void> {
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
      roomId
    };

    // Add to local messages immediately
    const roomMessages = this.messages.get(roomId) || [];
    roomMessages.unshift(message);
    this.messages.set(roomId, roomMessages);

    try {
      socketService.sendMessage(message);
      
      // Update status to sent
      message.status = MessageStatus.SENT;
      this.updateMessageInStore(roomId, message);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      message.status = MessageStatus.FAILED;
      this.updateMessageInStore(roomId, message);
      throw error;
    }
  }

  async sendAttachment(roomId: string, file: any, type: AttachmentType, receiverId: string): Promise<void> {
    if (!this.currentUserId) throw new Error('User not initialized');

    try {
      const attachment = await chatApiService.uploadFile(file, type);
      
      const message: Message = {
        id: `msg-${Date.now()}-${Math.random()}`,
        senderId: this.currentUserId,
        receiverId,
        content: attachment.name || '',
        timestamp: new Date().toISOString(),
        type: type as MessageType,
        status: MessageStatus.SENDING,
        attachments: [attachment],
        roomId
      };

      const roomMessages = this.messages.get(roomId) || [];
      roomMessages.unshift(message);
      this.messages.set(roomId, roomMessages);

      socketService.sendMessage(message);
      message.status = MessageStatus.SENT;
      this.updateMessageInStore(roomId, message);

    } catch (error) {
      console.error('Failed to send attachment:', error);
      throw error;
    }
  }

  async markAsRead(roomId: string, otherUserId: string): Promise<void> {
    try {
      await chatApiService.markAsRead(roomId, otherUserId);
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  }

  // Get messages for a room
  getMessages(roomId: string): Message[] {
    return this.messages.get(roomId) || [];
  }

  // Chat rooms
  async getChatRooms(): Promise<ChatRoom[]> {
    try {
      const result = await chatApiService.getChatRooms();
      return result.rooms;
    } catch (error) {
      console.error('Error getting chat rooms:', error);
      return [];
    }
  }

  // Typing
  sendTypingStatus(roomId: string, receiverId: string, isTyping: boolean): void {
    socketService.sendTypingStatus(roomId, receiverId, isTyping);
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

  onMessageDelivered(callback: StatusCallback): () => void {
    return socketService.on('message_delivered', (messageId: string) => {
      this.updateMessageStatus(messageId, MessageStatus.DELIVERED);
      callback(messageId, MessageStatus.DELIVERED);
    });
  }

  onMessageRead(callback: StatusCallback): () => void {
    return socketService.on('message_read', (messageId: string) => {
      this.updateMessageStatus(messageId, MessageStatus.READ);
      callback(messageId, MessageStatus.READ);
    });
  }

  onTyping(callback: TypingCallback): () => void {
    return socketService.on('typing', callback);
  }

  onConnectionChange(callback: ConnectionCallback): () => void {
    return socketService.on('connection_change', callback);
  }

  isConnected(): boolean {
    return socketService.isConnected();
  }

  // Private helpers
  private updateMessageInStore(roomId: string, updatedMessage: Message): void {
    const roomMessages = this.messages.get(roomId);
    if (!roomMessages) return;

    const index = roomMessages.findIndex(m => m.id === updatedMessage.id);
    if (index !== -1) {
      roomMessages[index] = updatedMessage;
      this.messages.set(roomId, roomMessages);
    }
  }

  private updateMessageStatus(messageId: string, status: MessageStatus): void {
    for (const [roomId, messages] of this.messages.entries()) {
      const message = messages.find(m => m.id === messageId);
      if (message) {
        message.status = status;
        this.updateMessageInStore(roomId, message);
        break;
      }
    }
  }
}

export const chatService = new ChatService();
