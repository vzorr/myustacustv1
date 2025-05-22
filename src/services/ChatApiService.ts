import { client } from '../apiManager/Client';
import { Message, ChatRoom, Attachment, AttachmentType } from '../types/chat';

class ChatApiService {
  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
  }

  // Messages
  async getMessages(roomId: string, page: number = 1, limit: number = 20): Promise<{
    messages: Message[];
    hasMore: boolean;
  }> {
    try {
      const response = await client(this.token).get('chats/history', {
        params: { jobId: roomId, page, limit }
      });

      if (response.data?.code !== 200) {
        throw new Error(response.data?.message || 'Failed to fetch messages');
      }

      const data = response.data.result;
      return {
        messages: (data.data || []).map(this.transformMessage),
        hasMore: data.hasNextPage || false
      };
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async markAsRead(roomId: string, userId: string): Promise<void> {
    try {
      await client(this.token).post('chats/read', {
        jobId: roomId,
        senderId: userId
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }

  // Chat rooms
  async getChatRooms(page: number = 1, limit: number = 20): Promise<{
    rooms: ChatRoom[];
    hasMore: boolean;
  }> {
    try {
      const response = await client(this.token).get('chats/list', {
        params: { page, limit }
      });

      if (response.data?.code !== 200) {
        throw new Error(response.data?.message || 'Failed to fetch chat rooms');
      }

      const data = response.data.result;
      return {
        rooms: (data.data || []).map(this.transformChatRoom),
        hasMore: data.hasNextPage || false
      };
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      throw error;
    }
  }

  // File upload
  async uploadFile(file: any, type: AttachmentType): Promise<Attachment> {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type || this.getMimeType(type),
        name: file.name || `${type}-${Date.now()}.${this.getFileExtension(type)}`
      });
      formData.append('type', type);

      const response = await client(this.token, {
        'Content-Type': 'multipart/form-data'
      }).post('chats/upload', formData);

      if (response.data?.code !== 200) {
        throw new Error('Upload failed');
      }

      return {
        id: response.data.result.id,
        type,
        url: response.data.result.url,
        name: file.name,
        size: file.size
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // User actions
  async blockUser(userId: string): Promise<void> {
    try {
      await client(this.token).post(`users/${userId}/block`);
    } catch (error) {
      console.error('Error blocking user:', error);
      throw error;
    }
  }

  async unblockUser(userId: string): Promise<void> {
    try {
      await client(this.token).post(`users/${userId}/unblock`);
    } catch (error) {
      console.error('Error unblocking user:', error);
      throw error;
    }
  }

  // Transform methods
  private transformMessage(data: any): Message {
    return {
      id: data.messageId || data.id,
      senderId: data.userId || data.senderId,
      receiverId: data.receiverId,
      content: data.textMsg || data.message || data.content || '',
      timestamp: data.ChatDate || data.timestamp || data.createdAt,
      type: data.messageType || data.type,
      status: data.status || 'delivered',
      replyTo: data.replyToMessageId,
      attachments: data.attachments || [],
      roomId: data.jobId || data.roomId
    };
  }

  private transformChatRoom(data: any): ChatRoom {
    return {
      id: data.jobId || data.id,
      jobId: data.jobId,
      jobTitle: data.jobTitle || '',
      otherUser: {
        id: data.otherUserId || data.userId,
        name: data.otherUserName || data.userName,
        avatar: data.otherUserAvatar || data.avatar,
        isOnline: data.isOnline || false
      },
      lastMessage: data.lastMessage ? this.transformMessage(data.lastMessage) : undefined,
      unreadCount: data.unreadCount || 0,
      isBlocked: data.isBlocked || false,
      updatedAt: data.updatedAt || data.lastChatDate
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