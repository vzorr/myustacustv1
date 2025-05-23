import { ConversationContext } from './../config/context/ConversationContext';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { chatService } from '../services/ChatService';
import { Message, ChatRoom, AttachmentType } from '../types/chat';
import Toast from 'react-native-simple-toast';
import { chatClient, ChatService } from '../apiManager/Client';

interface UseChatProps {
  roomId: any;
  receiverId: any;
  jobTitle: string
}

export const useChat = ({ roomId, receiverId, jobTitle }: UseChatProps) => {

  const [conversationId, setConversationId] = useState('')
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const [typing, setTyping] = useState<{ [userId: string]: boolean }>({});

  const { userData } = useSelector((state: any) => state?.userInfo);
  const { token } = useSelector((state: any) => state?.accessToken);
console.log("userDtaa", userData)
  const conversationCreated = async () => {
    try {
      let payload = {
        participantIds: receiverId,
        jobId: roomId,
        jobTitle: jobTitle
      }
      let res = await ChatService.getClient(userData?.token).post('conversations', payload)
      const converId = res?.data?.conversation?.id
      setConversationId(converId)

    } catch (error) {

    }
  }
  const getChatHistory = async () => {
    try {
      // /api/v1/messages/history/user/:userId
      const response = await chatClient(userData?.token).get(
        `messages/history/user/${receiverId}`
      );
      console.log("response.data", response.data)
      if (response.data?.success) {

      }
      throw new Error(response.data?.message || 'Failed to fetch chat rooms');
    } catch (error) {
      console.error('Error fetching chat rooms:', JSON.stringify(error, null, 2));
      throw error;
    }
  }
  // async getUseHistory(page: number = 1, limit: number = 20): Promise<{
  //   rooms: ChatRoom[];
  //   hasMore: boolean;
  // }> {
  //   try {
  //     // /api/v1/messages/history/user/:userId
  //     const offset = (page - 1) * limit;
  //     const response = await chatClient(this.token).get(
  //       `messages/history/user/${}`
  //     );

  //     if (response.data?.success) {
  //       return {
  //         rooms: (response.data.conversations || []).map(this.transformChatRoom),
  //         hasMore: response.data.hasMore || false
  //       };
  //     }
  //     throw new Error(response.data?.message || 'Failed to fetch chat rooms');
  //   } catch (error) {
  //     console.error('Error fetching chat rooms:', JSON.stringify(error, null, 2));
  //     throw error;
  //   }
  // }
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const userToken = token || userData?.token;
        console.log("userToken", userToken)
        if (!userToken || !userData?.userId) return;

        await chatService.initialize(userData.userId, 'customer', userToken);

        const roomMessages = chatService.getMessages(roomId);
        await getChatHistory()
        // const conId = await chatService.getChatRooms()
        // console.log("conId", conId)
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
      // chatService.leaveRoom();
    };
  }, [roomId, receiverId, token, userData]);

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

  const sendMessage = useCallback(async (content: string, replyTo?: string) => {
    if (!content.trim() || sending) return;

    setSending(true);
    try {
      await chatService.sendMessage(roomId, content.trim(), receiverId, replyTo);

      const updatedMessages = chatService.getMessages(roomId);
      setMessages(updatedMessages);

    } catch (error) {
      console.error('Failed to send message:', error);
      Toast.show('Failed to send message', Toast.SHORT);
    } finally {
      setSending(false);
    }
  }, [roomId, receiverId, sending]);

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

  const loadMore = useCallback(async () => {
    try {
      const currentPage = Math.ceil(messages.length / 20) + 1;
      const newMessages = await chatService.loadMessages(roomId, currentPage);
      setMessages(newMessages);
    } catch (error) {
      console.error('Failed to load more messages:', error);
    }
  }, [roomId, messages.length]);

  const markAsRead = useCallback(async () => {
    try {
      await chatService.markAsRead(roomId, receiverId);
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  }, [roomId, receiverId]);

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
    isConnected: chatService.isConnected(),
    conversationId
  };
};
