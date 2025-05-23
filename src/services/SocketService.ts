import io, { Socket } from 'socket.io-client';
import { Message, MessageStatus, MessageType } from '../types/chat';
import { BASE_CHAT_URL, BASE_SOCKET_URL } from '../apiManager/Client';

type SocketCallback = (...args: any[]) => void;

class SocketService {
  private socket: Socket | null = null;
  private readonly serverUrl: string;
  private userId: string | null = null;
  private listeners: Map<string, SocketCallback[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  // Connect to socket server
  async connect(userId: string, token: string): Promise<void> {
    if (this.socket?.connected && this.userId === userId) {
      return Promise.resolve();
    }

    this.userId = userId;
    this.reconnectAttempts = 0;

    return new Promise((resolve, reject) => {
      try {
        console.log("🔌 Connecting to socket server:", this.serverUrl);
        
        this.socket = io(this.serverUrl, {
          transports: ['websocket'],
          auth: { token },
          query: { userId },
          timeout: 10000,
          reconnection: true,
          reconnectionAttempts: this.maxReconnectAttempts,
          reconnectionDelay: 2000,
          reconnectionDelayMax: 10000
        });

        // Connection events
        this.socket.on('connect', () => {
          console.log('✅ Socket connected:', this.socket?.id);
          this.reconnectAttempts = 0;
          this.emit('connection_change', true);
          resolve();
        });

        this.socket.on('disconnect', (reason) => {
          console.log('❌ Socket disconnected:', reason);
          this.emit('connection_change', false);
        });

        this.socket.on('connect_error', (error) => {
          console.error('❌ Connection error:', error.message);
          this.reconnectAttempts++;
          
          if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            this.emit('connection_change', false);
            this.emit('socket_error', {
              code: 'CONNECTION_FAILED',
              message: 'Unable to connect to chat server',
              details: error
            });
            reject(error);
          }
        });

        this.socket.on('reconnect', (attemptNumber) => {
          console.log('🔄 Reconnected after', attemptNumber, 'attempts');
          this.emit('connection_change', true);
        });

        // Set up message event handlers
        this.setupMessageHandlers();

      } catch (error) {
        console.error('❌ Socket setup error:', error);
        reject(error);
      }
    });
  }

  // Set up all message-related event handlers
  private setupMessageHandlers(): void {
    if (!this.socket) return;

    // Message events
    this.socket.on('receive_message', (data) => {
      console.log('📨 Message received:', data.messageId);
      const message = this.transformIncomingMessage(data);
      this.emit('message_received', message);
    });

    this.socket.on('message_sent', (data) => {
      console.log('✅ Message sent confirmation:', data.messageId);
      this.emit('message_sent', data.messageId, data.conversationId);
    });

    this.socket.on('message_delivered', (data) => {
      console.log('✅ Message delivered:', data.messageId);
      this.emit('message_delivered', data.messageId);
      
      // Update message status
      const message = { id: data.messageId, status: MessageStatus.DELIVERED };
      this.emit('message_status_update', data.messageId, MessageStatus.DELIVERED);
    });

    this.socket.on('message_read', (data) => {
      console.log('👁️ Message read:', data.messageId);
      this.emit('message_read', data.messageId);
      
      // Update message status
      this.emit('message_status_update', data.messageId, MessageStatus.READ);
    });

    this.socket.on('message_updated', (data) => {
      console.log('✏️ Message updated:', data.messageId);
      this.emit('message_updated', data.messageId, data.content);
    });

    this.socket.on('message_deleted', (data) => {
      console.log('🗑️ Message deleted:', data.messageId);
      this.emit('message_deleted', data.messageId);
    });

    // Typing events
    this.socket.on('typing', (data) => {
      this.emit('typing', data.userId, data.isTyping);
    });

    // User status events
    this.socket.on('user_online_status', (data) => {
      console.log('👤 User status:', data.userId, data.isOnline ? 'online' : 'offline');
      this.emit('user_status', data.userId, data.isOnline);
    });

    // Conversation events
    this.socket.on('added_to_conversation', (data) => {
      console.log('➕ Added to conversation:', data.conversationId);
      this.emit('added_to_conversation', data);
    });

    // Error events
    this.socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
      this.emit('socket_error', error);
    });
  }

  // Disconnect from socket server
  disconnect(): void {
    if (this.socket) {
      console.log('🔌 Disconnecting socket...');
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
      this.listeners.clear();
      this.emit('connection_change', false);
    }
  }

  // Check connection status
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  // Send a message
  sendMessage(message: Message): void {
    if (!this.socket || !this.userId) {
      console.error('❌ Cannot send message: Socket not connected');
      return;
    }

    const socketMessage = {
      messageId: message.id,
      clientTempId: message.id,
      conversationId: message.conversationId,
      jobId: message.jobId || message.conversationId, // Backward compatibility
      userId: this.userId,
      receiverId: message.receiverId,
      textMsg: message.content,
      messageType: message.type,
      timestamp: message.timestamp,
      attachments: message.attachments || [],
      replyToMessageId: message.replyTo,
      status: message.status
    };
    
    console.log("📤 Sending message:", socketMessage.messageId);
    this.socket.emit('send_message', socketMessage);
  }

  // Send typing status
  sendTypingStatus(conversationId: string, receiverId: string, isTyping: boolean): void {
    if (!this.socket || !this.userId) {
      console.error('❌ Cannot send typing status: Socket not connected');
      return;
    }

    const typingData = {
      conversationId,
      jobId: conversationId, // Backward compatibility
      userId: this.userId,
      receiverId,
      isTyping
    };

    this.socket.emit('typing', typingData);
  }

  // Mark messages as read
  markMessagesAsRead(messageIds: string[], conversationId: string): void {
    if (!this.socket || !this.userId) {
      console.error('❌ Cannot mark as read: Socket not connected');
      return;
    }

    this.socket.emit('mark_read', {
      messageIds,
      conversationId,
      userId: this.userId
    });
  }

  // Event listener management
  on(event: string, callback: SocketCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    
    const callbacks = this.listeners.get(event)!;
    callbacks.push(callback);
    
    console.log(`👂 Listener added for event: ${event} (${callbacks.length} listeners)`);

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
          console.log(`👂 Listener removed for event: ${event} (${callbacks.length} listeners)`);
        }
      }
    };
  }

  // Emit event to all listeners
  private emit(event: string, ...args: any[]): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`❌ Error in ${event} listener:`, error);
        }
      });
    }
  }

  // Transform incoming message to app format
  private transformIncomingMessage(data: any): Message {
    return {
      id: data.messageId || data.id,
      senderId: data.userId || data.senderId,
      receiverId: data.receiverId,
      content: data.textMsg || data.message || data.content || '',
      timestamp: data.ChatDate || data.timestamp || new Date().toISOString(),
      type: data.messageType || data.type || MessageType.TEXT,
      status: data.status || MessageStatus.DELIVERED,
      replyTo: data.replyToMessageId,
      attachments: data.attachments || [],
      conversationId: data.conversationId || data.jobId,
      jobId: data.jobId,
      isEdited: data.isEdited || false,
      editedAt: data.editedAt
    };
  }

  // Get socket ID
  getSocketId(): string | null {
    return this.socket?.id || null;
  }

  // Get connection state
  getConnectionState(): {
    isConnected: boolean;
    socketId: string | null;
    userId: string | null;
    reconnectAttempts: number;
  } {
    return {
      isConnected: this.isConnected(),
      socketId: this.getSocketId(),
      userId: this.userId,
      reconnectAttempts: this.reconnectAttempts
    };
  }
}

export const socketService = new SocketService(BASE_SOCKET_URL);
