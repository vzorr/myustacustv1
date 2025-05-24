// ChatService.ts - Validated and fixed version
import { Message, MessageStatus, AttachmentType, ChatConversation, MessageType } from '../types/chat';

import { socketService } from './SocketService';
import { chatApiService } from './ChatApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

class ChatService {
  private userId: string = '';
  private userRole: string = '';
  private token: string = '';
  private messages: Map<string, Message[]> = new Map();
  private conversations: ChatConversation[] = [];
  private isInitialized: boolean = false;

  // Getter for userId (useful for other components)
  public get currentUserId(): string {
    return this.userId;
  }

  // Getter for userRole
  public get currentUserRole(): string {
    return this.userRole;
  }

  // Step 1: Initialize the chat service with user credentials
  async initialize(userId: string, userRole: string, token: string): Promise<void> {
    // Prevent re-initialization with same credentials
    if (this.isInitialized && this.userId === userId && this.token === token) {
      console.log('✅ Chat service already initialized with same credentials');
      return;
    }

    this.userId = userId;
    this.userRole = userRole;
    this.token = token;

    // Set token for API calls
    chatApiService.setToken(token);

    // Connect to WebSocket for real-time messaging
    await socketService.connect(userId, token);

    this.isInitialized = true;

    // Save session for recovery
    await this.saveSession();

    console.log('✅ Chat service initialized');
  }

  // Step 2: Start a new conversation (Customer only)
  async startConversation(jobId: string, ustaId: string): Promise<string> {

    console.log ("inside - startConversation");

    // Only customers can start conversations
    if (this.userRole !== 'customer') {
      throw new Error('Only customers can start conversations');
    }

    const result = await chatApiService.initializeChat(jobId, ustaId);
    console.log('✅ Conversation started:', result.conversationId);
    
    return result.conversationId;
  }

  // Step 3: Load messages for a conversation
  async loadMessages(conversationId: string, page: number = 1): Promise<Message[]> {
    try {
      // Get messages from API
      const result = await chatApiService.getMessages(conversationId, page);
      
      if (page === 1) {
        // Replace all messages for first page
        this.messages.set(conversationId, result.messages);
        // Save as last active conversation
        await this.saveLastActiveConversation(conversationId);
      } else {
        // Append messages for pagination
        const existing = this.messages.get(conversationId) || [];
        const newMessages = result.messages.filter(
          msg => !existing.find(e => e.id === msg.id)
        );
        this.messages.set(conversationId, [...existing, ...newMessages]);
      }
      
      console.log(`✅ Loaded ${result.messages.length} messages for conversation ${conversationId}`);
      return this.messages.get(conversationId) || [];
    } catch (error) {
      console.error('❌ Failed to load messages:', error);
      throw error;
    }
  }

  // Step 4: Send a text message
  async sendTextMessage(
    conversationId: string,
    text: string,
    receiverId: string,
    replyTo?: string
  ): Promise<void> {
    if (!text.trim()) {
      throw new Error('Message cannot be empty');
    }
    
    console.log ("inside - sendTextMessage");

    // Create message object
    const message: Message = {
      id: uuidv4(),
      senderId: this.userId,
      receiverId: receiverId,
      content: text.trim(),
      timestamp: new Date().toISOString(),
      type: MessageType.TEXT,
      status: MessageStatus.SENDING,
      replyTo,
      conversationId: conversationId,
      jobId: this.getJobIdFromConversation(conversationId)
    };

    // Add to local messages immediately (optimistic update)
    this.addMessageLocally(conversationId, message);

    try {
      // Send via WebSocket

      socketService.sendMessage(message);
      console.log('✅ Message sent');
    } catch (error) {
      // Update message status to failed
      this.updateMessageStatus(message.id, MessageStatus.FAILED);
      throw error;
    }
  }

  // Step 5: Send an attachment (image, audio, file)
  async sendAttachment(
    conversationId: string,
    file: any,
    type: AttachmentType,
    receiverId: string
  ): Promise<void> {
    try {
      // Validate file
      if (!file || !file.uri) {
        throw new Error('Invalid file');
      }

      // First, upload the file
      console.log('📤 Uploading file...');
      const attachment = await chatApiService.uploadFile(file, type);

      // Create message with attachment
      const message: Message = {
        id: uuidv4(),
        senderId: this.userId,
        receiverId: receiverId,
        content: attachment.name || 'Attachment',
        timestamp: new Date().toISOString(),
        type: MessageType.ATTACHMENT,
        status: MessageStatus.SENDING,
        attachments: [attachment],
        conversationId: conversationId,
        jobId: this.getJobIdFromConversation(conversationId)
      };

      // Add to local messages
      this.addMessageLocally(conversationId, message);

      // Send via WebSocket
      socketService.sendMessage(message);
      
      console.log('✅ Attachment sent');
    } catch (error) {
      console.error('❌ Failed to send attachment:', error);
      throw error;
    }
  }

