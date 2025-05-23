import { chatClient, client } from '../apiManager/Client';
import { Message, ChatConversation, Attachment, AttachmentType } from '../types/chat';

class ChatApiService {
  private token: string | null = null;
  private baseUrl = '/api/v1';

  setToken(token: string): void {
    this.token = token;
  }

  // Get messages for a conversation
  async getMessages(conversationId: string, page: number = 1, limit: number = 50): Promise<{
    messages: Message[];
    hasMore: boolean;
  }> {
    try {
      const offset = (page - 1) * limit;
      const response = await chatClient(this.token).get(
        `messages/conversation/${conversationId}?limit=${limit}&offset=${offset}`
      );

      if (response.data?.success) {
        return {
          messages: (response.data.messages || []).map((msg:any) => this.transformMessage(msg)),
          hasMore: response.data.hasMore || false
        };
      }
      throw new Error(response.data?.message || 'Failed to fetch messages');
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  // Mark messages as read
  async markAsRead(conversationId: string, messageIds?: string[]): Promise<void> {
    try {
      await chatClient(this.token).post(`messages/read`, {
        conversationId,
        messageIds
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }

  // Get all conversations for the current user
  // Pass currentUserId as parameter instead of storing it
  async getConversations(currentUserId: string, page: number = 1, limit: number = 20): Promise<{
    conversations: ChatConversation[];
    hasMore: boolean;
  }> {
    try {
      const offset = (page - 1) * limit;
      const response = await chatClient(this.token).get(
        `conversations?limit=${limit}&offset=${offset}`
      );

      if (response.data?.success) {
        return {
          conversations: (response.data.conversations || []).map((conv:any) => 
            this.transformConversation(conv, currentUserId)
          ),
          hasMore: response.data.hasMore || false
        };
      }
      throw new Error(response.data?.message || 'Failed to fetch conversations');
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  }

  // Upload file
  async uploadFile(file: any, type: AttachmentType): Promise<Attachment> {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type || this.getMimeType(type),
        name: file.name || `${type}-${Date.now()}.${this.getFileExtension(type)}`
      } as any);
      formData.append('type', type);

      const response = await chatClient(this.token).post('/upload', formData);

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

  // Transform message from API format to app format
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
      conversationId: data.conversationId,
      jobId: data.jobId
    };
  }

  // Transform attachments
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

  // Transform conversation from API format to app format
  // Now accepts currentUserId as parameter
  private transformConversation(data: any, currentUserId: string): ChatConversation {
    // Find the other participant
    const otherParticipant = data.participants?.find((p: any) => p.id !== currentUserId) || {};
    
    // If no participants array, try to determine from lastMessage
    if (!data.participants || data.participants.length === 0) {
      // Fallback logic if participants array is missing
      return {
        id: data.id,
        jobId: data.jobId,
        jobTitle: data.jobTitle || '',
        otherUser: {
          id: data.otherUserId || '',
          name: data.otherUserName || 'Unknown',
          avatar: data.otherUserAvatar || '',
          isOnline: data.otherUserOnline || false
        },
        lastMessage: data.lastMessage ? this.transformMessage(data.lastMessage) : undefined,
        unreadCount: data.unreadCount || 0,
        isBlocked: false,
        updatedAt: data.lastMessageAt || data.updatedAt,
        participants: []
      };
    }
    
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