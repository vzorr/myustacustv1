import { Message, ChatRoom } from '../types/chat';
import moment from 'moment';

export class ChatUtils {
  // Format time for messages
  static formatMessageTime(timestamp: string): string {
    return moment(timestamp).format('HH:mm');
  }

  // Format date for chat list
  static formatChatListDate(timestamp: string): string {
    const now = moment();
    const date = moment(timestamp);

    if (!date.isValid()) return '';

    if (now.isSame(date, 'day')) {
      return date.format('HH:mm');
    } else if (now.clone().subtract(1, 'day').isSame(date, 'day')) {
      return 'Yesterday';
    } else if (now.diff(date, 'days') < 7) {
      return date.format('ddd');
    } else {
      return date.format('DD/MM');
    }
  }

  // Generate temporary message ID
  static generateTempId(): string {
    return `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Check if message is from current user
  static isCurrentUserMessage(message: Message, currentUserId: string): boolean {
    return message.senderId === currentUserId;
  }

  // Get display text for last message
  static getLastMessageDisplayText(message: Message): string {
    switch (message.type) {
      case 'text':
        return message.content;
      case 'image':
        return '📷 Photo';
      case 'audio':
        return '🎵 Voice message';
      case 'file':
        return `📄 ${message.content || 'File'}`;
      default:
        return message.content || 'Message';
    }
  }

  // Sort chat rooms by last message time
  static sortChatRoomsByLastMessage(rooms: ChatRoom[]): ChatRoom[] {
    return rooms.sort((a, b) => {
      const timeA = a.lastMessage?.timestamp || a.updatedAt;
      const timeB = b.lastMessage?.timestamp || b.updatedAt;
      return moment(timeB).valueOf() - moment(timeA).valueOf();
    });
  }

  // Validate message content
  static isValidMessageContent(content: string): boolean {
    return content.trim().length > 0 && content.trim().length <= 4000;
  }

  // Truncate long messages for preview
  static truncateMessage(content: string, maxLength: number = 50): string {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  }

  // Check if user is typing (for typing indicators)
  static isUserTyping(typing: { [userId: string]: boolean }, userId: string): boolean {
    return typing[userId] === true;
  }

  // Get file extension from file name
  static getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }

  // Format file size
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Check if message needs retry
  static shouldRetryMessage(message: Message): boolean {
    return message.status === 'failed';
  }

  // Get appropriate status icon color
  static getStatusColor(status: string): string {
    switch (status) {
      case 'sending': return '#9E9E9E';
      case 'sent': return '#9E9E9E';
      case 'delivered': return '#2196F3';
      case 'read': return '#4CAF50';
      case 'failed': return '#F44336';
      default: return '#9E9E9E';
    }
  }
}