  // Step 6: Mark messages as read
  async markMessagesAsRead(conversationId: string, messageIds?: string[]): Promise<void> {
    try {
      await chatApiService.markAsRead(conversationId, messageIds);
      
      // Update local conversation unread count
      const conversation = this.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.unreadCount = 0;
      }
      
      // Update message status locally if messageIds provided
      if (messageIds && messageIds.length > 0) {
        messageIds.forEach(id => {
          this.updateMessageStatus(id, MessageStatus.READ);
        });
      }
      
      console.log('✅ Messages marked as read');
    } catch (error) {
      console.error('❌ Failed to mark as read:', error);
    }
  }

  // Step 7: Get all conversations for current user

  // Step 7: Get all conversations for current user
  async getMyConversations(page: number = 1): Promise<{
    conversations: ChatConversation[];
    hasMore: boolean;
    total: number;
  }> {
    try {
      // Pass userId to the API service
      const result = await chatApiService.getConversations(this.userId, page);
      
      if (page === 1) {
        this.conversations = result.conversations;
      } else {
        // Append for pagination, avoiding duplicates
        const existingIds = new Set(this.conversations.map(c => c.id));
        const newConversations = result.conversations.filter(c => !existingIds.has(c.id));
        this.conversations = [...this.conversations, ...newConversations];
      }
      
      console.log(`✅ Loaded ${result.conversations.length} conversations (page ${page})`);
      
      return {
        conversations: this.conversations,
        hasMore: result.hasMore,
        total: this.conversations.length
      };
    } catch (error) {
      console.error('❌ Failed to load conversations:', error);
      throw error;
    }
  }

  // Get conversations with unread messages
  async getUnreadConversations(): Promise<ChatConversation[]> {
    try {
      // Use cached conversations if available
      if (this.conversations.length === 0) {
        await this.getMyConversations();
      }
      
      const unreadConversations = this.conversations.filter(conv => conv.unreadCount > 0);
      
      console.log(`✅ Found ${unreadConversations.length} unread conversations`);
      return unreadConversations;
    } catch (error) {
      console.error('❌ Failed to load unread conversations:', error);
      throw error;
    }
  }

  // Get total unread count across all conversations
  async getTotalUnreadCount(): Promise<number> {
    try {
      // Use cached conversations if available
      if (this.conversations.length === 0) {
        await this.getMyConversations();
      }
      
      const totalUnread = this.conversations.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0);
      
      console.log(`✅ Total unread messages: ${totalUnread}`);
      return totalUnread;
    } catch (error) {
      console.error('❌ Failed to get unread count:', error);
      return 0;
    }
  }

  // Search conversations by job title or user name
  async searchConversations(searchTerm: string): Promise<ChatConversation[]> {
    try {
      // Ensure we have conversations loaded
      if (this.conversations.length === 0) {
        await this.getMyConversations();
      }
      
      const normalizedSearch = searchTerm.toLowerCase().trim();
      
      const filtered = this.conversations.filter(conv => 
        conv.jobTitle.toLowerCase().includes(normalizedSearch) ||
        conv.otherUser.name.toLowerCase().includes(normalizedSearch)
      );
      
      console.log(`✅ Found ${filtered.length} conversations matching "${searchTerm}"`);
      return filtered;
    } catch (error) {
      console.error('❌ Failed to search conversations:', error);
      throw error;
    }
  }

  // Check if user can initiate chat (customer only)
  async canInitiateChat(jobId: string, ustaId: string): Promise<boolean> {
    if (this.userRole !== 'customer') {
      return false;
    }
    return await chatApiService.canInitiateChat(jobId, ustaId);
  }

  // Helper: Add message to local store
  private addMessageLocally(conversationId: string, message: Message): void {
    const messages = this.messages.get(conversationId) || [];
    messages.unshift(message); // Add to beginning
    this.messages.set(conversationId, messages);
  }

  // Helper: Get messages from local store
  getLocalMessages(conversationId: string): Message[] {
    return this.messages.get(conversationId) || [];
  }

  // Helper: Get jobId from conversation
  private getJobIdFromConversation(conversationId: string): string | undefined {
    const conversation = this.conversations.find(c => c.id === conversationId);
    return conversation?.jobId;
  }

  // Event Listeners - Listen for real-time updates
  onNewMessage(callback: (message: Message) => void): () => void {
    return socketService.on('message_received', (message: Message) => {
      // Add to local store using conversationId
      this.addMessageLocally(message.conversationId, message);
      
      // Update conversation's last message
      const conversation = this.conversations.find(c => c.id === message.conversationId);
      if (conversation) {
        conversation.lastMessage = message;
        conversation.updatedAt = message.timestamp;
        if (message.senderId !== this.userId) {
          conversation.unreadCount = (conversation.unreadCount || 0) + 1;
        }
      }
      
      // Notify UI
      callback(message);
    });
  }

  onMessageSent(callback: (messageId: string, conversationId: string) => void): () => void {
    return socketService.on('message_sent', callback);
  }

  onMessageRead(callback: (messageId: string, status: MessageStatus) => void): () => void {
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

  onTyping(callback: (userId: string, isTyping: boolean) => void): () => void {
    return socketService.on('typing', callback);
  }

  onUserStatusChange(callback: (userId: string, isOnline: boolean) => void): () => void {
    return socketService.on('user_status', callback);
  }

  onConnectionChange(callback: (connected: boolean) => void): () => void {
    return socketService.on('connection_change', callback);
  }

  onError(callback: (error: any) => void): () => void {
    return socketService.on('socket_error', callback);
  }


  onAddedToConversation(callback: (conversation: any) => void): () => void {
    return socketService.on('added_to_conversation', callback);
  }

  // Send typing indicator
  sendTypingIndicator(conversationId: string, receiverId: string, isTyping: boolean): void {
    if (!this.isConnected()) {
      console.warn('⚠️ Cannot send typing indicator: Not connected');
      return;
    }
    socketService.sendTypingStatus(conversationId, receiverId, isTyping);
  }

  // Update message status
  private updateMessageStatus(messageId: string, status: MessageStatus): void {
    for (const [conversationId, messages] of this.messages.entries()) {
      const message = messages.find(m => m.id === messageId);
      if (message) {
        message.status = status;
        break;
      }
    }
  }

  // Clean up when done
  async disconnect(): Promise<void> {
    socketService.disconnect();
    this.messages.clear();
    this.conversations = [];
    this.isInitialized = false;
    
    // Clear stored session
    await this.clearStoredSession();
    
    console.log('✅ Chat service disconnected');
  }

  // Check connection status
  isConnected(): boolean {
    return socketService.isConnected() && this.isInitialized;
  }

  // Recover session after app restart
  async recoverSession(): Promise<boolean> {
    try {
      // Check for saved session data
      const sessionData = await AsyncStorage.getItem('chat_session');
      if (!sessionData) {
        console.log('No saved chat session found');
        return false;
      }

      const { userId, userRole, token, timestamp } = JSON.parse(sessionData);

      // Check if session is still valid (24 hours)
      const sessionAge = Date.now() - timestamp;
      const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge > maxSessionAge) {
        console.log('Chat session expired');
        await AsyncStorage.removeItem('chat_session');
        return false;
      }

      // Verify token is still valid by making a test API call
      try {
        chatApiService.setToken(token);
        await chatApiService.getConversations(1);
      } catch (error) {
        console.log('Token is no longer valid');
        await AsyncStorage.removeItem('chat_session');
        return false;
      }

      // Reinitialize with saved credentials
      await this.initialize(userId, userRole, token);

      // Restore last active conversation if any
      const lastConversation = await AsyncStorage.getItem('last_active_conversation');
      if (lastConversation) {
        try {
          const { conversationId } = JSON.parse(lastConversation);
          // Preload messages for last active conversation
          await this.loadMessages(conversationId);
        } catch (error) {
          console.error('Failed to restore last conversation:', error);
        }
      }

      console.log('✅ Chat session recovered successfully');
      return true;
    } catch (error) {
      console.error('❌ Error recovering session:', error);
      await this.clearStoredSession();
      return false;
    }
  }

  // Save session data for recovery
  async saveSession(): Promise<void> {
    try {
      const sessionData = {
        userId: this.userId,
        userRole: this.userRole,
        token: this.token,
        timestamp: Date.now()
      };
      
      await AsyncStorage.setItem('chat_session', JSON.stringify(sessionData));
      console.log('✅ Chat session saved');
    } catch (error) {
      console.error('❌ Failed to save chat session:', error);
    }
  }

  // Save last active conversation
  async saveLastActiveConversation(conversationId: string): Promise<void> {
    try {
      await AsyncStorage.setItem('last_active_conversation', JSON.stringify({
        conversationId,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Failed to save last active conversation:', error);
    }
  }

  // Clear stored session data
  async clearStoredSession(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        'chat_session',
        'last_active_conversation'
      ]);
      console.log('✅ Stored session data cleared');
    } catch (error) {
      console.error('Failed to clear stored session:', error);
    }
  }

  // Add these methods to your ChatService class:

  // Create conversation and send first message

  async createConversationAndSendMessage(
    jobId: string,
    receiverId: string,
    text: string,
    replyTo?: string
): Promise<string> {
    try {
        console.log("🚀 ====== START createConversationAndSendMessage ======");
        console.log("📋 Input params:", { jobId, receiverId, text: text.substring(0, 50) + '...', replyTo });

        const tempId = `temp-${Date.now()}-${Math.random()}`;
        console.log('🎯 Generated tempId:', tempId);

        // Create message object
        const messageId = uuidv4();
        console.log('🆔 Generated messageId:', messageId);

        const message: Message = {
            id: messageId,
            senderId: this.userId,
            clientTempId:tempId,
            receiverId,
            content: text.trim(),
            timestamp: new Date().toISOString(),
            type: MessageType.TEXT,
            status: MessageStatus.SENDING,
            replyTo,
            conversationId: '', // to be filled by backend
            jobId
        };

        const socketMessage = {
            ...message,
            jobId
        };

        // 🔍 Log message being sent
        console.log('📤 Socket message prepared:', {
            messageId: socketMessage.id,
            clientTempId: socketMessage.clientTempId,
            jobId: socketMessage.jobId,
            receiverId: socketMessage.receiverId,
            hasContent: !!socketMessage.content,
            contentLength: socketMessage.content.length
        });

        return new Promise((resolve, reject) => {
            let listenerCalled = false;
            let eventCount = 0;

            console.log('🎧 Setting up message_sent listener for tempId:', tempId);
            
            const unsubscribe = socketService.on('message_sent', (...args: any[]) => {
                eventCount++;
                console.log(`📨 ==== message_sent event #${eventCount} received ====`);
                console.log('📨 Number of arguments:', args.length);
                console.log('📨 Argument types:', args.map(arg => typeof arg));
                
                if (args.length === 0) {
                    console.error('❌ No arguments received in message_sent event!');
                    return;
                }

                const data = args[0];
                listenerCalled = true;

                console.log('📥 Received data type:', typeof data);
                console.log('📥 Received data:', JSON.stringify(data, null, 2));
                
                // Detailed matching debug
                console.log('🔍 === MATCHING DEBUG ===');
                console.log('🔍 Expected tempId:', tempId);
                console.log('🔍 Type of expected tempId:', typeof tempId);
                console.log('🔍 data.tempId:', data.tempId);
                console.log('🔍 Type of data.tempId:', typeof data.tempId);
                console.log('🔍 data.clientTempId:', data.clientTempId);
                console.log('🔍 Type of data.clientTempId:', typeof data.clientTempId);
                console.log('🔍 Exact match data.tempId === tempId:', data.tempId === tempId);
                console.log('🔍 Exact match data.clientTempId === tempId:', data.clientTempId === tempId);

                const isMatch = data.tempId === tempId || data.clientTempId === tempId;
                console.log('🔍 Final match result:', isMatch);

                if (isMatch) {
                    console.log('✅ MATCH FOUND! Processing successful response');
                    unsubscribe();

                    const conversationId = data.conversationId || data.roomId;
                    console.log('💬 Extracted conversationId:', conversationId);

                    if (conversationId) {
                        console.log('📝 Adding message to local store');
                        this.addMessageLocally(conversationId, {
                            ...message,
                            id: data.messageId || data.id,
                            conversationId,
                            status: MessageStatus.SENT
                        });
                        console.log('✅ Resolving with conversationId:', conversationId);
                        resolve(conversationId);
                    } else {
                        console.warn('⚠️ message_sent received but no conversationId:', data);
                        reject(new Error('No conversation ID returned'));
                    }
                } else {
                    console.warn('❌ NO MATCH - This event is for a different message');
                    console.warn('❌ Mismatch details:', {
                        expectedTempId: tempId,
                        receivedTempId: data.tempId,
                        receivedClientTempId: data.clientTempId,
                        tempIdMatch: data.tempId === tempId,
                        clientTempIdMatch: data.clientTempId === tempId
                    });
                }
                console.log(`📨 ==== End of message_sent event #${eventCount} ====`);
            });

            console.log('🚀 Listener setup complete, now sending message');

            // Emit message via socket
            console.log('📤 Calling socketService.sendMessage with clientTempId:', socketMessage.clientTempId);
            socketService.sendMessage(socketMessage);
            console.log('📤 socketService.sendMessage called');

            // ⏰ Timeout fallback
            const timeoutHandle = setTimeout(() => {
                console.error('⏰ ====== TIMEOUT REACHED ======');
                console.error('⏰ Timeout details:', {
                    tempId,
                    listenerWasCalled: listenerCalled,
                    eventsReceived: eventCount,
                    timeoutDuration: '10 seconds'
                });
                unsubscribe();
                reject(new Error('Message send timeout'));
            }, 10000);

            // Log every 2 seconds while waiting
            const waitingInterval = setInterval(() => {
                console.log('⏳ Still waiting for message_sent event...', {
                    tempId,
                    secondsElapsed: Math.floor((Date.now() - parseInt(tempId.split('-')[1])) / 1000),
                    eventsReceivedSoFar: eventCount
                });
            }, 2000);

            // Clean up interval when promise resolves/rejects
            const originalResolve = resolve;
            const originalReject = reject;
            
            resolve = (value) => {
                clearInterval(waitingInterval);
                clearTimeout(timeoutHandle);
                console.log('✅ ====== SUCCESS - Promise resolved ======');
                originalResolve(value);
            };
            
            reject = (error) => {
                clearInterval(waitingInterval);
                clearTimeout(timeoutHandle);
                console.log('❌ ====== FAILURE - Promise rejected ======');
                originalReject(error);
            };
        });
    } catch (error) {
        console.error('❌ ====== EXCEPTION in createConversationAndSendMessage ======');
        console.error('❌ Error details:', error);
        throw error;
    }
}

  // Create conversation and send first attachment
  async createConversationAndSendAttachment(
    jobId: string,
    receiverId: string,
    file: any,
    type: AttachmentType
  ): Promise<string> {
    try {

      console.log ("inside createConversationAndSendAttachment");
      // First upload the file
      const attachment = await chatApiService.uploadFile(file, type);

      // Create message with attachment
      const message: Message = {
        id: `temp-${Date.now()}-${Math.random()}`,
        senderId: this.userId,
        receiverId: receiverId,
        content: attachment.name || 'Attachment',
        timestamp: new Date().toISOString(),
        type: MessageType.ATTACHMENT,
        status: MessageStatus.SENDING,
        attachments: [attachment],
        conversationId: '', // Will be set by backend
        jobId: jobId
      };

      // Send via WebSocket with jobId
      return new Promise((resolve, reject) => {
        const unsubscribe = socketService.on('message_sent', (data: any) => {
          console.log (data.temp  +  "=" + message.id + "data.clientTempId" + data.clientTempId + "= " +  message.id);

          if (data.tempId === message.id || data.clientTempId === message.id) {
            unsubscribe();
            
            const conversationId = data.conversationId || data.roomId;
            if (conversationId) {
              this.addMessageLocally(conversationId, {
                ...message,
                id: data.messageId || data.id,
                conversationId: conversationId,
                status: MessageStatus.SENT
              });
              resolve(conversationId);
            } else {
              reject(new Error('No conversation ID returned'));
            }
          }
        });

        socketService.sendMessage({
          ...message,
          jobId: jobId
        });

        setTimeout(() => {
          unsubscribe();
          reject(new Error('Attachment send timeout'));
        }, 15000); // 15 seconds for attachments
      });
    } catch (error) {
      console.error('Failed to create conversation and send attachment:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();