import { client } from '../apiManager/Client';
import { Message, ChatRoom, Attachment, AttachmentType } from '../types/chat';

class ChatApiService {
  private token: string | null = null;
  private baseUrl = '/api/v1';

  setToken(token: string): void {
    this.token = token;
  }

  // Initialize chat with proper authentication
  async initializeChat(jobId: string, ustaId: string): Promise<{
    conversationId: string;
    canInitiate: boolean;
  }> {
    try {
      const response = await client(this.token).post(`${this.baseUrl}/conversations/init`, {
        jobId,
        participantId: ustaId
      });

      if (response.data?.success) {
        return {
          conversationId: response.data.conversationId,
          canInitiate: response.data.canInitiate
        };
      }
      throw new Error(response.data?.message || 'Failed to initialize chat');
    } catch (error) {
      console.error('Error initializing chat:', error);
      throw error;
    }
  }

  // Messages - Updated to use backend routes
  async getMessages(conversationId: string, page: number = 1, limit: number = 50): Promise<{
    messages: Message[];
    hasMore: boolean;
  }> {
    try {
      const offset = (page - 1) * limit;
      const response = await client(this.token).get(
        `${this.baseUrl}/messages/conversation/${conversationId}?limit=${limit}&offset=${offset}`
      );

      if (response.data?.success) {
        return {
          messages: (response.data.messages || []).map(this.transformMessage),
          hasMore: response.data.hasMore || false
        };
      }
      throw new Error(response.data?.message || 'Failed to fetch messages');
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async markAsRead(conversationId: string, messageIds?: string[]): Promise<void> {
    try {
      await client(this.token).post(`${this.baseUrl}/messages/read`, {
        conversationId,
        messageIds
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }

  // Chat rooms - Updated for job-based conversations
  async getChatRooms(page: number = 1, limit: number = 20): Promise<{
    rooms: ChatRoom[];
    hasMore: boolean;
  }> {
    try {
      const offset = (page - 1) * limit;
      const response = await client(this.token).get(
        `${this.baseUrl}/conversations?limit=${limit}&offset=${offset}`
      );

      if (response.data?.success) {
        return {
          rooms: (response.data.conversations || []).map(this.transformChatRoom),
          hasMore: response.data.hasMore || false
        };
      }
      throw new Error(response.data?.message || 'Failed to fetch chat rooms');
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      throw error;
    }
  }

  // File upload - Updated endpoint
  async uploadFile(file: any, type: AttachmentType): Promise<Attachment> {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type || this.getMimeType(type),
        name: file.name || `${type}-${Date.now()}.${this.getFileExtension(type)}`
      } as any);
      formData.append('type', type);

      const response = await client(this.token).post('/upload', formData);

      if (response.data?.success) {
        return {
          id: response.data.file.id,
          type,
          url: response.data.file.url,
          name: file.name,
          size: file.size
        };
      }
      throw new Error('Upload failed');
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Check if user can initiate chat (customer only)
  async canInitiateChat(jobId: string, ustaId: string): Promise<boolean> {
    try {
      const response = await client(this.token).get(
        `${this.baseUrl}/conversations/can-initiate?jobId=${jobId}&ustaId=${ustaId}`
      );
      return response.data?.canInitiate || false;
    } catch (error) {
      console.error('Error checking chat initiation permission:', error);
      return false;
    }
  }

  // Transform methods updated for backend response format
  private transformMessage(data: any): Message {
    return {
      id: data.id,
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.content?.text || '',
      timestamp: data.createdAt,
      type: data.type || 'text',
      status: data.status || 'sent',
      replyTo: data.content?.replyTo,
      attachments: this.transformAttachments(data.content),
      roomId: data.conversationId,
      jobId: data.jobId
    };
  }

  private transformAttachments(content: any): Attachment[] {
    const attachments: Attachment[] = [];
    
    if (content?.images?.length) {
      content.images.forEach((url: string, index: number) => {
        attachments.push({
          id: `img-${index}`,
          type: AttachmentType.IMAGE,
          url,
          name: `image-${index}`,
          size: 0
        });
      });
    }
    
    if (content?.audio) {
      attachments.push({
        id: 'audio-0',
        type: AttachmentType.AUDIO,
        url: content.audio,
        name: 'audio',
        size: 0
      });
    }
    
    if (content?.attachments?.length) {
      content.attachments.forEach((att: any) => {
        attachments.push({
          id: att.id || `file-${attachments.length}`,
          type: AttachmentType.FILE,
          url: att.url,
          name: att.name,
          size: att.size || 0
        });
      });
    }
    
    return attachments;
  }

  private transformChatRoom(data: any): ChatRoom {
    // Find the other participant
    const otherParticipant = data.participants?.find((p: any) => p.id !== this.getCurrentUserId()) || {};
    
    return {
      id: data.id,
      jobId: data.jobId,
      jobTitle: data.jobTitle || '',
      otherUser: {
        id: otherParticipant.id || '',
        name: otherParticipant.name || 'Unknown',
        avatar: otherParticipant.avatar || '',
        isOnline: otherParticipant.isOnline || false
      },
      lastMessage: data.lastMessage ? this.transformMessage(data.lastMessage) : undefined,
      unreadCount: data.unreadCount || 0,
      isBlocked: false,
      updatedAt: data.lastMessageAt || data.updatedAt,
      participants: data.participants || []
    };
  }

  private getCurrentUserId(): string {
    // This should be set from your auth context
    return ''; // Implement based on your auth system
  }

  private getMimeType(type: AttachmentType): string {
    switch (type) {
      case AttachmentType.IMAGE: return 'image/jpeg';
      case AttachmentType.AUDIO: return 'audio/mp4';
      case AttachmentType.FILE: return 'application/octet-stream';
    }
  }

  private getFileExtension(type: AttachmentType): string {
    switch (type) {
      case AttachmentType.IMAGE: return 'jpg';
      case AttachmentType.AUDIO: return 'm4a';
      case AttachmentType.FILE: return 'bin';
    }
  }
}

export const chatApiService = new ChatApiService();