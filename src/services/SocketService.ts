
import io, { Socket } from 'socket.io-client';
import { Message, MessageStatus, MessageType } from '../types/chat';
import { BASE_CHAT_URL, BASE_SOCKET_URL } from '../apiManager/Client';

type SocketCallback = (...args: any[]) => void;

interface SocketEventMap {
  'message_received': (msg: Message) => void;
  'message_read': (messageId: string) => void;
  'message_delivered': (messageId: string) => void;
  'typing': (userId: string, isTyping: boolean) => void;
  'user_status': (userId: string, isOnline: boolean) => void;
  'connection_change': (connected: boolean) => void;
  'socket_error': (error: any) => void;
}

class SocketService {
  private socket: Socket | null = null;
  private readonly serverUrl: string;
  private userId: string | null = null;
  private listeners: Map<string, SocketCallback[]> = new Map();

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  async connect(userId: string): Promise<void> {
    if (this.socket?.connected && this.userId === userId) {
      return Promise.resolve();
    }

    this.userId = userId;

    return new Promise((resolve, reject) => {
      try {
        console.log("this servrela url ", this.serverUrl)
        this.socket = io(this.serverUrl, {
          transports: ['websocket'],
          query: { userId },
          timeout: 10000,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 2000
        });

        this.socket.on('connect', () => {
          console.log('✅ Socket connected:', this.socket?.id);
          this.emit('connection_change', true);
          resolve();
        });

        this.socket.on('disconnect', (reason) => {
          console.log('❌ Socket disconnected:', reason);
          this.emit('connection_change', false);
        });

        this.socket.on('connect_error', (error) => {
          console.error('❌ Connection error:', error);
          this.emit('connection_change', false);
          reject(error);
        });

        // Message events
        this.socket.on('receive_message', (data) => {
          const message = this.transformMessage(data);
          this.emit('message_received', message);
        });

        this.socket.on('message_delivered', (data) => {
          this.emit('message_delivered', data.messageId);
        });

        this.socket.on('message_read', (data) => {
          this.emit('message_read', data.messageId);
        });

        this.socket.on('typing', (data) => {
          this.emit('typing', data.userId, data.isTyping);
        });

        this.socket.on('user_online_status', (data) => {
          this.emit('user_status', data.userId, data.isOnline);
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
      this.listeners.clear();
    }
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  // Room management
  joinRoom(roomId: string, receiverId: string): void {
    if (!this.socket || !this.userId) return;

    this.socket.emit('join_chat_room', {
      jobId: roomId,
      userId: this.userId,
      receiverId
    });
  }

  leaveRoom(roomId: string, receiverId: string): void {
    if (!this.socket || !this.userId) return;

    this.socket.emit('leave_chat_room', {
      jobId: roomId,
      userId: this.userId,
      receiverId
    });
  }

  // Send message
  sendMessage(message: Message): void {
    if (!this.socket || !this.userId) return;

    const socketMessage = {
      messageId: message.id,
      clientTempId: `temp-${Date.now()}`,
      jobId: message.roomId,
      userId: this.userId,
      receiverId: message.receiverId,
      textMsg: message.content,
      messageType: message.type,
      timestamp: message.timestamp,
      attachments: message.attachments || [],
      replyToMessageId: message.replyTo
    };
    console.log("socketMessage", socketMessage)
    this.socket.emit('send_message', socketMessage);
  }

  // Typing indicators
  sendTypingStatus(roomId: string, receiverId: string, isTyping: boolean): void {
    if (!this.socket || !this.userId) return;

    this.socket.emit('typing', {
      jobId: roomId,
      userId: this.userId,
      receiverId,
      isTyping
    });
  }

  // Event listeners
  on(event: string, callback: SocketCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  private emit(event: string, ...args: any[]): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(...args));
    }
  }

  private transformMessage(data: any): Message {
    return {
      id: data.messageId || data.id,
      senderId: data.userId || data.senderId,
      receiverId: data.receiverId,
      content: data.textMsg || data.message || data.content,
      timestamp: data.ChatDate || data.timestamp || new Date().toISOString(),
      type: data.messageType || data.type || MessageType.TEXT,
      status: data.status || MessageStatus.DELIVERED,
      replyTo: data.replyToMessageId,
      attachments: data.attachments || [],
      roomId: data.jobId || data.roomId
    };
  }
}

export const socketService = new SocketService(BASE_SOCKET_URL);