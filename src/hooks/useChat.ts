import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { chatService } from '../services/ChatService';
import { Message, ChatRoom, AttachmentType } from '../types/chat';
import Toast from 'react-native-simple-toast';

interface UseChatProps {
  roomId: string;
  receiverId: string;
}

export const useChat = ({ roomId, receiverId }: UseChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const [typing, setTyping] = useState<{ [userId: string]: boolean }>({});

  const { userData } = useSelector((state: any) => state?.userInfo);
  const { token } = useSelector((state: any) => state?.accessToken);

  // Initialize chat service
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const userToken = token || userData?.token;
        if (!userToken || !userData?.userId) return;

        await chatService.initialize(userData.userId, userToken);
        await chatService.joinRoom(roomId, receiverId);
        
        const roomMessages = chatService.getMessages(roomId);
        setMessages(roomMessages);
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setLoading(false);
        Toast.show('Failed to connect to chat', Toast.SHORT);
      }
    };

    initializeChat();

    return () => {
      chatService.leaveRoom();
    };
  }, [roomId, receiverId, token, userData]);

  // Set up event listeners
  useEffect(() => {
    const unsubscribeMessage = chatService.onMessage((message) => {
      if (message.roomId === roomId) {
        setMessages(prev => {
          const exists = prev.find(m => m.id === message.id);
          if (exists) return prev;
          return [message, ...prev];
        });
      }
    });

    const unsubscribeConnection = chatService.onConnectionChange((isConnected) => {
      setConnected(isConnected);
      if (!isConnected) {
        Toast.show('Connection lost', Toast.SHORT);
      }
    });

    const unsubscribeTyping = chatService.onTyping((userId, isTyping) => {
      if (userId !== userData?.userId) {
        setTyping(prev => ({ ...prev, [userId]: isTyping }));
        
        // Clear typing status after 3 seconds
        if (isTyping) {
          setTimeout(() => {
            setTyping(prev => ({ ...prev, [userId]: false }));
          }, 3000);
        }
      }
    });

    return () => {
      unsubscribeMessage();
      unsubscribeConnection();
      unsubscribeTyping();
    };
  }, [roomId, userData?.userId]);

  // Send text message
  const sendMessage = useCallback(async (content: string, replyTo?: string) => {
    if (!content.trim() || sending) return;

    setSending(true);
    try {
      await chatService.sendMessage(roomId, content.trim(), receiverId, replyTo);
      
      // Update local messages
      const updatedMessages = chatService.getMessages(roomId);
      setMessages(updatedMessages);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      Toast.show('Failed to send message', Toast.SHORT);
    } finally {
      setSending(false);
    }
  }, [roomId, receiverId, sending]);

  // Send attachment
  const sendAttachment = useCallback(async (file: any, type: AttachmentType) => {
    if (sending) return;

    setSending(true);
    try {
      await chatService.sendAttachment(roomId, file, type, receiverId);
      
      const updatedMessages = chatService.getMessages(roomId);
      setMessages(updatedMessages);
      
    } catch (error) {
      console.error('Failed to send attachment:', error);
      Toast.show('Failed to send attachment', Toast.SHORT);
    } finally {
      setSending(false);
    }
  }, [roomId, receiverId, sending]);

  // Load more messages
  const loadMore = useCallback(async () => {
    try {
      const currentPage = Math.ceil(messages.length / 20) + 1;
      const newMessages = await chatService.loadMessages(roomId, currentPage);
      setMessages(newMessages);
    } catch (error) {
      console.error('Failed to load more messages:', error);
    }
  }, [roomId, messages.length]);

  // Mark as read
  const markAsRead = useCallback(async () => {
    try {
      await chatService.markAsRead(roomId, receiverId);
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  }, [roomId, receiverId]);

  // Send typing status
  const sendTypingStatus = useCallback((isTyping: boolean) => {
    chatService.sendTypingStatus(roomId, receiverId, isTyping);
  }, [roomId, receiverId]);

  return {
    messages,
    loading,
    sending,
    connected,
    typing,
    sendMessage,
    sendAttachment,
    loadMore,
    markAsRead,
    sendTypingStatus,
    isConnected: chatService.isConnected()
  };
};